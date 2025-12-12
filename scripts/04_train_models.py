import json
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, HistGradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
RESULTS_DIR = PROJECT_ROOT / "data" / "results"


def load_dataset(path: Path) -> pd.DataFrame:
    return pd.read_parquet(path)


def get_feature_target_split(df: pd.DataFrame):
    feature_cols = [
        c
        for c in df.columns
        if c
        not in {
            "code_piece",
            "year",
            "target_cons",
            "split",
        }
    ]

    X = df[feature_cols].astype(float)
    y = df["target_cons"].astype(float)

    splits = {
        split: (
            X[df["split"] == split].reset_index(drop=True),
            y[df["split"] == split].reset_index(drop=True),
        )
        for split in ["train", "val", "test"]
    }

    return feature_cols, splits


def evaluate_model(name: str, model, splits):
    results = {"name": name, "metrics": {}}

    for split_name, (X_split, y_split) in splits.items():
        if len(X_split) == 0:
            continue
        y_pred = model.predict(X_split)
        y_pred = np.clip(y_pred, 0, None)  # no negative consumption
        mae = mean_absolute_error(y_split, y_pred)
        rmse = mean_squared_error(y_split, y_pred) ** 0.5
        # Accuracy-style metric: % of predictions within +/-1 unit
        errors = np.abs(y_pred - y_split)
        acc_within_1 = float((errors <= 1.0).mean())
        results["metrics"][split_name] = {
            "MAE": mae,
            "RMSE": rmse,
            "ACC_within_1": acc_within_1,
        }

    return results


def baseline_last_value(splits):
    results = {"name": "baseline_last_value_lag1", "metrics": {}}
    for split_name, (X_split, y_split) in splits.items():
        if len(X_split) == 0:
            continue
        y_pred = X_split["lag1"].values
        y_pred = np.clip(y_pred, 0, None)
        mae = mean_absolute_error(y_split, y_pred)
        rmse = mean_squared_error(y_split, y_pred) ** 0.5
        errors = np.abs(y_pred - y_split)
        acc_within_1 = float((errors <= 1.0).mean())
        results["metrics"][split_name] = {
            "MAE": mae,
            "RMSE": rmse,
            "ACC_within_1": acc_within_1,
        }
    return results


def baseline_mean_3y(splits):
    results = {"name": "baseline_mean_3y", "metrics": {}}
    for split_name, (X_split, y_split) in splits.items():
        if len(X_split) == 0:
            continue
        y_pred = X_split["cons_mean_3y"].values
        y_pred = np.clip(y_pred, 0, None)
        mae = mean_absolute_error(y_split, y_pred)
        rmse = mean_squared_error(y_split, y_pred) ** 0.5
        errors = np.abs(y_pred - y_split)
        acc_within_1 = float((errors <= 1.0).mean())
        results["metrics"][split_name] = {
            "MAE": mae,
            "RMSE": rmse,
            "ACC_within_1": acc_within_1,
        }
    return results


def tune_ridge(splits):
    X_train, y_train = splits["train"]
    X_val, y_val = splits["val"]

    alphas = [0.1, 1.0, 10.0, 100.0]
    best_mae = float("inf")
    best_alpha = None
    best_model = None

    for alpha in alphas:
        ridge = Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                ("model", Ridge(alpha=alpha)),
            ]
        )
        ridge.fit(X_train, y_train)
        y_pred = ridge.predict(X_val)
        y_pred = np.clip(y_pred, 0, None)
        mae = mean_absolute_error(y_val, y_pred)
        if mae < best_mae:
            best_mae = mae
            best_alpha = alpha
            best_model = ridge

    return best_model, best_alpha, best_mae


def tune_random_forest(splits):
    X_train, y_train = splits["train"]
    X_val, y_val = splits["val"]

    param_grid = {
        "n_estimators": [200, 500],
        "max_depth": [4, 6, 8],
        "min_samples_leaf": [2, 3, 5],
    }

    best_mae = float("inf")
    best_params = None
    best_model = None

    for n in param_grid["n_estimators"]:
        for depth in param_grid["max_depth"]:
            for leaf in param_grid["min_samples_leaf"]:
                rf = RandomForestRegressor(
                    n_estimators=n,
                    max_depth=depth,
                    min_samples_leaf=leaf,
                    random_state=0,
                    n_jobs=-1,
                )
                rf.fit(X_train, y_train)
                y_pred = rf.predict(X_val)
                y_pred = np.clip(y_pred, 0, None)
                mae = mean_absolute_error(y_val, y_pred)
                if mae < best_mae:
                    best_mae = mae
                    best_params = {"n_estimators": n, "max_depth": depth, "min_samples_leaf": leaf}
                    best_model = rf

    return best_model, best_params, best_mae


