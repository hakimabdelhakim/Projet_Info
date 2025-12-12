# ML Consumption Forecasting

## Structure
- `data/raw/` – fichiers Excel d’origine (part 2, part 3, PDR).
- `data/processed/` – fichiers parquet intermédiaires (nettoyés, panel, etc.).
- `data/results/` – sorties finales (prédictions 2025, `n_ac`, métriques).
- `data/user_inputs/` – entrées métier (ex. `current_stock.xlsx` pour `n_sa`).
- `scripts/` – scripts Python numérotés à exécuter dans l’ordre.
- `docs/` – documentation (rapport LaTeX, notes, etc.).

## Pipeline (scripts/)
1. `01_prepare_data_step1.py` – renommage des colonnes + typage.
2. `02_prepare_data_step2_impute.py` – imputations et flags.
3. `03_build_training_dataset.py` – création du panel pièce–année.
4. `04_train_models.py` – entraînement/évaluation (baselines + ML).
5. `05_predict_2025_all_models.py` – prédictions 2025 + `n_pm_2025`.
   - `05a_predict_2025_baseline_last_value.py` – baseline “last value” seule (optionnelle).
6. `06_compute_nac_2025.py` – calcule `n_ac_2025` en utilisant `n_pm_2025`, `stock_securite`, `n_sa`, `dl`.

Chaque script lit les données depuis `data/...` et écrit ses sorties dans `data/processed` ou `data/results`.

## Entrées utilisateur
- Pour fournir un stock actuel mis à jour, remplir `data/user_inputs/current_stock.xlsx` avec les colonnes `code_piece` et `n_sa`.  
  Le script 06 utilisera ces valeurs pour calculer `n_ac_2025`. Sans ce fichier, `stock_actuel` est utilisé par défaut.

## Prochaine étape
- Le futur dossier `webapp/` pourra consommer directement les fichiers de `data/results/` (prédictions, `n_ac`, etc.) pour alimenter l’interface.
