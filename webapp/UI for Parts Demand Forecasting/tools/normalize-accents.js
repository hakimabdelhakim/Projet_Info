const fs = require('fs');
const path = require('path');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function normalizeText(txt) {
  // Replace known garbled sequences first
  const pairs = [
    [/Syst..me de Pr..vision/g, 'Système de Prévision'],
    [/Syst..me/g, 'Système'],
    [/Pr..visions/g, 'Prévisions'],
    [/Pr..v\./g, 'Prév.'],
    [/Connect./g, 'Connecté'],
    [/Acc.s/g, 'Accès'],
    [/refus./g, 'refusé'],
    [/D..connexion/g, 'Déconnexion'],
    [/donn..es/g, 'données'],
    [/budg..taires/g, 'budgétaires'],
    [/S..lection/g, 'Sélection'],
    [/D..signation/g, 'Désignation'],
    [/Quantit../g, 'Quantité'],
    [/Apr..s/g, 'Après'],
    [/..chec/g, 'Échec'],
    [/G..n..ration/g, 'Génération'],
    [/export../g, 'exporté'],
    // Avoid generic patterns that could affect code identifiers like createRoot/import
    [/t..l..charg../g, 'téléchargé'],
    [/succ..s/g, 'succès'],
    [/Ao. t/g, 'Août'],
    [/Cha. ne/g, 'Chaîne'],
    [/Magn. tique/g, 'Magnétique'],
    [/pr. vision/g, 'prévision'],
  ];
  let out = txt.replace(/Ǹ/g, 'é');
  for (const [rx, val] of pairs) out = out.replace(rx, val);
  // Clean any isolated Replacement Character occurrences in common UI words
  out = out.replace(/�/g, '');
  return out;
}

function run() {
  const root = path.join(process.cwd(), 'src');
  if (!fs.existsSync(root)) return;
  const files = walk(root).filter(f => /\.(tsx?|css|md)$/i.test(f));
  let changed = 0;
  for (const f of files) {
    try {
      let txt = fs.readFileSync(f, 'utf8');
      const norm = normalizeText(txt);
      if (norm !== txt) {
        fs.writeFileSync(f, norm, 'utf8');
        console.log('[normalized]', f);
        changed++;
      }
    } catch (_) {}
  }
  if (!changed) console.log('[normalize] no changes');
}

run();
