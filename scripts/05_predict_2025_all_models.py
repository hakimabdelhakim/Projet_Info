import numpy as np
import pandas as pd
from pathlib import Path

from sklearn.ensemble import HistGradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
RESULTS_DIR = PROJECT_ROOT / "data" / "results"

MIN_YEAR = 2012
MAX_YEAR = 2024
N_LAGS = 3


def build_training_matrices(panel_path: Path):
    df = pd.read_parquet(panel_path)

    feature_cols = [
        c
        for c in df.columns
        if c not in {"code_piece", "year", "target_cons", "split"}
    ]

    X_all = df[feature_cols].astype(float).reset_index(drop=True)
    y_all = df["target_cons"].astype(float).reset_index(drop=True)

    return feature_cols, X_all, y_all


def build_features_2025(part2_path: Path, feature_cols):
    p2 = pd.read_parquet(part2_path)

    years = list(range(MIN_YEAR, MAX_YEAR + 1))
    target_year = MAX_YEAR + 1  # 2025

    lag_years = [target_year - i for i in range(1, N_LAGS + 1)]
    lag_cols = [f"cons_{y}" for y in lag_years]

    records = []
    for _, row in p2.iterrows():
        lag_values = [float(row[c]) for c in lag_cols]
        cons_mean_3y = float(np.mean(lag_values))
        past_cols = [f"cons_{y}" for y in years if y <= MAX_YEAR and f"cons_{y}" in p2.columns]
        cons_mean_all_past = float(row[past_cols].mean()) if past_cols else 0.0
        cons_trend = lag_values[0] - lag_values[1]

        rec = {
            "code_piece": row["code_piece"],
            "lag1": lag_values[0],
            "lag2": lag_values[1],
            "lag3": lag_values[2],
            "cons_mean_3y": cons_mean_3y,
            "cons_trend": cons_trend,
            "cons_mean_all_past": cons_mean_all_past,
            "qte_installee": float(row["qte_installee"]),
            "stock_actuel": float(row["stock_actuel"]),
            "stock_securite": float(row["stock_securite"]),
            "stock_min": float(row["stock_min"]),
            "stock_max": float(row["stock_max"]),
            "qte_demandee_3ans": float(row["qte_demandee_3ans"]),
            "lag1_was_missing": 0,
            "lag2_was_missing": 0,
            "lag3_was_missing": 0,
            "qte_installee_was_missing": int(row.get("part2_qte_installee_was_missing", False)),
            "stock_securite_was_missing": int(row.get("part2_stock_securite_was_missing", False)),
        }
        records.append(rec)

    df_2025 = pd.DataFrame.from_records(records)

    for col in feature_cols:
        if col not in df_2025.columns:
            df_2025[col] = 0.0

    X_2025 = df_2025[feature_cols].astype(float).reset_index(drop=True)
    return df_2025[["code_piece"]].copy(), X_2025


def main() -> None:
    panel_path = PROCESSED_DIR / "consumption_panel_dataset.parquet"
    part2_path = PROCESSED_DIR / "part2_clean_step2.parquet"

    feature_cols, X_all, y_all = build_training_matrices(panel_path)
    _, X_2025 = build_features_2025(part2_path, feature_cols)

    p2 = pd.read_parquet(part2_path)

    baseline_last = p2["cons_2024"].astype(float).values
    baseline_mean3 = (
        p2[["cons_2024", "cons_2023", "cons_2022"]].astype(float).mean(axis=1).values
    )

    ridge = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=0.1)),
        ]
    )
    ridge.fit(X_all, y_all)
    ridge_pred = np.clip(ridge.predict(X_2025), 0, None)

    rf = RandomForestRegressor(
        n_estimators=200,
        max_depth=8,
        min_samples_leaf=2,
        random_state=0,
        n_jobs=-1,
    )
    rf.fit(X_all, y_all)
    rf_pred = np.clip(rf.predict(X_2025), 0, None)

    hgb = HistGradientBoostingRegressor(
        learning_rate=0.1,
        max_depth=3,
        max_iter=200,
        min_samples_leaf=5,
        random_state=0,
    )
    hgb.fit(X_all, y_all)
    hgb_pred = np.clip(hgb.predict(X_2025), 0, None)

    out = p2[
        [
            "code_reference",
            "code_piece",
            "D\u00e9signation langue",
            "qte_installee",
            "stock_actuel",
            "stock_securite",
            "stock_min",
            "stock_max",
            "qte_demandee_3ans",
            "cons_2012",
            "cons_2013",
            "cons_2014",
            "cons_2015",
            "cons_2016",
            "cons_2017",
            "cons_2018",
            "cons_2019",
            "cons_2020",
            "cons_2021",
            "cons_2022",
            "cons_2023",
            "cons_2024",
        ]
    ].copy()

    out["pred_2025_baseline_last"] = baseline_last
    out["pred_2025_baseline_mean3y"] = baseline_mean3
    out["pred_2025_ridge"] = ridge_pred
    out["pred_2025_random_forest"] = rf_pred
    out["pred_2025_histgradboost"] = hgb_pred
    out["n_pm_2025"] = out["pred_2025_histgradboost"] / 12.0

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "predictions_2025_all_models_with_n_pm_2025.xlsx"
    out.to_excel(out_path, index=False)
    print("Predictions for 2025 saved to:", out_path)


if __name__ == "__main__":
    main()

