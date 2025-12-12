import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
RESULTS_DIR = PROJECT_ROOT / "data" / "results"


def main() -> None:
    p2 = pd.read_parquet(PROCESSED_DIR / "part2_clean_step2.parquet")

    p2["pred_cons_2025"] = p2["cons_2024"]

    cols_to_keep = [
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
        "pred_cons_2025",
    ]

    existing_cols = [c for c in cols_to_keep if c in p2.columns]
    df_out = p2[existing_cols].copy()

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "predictions_2025_baseline_last_value.xlsx"
    df_out.to_excel(out_path, index=False)

    print("Predictions saved to:", out_path)


if __name__ == "__main__":
    main()

