import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"


def impute_consumptions_rowwise(df: pd.DataFrame, cons_cols: list[str], prefix: str) -> pd.DataFrame:
    """Impute missing consumption values using per-piece median across years."""
    # Flags for missing values (only for columns that actually have NaNs)
    for c in cons_cols:
        if c in df.columns and df[c].isna().any():
            df[f"{prefix}{c}_was_missing"] = df[c].isna()

    # Per-row median across all years for that piece
    cons_median = df[cons_cols].median(axis=1, skipna=True)
    for c in cons_cols:
        if c in df.columns:
            df[c] = df[c].fillna(cons_median)

    return df


def impute_part2(p2: pd.DataFrame) -> pd.DataFrame:
    # 1) Consumption history
    cons_cols = [c for c in p2.columns if c.startswith("cons_")]
    cons_cols = sorted(cons_cols)  # ensures chronological order by name
    p2 = impute_consumptions_rowwise(p2, cons_cols, prefix="part2_")

    # 2) Unite (unit�) – categorical-like, very few NaNs: use mode
    if "unit�" in p2.columns:
        p2["part2_unite_was_missing"] = p2["unit�"].isna()
        if not p2["unit�"].dropna().empty:
            unite_mode = p2["unit�"].mode().iloc[0]
            p2["unit�"] = p2["unit�"].fillna(unite_mode)

    # 3) Quantité installée – impute by classif median, then global median
    if "qte_installee" in p2.columns:
        p2["part2_qte_installee_was_missing"] = p2["qte_installee"].isna()
        if "classif" in p2.columns:
            med_by_class = p2.groupby("classif")["qte_installee"].transform("median")
            p2["qte_installee"] = p2["qte_installee"].fillna(med_by_class)
        global_med_qte = p2["qte_installee"].median()
        p2["qte_installee"] = p2["qte_installee"].fillna(global_med_qte)

    # 4) Stock sécurité – same strategy as quantité installée
    if "stock_securite" in p2.columns:
        p2["part2_stock_securite_was_missing"] = p2["stock_securite"].isna()
        if "classif" in p2.columns:
            med_by_class = p2.groupby("classif")["stock_securite"].transform("median")
            p2["stock_securite"] = p2["stock_securite"].fillna(med_by_class)
        global_med_stock_sec = p2["stock_securite"].median()
        p2["stock_securite"] = p2["stock_securite"].fillna(global_med_stock_sec)

    # 5) Prix unitaire – combiner Prix Uni et Prix Uni.1, puis imputer
    has_prix_uni = "prix_uni" in p2.columns
    has_prix_alt = "prix_uni_alt" in p2.columns
    if has_prix_uni or has_prix_alt:
        p2["prix_uni_final"] = pd.NA
        if has_prix_uni:
            p2["prix_uni_final"] = p2["prix_uni"]
        if has_prix_alt:
            mask_use_alt = p2["prix_uni_final"].isna() & p2["prix_uni_alt"].notna()
            p2.loc[mask_use_alt, "prix_uni_final"] = p2.loc[mask_use_alt, "prix_uni_alt"]

        p2["part2_prix_uni_was_missing"] = p2["prix_uni_final"].isna()
        if "classif" in p2.columns:
            med_by_class_price = p2.groupby("classif")["prix_uni_final"].transform("median")
            p2["prix_uni_final"] = p2["prix_uni_final"].fillna(med_by_class_price)
        global_med_price = p2["prix_uni_final"].median()
        p2["prix_uni_final"] = p2["prix_uni_final"].fillna(global_med_price)

    # 6) Recompute annual mean consumption from history (model-friendly)
    if cons_cols:
        p2["cons_moy_annuelle_calc"] = p2[cons_cols].mean(axis=1)

    return p2


def impute_part3(p3: pd.DataFrame, p2_ref: pd.DataFrame) -> pd.DataFrame:
    # 1) Consumption history – same row-wise median strategy
    cons_cols = [c for c in p3.columns if c.startswith("cons_")]
    cons_cols = sorted(cons_cols)
    p3 = impute_consumptions_rowwise(p3, cons_cols, prefix="part3_")

    # 2) Quantité installée – few NaNs, use global median
    if "qte_installee" in p3.columns:
        p3["part3_qte_installee_was_missing"] = p3["qte_installee"].isna()
        global_med_qte = p3["qte_installee"].median()
        p3["qte_installee"] = p3["qte_installee"].fillna(global_med_qte)

    # 3) Prix unitaire – compléter depuis part2 quand c'est possible
    if "prix_uni" in p3.columns and "code_piece" in p3.columns and "prix_uni_final" in p2_ref.columns:
        # Use median prix_uni_final per code_piece to avoid duplicate-index issues
        price_map = (
            p2_ref.dropna(subset=["prix_uni_final"])
            .groupby("code_piece")["prix_uni_final"]
            .median()
            .to_dict()
        )
        p3["part3_prix_uni_was_missing"] = p3["prix_uni"].isna()
        p3_price_from_p2 = p3["code_piece"].map(price_map)
        mask_fill = p3["prix_uni"].isna() & p3_price_from_p2.notna()
        p3.loc[mask_fill, "prix_uni"] = p3_price_from_p2[mask_fill]

    # 4) Prix total – recalculer quand possible à partir de prix_uni * a_commander
    if "prix_uni" in p3.columns and "a_commander_2023_2024_calc" in p3.columns and "prix_total" in p3.columns:
        p3["part3_prix_total_was_missing"] = p3["prix_total"].isna()
        mask_can_compute = (
            p3["prix_total"].isna()
            & p3["prix_uni"].notna()
            & p3["a_commander_2023_2024_calc"].notna()
        )
        p3.loc[mask_can_compute, "prix_total"] = (
            p3.loc[mask_can_compute, "prix_uni"]
            * p3.loc[mask_can_compute, "a_commander_2023_2024_calc"]
        )

    return p3


def main() -> None:
    p2 = pd.read_parquet(PROCESSED_DIR / "part2_clean_step1.parquet")
    p3 = pd.read_parquet(PROCESSED_DIR / "part3_clean_step1.parquet")

    p2_imputed = impute_part2(p2.copy())
    p3_imputed = impute_part3(p3.copy(), p2_imputed)

    p2_imputed.to_parquet(PROCESSED_DIR / "part2_clean_step2.parquet", index=False)
    p3_imputed.to_parquet(PROCESSED_DIR / "part3_clean_step2.parquet", index=False)

    print("PART2 CLEAN STEP2 SHAPE:", p2_imputed.shape)
    print("PART2 remaining missing:\n", p2_imputed.isna().sum())
    print("\nPART3 CLEAN STEP2 SHAPE:", p3_imputed.shape)
    print("PART3 remaining missing:\n", p3_imputed.isna().sum())


if __name__ == "__main__":
    main()
