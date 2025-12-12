# Architecture du système de prévision de pièces

Ce document décrit comment les données, le backend Django et la webapp React/Vite fonctionnent ensemble pour produire les prévisions de consommation et la gestion du budget des pièces (accouplements).

---

## 1. Pipeline données & ML

- **Sources initiales** : fichiers Excel/Parquet (ex. `data/processed/part2_clean_step2.parquet`) contenant :
  - `code_piece` (code pièce)
  - `stock_securite`, `stock_actuel`, `stock_min`, `stock_max`
  - historique de consommation par année (2012–2024)
  - `prix_uni`, `classif`, délai de livraison, etc.

- **Traitement & ML** (scripts Python hors webapp) :
  - Construction d’un dataset (clé `(code_piece, année)`).
  - Entraînement de plusieurs modèles (baseline, Ridge, RandomForest, HistGradientBoosting).
  - Sélection du meilleur modèle sur métriques (MAE, RMSE, ACC±1).
  - Production de prévisions annuelles pour 2025 par pièce.
  - Calcul de `n_pm_2025` (consommation mensuelle moyenne) et de la quantité à commander `n_ac_2025` avec la formule :
    - `n_ac = max(0, n_pm + n_ss - n_sa + n_pm*dl)`  
      (avec `n_pm` : conso mensuelle moyenne, `n_ss` : stock de sécurité, `n_sa` : stock actuel, `dl` : délai livraison en mois).

- **Export ML final** :
  - Résultat consolidé en `webapp/UI for forecasting2/src/assets/predictions_2025.json`
  - Chaque entrée contient :
    - `code`, `designation`, `criticite`
    - `stockActuel`, `moyenneM3`, `previsionM1`
    - `prixUnitaire`, `fournisseur`, `delai`
    - `n_ac_2025`

- **Stock de sécurité** :
  - Mapping à partir de `data/processed/part2_clean_step2.parquet` → `src/assets/stock_securite.json`
  - Clé : `code_piece`, valeur : `stock_securite`

---

## 2. Backend Django (`backend/`)

### 2.1. Modèles

- `Part`
  - `code` (PK), `designation`, `criticite`
  - `stock_actuel`, `stock_securite`, `moyenne_m3`
  - `prevision_m1`, `ecart_pourcent`
  - `prix_unitaire`, `fournisseur`, `delai` (jours)
  - `n_ac_2025`
  - `approuve` (bool : prévision validée côté admin)

- `Consumption`
  - `part` (FK → `Part`)
  - `date` (date de saisie)
  - `valeur` (consommation saisie)
  - `unique_together (part, date)` : une entrée par jour et par pièce.

- `BudgetConfig`
  - `budget_cap` (budget cible global)
  - `updated_at`

- `Selection`
  - `part` (OneToOne → `Part`)
  - `selected` (bool)

- `ActivityLog`
  - `created_at`
  - `utilisateur`, `role`
  - `action`, `module`, `details`

### 2.2. Chargement des données

- Fichier : `api/utils.py`
- `ensure_parts_loaded()` :
  - Vérifie si la table `Part` est vide.
  - Charge `predictions_2025.json` + `stock_securite.json` si besoin.
  - Crée les instances `Part` avec toutes les colonnes nécessaires.

### 2.3. Endpoints API

Tous les endpoints sont préfixés par `/api/` (cf. `config/urls.py` et `api/urls.py`).

- `GET /api/previsions/`
  - Retourne la liste des pièces avec leurs prévisions :
    - `code`, `designation`, `criticite`, `stockActuel`, `stockSecurite`, `moyenneM3`, `previsionM1`, etc.
  - Query params :
    - `limit`, `offset` (pagination simple).

- `GET /api/purchases/`
  - Retourne les besoins d’achat dérivés de `Part.n_ac_2025` :
    - `id`, `code`, `designation`, `criticite`, `quantite`, `prixUnitaire`, `total`, `delai`.
  - Query params :
    - `limit`, `offset`.

- `GET /api/metrics/`
  - Renvoie les métriques du modèle ML à partir de `model_metrics.json`.

- `GET /api/consommations/?date=YYYY-MM-DD`
  - Renvoie les consommations réelles pour la date donnée :
    - `[{ code, date, valeur }, ...]`

- `POST /api/consommations/`
  - Body : liste ou objet `{ code, date, valeur }`
  - Comportement :
    - `update_or_create(part, date)` avec validation (date ISO, valeur ≥ 0).
    - Enregistre un `ActivityLog` (“Saisie consommations”).

- `GET /api/budget/state/`
  - Renvoie l’état budget :
    - `{ budget_cap: number | null, selected_codes: string[] }`

- `POST /api/budget/state/`
  - Body : `{ budget_cap, selected_codes }`
  - Effets :
    - Met à jour `BudgetConfig`.
    - Supprime & recrée les `Selection` pour les codes donnés.
    - Log dans `ActivityLog` (“Budget/selection sauvegardés”).

- `GET /api/approvals/`
  - Renvoie `{ approved: [code1, code2, ...] }` à partir des `Part.approuve`.

- `POST /api/approvals/`
  - Body : `{ codes: [code1, code2, ...] }`
  - Effets :
    - Met à jour `Part.approuve=True` pour ces codes.
    - Log dans `ActivityLog`.

- `GET /api/activities/`
  - Renvoie les 50 dernières entrées d’`ActivityLog` :
    - `[{ utilisateur, role, action, module, details, date }, ...]`

