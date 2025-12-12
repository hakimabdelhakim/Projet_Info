import pandas as pd
from pathlib import Path
from typing import List, Dict, Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"


MIN_YEAR = 2012
MAX_YEAR = 2024
N_LAGS = 3


def build_panel_from_wide(df: pd.DataFrame) -> pd.DataFrame:
    """
    Build a piece-year panel dataset with lag features and a clear target.

    Each row in the output corresponds to (code_piece, year_t) with:
    - target_cons       = consumption at year t
    - lag1, lag2, lag3  = consumptions at t-1, t-2, t-3
    - cons_mean_3y      = mean(lag1, lag2, lag3)
    - cons_trend        = lag1 - lag2
    - cons_mean_all_past= mean of all years < t
    plus static features and missing-data flags.
    """
    years = list(range(MIN_YEAR, MAX_YEAR + 1))
    target_years = list(range(MIN_YEAR + N_LAGS, MAX_YEAR + 1))  # e.g. 2015..2024

    records: List[Dict[str, Any]] = []

    # Precompute which missing-flag columns exist
    available_missing_flags = set(
        c for c in df.columns if c.startswith("part2_cons_") and c.endswith("_was_missing")
    )

    for _, row in df.iterrows():
        code_piece = row["code_piece"]

        for t in target_years:
            target_col = f"cons_{t}"
            lag_years = [t - i for i in range(1, N_LAGS + 1)]
            lag_cols = [f"cons_{y}" for y in lag_years]

            # Ensure all required columns exist (they should, given our year range)
            if any(c not in df.columns for c in [target_col] + lag_cols):
                continue

            target_value = float(row[target_col])
            lag_values = [float(row[c]) for c in lag_cols]

            cons_mean_3y = sum(lag_values) / len(lag_values)

            # Mean of all past years strictly before t
            past_cols = [f"cons_{y}" for y in years if y < t and f"cons_{y}" in df.columns]
            cons_mean_all_past = float(row[past_cols].mean()) if past_cols else 0.0

            cons_trend = lag_values[0] - lag_values[1]  # cons_{t-1} - cons_{t-2}

            rec: Dict[str, Any] = {
                "code_piece": code_piece,
                "year": t,
                "target_cons": target_value,
                "lag1": lag_values[0],
                "lag2": lag_values[1],
                "lag3": lag_values[2],
                "cons_mean_3y": cons_mean_3y,
                "cons_trend": cons_trend,
                "cons_mean_all_past": cons_mean_all_past,
                # Static features (kept simple and physically meaningful)
                "qte_installee": float(row["qte_installee"]),
                "stock_actuel": float(row["stock_actuel"]),
                "stock_securite": float(row["stock_securite"]),
                "stock_min": float(row["stock_min"]),
                "stock_max": float(row["stock_max"]),
                "qte_demandee_3ans": float(row["qte_demandee_3ans"]),
                # Missing-data flags for lags and key static vars
                "lag1_was_missing": 0,
                "lag2_was_missing": 0,
                "lag3_was_missing": 0,
                "qte_installee_was_missing": int(row.get("part2_qte_installee_was_missing", False)),
                "stock_securite_was_missing": int(row.get("part2_stock_securite_was_missing", False)),
            }

            # Fill lag missing flags when we have them (only 2012-2015 in this dataset)
            for i, y in enumerate(lag_years, start=1):
                flag_col = f"part2_cons_{y}_was_missing"
                if flag_col in available_missing_flags:
                    rec[f"lag{i}_was_missing"] = int(bool(row[flag_col]))

            records.append(rec)

    panel = pd.DataFrame.from_records(records)

    # Ensure boolean/int columns are of numeric dtype
    flag_cols = [c for c in panel.columns if c.endswith("_was_missing")]
    for c in flag_cols:
        panel[c] = panel[c].astype("int8")

    return panel


def add_time_splits(panel: pd.DataFrame) -> pd.DataFrame:
    """
    Add a 'split' column based on the target year.

    Example:
    - train: years <= 2020
    - val:   years 2021-2022
    - test:  years >= 2023
    """

    def split_for_year(year: int) -> str:
        if year <= 2020:
            return "train"
        if year <= 2022:
            return "val"
        return "test"

    panel["split"] = panel["year"].astype(int).apply(split_for_year)
    return panel


def main() -> None:
    p2 = pd.read_parquet(PROCESSED_DIR / "part2_clean_step2.parquet")

    panel = build_panel_from_wide(p2)
    panel = add_time_splits(panel)

    # Save the full panel dataset
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    out_path = PROCESSED_DIR / "consumption_panel_dataset.parquet"
    panel.to_parquet(out_path, index=False)

    # Quick summary
    print("Panel shape:", panel.shape)
    print(panel["split"].value_counts().sort_index())
    print("\nColumns:\n", panel.columns.tolist())


if __name__ == "__main__":
    main()
