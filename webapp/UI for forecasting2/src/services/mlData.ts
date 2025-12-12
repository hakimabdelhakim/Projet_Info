/**
 * @fileoverview Module de gestion des données pour les prévisions, consommations, achats et budgets.
 * Gère le chargement des données brutes (MLRawItem) depuis l'API ou un fichier local,
 * et fournit des fonctions pour enrichir, sauvegarder et récupérer diverses vues de ces données.
 */

// --- DÉFINITIONS DE TYPES ---

/**
 * Type représentant la structure des données brutes de prévisions chargées depuis l'API ou un fichier JSON.
 */
type MLRawItem = {
  code: string; // Code unique de l'article.
  designation: string; // Nom ou description de l'article.
  criticite: string; // Indicateur de criticité (souvent 'A', 'B', 'C').
  stockActuel: number; // Quantité actuellement en stock.
  moyenneM3: number; // Consommation moyenne sur les 3 derniers mois.
  previsionM1: number; // Prévision de consommation pour le mois suivant (M+1).
  ecartPourcent: number; // Écart en pourcentage entre la prévision et la moyenne/consommation historique.
  prixUnitaire: number; // Prix d'achat unitaire de l'article.
  fournisseur: string; // Nom du fournisseur principal.
  delai: number; // Délai de livraison en jours.
  n_ac_2025: number; // Prévision d'achat pour 2025 (utilisée pour les commandes).
};

/**
 * Mappe une valeur de criticité brute (string) vers un type standardisé ('urgent', 'moyen', 'normal').
 * Gère les valeurs brutes comme 'A'/'urgent' et 'B'/'moyen'.
 * @param value La valeur de criticité brute (peut être undefined ou null).
 * @returns La criticité standardisée ('urgent', 'moyen', ou 'normal' par défaut).
 */
const mapCriticite = (value: string | undefined): 'urgent' | 'moyen' | 'normal' => {
  const v = (value || '').toString().trim().toLowerCase();
  if (v === 'a' || v === 'urgent') return 'urgent';
  if (v === 'b' || v === 'moyen') return 'moyen';
  return 'normal';
};

// --- CACHES ET CONSTANTES ---


let stockSecuriteMap: Record<string, number> | null = null;
const API_BASE = (import.meta as any).env?.VITE_API_BASE || "";

/**
 * Interface définissant les informations d'identité de l'utilisateur pour les appels API.
 * Utilisé principalement pour l'audit et l'autorisation (en-têtes X-USER et X-ROLE).
 */
export interface ApiIdentity {
  user?: string;
  role?: string;
}

/**
 * Construit l'objet des en-têtes HTTP nécessaires pour les requêtes API en JSON.
 * Inclut l'en-tête 'Content-Type: application/json' et, si fourni, les en-têtes d'identité.
 * @param identity Les informations d'identité (utilisateur et rôle) à inclure dans les en-têtes (X-USER, X-ROLE).
 * @returns Les en-têtes HTTP pour la requête.
 */
function buildJsonHeaders(identity?: ApiIdentity): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (identity?.user) headers["X-USER"] = identity.user;
  if (identity?.role) headers["X-ROLE"] = identity.role;
  return headers;
}

/**
 *C'est la fonction principale qui reçoit le chemin url selon la demande et effectue une requête fetch vers l'API 
 et retourne le corps JSON typé, ou null en cas d'erreur ou si l'API_BASE est vide.
 * Gère les erreurs réseau et les réponses HTTP non-OK de manière silencieuse.
 * Le role de T est dire que cette fonction est générique et peut retourner différents types de données selon l'appel.
 * @template T Le type de données attendu en retour de l'API.
 * @param path Le chemin relatif de l'API (ex: "/api/data/").
 * @returns Une promesse résolue avec les données JSON de type T, ou null.
 */
async function fetchOrNull<T>(path: string): Promise<T | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// --- FONCTIONS DE CHARGEMENT PRINCIPALES ---

