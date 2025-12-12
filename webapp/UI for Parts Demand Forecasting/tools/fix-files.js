const fs = require('fs');

function fixAdminPage() {
  const p = 'src/components/AdminPage.tsx';
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  // Replace entire togglePurchase block to ensure correct toast text
  c = c.replace(
    /const handleTogglePurchase = async \(code: string\) => {([\s\S]*?)\n\s*};/,
    `const handleTogglePurchase = async (code: string) => {\n    setPurchases((prev) => prev.map((p) => (p.code === code ? { ...p, selected: !p.selected } : p)));\n    const id = codeToId[code];\n    if (!id) return;\n    try {\n      await apiToggleBudget(id);\n    } catch {\n      toast.error("Échec de la mise à jour");\n    }\n  };`
  );
  // Expand accidentally inlined newlines
  const oldBlock = "  const [selectedAlertFilter, setSelectedAlertFilter] = useState<string>('tous');\\n  const [alerts, setAlerts] = useState<Alert[]>([]);\\n\\n  useEffect(() => {\\n    (async () => {\\n      try {\\n        const res = await apiGetAlerts();\\n        if (Array.isArray(res?.items)) {\\n          const mapped: Alert[] = res.items.map((a: any) => ({\\n            id: String(a.id),\\n            type: a.type,\\n            gravite: a.severity as any,\\n            message: a.message,\\n            details: a.details,\\n            date: a.date,\\n            traite: !!a.processed,\\n          }));\\n          setAlerts(mapped);\\n        }\\n      } catch {}\\n    })();\\n  }, []);";
  const newBlock = [
    "  const [selectedAlertFilter, setSelectedAlertFilter] = useState<string>('tous');",
    "  const [alerts, setAlerts] = useState<Alert[]>([]);",
    "",
    "  useEffect(() => {",
    "    (async () => {",
    "      try {",
    "        const res = await apiGetAlerts();",
    "        if (Array.isArray(res?.items)) {",
    "          const mapped: Alert[] = res.items.map((a: any) => ({",
    "            id: String(a.id),",
    "            type: a.type,",
    "            gravite: a.severity as any,",
    "            message: a.message,",
    "            details: a.details,",
    "            date: a.date,",
    "            traite: !!a.processed,",
    "          }));",
    "          setAlerts(mapped);",
    "        }",
    "      } catch {}",
    "    })();",
    "  }, []);",
  ].join('\n');
  c = c.replace(oldBlock, newBlock);

  // Typo and French accents fixes
  c = c.replace('toast.errorrror', 'toast.error');
  c = c.replace('Param��tres syst��me', 'Paramètres système');
  c = c.replace('GǸnǸration du rapport administratif...', 'Génération du rapport administratif...');
  c = c.replace('exportǸ!', 'exporté!');
  c = c.replace('Le rapport complet a ǸtǸ tǸlǸchargǸ avec succ��s.', 'Le rapport complet a été téléchargé avec succès.');
  c = c.replace('Alerte marquǸe comme traitǸe', 'Alerte marquée comme traitée');
  c = c.replace('�%vǸnements critiques nǸcessitant une attention', 'Événements critiques nécessitant une attention');
  c = c.replace('TraitǸ', 'Traité');

  // Improve optimistic update on Traiter
  c = c.replace(
    /const handleMarkAsRead = async \(alertId: string\) => {([\s\S]*?)};/,
    `const handleMarkAsRead = async (alertId: string) => {\n    const numericId = Number(alertId.replace(/[^0-9]/g, ''));\n    // Optimistic UI update\n    setAlerts(prev => prev.map(a => (a.id === alertId ? { ...a, traite: true } : a)));\n    try {\n      const ok = await apiProcessAlert(numericId);\n      if (!ok) throw new Error('failed');\n      toast.success('Alerte marquée comme traitée');\n    } catch {\n      // Revert on error\n      setAlerts(prev => prev.map(a => (a.id === alertId ? { ...a, traite: false } : a)));\n      toast.error("Échec du traitement de l'alerte");\n    }\n  };`
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('[fix] AdminPage.tsx updated');
}

function fixBudgetPage() {
  const p = 'src/components/GestionBudgetPage.tsx';
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  const before = c;
  c = c.replace('�%chec de la mise �� jour', 'Échec de la mise à jour');
  c = c.replace("�%chec de l'opǸration", "Échec de l'opération");
  c = c.replace('DǸpassement de budget!', 'Dépassement de budget!');
  c = c.replace('DǸficit', 'Déficit');
  c = c.replace('Achats approuvǸs!', 'Achats approuvés!');
  c = c.replace('validǸs', 'validés');
  c = c.replace("�%chec de l'approbation", "Échec de l'approbation");
  c = c.replace('Lignes budgǸtaires', 'Lignes budgétaires');
  c = c.replace('SǸlection et validation', 'Sélection et validation');
  c = c.replace('DǸsignation', 'Désignation');
  c = c.replace('QuantitǸ', 'Quantité');
  c = c.replace('SǸlection', 'Sélection');
  c = c.replace('Apr��s achat', 'Après achat');
  // Fix toggle button label garbling
  c = c.replace(/\{p\.selected \? '.*?' : '.*?'\}/, "{p.selected ? 'Oui' : 'Non'}");
  fs.writeFileSync(p, c, 'utf8');
  if (before !== c) console.log('[fix] GestionBudgetPage.tsx updated');
}

fixAdminPage();
fixBudgetPage();
