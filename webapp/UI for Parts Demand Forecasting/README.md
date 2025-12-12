
  # UI for Parts Demand Forecasting

  This is a code bundle for UI for Parts Demand Forecasting. The original project is available at https://www.figma.com/design/ENODP5h3IiE3HqecoDTWUF/UI-for-Parts-Demand-Forecasting.

  ## Stack

  - Frontend: Vite + React (TypeScript), built to `build/` and served by Django in production
  - Backend: Django 5 + SQLite (demo data seeded)

  ## Local Development

  1) Install frontend deps
  - `npm i`

  2) Run the Django backend
  - `cd backend`
  - `python manage.py migrate`
  - `python manage.py loaddata` (optional if you have fixtures)
  - `python manage.py seed_data` (demo data via management command)
  - `python manage.py runserver`
  - Health check: http://127.0.0.1:8000/api/health

  3) Run the frontend (dev)
  - In another terminal at repo root: `npm run dev`
  - Dev app: http://localhost:3000 (Vite proxy forwards `/api` → `127.0.0.1:8000`)

  4) Production build served by Django
  - At repo root: `npm run build` (outputs to `build/`)
  - Visit http://127.0.0.1:8000 (Django serves `build/index.html` and `/assets/*`)

  ## Demo Accounts (password: `demo`)
  - manager (full access)
  - appro (prévisions only)
  - logistique (saisie consommations)

  ## Notes
  - API base can be overridden via `VITE_API_BASE` at build time for deployments where the backend lives on a different domain.
  - Role-based UI guarding prevents non-managers from opening Budget/Admin tabs.
  