let cache: MLRawItem[] | null = null;
let isCacheLocalFallback: boolean | null = null; // null pour indiquer qu'aucun chargement n'a eu lieu
/**
 * Charge les données brutes de prévisions (MLRawItem[]).
 * Utilise un cache en mémoire pour éviter les rechargements multiples.
 * Tente d'abord de récupérer les données depuis l'API (`/api/previsions/`).
 * En cas d'échec ou si l'API_BASE est vide, utilise un fichier JSON de secours local (`predictions_2025.json`).
 * @returns Une promesse résolue avec le tableau des articles bruts.
 */
async function loadRaw(): Promise<{ data: MLRawItem[], isLocalFallback: boolean }> { 
  // 1. VÉRIFIE LE CACHE : Si les données sont présentes, retourne les données AVEC l'état enregistré.
  if (cache && isCacheLocalFallback !== null) {
    return { data: cache, isLocalFallback: isCacheLocalFallback }; 
  } 

  const apiData = await fetchOrNull<MLRawItem[]>("/api/previsions/");
  
  if (apiData) {
    // Cas 1: Succès de l'API
    cache = apiData; 
    isCacheLocalFallback = false; // Mémorise l'état
    return { data: apiData, isLocalFallback: false }; 
  }

  // Cas 2: Échec de l'API -> Fallback local
  const localData = (await import("../assets/predictions_2025.json")).default as MLRawItem[];
  cache = localData; 
  isCacheLocalFallback = true; // Mémorise l'état
  return { data: localData, isLocalFallback: true };
}

/**
 * Charge la carte des stocks de sécurité.
 * Utilise un cache en mémoire.
 * Tente de charger les données depuis un fichier JSON local (`stock_securite.json`).
 * En cas d'échec de chargement (par exemple, fichier non trouvé), retourne une map vide par défaut.
 * @returns Une promesse résolue avec un objet mappant le code de l'article à sa valeur de stock de sécurité.
 */
async function loadStockSecuriteMap(): Promise<Record<string, number>> {
  if (stockSecuriteMap) return stockSecuriteMap;
  try {
    stockSecuriteMap = (await import("../assets/stock_securite.json")).default as Record<string, number>;
  } catch {
    stockSecuriteMap = {};
  }
  return stockSecuriteMap;
}

/**
 * La fonction qui charge et enrichit les données de prévisions complètes pour l'affichage.
 * export veut dire qu'elle est accessible depuis d'autres modules.
 * Promise veut dire qu'elle retourne toujours une forme d'objets qu'on appelle promesse(ici la promesse
 * est un tableau qui contient plusieurs dictionnaires ,chaque dictionnaire est une pièce).
 * Combine les données brutes, la carte des stocks de sécurité, et les statuts d'approbation depuis l'API.
 * Calcule le stock de sécurité (priorité à la valeur mappée, sinon utilise la moyenne M-3) et la criticité standardisée.
 * @returns Une promesse résolue avec un tableau d'objets de prévisions enrichis et formatés.
 */
export async function loadPrevisions(): Promise<{
  data: {
    code: string;
    designation: string;
    type: string;
    criticite: string;
    stockActuel: number;
    moyenneM3: number;
    stockSecurite: number;
    previsionM1: number;
    ecartPourcent: number;
    prixUnitaire: number;
    fournisseur: string;
    delai: number;
    approved?: boolean;
    historique: { mois: string; valeur: number }[];
  }[]; // Le tableau des objets enrichis
  isLocalFallback: boolean; // <-- NOUVEAU : Le flag de source
}> {
  
  // CHANGEMENT : Utilise la déstructuration pour récupérer les données brutes (raw) et le flag (isLocalFallback)
  const [{ data: raw, isLocalFallback }, stockMap, approved] = await Promise.all([ 
    loadRaw(),
    loadStockSecuriteMap(),
    fetchOrNull<{ approved: string[] }>("/api/approvals/"),
  ]);
  
  const approvedSet = new Set(approved?.approved || []);

 //La méthode map prend un tableau en entrée (raw ici) et retourne un nouveau tableau de la même taille,
 //où chaque élément de l'original a été transformé en un nouvel objet enrichi.*
  const enrichedData = raw.map((r) => ({
    code: r.code,
    designation: r.designation,
    type: "Accouplement",
    criticite: mapCriticite(r.criticite),
    stockActuel: r.stockActuel,
    moyenneM3: r.moyenneM3,
    // Stock de sécurité prioritaire depuis le mapping, sinon fallback sur moyenne M-3
    stockSecurite: stockMap[r.code] ?? r.moyenneM3,
    previsionM1: r.previsionM1,
    ecartPourcent: r.ecartPourcent,
    prixUnitaire: r.prixUnitaire,
    fournisseur: r.fournisseur,
    delai: r.delai,
    historique: [],
    approved: approvedSet.has(r.code),
  }));
  return {
    data: enrichedData,
    isLocalFallback: isLocalFallback
  };
}