def tune_hist_gradient_boosting(splits):
    X_train, y_train = splits["train"]
    X_val, y_val = splits["val"]

    param_grid = {
        "learning_rate": [0.05, 0.1],
        "max_depth": [3, 6],
        "max_iter": [200, 400],
        "min_samples_leaf": [5, 10],
    }

    best_mae = float("inf")
    best_params = None
    best_model = None

    for lr in param_grid["learning_rate"]:
        for depth in param_grid["max_depth"]:
            for it in param_grid["max_iter"]:
                for leaf in param_grid["min_samples_leaf"]:
                    hgb = HistGradientBoostingRegressor(
                        learning_rate=lr,
                        max_depth=depth,
                        max_iter=it,
                        min_samples_leaf=leaf,
                        random_state=0,
                    )
                    hgb.fit(X_train, y_train)
                    y_pred = hgb.predict(X_val)
                    y_pred = np.clip(y_pred, 0, None)
                    mae = mean_absolute_error(y_val, y_pred)
                    if mae < best_mae:
                        best_mae = mae
                        best_params = {
                            "learning_rate": lr,
                            "max_depth": depth,
                            "max_iter": it,
                            "min_samples_leaf": leaf,
                        }
                        best_model = hgb

    return best_model, best_params, best_mae


def main() -> None:
    dataset_path = PROCESSED_DIR / "consumption_panel_dataset.parquet"
    df = load_dataset(dataset_path)

    feature_cols, splits = get_feature_target_split(df)

    models = []

    # Baselines
    models.append(baseline_last_value(splits))
    models.append(baseline_mean_3y(splits))

    # Hyperparameter tuning on train/val
    ridge_best, ridge_alpha, ridge_val_mae = tune_ridge(splits)
    rf_best, rf_params, rf_val_mae = tune_random_forest(splits)
    hgb_best, hgb_params, hgb_val_mae = tune_hist_gradient_boosting(splits)

    # Refit best models on train+val, then evaluate on all splits
    X_train, y_train = splits["train"]
    X_val, y_val = splits["val"]
    X_trainval = pd.concat([X_train, X_val], axis=0).reset_index(drop=True)
    y_trainval = pd.concat([y_train, y_val], axis=0).reset_index(drop=True)

    # Ridge final
    ridge_final = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=ridge_alpha)),
        ]
    )
    ridge_final.fit(X_trainval, y_trainval)
    models.append(evaluate_model("ridge_best", ridge_final, splits))

    # Random Forest final
    rf_final = RandomForestRegressor(
        n_estimators=rf_params["n_estimators"],
        max_depth=rf_params["max_depth"],
        min_samples_leaf=rf_params["min_samples_leaf"],
        random_state=0,
        n_jobs=-1,
    )
    rf_final.fit(X_trainval, y_trainval)
    models.append(evaluate_model("random_forest_best", rf_final, splits))

    # HistGradientBoosting final
    hgb_final = HistGradientBoostingRegressor(
        learning_rate=hgb_params["learning_rate"],
        max_depth=hgb_params["max_depth"],
        max_iter=hgb_params["max_iter"],
        min_samples_leaf=hgb_params["min_samples_leaf"],
        random_state=0,
    )
    hgb_final.fit(X_trainval, y_trainval)
    models.append(evaluate_model("hist_gradient_boosting_best", hgb_final, splits))

    # Print results in a compact way
    print("Feature columns used:", feature_cols)
    print("\nBest hyperparameters (based on val MAE):")
    print(f"  Ridge alpha: {ridge_alpha} (val MAE={ridge_val_mae:.4f})")
    print(f"  RandomForest params: {rf_params} (val MAE={rf_val_mae:.4f})")
    print(f"  HistGradientBoosting params: {hgb_params} (val MAE={hgb_val_mae:.4f})")

    print("\nEvaluation results (MAE / RMSE):")
    for res in models:
        print(f"\nModel: {res['name']}")
        for split_name in ["train", "val", "test"]:
            if split_name in res["metrics"]:
                m = res["metrics"][split_name]
                acc_pct = 100.0 * m["ACC_within_1"]
                print(
                    f"  {split_name:5s} -> MAE={m['MAE']:.4f}, RMSE={m['RMSE']:.4f}, "
                    f"ACC_within_1={acc_pct:.1f}%"
                )

    # Save as JSON for later analysis if needed
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_json = RESULTS_DIR / "model_eval_results.json"
    with out_json.open("w", encoding="utf-8") as f:
        json.dump(models, f, indent=2)


if __name__ == "__main__":
    main()
