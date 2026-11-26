# FitBox – front-end

Boutique en ligne de vêtements techniques et de matériel d'entraînement, avec une recommandation de tenue selon la météo du jour (API Open-Meteo).

Projet fil rouge de la formation Développeur web fullstack. Le back-end sera ajouté dans un second temps : en attendant, le catalogue est stocké dans `src/data` et le panier dans le `localStorage`.

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS 3 (charte graphique déclarée dans `tailwind.config.js`)
- Icônes Lucide
- Vitest + Testing Library
- ESLint

## Lancer le projet

```bash
npm install
npm run dev
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build |
| `npm run lint` | Analyse du code avec ESLint |
| `npm test` | Tests unitaires et de composants |

## Organisation

```
src/
├── components/   composants réutilisables (layout, ui, product, weather, home)
├── context/      état global du panier (Context + useReducer)
├── data/         catalogue, formules de la Box, avis
├── hooks/        hooks personnalisés (useCart, useWeather, useForm…)
├── pages/        une page par route
├── services/     appels à l'API Open-Meteo
└── utils/        fonctions pures (prix, filtres, validation, tenue du jour)
```

## Déploiement

Le site est déployé sur Vercel à chaque push sur `main`. Le fichier `vercel.json` redirige toutes les routes vers `index.html` pour que React Router gère la navigation.

## Crédits

Photographie de la veste : Nuptune, Pexels. Données météo : [Open-Meteo](https://open-meteo.com/).