- Exports CSV :
  - `GET /api/export/previsions.csv`
    - Export de `Part` (prévisions complètes).
  - `GET /api/export/budget.csv`
    - Export des besoins d’achat (quantités, prix, total).
  - `GET /api/export/consommations.csv`
    - Export des consommations (code, date, valeur).

### 2.4. Admin Django

- URL : `/admin/`
- Superuser initial créé (`admin/admin`).
- Permet de :
  - Visualiser les `Part`, `Consumption`, `BudgetConfig`, `Selection`, `ActivityLog`.
  - Injecter/modifier des données si besoin.

---

## 3. Frontend React/Vite (`webapp/UI for forecasting2/`)

### 3.1. Services de données (`src/services/mlData.ts`)

Les fonctions utilisent l’API si `VITE_API_BASE` est défini, sinon elles se replient sur les assets JSON locaux.

- `loadPrevisions()` :
  - Appelle `/api/previsions/` ou `predictions_2025.json`.
  - Injecte `stockSecurite` à partir de `stock_securite.json`.
  - Marque `approved` selon `/api/approvals/`.

- `loadPurchases()` :
  - Appelle `/api/purchases/` ou dérive `n_ac_2025` localement.

- `loadConsommations(date?)` :
  - `GET /api/consommations/?date=...` ou fallback.

- `saveConsommations(payload)` :
  - `POST /api/consommations/` ou sauvegarde dans `localStorage` si pas d’API.

- `loadBudgetState()` / `saveBudgetState()` :
  - Interfacent `/api/budget/state/` pour budget cible et sélection.

- `fetchActivities()` :
  - `GET /api/activities/` pour alimenter la page Admin.

### 3.2. Pages principales

#### Dashboard

- **KPIs** : budget prévisionnel, pièces critiques, prévision M+1 totale, stock total.
- **Widget “En direct”** :
  - Pièces suivies = nombre de prévisions.
  - Pièces à commander = nombre de lignes avec `n_ac_2025 > 0`.
  - Quantités totales n_ac.
  - Taux de précision = ACC(±1) du meilleur modèle sur le test.
- **Graphiques** :
  - Prévision vs stock (line chart sur un sous-ensemble de pièces).
  - Répartition par criticité (stack bar : stock vs à commander).
  - Tableau des pièces prioritaires à commander.

#### Prévisions

- Filtres : mois (placeholder), type, criticité, fournisseur, recherche code/désignation.
- Table :
  - Stock actuel, stock sécu réel, moyenne M-3, prévision M+1, % écart, prix, fournisseur, délai.
  - Badge “Approuvé” sur les pièces approuvées (persistant via `/api/approvals/`).
- Actions :
  - Export Excel (CSV) via backend (`/api/export/previsions.csv`).
  - Approuver (met à jour `Part.approuve` côté backend).

#### Saisie des consommations

- Sélecteur de date (par défaut : aujourd’hui).
- Prévision affichée = `n_ac` du mois suivant.
- Table :
  - Code, prévision n_ac, champ de saisie de la consommation réelle.
- Sauvegarde :
  - `saveConsommations` → `/api/consommations/` avec `[{ code, date, valeur }]`.
  - Toast de confirmation ; rechargement de la date affiche les valeurs enregistrées.

#### Gestion du budget

- Filtres :
  - Recherche code/désignation.
  - Criticité (toutes, urgent, moyen, normal).
  - Budget cible (MAD).
- Table :
  - Code, désignation, type, criticité, quantité (n_ac_2025), PU, total, action (check “sélectionné” + “Voir”).
  - Tri cliquable sur Code, Criticité, Total.
- Pied de tableau :
  - Total global, total sélectionné, reste budget (budget cible – sélection).
  - Couleur verte/rouge selon dépassement.
- Persistance :
  - `loadBudgetState` / `saveBudgetState` pour budget cible + sélection (backend).
  - Export CSV budget via `/api/export/budget.csv`.

#### Administration

- KPIs :
  - Précision des prévisions (ACC±1).
  - Taux de disponibilité (stock/(stock+besoins)).
  - Couverture prévision (stock ≥ prévision).

- Alertes :
  - RUPTURE probable (stock < prévision).
  - Délai long (délai > 60 jours).
  - Filtre par gravité (haute/moyenne/basse).

- Performance (graphique) :
  - Série synthétique sur 6 mois basée sur les ratios réels.

- Activités utilisateurs :
  - Table alimentée par `/api/activities/` (actions système : saisies, approvals, budget).
  - Utile pour auditer ce qui a été fait dans l’app.

---

## 4. Lancement & variables d’environnement

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # si besoin
python manage.py runserver 8000 --noreload
```

Variables utiles :
- `DJANGO_SECRET_KEY` : clé secrète (prod).
- Optionnel (auth simple, actuellement désactivée dans `check_api_auth`) :
  - `ADMIN_API_KEY` : token d’API à exiger sur certains POST.

### Frontend

```bash
cd "webapp/UI for forecasting2"
npm install
# .env.local (optionnel)    venv\Scripts\activate

VITE_API_BASE=http://127.0.0.1:8000

npm run dev -- --host --port 3000
```

Si `VITE_API_BASE` n’est pas défini, le front utilisera les fichiers JSON locaux (assets) au lieu de l’API Django.

---

## 5. Idées d’améliorations futures

- Authentification réelle (sessions/JWT) pour distinguer manager/opérateur et restreindre certaines actions.
- Historique des prévisions sur plusieurs années (Part + modèle versionné).
- Rafraîchissement automatique des prévisions (job/celery/cron).
- Export XLSX avec filtres avancés (critique, fournisseur, budget).
- Tests unitaires & d’intégration pour sécuriser les évolutions.

