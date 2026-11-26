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

Photographies des produits (Pexels, licence libre) :

| Produit | Photographe | Photo Pexels |
|---|---|---|
| Veste coupe-vent | Nuptune | 13827794 |
| Legging thermique | Ketut Subiyanto | 4429101 |
| Bonnet et gants | cottonbro studio | 7494112 |
| T-shirt technique | Ketut Subiyanto | 4719931 |
| Polaire zippée | Daniel Battersby | 9965135 |
| Short running 2 en 1 | Ketut Subiyanto | 5039659 |
| Haltères ajustables | Oplita | 7209145 |
| Bandes élastiques | Karola G | 4378991 |
| Tapis de yoga | Mikhail Nilov | 6740754 |
| Kettlebell 12 kg | Pixabay | 416717 |
| Corde à sauter | Yaroslav Shuraev | 8478702 |
| Gourde isotherme | cottonbro studio | 3737799 |

Données météo : [Open-Meteo](https://open-meteo.com/).
