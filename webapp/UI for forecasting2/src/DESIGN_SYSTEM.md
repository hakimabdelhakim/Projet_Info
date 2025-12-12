# Design System OCP - Système de Prévision

## 🎨 Palette de Couleurs Officielle

### Couleurs Principales

```css
--ocp-green: #6BA539         /* Vert OCP principal */
--ocp-green-dark: #3B6B22    /* Vert foncé OCP */
--ocp-green-light: #A8D08D   /* Vert clair OCP */
--ocp-blue: #0B3D91          /* Bleu institutionnel OCP */
--ocp-gray: #F4F5F7          /* Gris neutre OCP */
--ocp-black: #1C1C1C         /* Noir texte principal */
```

### Couleurs Sémantiques

```css
/* Success - Basé sur OCP Green */
--success-50: #F0F9EB
--success-100: #D9F0C7
--success-500: #6BA539
--success-600: #3B6B22

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

### Échelle de Neutres

```css
--neutral-50: #F9FAFB
--neutral-100: #F4F5F7
--neutral-200: #E8EAED
--neutral-300: #D1D5DB
--neutral-400: #9CA3AF
--neutral-500: #6B7280
--neutral-600: #4B5563
--neutral-700: #374151
--neutral-800: #1C1C1C
--neutral-900: #0F0F0F
```

## 📐 Typographie

### Police

- **Principale:** Inter (Google Fonts)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Échelle Typographique

```css
/* H1 - Titres principaux */
--text-h1: 28px
--line-h1: 36px
font-weight: 700 (Bold)

/* H2 - Sous-titres importants */
--text-h2: 22px
--line-h2: 32px
font-weight: 600 (Semibold)

/* H3 - Titres de sections */
--text-h3: 18px
--line-h3: 28px
font-weight: 600 (Semibold)

/* Body - Texte standard */
--text-body: 14px
--line-body: 22px
font-weight: 400 (Regular)

/* Small - Texte secondaire */
--text-small: 12px
--line-small: 18px
font-weight: 400 (Regular)
```

### Classes Utilitaires

```html
<h1 class="text-h1">Titre Principal</h1>
<h2 class="text-h2">Sous-titre</h2>
<h3 class="text-h3">Titre de Section</h3>
<p class="text-body">Texte standard</p>
<span class="text-small">Texte secondaire</span>
```

## 🔲 Border Radius

```css
--radius-card: 12px      /* Cartes */
--radius-input: 8px      /* Inputs, boutons */
--radius-badge: 8px      /* Badges */
--radius: 8px            /* Par défaut */
```

## 🌑 Ombres (Elevations)

```css
--elevation-1: 0 1px 3px 0 rgba(0 0 0 / 0.06)
--elevation-2: 0 2px 8px 0 rgba(0 0 0 / 0.08)
--elevation-4: 0 4px 12px 0 rgba(0 0 0 / 0.1)
--elevation-24: 0 25px 50px -12px rgba(0 0 0 / 0.25)
```

### Utilisation

- **Cartes:** `shadow-elevation-2`
- **Header:** `shadow-elevation-2`
- **Navigation mobile:** `shadow-elevation-4`
- **Modals:** `shadow-elevation-24`

## 🎨 Gradients OCP

```css
/* Gradient principal */
--gradient-ocp: linear-gradient(135deg, #6BA539 0%, #3B6B22 100%)

/* Gradient clair */
--gradient-ocp-light: linear-gradient(135deg, #A8D08D 0%, #6BA539 100%)
```

### Classes Utilitaires

```html
<div class="gradient-ocp">Fond dégradé principal</div>
<div class="gradient-ocp-light">Fond dégradé clair</div>
```

## 🧩 Composants

### KPICard

Carte de statistiques avec icône, valeur, tendance et barre de progression.

```tsx
<KPICard
  title="Budget utilisé"
  value="1,234k MAD"
  subtitle="Sur 2,000k MAD"
  icon={Wallet}
  trend={{
    value: 12.5,
    label: 'vs mois dernier',
    isPositive: false
  }}
  progress={{
    value: 1234000,
    max: 2000000
  }}
/>
```

### CriticalityBadge

Badge de criticité avec 3 niveaux.

```tsx
<CriticalityBadge level="urgent" />   {/* Rouge */}
<CriticalityBadge level="moyen" />    {/* Jaune */}
<CriticalityBadge level="normal" />   {/* Vert */}
```

### CircularProgress

Indicateur de progression circulaire.

```tsx
<CircularProgress 
  value={75} 
  max={100}
  size="md"
  color="green"
  showLabel={true}
  label="Complété"
/>
```

**Tailles:** `sm` (60px), `md` (80px), `lg` (120px)  
**Couleurs:** `green`, `blue`, `yellow`, `red`

### Boutons

```tsx
{/* Bouton principal - Gradient OCP */}
<Button className="gradient-ocp hover:opacity-90 shadow-md">
  Action Principale
</Button>

{/* Bouton outline - Style OCP */}
<Button 
  variant="outline" 
  className="hover:bg-ocp-green/5 hover:text-ocp-green hover:border-ocp-green"
>
  Action Secondaire
</Button>
```

### PageHeader

En-tête de page avec breadcrumbs et actions.

```tsx
<PageHeader
  title="Tableau de bord"
  description="Vue d'ensemble des prévisions"
  breadcrumbs={[
    { label: 'Accueil', href: '#' },
    { label: 'Tableau de bord' }
  ]}
  actions={
    <Button>Action</Button>
  }
/>
```

### StatsBanner

Bannière sticky avec statistiques et actions.

```tsx
<StatsBanner
  sticky
  stats={[
    { label: 'Pièces', value: 150 },
    { label: 'Budget', value: '1,234k MAD', highlight: true }
  ]}
  actions={
    <Button>Exporter</Button>
  }
/>
```

## 🎭 Animations

### Classes Utilitaires

```css
.animate-fade-in       /* Apparition en fondu */
.animate-slide-up      /* Glissement vers le haut */
.animate-scale         /* Effet de zoom */
.animate-pulse-slow    /* Pulsation lente */
```

### Transitions

```css
.transition-hover {
  transition: all 0.2s ease-in-out;
}

.transition-hover:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-4);
}
```

## 📱 Responsive

### Breakpoints

```css
sm: 640px   /* Téléphones */
md: 768px   /* Tablettes */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Navigation

