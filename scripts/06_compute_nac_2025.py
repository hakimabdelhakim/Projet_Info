import numpy as np
import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = PROJECT_ROOT / "data" / "processed"
RESULTS_DIR = PROJECT_ROOT / "data" / "results"
USER_INPUTS_DIR = PROJECT_ROOT / "data" / "user_inputs"


def main() -> None:
    preds_path = RESULTS_DIR / "predictions_2025_all_models_with_n_pm_2025.xlsx"
    part2_path = PROCESSED_DIR / "part2_clean_step2.parquet"

    preds = pd.read_excel(preds_path)
    part2 = pd.read_parquet(part2_path)

    delay_col = "D\u00e9lai de livr pr\u00e9vi"
    if delay_col not in part2.columns:
        raise KeyError(f"Colonne '{delay_col}' introuvable dans part2_clean_step2.parquet")

    delay_df = part2[["code_piece", delay_col]].copy()
    delay_df = delay_df.rename(columns={delay_col: "dl_semaines"})

    merged = preds.merge(delay_df, on="code_piece", how="left")

    if "n_pm_2025" not in merged.columns:
        raise KeyError("Colonne 'n_pm_2025' introuvable dans le fichier de prédictions.")
    n_pm = merged["n_pm_2025"].astype(float)

    if "stock_securite" not in merged.columns:
        raise KeyError("Colonne 'stock_securite' introuvable dans le fichier de prédictions.")
    n_ss = merged["stock_securite"].astype(float)

    n_sa_source = USER_INPUTS_DIR / "current_stock.xlsx"
    if n_sa_source.exists():
        user_stock = pd.read_excel(n_sa_source)
        if not {"code_piece", "n_sa"} <= set(user_stock.columns):
            raise KeyError("Le fichier current_stock.xlsx doit contenir 'code_piece' et 'n_sa'.")
        merged = merged.merge(
            user_stock[["code_piece", "n_sa"]],
            on="code_piece",
            how="left",
            suffixes=("", "_user"),
        )
    else:
        merged["n_sa"] = np.nan

    if merged["n_sa"].isna().any():
        if "stock_actuel" not in merged.columns:
            raise KeyError("Impossible de déterminer 'n_sa' : ni fichier utilisateur ni 'stock_actuel'.")
        merged["n_sa"] = merged["n_sa"].fillna(merged["stock_actuel"])

    dl_semaines = merged["dl_semaines"].astype(float)
    dl_mois = dl_semaines / 4.0

    n_ac_raw = n_ss + n_pm * (1.0 + dl_mois) - merged["n_sa"]
    merged["dl_mois"] = dl_mois
    merged["n_ac_2025"] = np.maximum(0.0, n_ac_raw)

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "predictions_2025_with_nac.xlsx"
    merged.to_excel(out_path, index=False)
    print("Fichier avec n_ac 2025 sauvegardé sous :", out_path)


if __name__ == "__main__":
    main()

