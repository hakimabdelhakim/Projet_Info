import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./PageHeader";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { loadConsommations, saveConsommations } from "../services/mlData";

type ConsommationItem = { code: string; prevision: number; consommationReelle: number | null };

export function SaisieConsommationsPage() {
const [rows, setRows] = useState<ConsommationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { user } = useAuth();
  const [consIsLocal, setConsIsLocal] = useState(false);

useEffect(() => {
    const loadData = async () => {
      try {
        const result = await loadConsommations(selectedDate);
        // result = { data: [...], isLocalFallback: boolean }

        setRows(result.data);

        const isLocal = result.isLocalFallback;
        setConsIsLocal(isLocal);

        if (isLocal) {
          toast.warning("⚠️ Les consommations proviennent d'une source locale !");
        } else {
          toast.success("✅ Données consommations fraîches (source distante)");
        }
      } catch {
        setError("Erreur de chargement des consommations");
      } finally {
        setLoading(false);
      }  };

    loadData();
   }, [selectedDate]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const nextMonthLabel = useMemo(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date(now);
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  }, [selectedDate, now]);

  const update = (code: string, value: string) => {
    const n = value.trim() === "" ? null : Number(value);
    setRows((prev) =>
      prev.map((r) => (r.code === code ? { ...r, consommationReelle: Number.isNaN(n as any) ? r.consommationReelle : n } : r))
    );
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveConsommations(
        rows.map((r) => ({ code: r.code, date: selectedDate, valeur: r.consommationReelle })),
        user ? { user: user.nom, role: user.role } : undefined
      );
      toast.success("Consommations enregistrées", { description: `Saisie du ${selectedDate}` });
    } catch (e: any) {
      toast.error(e?.message || "Échec d'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-neutral-700">Chargement des consommations...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title="Saisie des consommations"
        description="Comparer les prévisions et saisir les consommations réelles"
        breadcrumbs={[
          { label: "Accueil", href: "#" },
          { label: "Saisie" },
        ]}
      />

      <Card className="shadow-sm border-neutral-200">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-2">
            <div className="text-small text-neutral-700 flex items-center gap-2">
              <label className="text-xs text-neutral-600">Date :</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-neutral-200 rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="text-small text-neutral-700">
              Prévision affichée : <span className="font-semibold">n_ac mois prochain ({nextMonthLabel})</span>
            </div>
            <div className="text-small text-neutral-700">
              Aujourd'hui :
              <span className="font-semibold">
                {" "}
                {now.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}{" "}
                {now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-left">Code</TableHead>
                  <TableHead className="text-left">Prévision (n_ac {nextMonthLabel})</TableHead>
                  <TableHead className="text-left">Consommation réelle (saisie)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.code}>
                    <TableCell className="font-medium">{r.code}</TableCell>
                    <TableCell>{r.prevision.toFixed(2)}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={r.consommationReelle ?? ""}
                        onChange={(e) => update(r.code, e.target.value)}
                        className="border border-neutral-200 rounded px-2 py-1 w-32"
                        min="0"
                        step="0.01"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-neutral-200 flex justify-end">
            <Button onClick={save} disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