- **Desktop:** Tabs horizontales avec gradient au hover
- **Mobile:** Navigation en bas avec icônes et labels

## 🌓 Mode Sombre

Le système supporte automatiquement le mode sombre avec la classe `.dark` sur le body.

```html
<body class="dark">
  <!-- Contenu en mode sombre -->
</body>
```

## ♿ Accessibilité

- **Contraste:** Minimum AA (4.5:1 pour le texte)
- **Focus visible:** Ring vert OCP de 2px
- **Keyboard navigation:** Tous les composants sont navigables au clavier
- **ARIA:** Labels et descriptions appropriés

## 📊 Graphiques

### Couleurs par défaut

```css
--chart-1: #6BA539  /* Vert OCP */
--chart-2: #0B3D91  /* Bleu OCP */
--chart-3: #A8D08D  /* Vert clair */
--chart-4: #3B6B22  /* Vert foncé */
--chart-5: #F59E0B  /* Jaune/Orange */
```

### Lignes (Line Charts)

- Épaisseur: 2.5px
- Points: 4px avec border blanche de 2px
- Points actifs: 6px

### Barres (Bar Charts)

- Barres arrondies en haut: `radius={[8, 8, 0, 0]}`
- Empilées pour les données par catégorie

### Donut (Pie Charts)

- Inner radius: 60px
- Outer radius: 100px
- Labels en pourcentage

## 🎯 Usage des Couleurs

### Quand utiliser chaque couleur

**Vert OCP (#6BA539):**
- Actions principales
- Indicateurs de succès
- Valeurs positives
- Navigation active

**Bleu OCP (#0B3D91):**
- Rôle Manager
- Informations secondaires
- Liens institutionnels

**Jaune/Orange (#F59E0B):**
- Avertissements
- Criticité moyenne
- Valeurs en attente

**Rouge (#DC2626):**
- Erreurs
- Criticité urgente
- Actions destructives

**Gris neutre:**
- Texte secondaire
- Bordures
- Fond de page

## 📝 Exemples de Code

### Card avec gradient

```tsx
<Card className="shadow-elevation-2 rounded-card border-neutral-200">
  <CardContent className="p-6">
    <div className="w-12 h-12 rounded-lg gradient-ocp flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </CardContent>
</Card>
```

### Bouton avec hover OCP

```tsx
<Button className="gradient-ocp hover:opacity-90 shadow-md hover:shadow-lg transition-all">
  <Icon className="w-4 h-4" />
  Approuver
</Button>
```

### Badge de statut

```tsx
<Badge className="rounded-badge bg-success-100 text-success-700 border-success-200">
  ✓ Validé
</Badge>
```

---

**Version:** 2.0  
**Date:** 18 Octobre 2025  
**Groupe OCP** - Tous droits réservés
