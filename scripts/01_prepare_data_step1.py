import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"


def load_raw_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    part2_path = RAW_DIR / "Data Asset part 2 PDR OCP PMP.xlsx"
    part3_path = RAW_DIR / "Data Asset part 3 PDR OCP PMP .xlsx"

    part2 = pd.read_excel(part2_path, sheet_name="Accouplement 2")
    part3 = pd.read_excel(part3_path, sheet_name="Part 3 ")

    return part2, part3


def rename_columns(part2: pd.DataFrame, part3: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Standardise column names across both files (no spaces, clear meaning)."""

    part2_rename = {
        "Code Reference": "code_reference",
        "Code": "code_piece",
        "unit�": "unite",
        "D�signation langue": "designation",
        "Qte Inst": "qte_installee",
        "Stock Secur": "stock_securite",
        "Qte Ddee Pour 3ans": "qte_demandee_3ans",
        "Prix Uni": "prix_uni",
        "STOCK": "stock_actuel",
        "CONS MOY MONSUELLE": "cons_moy_mensuelle",
        "Stock min": "stock_min",
        "Stock max": "stock_max",
        "Classif": "classif",
        "D�lai de livr pr�vi": "delai_livraison_sem",
        "Observation": "observation",
        "Cons 2024": "cons_2024",
        "Cons 2023": "cons_2023",
        "Cons 2022": "cons_2022",
        "Cons 2021": "cons_2021",
        "Cons 2020": "cons_2020",
        "Cons 2019": "cons_2019",
        "Cons 2018": "cons_2018",
        "Cons 2017": "cons_2017",
        "Cons 2016": "cons_2016",
        "Cons 2015": "cons_2015",
        "Cons 2014": "cons_2014",
        "Cons 2013": "cons_2013",
        "Cons 2012": "cons_2012",
        "CONS MOY ANNUELLE": "cons_moy_annuelle",
        "Prix Uni.1": "prix_uni_alt",
    }

    part3_rename = {
        "Code Reference ": "code_reference",
        "Code": "code_piece",
        "unit�": "unite",
        "D�signation langue": "designation",
        "Qte Inst": "qte_installee",
        "STOCK": "stock_actuel",
        "EN COURS": "en_cours",
        "Cons 2023": "cons_2023",
        "Cons 2022": "cons_2022",
        "Cons 2021": "cons_2021",
        "Cons 2020": "cons_2020",
        "Cons 2019": "cons_2019",
        "Cons 2018": "cons_2018",
        "Cons 2017": "cons_2017",
        "Cons 2016": "cons_2016",
        "Cons 2015": "cons_2015",
        "Cons 2014": "cons_2014",
        "Cons 2013": "cons_2013",
        "Cons 2012": "cons_2012",
        "SONS MOY ANNUELLE": "cons_moy_annuelle",
        "A COMMANDER 2023/2024 CALC": "a_commander_2023_2024_calc",
        "Prix Uni": "prix_uni",
        "Prix Total": "prix_total",
    }

    part2 = part2.rename(columns=part2_rename)
    part3 = part3.rename(columns=part3_rename)

    return part2, part3


def cast_dtypes(part2: pd.DataFrame, part3: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Cast columns to appropriate dtypes without imputing missing values."""

    # Common helper to safely convert numeric columns
    def to_numeric(df: pd.DataFrame, cols: list[str]) -> pd.DataFrame:
        for c in cols:
            if c in df.columns:
                df[c] = pd.to_numeric(df[c], errors="coerce")
        return df

    # PART 2
    part2_string_cols = ["code_reference", "code_piece", "designation", "classif", "observation"]
    for c in part2_string_cols:
        if c in part2.columns:
            part2[c] = part2[c].astype("string")

    numeric_cols_part2 = [
        "unite",
        "qte_installee",
        "stock_securite",
        "qte_demandee_3ans",
        "prix_uni",
        "stock_actuel",
        "cons_moy_mensuelle",
        "stock_min",
        "stock_max",
        "delai_livraison_sem",
        "cons_2024",
        "cons_2023",
        "cons_2022",
        "cons_2021",
        "cons_2020",
        "cons_2019",
        "cons_2018",
        "cons_2017",
        "cons_2016",
        "cons_2015",
        "cons_2014",
        "cons_2013",
        "cons_2012",
        "cons_moy_annuelle",
        "prix_uni_alt",
    ]
    part2 = to_numeric(part2, numeric_cols_part2)

    # PART 3
    part3_string_cols = ["code_reference", "code_piece", "designation"]
    for c in part3_string_cols:
        if c in part3.columns:
            part3[c] = part3[c].astype("string")

    numeric_cols_part3 = [
        "unite",
        "qte_installee",
        "stock_actuel",
        "en_cours",
        "cons_2023",
        "cons_2022",
        "cons_2021",
        "cons_2020",
        "cons_2019",
        "cons_2018",
        "cons_2017",
        "cons_2016",
        "cons_2015",
        "cons_2014",
        "cons_2013",
        "cons_2012",
        "cons_moy_annuelle",
        "a_commander_2023_2024_calc",
        "prix_uni",
        "prix_total",
    ]
    part3 = to_numeric(part3, numeric_cols_part3)

    return part2, part3


def main() -> None:
    part2_raw, part3_raw = load_raw_data()
    part2_renamed, part3_renamed = rename_columns(part2_raw, part3_raw)
    part2_clean, part3_clean = cast_dtypes(part2_renamed, part3_renamed)

    # Save intermediate clean versions (no imputation yet)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    part2_clean.to_parquet(PROCESSED_DIR / "part2_clean_step1.parquet", index=False)
    part3_clean.to_parquet(PROCESSED_DIR / "part3_clean_step1.parquet", index=False)

    # Quick summary to verify structure
    print("PART2 CLEAN SHAPE:", part2_clean.shape)
    print("PART2 CLEAN DTYPES:\n", part2_clean.dtypes)
    print("\nPART3 CLEAN SHAPE:", part3_clean.shape)
    print("PART3 CLEAN DTYPES:\n", part3_clean.dtypes)


if __name__ == "__main__":
    main()
