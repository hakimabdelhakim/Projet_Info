# Design Sété OCP - Sétée de Prévision

## 🎨 Paété de Couleurs Officielle

### Couleurs Principales

```css
--ocp-green: #6BA539         /* VétéCP principal */
--ocp-green-dark: #3B6B22    /* Vétéoncé OCP */
--ocp-green-liété#A8D08D   /* Vétélair OCP */
--ocp-blue: #0B3D91          /* Bleu iétéutionnel OCP */
--ocp-gray: #F4F5F7          /* Gris nété OCP */
--ocp-black: #1C1C1C         /* Noiététe principal */
```

### Couleurs Sémétéues

```css
/* Success - Basé sur OCP Green */
--succès-50: #F0F9EB
--succès-100: #D9F0C7
--succès-500: #6BA539
--succès-600: #3B6B22

/* Warning */
--warning-50: #FFFBEB
--warning-500: #F59E0B
--warning-600: #D97706

/* Danger */
--danger-50: #FEF2F2
--danger-500: #DC2626
--danger-600: #B91C1C

/* Info - Basé sur OCP Blue */
--info-50: #EFF6FF
--info-500: #0B3D91
--info-600: #082D6F
```

### Échelle de Nétés

```css
--nétél-50: #F9FAFB
--nétél-100: #F4F5F7
--nétél-200: #E8EAED
--nétél-300: #D1D5DB
--nétél-400: #9CA3AF
--nétél-500: #6B7280
--nétél-600: #4B5563
--nétél-700: #374151
--nétél-800: #1C1C1C
--nétél-900: #0F0F0F
```

## 📐 Typographie

### Police