/**
 * Charge les données de consommation pour une date spécifique.
 * Combine les prévisions de commande (n_ac_2025 ou previsionM1) avec les consommations réelles déjà enregistrées via l'API.
 * Utilisé pour l'interface de saisie des consommations réelles.
 * @param date La date pour laquelle charger les consommations réelles (optionnel).
 * @returns Une promesse résolue avec un tableau d'objets contenant le code, la prévision et la consommation réelle enregistrée (ou null).
 */
export async function loadConsommations(date?: string): Promise<{ 
  data: { 
    code: string; 
    prevision: number; 
    consommationReelle: number | null 
  }[]; // Le tableau des données de consommation
  isLocalFallback: boolean; // L'indicateur de source des données
}> {
  // CHANGEMENT 1: Déstructuration du résultat de loadRaw() raw (était avant) devient { data: raw, isLocalFallback }
  const { data: raw, isLocalFallback } = await loadRaw();

  const query = date ? `?date=${date}` : "";
  const apiExisting = await fetchOrNull<
    { code: string; date: string; valeur: number }[]
  >("/api/consommations/" + query);
  const existingByCode = new Map<string, number>();
  (apiExisting || []).forEach((r) => existingByCode.set(r.code, r.valeur));

  const consommationData = raw.map((r) => ({ // Utilise maintenant 'raw' qui est le tableau de données
    code: r.code,
    // Prévision pour la saisie : quantité à commander/prévoir pour le mois suivant (n_ac_2025 si dispo, sinon prévisionM1).
    prevision: r.n_ac_2025 ?? r.previsionM1,
    consommationReelle: existingByCode.get(r.code) ?? null,
  }));

  // CHANGEMENT 2: Retourne un objet contenant le tableau de données ET l'indicateur de source
  return {
    data: consommationData,
    isLocalFallback: isLocalFallback
  };
}

/**
 * Sauvegarde les données de consommation réelle (valeur) pour chaque article et chaque date spécifiée.
 * Envoie une requête POST à l'API (`/api/consommations/`).
 * Si l'API_BASE est vide, utilise un mécanisme de secours via `localStorage` pour persister les données localement (mode hors ligne/développement).
 * @param payload Le tableau des enregistrements de consommation à sauvegarder (code, date, valeur).
 * @param identity Les informations d'identité pour l'audit API (optionnel).
 */
export async function saveConsommations(
  payload: { code: string; date: string; valeur: number | null }[],
  identity?: ApiIdentity
) {
  if (!API_BASE) {
    // fallback localStorage si pas d'API
    const raw = localStorage.getItem('consommations_by_date');
    const parsed: Record<string, Record<string, number>> = raw ? JSON.parse(raw) : {};
    payload.forEach((item) => {
      if (item.valeur === null || Number.isNaN(item.valeur)) return;
      parsed[item.date] = parsed[item.date] || {};
      parsed[item.date][item.code] = item.valeur;
    });
    localStorage.setItem('consommations_by_date', JSON.stringify(parsed));
    return;
  }
  await fetch(`${API_BASE}/api/consommations/`, {
    method: "POST",
    headers: buildJsonHeaders(identity),
    body: JSON.stringify(payload),
  });
}

/**
 * Charge les données d'achats pour l'interface de planification des commandes.
 * Tente d'abord de charger les données depuis l'API (`/api/purchases/`).
 * En cas d'échec ou de données vides de l'API, utilise les données brutes (`loadRaw()`).
 * Calcule la quantité à commander (n_ac_2025 ou quantité) et le coût total.
 * @returns Une promesse résolue avec un tableau d'objets représentant les achats potentiels.
 */
