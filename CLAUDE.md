# CLAUDE.md — JavaScript / Node.js

> Ce fichier est lu automatiquement par Claude Code à chaque session.
> Il définit les règles, le contexte et les limites pour ce projet.
> À personnaliser selon ton projet avant de commiter.

---

## 📁 Description du projet

**Nom du projet** : To-Do List
**Description** : Application web de gestion de tâches permettant d'ajouter, compléter et supprimer des tâches, avec suivi en temps réel des tâches actives, terminées et supprimées. Interface responsive avec mode sombre/clair.
**Type** : Frontend React
**Statut** : En développement actif
**Audience** : Open source

---

## 🛠️ Stack technique

**Runtime** : Node.js 18+
**Package manager** : npm
**Framework principal** : Create React App (react-scripts 5)
**Base de données** : aucune (état local React)
**ORM / Query builder** : aucun
**Tests** : Jest + React Testing Library
**Linter** : ESLint (config react-app)
**Formatter** : Prettier
**TypeScript** : Non
**Bundler** : Webpack (via react-scripts)

---

## 📂 Structure du projet

**Conventions de nommage** :
- Fichiers : kebab-case
- Classes : PascalCase
- Fonctions/variables : camelCase
- Constantes : UPPER_SNAKE_CASE
- Tests : meme nom + .test.js ou .spec.js

---

## 📏 Conventions de code

- Indentation : 2 espaces
- Quotes : guillemets simples
- Longueur de ligne : 100 caractères maximum
- Async/await obligatoire, pas de .then().catch()
- Toujours try/catch dans les fonctions async
- Fonctions limitées à 50 lignes

---

## 🧪 Tests

Couverture minimale cible : 70% sur src/

Commandes :
- npm test
- npm run test:watch
- npm run test:coverage

---

## 🔒 Sécurité

Claude ne doit JAMAIS :
- Commiter des secrets, clés API, mots de passe ou tokens
- Utiliser eval() ou new Function()
- Construire des requêtes SQL par concaténation
- Logger des données sensibles

---

## 🌿 Git et workflow

Conventional Commits : feat / fix / docs / style / refactor / perf / test / chore / ci

Branches :
- main/master : protégée, jamais de commit direct
- feat/description : nouvelles fonctionnalités
- fix/description : corrections
- chore/description : maintenance
- docs/description : documentation

---

## 🤖 Instructions pour les tâches automatiques Claude

Claude PEUT faire automatiquement :
- Créer des Issues GitHub avec rapport d analyse
- Ouvrir des Pull Requests sur des branches chore/* ou docs/*
- Modifier les fichiers .md
- Ajouter des commentaires JSDoc aux fonctions sans documentation
- Corriger des typos dans les commentaires
- Mettre à jour les dépendances patch/minor

Claude NE DOIT PAS sans validation humaine :
- Modifier la logique métier dans src/services/
- Changer les schémas de base de données
- Modifier les fichiers de configuration
- Merger une Pull Request
- Faire des commits directs sur main ou master

---

## 🚀 Commandes importantes

- npm start
- npm run dev
- npm test
- npm run lint
- npm run build

---

*Maintenu par : Houssem Rouabeh*
