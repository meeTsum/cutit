# 🎬 Cutit - Slices of Video, Instantly.

> **Transformez vos vidéos longues en clips viraux.**
> Cutit est une application gratuite, ultra-rapide et intuitive conçue pour découper instantanément vos longues vidéos en segments parfaits (15s, 30s, 60s), prêts à être partagés sur vos réseaux préférés, sans perte de qualité.

---

## 🚀 Fonctionnalités principales

- **Découpe chirurgicale en 1 Clic** : Importez, sélectionnez la durée idéale et laissez l'application segmenter automatiquement vos vidéos.
- **Zéro Perte de Qualité** : Pas de compression agressive. Vos vidéos conservent 100% de leur netteté d'origine (Full HD & 4K).
- **Partage instantané** : Exportation propre et rapide pour vos statuts WhatsApp, TikTok, Instagram Reels et YouTube Shorts.
- **Respect de la vie privée** : Vos vidéos restent privées et sont traitées localement sur votre appareil.

---

## 🛠️ Stack Technique & Architecture Moderne

Le projet est construit avec des technologies de pointe pour garantir des performances optimales et une excellente maintenabilité :

* **Framework** : **Angular 21** (architecture moderne 100% Standalone, Signals natifs pour la gestion de l'état réactif).
* **Styling (CSS)** : **Tailwind CSS v4.0** (mise en page moderne et responsive avec support natif du Mode Sombre).
* **Animations Premium** : 
  - `ScrollRevealDirective` custom basée sur l'API moderne `IntersectionObserver` de HTML5 (déclenchement fluide des transitions Tailwind lors du défilement).
  - Effets de lévitation continue CSS, survol magnétique et halos de néons sur les boutons et cartes.
  - Testimonials carrousel avec progression fluide et **boucle circulaire continue infinie**.
* **Internationalisation (i18n)** :
  - **Double stratégie hybride** ultra-robuste.
  - **Priorité en ligne** : Intégration de `@alrevele/translator` (pipe `trl` avec clés en français naturel pour éviter toute duplication de mots clés).
  - **Secours local (Offline Fallback)** : Intégration de `@ngx-translate/core` avec un chargeur dynamique asynchrone HTTP (`CustomTranslateHttpLoader`) lisant les dictionnaires JSON locaux.
  - **Multi-langues** : Support complet et aligné sur l'application mobile :
    - 🇫🇷 Français (`fr.json`)
    - 🇺🇸 English (`en.json`)
    - 🇪🇸 Español (`es.json`)
    - 🇵🇹 Português (`pt.json`)
    - 🇸🇦 العربية (`ar.json`, adapté au sens de lecture RTL)

---

## 📁 Structure du Projet

```text
src/app/
├── core/
│   ├── i18n/                 # Dictionnaires de secours locaux
│   └── interfaces/           # Modèles de données typés
├── shared/
│   ├── components/           # Composants UI standalone (Hero, Features, Testimonials...)
│   ├── directives/           # Directives réutilisables (ScrollReveal...)
│   ├── pipes/                # Pipe custom hybride (TrlFallbackPipe)
│   └── lucide.module.ts      # Gestion centralisée des icônes Lucide
```

---

## 💻 Installation & Lancement local

### Prérequis
* Node.js (version 18+ recommandée)
* NPM (version 9+)

### 1. Cloner le dépôt et installer les dépendances
```bash
git clone https://github.com/meeTsum/cutit.git
cd cutit
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run start
# ou
ng serve
```
Ouvrez votre navigateur sur `http://localhost:4200/`. L'application se recharge automatiquement lors de la modification des fichiers sources.

### 3. Compiler pour la production
```bash
npm run build
```
Les fichiers compilés et optimisés seront générés dans le dossier `dist/cutit/`.

---

## 🔒 Confidentialité & Sécurité
Cutit n'envoie aucune donnée vidéo sur des serveurs distants. Tous les traitements et segmentations de fichiers s'effectuent localement sur le navigateur de l'utilisateur final.

---

## 📄 Licence
© 2026 Cutit. Tous droits réservés.
