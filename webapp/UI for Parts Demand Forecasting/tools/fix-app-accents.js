const fs = require('fs');

const p = 'src/App.tsx';
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  const before = c;
  const patterns = [
    [/Syst.me de Pr.vision/g, 'Système de Prévision'],
    [/Syst.me/g, 'Système'],
    [/Pr.visions/g, 'Prévisions'],
    [/Pr.v\./g, 'Prév.'],
    [/Connect./g, 'Connecté'],
    [/Acc.s/g, 'Accès'],
    [/refus./g, 'refusé'],
    [/D.connexion/g, 'Déconnexion'],
    [/donn.es/g, 'données'],
    [/budg.taires/g, 'budgétaires'],
  ];
  c = c.replace(/Ǹ/g, 'é');
  for (const [rx, val] of patterns) c = c.replace(rx, val);
  if (c !== before) {
    fs.writeFileSync(p, c, 'utf8');
    console.log('[fix] App.tsx accents updated');
  }
}