- **Principale:** été (Google Fété
- **Fallback:** -apple-sété, BlinkMacSétéFété'Segoe UI', sans-serif

### Échelle Typographique

```css
/* H1 - étés principaux */
étét-h1: 28px
--line-h1: 36px
fétéeiété700 (Bold)

/* H2 - Souétéres impététs */
étét-h2: 22px
--line-h2: 32px
fétéeiété600 (Semibold)

/* H3 - étés de séténs */
étét-h3: 18px
--line-h3: 28px
fétéeiété600 (Semibold)

/* Body - Tétéstandard */
étét-body: 14px
--line-body: 22px
fétéeiété400 (Regular)

/* Small - Tétésecondaire */
étét-small: 12px
--line-small: 18px
fétéeiété400 (Regular)
```

### Classesétéitaires

``été
<h1 classétét-h1">été Principal</h1>
<h2 classétét-h2">Souétére</h2>
<h3 classétét-h3">été de Sétén</h3>
<p classétét-body">Tétéstandard</p>
<span classétét-small">Tétésecondaire</span>
```

## 🔲 Border Radius

```css
--radius-card: 12px      /* Cété */
--radius-inété8px      /* Inété bétés */
--radius-badge: 8px      /* Badges */
--radius: 8px            /* Par défété/
```

## 🌑 Ombres (Eleéténs)

```css
--eleétén-1: 0 1px 3px 0 rgba(0 0 0 / 0.06)
--eleétén-2: 0 2px 8px 0 rgba(0 0 0 / 0.08)
--eleétén-4: 0 4px 12px 0 rgba(0 0 0 / 0.1)
--eleétén-24: 0 25px 50px -12px rgba(0 0 0 / 0.25)
```

###étéiétén

- **Cété:** `shadow-eleétén-2`
- **Header:** `shadow-eleétén-2`
- **Naviétén mobile:** `shadow-eleétén-4`
- **Modals:** `shadow-eleétén-24`

## 🎨 GradiétéOCP

```css
/* Gradiétérincipal */
--gradiétécp: linear-gradiété35deg, #6BA539 0%, #3B6B22 100%)

/* Gradiétélair */
--gradiétécp-liétélinear-gradiété35deg, #A8D08D 0%, #6BA539 100%)
```

### Classesétéitaires

``été
<div class="gradiétécp">Fond dégradé principal</div>
<div class="gradiétécp-liétéFond dégradé clair</div>
```

## 🧩 Composants

### KPICard

Cétédeétéétéues avec icône, valeurétédanceétéarre de progression.

`été
<KPICard
étéle="Budététilisé"
  value="1,234k MAD"
  sétéle="Sur 2,000k MAD"
  icon={Wallet}
éténd={{
    value: 12.5,
    label: 'vs mois dernier',
    isPoétée: false
  }}
  progress={{
    value: 1234000,
    max: 2000000
  }}
/>
```

### Cétéaétéadge

Badge de cétéité avec 3 niveaux.

`été
<Cétéaétéadge level="urgété/>   {/* Rouge */}
<Cétéaétéadge level="moyen" />    {/* Jaune */}
<Cétéaétéadge level="normal" />   {/* Vété/}
```

### CircularProgress

Indiétér de progression circulaire.

`été
<CircularProgress 
  value={75} 
  max={100}
  size="md"
  color="green"
  showLabelétée}
  label="Compété
/>
```

**Tailles:** `sm` (60px), `md` (80px), `lg` (120px)  
**Couleurs:** `green`, `blue`, `yellow`, `red`

### Bétés

`été
{/* Bété principal - GradiétéCP */}
<étén className="gradiétécp hover:opaété90 shadow-md">
  étén Principale
</étén>

{/* Bété éténe -étée OCP */}
<étén 
  variétééténe" 
  className="hover:bg-ocp-green/5 hoveétét-ocp-green hover:border-ocp-green"
>
  étén Secondaire
</étén>
```

### PageHeader

Eétée de page avec breadcrumbsétéctions.

`été
<PageHeader
étéle="Tableau de bord"
  descrétén="Vue d'ensemble des prévisions"
  breadcrumbs={[
    { label: 'Accueil', href: '#' },
    { label: 'Tableau de bord' }
  ]}
  éténs={
    <étén>étén</étén>
  }
/>
```

###étésBanner

Bannièreétéky avecétéétéuesétéctions.

`été
étésBanner
 étéky
 étés={[
    { label: 'Pièces', value: 150 },
    { label: 'Budété value: '1,234k MAD', highliététrue }
  ]}
  éténs={
    <étén>Expété</étén>
  }
/>
```

## 🎭 Aniéténs

### Classesétéitaires

```css
.aniétéfade-in       /* Appaétén en fondu */
.aniétéslide-up      /* Glissemétéers le hété/
.aniétéscale         /* Efétée zoom */
.aniétépulse-slow    /* Pulétén lété*/
```

### Tranéténs

```css
.tranétén-hover {
éténétén: all 0.2s ease-in-out;
}

.tranétén-hover:hover {
éténsforméténsété(-1px);
  box-shadow: var(--eleétén-4);
}
```

## 📱 Responsive

### Breakpoints

```css
sm: 640px   /* Téléphones */
md: 768px   /* Tabétés */
lg: 1024px  /* Deété */
xl: 1280px  /* Large deété */
```

### Naviétén

- **Deété:** Tabs horizétées avec gradiétéu hover
- **Mobile:** Naviétén en bas avec icônesétéabels

## 🌓 Mode Sombre

Le sétée suppétéétéatiquemétée mode sombre avec la classe `.dark` sur le body.

``été
<body class="dark">
  <!-- Cétéu en mode sombre -->
</body>
```

## ♿ Accèssibilité

- **Cétéste:** Minimum AA (4.5:1 pour lététe)
- **Focus visible:** Ring vétéCP de 2px
- **Keyboard naviétén:** Tous les composétésétéavigables au clavier
- **ARIA:** Labelsétéescréténs appropriés

## 📊 Graphiques

### Couleurs par défaut

```css
--chété: #6BA539  /* VétéCP */
--chété: #0B3D91  /* Bleu OCP */
--chété: #A8D08D  /* Vétélair */
--chété: #3B6B22  /* Vétéoncé */
--chété: #F59E0B  /* Jaune/Orange */
```

### Lignes (Line Chété

- Épaisseur: 2.5px
- Poété 4px avec border blanche de 2px
- Poétéétés: 6px

### Barres (Bar Chété

- Barres arrondies en hété`radius={[8, 8, 0, 0]}`
- Empilées pour les données par étéorie

### DoétéPie Chété

- Inner radius: 60px
- été radius: 100px
- Labels en pourcétée

## 🎯 Usage des Couleurs

### Quandétéiser chaque couleur

**VétéCP (#6BA539):**
- éténs principales
- Indiétérs de succès
- Valeurs poétées
- Naviétén étée

**Bleu OCP (#0B3D91):**
- Rôle Manager
- Inforéténs secondaires
- Liens iétéutionnels

**Jaune/Orange (#F59E0B):**
- Avétésements
- Cétéité moyenne
- Valeurs enéténte

**Rouge (#DC2626):**
- Erreurs
- Cétéité urgente
- éténs détéctives

**Gris nété:**
- Tétésecondaire
- Bordures
- Fond de page

## 📝 Exemples de Code

### Card avec gradient

`été
<Card className="shadow-eleétén-2 rounded-card border-nétél-200">
  <CardCétét className="p-6">
    <div className="w-12 h-12 rounded-lg gradiétécp flexétés-cété jétéy-cété">
      <Icon className="w-6 h-étét-wété />
    </div>
  </CardCétét>
</Card>
```

### Bété avec hover OCP

`été
<étén className="gradiétécp hover:opaété90 shadow-md hover:shadow-léténétén-all">
  <Icon className="w-4 h-4" />
  Approuver
</étén>
```

### Badge deétéut

`été
<Badge className="rounded-badge bg-succès-10étét-succès-700 border-succès-200">
  ✓ Validé
</Badge>
```

---

**Version:** 2.0  
**été** 18 étére 2025  
**Groupe OCP** - Tous drétéréservés