export async function loadPurchases(): Promise<{
  data: {
    id: number;
    code: string;
    designation: string;
    type: string;
    criticite: string;
    quantite: number;
    prixUnitaire: number;
    total: number;
    impact: string;
    selected: boolean;
  }[]; // Le tableau des objets d'achats
  isLocalFallback: boolean; // <-- NOUVEAU : Le flag de source
}> {
  
  // CHANGEMENT : Déstructuration de loadRaw pour capturer le tableau de données (raw) et le flag (isLocalFallback)
  const [{ data: raw, isLocalFallback }, apiPurch] = await Promise.all([
    loadRaw(),
    fetchOrNull<any[]>("/api/purchases/"),
  ]);

  // La logique de détermination de la source des données (API Purchases ou données brutes) reste la même.
  const data = apiPurch && Array.isArray(apiPurch) && apiPurch.length > 0 ? apiPurch : raw;

  const purchasesData = data.map((r: any, idx: number) => {
    const qty = Math.max(0, r.n_ac_2025 ?? r.quantite ?? 0);
    const pu = r.prixUnitaire ?? r.prix_uni ?? 0;
    const crit = (r.criticite ?? r.criticite?.toString() ?? "normal") as string;
    const total = qty * pu;
    return {
      id: idx + 1,
      code: r.code,
      designation: r.designation,
      type: "Accouplement",
      criticite: mapCriticite(crit),
      quantite: qty,
      prixUnitaire: pu,
      total,
      impact: qty > 0 ? "Prévision ML (n_ac_2025)" : "Aucune commande",
      selected: false,
    };
  });

  // CHANGEMENT : Retourne l'objet avec le tableau d'achats ET l'indicateur de source
  return {
    data: purchasesData,
    isLocalFallback: isLocalFallback
  };
}

/**
 * Charge l'état actuel du budget depuis l'API.
 * Récupère le plafond budgétaire (`budget_cap`) et la liste des codes d'articles sélectionnés (`selected_codes`).
 * @returns Une promesse résolue avec l'objet d'état du budget.
 */
export async function loadBudgetState(): Promise<{ budget_cap: number | null; selected_codes: string[] }> {
  const data = await fetchOrNull<{ budget_cap: number | null; selected_codes: string[] }>("/api/budget/state/");
  return data ?? { budget_cap: null, selected_codes: [] };
}

/**
 * Sauvegarde l'état du budget (plafond budgétaire et articles sélectionnés) sur l'API.
 * Envoie une requête POST à l'API (`/api/budget/state/`).
 * @param budget_cap La valeur du plafond budgétaire à sauvegarder (peut être null).
 * @param selected_codes Le tableau des codes d'articles sélectionnés à sauvegarder.
 * @param identity Les informations d'identité pour l'audit API (optionnel).
 */
export async function saveBudgetState(
  budget_cap: number | null,
  selected_codes: string[],
  identity?: ApiIdentity
) {
  if (!API_BASE) return;
  await fetch(`${API_BASE}/api/budget/state/`, {
    method: "POST",
    headers: buildJsonHeaders(identity),
    body: JSON.stringify({ budget_cap, selected_codes }),
  });
}

/**
 * Récupère le journal d'activités (logs) depuis l'API.
 * Permet de filtrer les résultats par module, par période (from/to) et de limiter le nombre de résultats.
 * @param filters Un objet contenant les critères de filtrage (module, from, to, limit).
 * @returns Une promesse résolue avec un tableau des enregistrements d'activité.
 */
export async function fetchActivities(
  filters?: ActivitiesFilters
): Promise<{ utilisateur: string; role: string; action: string; module: string; details?: string; date: string }[]> {
  const params: string[] = [];
  if (filters?.module) params.push(`module=${encodeURIComponent(filters.module)}`);
  if (filters?.from) params.push(`from=${encodeURIComponent(filters.from)}`);
  if (filters?.to) params.push(`to=${encodeURIComponent(filters.to)}`);
  if (typeof filters?.limit === "number") params.push(`limit=${filters.limit}`);
  const query = params.length ? `?${params.join("&")}` : "";

  const data = await fetchOrNull<any[]>(`/api/activities/${query}`);
  return data ?? [];
}

/**
 * Interface définissant les critères de filtrage pour le journal d'activités.
 */
export interface ActivitiesFilters {
  module?: string;
  from?: string;
  to?: string;
  limit?: number;
}