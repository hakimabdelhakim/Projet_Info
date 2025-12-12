# 📘 README — Module de Prévisions & Gestion des Stocks

Ce fichier explique **clairement et simplement** le fonctionnement du module dédié aux prévisions, consommations, achats et budget. Il documente toutes les fonctions, types et comportements utilisés par le code fourni.

---

# 🧩 1. Objet général du module
Ce module sert à :
- Charger les données brutes de prévision (depuis l’API ou un fichier local).
- Normaliser des attributs comme la criticité.
- Calculer ou récupérer le stock de sécurité.
- Récupérer ou sauvegarder des consommations réelles.
- Préparer des données d’achats prévisionnels.
- Gérer l’état du budget (cap + articles sélectionnés).
- Charger l’historique des activités.

Il agit donc comme **une couche d’accès aux données** pour l’application ML (prévisions 2025).

---

# 🧱 2. Structure des données : `MLRawItem`
Chaque article contient :
- **code** : identifiant de l’article
- **designation** : nom de l’article
- **criticite** : A / B / C ou urgent / moyen / normal
- **stockActuel** : stock disponible
- **moyenneM3** : moyenne de consommation des 3 derniers mois
- **previsionM1** : prévision automatique du prochain mois
- **ecartPourcent** : écart (%) par rapport à la moyenne
- **prixUnitaire** : prix d’achat
- **fournisseur** : fournisseur principal
- **delai** : délai d’approvisionnement
- **n_ac_2025** : quantité prévue par Machine Learning pour 2025

---

# 🎚 3. Normalisation de la criticité
La fonction **`mapCriticite`** convertit toute valeur en trois niveaux :
- `urgent`
- `moyen`
- `normal`

Elle accepte : A/B/C, urgent, moyen, normal…

---

# 🗄 4. Système de cache interne
Deux caches sont utilisés pour éviter les appels répétés :
- `cache` → données brutes ML
- `stockSecuriteMap` → mapping des stocks de sécurité

---

# 🌐 5. Chargement générique via API ou fallback local
La fonction **`fetchOrNull`** :
- appelle l’API
- renvoie `null` si l’API ne répond pas
- permet un fallback local vers des fichiers JSON

---

# 📥 6. Chargement des données brutes ML : `loadRaw()`
- Tente d’appeler `/api/previsions/`
- Sinon charge `predictions_2025.json`
- Met en cache

---

# 🛡 7. Stock de sécurité : `loadStockSecuriteMap()`
Charge :
- un fichier `stock_securite.json` si disponible
- sinon un dictionnaire vide

Le stock de sécurité final est :
- priorité au mapping du fichier
- sinon valeur `moyenneM3`

---

# 📊 8. Prévisions complètes : `loadPrevisions()`
Cette fonction assemble toutes les données nécessaires :
- informations principales d’un article
- criticité normalisée
- stock de sécurité (mapping ou fallback)
- données ML : prévision, variance, prix, etc.
- état d’approbation : via `/api/approvals/`
- historique (vide pour l’instant)

Renvoie une liste d’objets prêts pour l’interface.

---

# 📝 9. Consommations mensuelles
## `loadConsommations(date?)`
Renvoie :
- la prévision ML (`n_ac_2025` ou `previsionM1`)
- la consommation réelle si déjà enregistrée

## `saveConsommations(payload)`
- Si API active → POST `/api/consommations/`
- Sinon → enregistre localement dans `localStorage`

---

# 🛒 10. Module Achats : `loadPurchases()`
Objet retourné pour chaque article :
- quantité prévue (ML ou donnée)
- prix unitaire
- total (quantité × prix)
- criticité normalisée
- impact (indique si l’article est issu d’une prévision ML)
- champ `selected` (gestion de sélection)

---

# 💰 11. Budget : état + sauvegarde
### `loadBudgetState()`
Charge :
- **budget_cap** (plafond)
- **selected_codes** (articles sélectionnés)

### `saveBudgetState()`
Poste le nouvel état à `/api/budget/state/`.

---

# 📜 12. Historique des activités
### `fetchActivities(filters)`
Filtre par :
- module
- date min/max
- limite

Renvoie une liste d’événements : utilisateur, rôle, action, module, date.

---

# 🧾 13. Résumé simple
Ce module :
- charge et prépare toutes les données ML
- fournit les prévisions complètes (données enrichies)
- gère consommations mensuelles
- prépare les données nécessaires aux achats
- gère l’état du budget
- expose l’historique des actions de l’application

Il sert de **couche API + fallback local + normalisation** pour toute l’application de prévision ML.

---

Si tu veux, je peux aussi générer une version PDF, Markdown séparé, ou commenter chaque fonction ligne par ligne.