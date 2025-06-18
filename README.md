# To Do List App (CRUD App) - Final Project PSO

A full-stack To Do List application built with **Next.js 14**, **Tailwind CSS**, **Node.js**, **Docker**, and **Google Cloud Run**. It features robust CI/CD using GitHub Actions and Sentry integration for monitoring.

---

## 👥 Team Members

| Name          | Student ID |
| ------------- | ---------- |
| Hanin Nuha    | 5026221141 |
| Ratna Amalia  | 5026221209 |
| Muhammad Rafa | 5026221213 |
| Ishaq Yudha   | 5026221214 |

---

## 🏗️ Project Structure

```
.
├── .github/workflows/
│   └── ci-cd.yml
├── .husky/
│   ├── commit-msg
│   ├── post-merge
│   └── pre-commit
├── .vscode/
│   └── settings.json
├── dist/
│   └── app/server/
│       ├── routes/
│       │   └── todos.js
│       ├── db.js
│       ├── index.js
│       └── types.js
├── public/
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/
│   │   ├── server/
│   │   │   ├── Dockerfile
│   │   │   ├── routes/
│   │   │   │   └── todos.ts
│   │   │   ├── db.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── FilterBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── primitives.ts
│   ├── config/
│   │   ├── fonts.ts
│   │   └── site.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts
├── tests/
│   └── TodoList.test.tsx
├── .dockerignore
├── .env
├── .env.dev
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── cloudbuild-be.yaml
├── cloudbuild-fe.yaml
├── commitlint.config.js
├── eslint.config.mjs
├── instrumentation-client.ts
├── instrumentation.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── sentry.edge.config.ts
├── sentry.server.config.ts
├── setupTests.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.server.json
├── vitest.config.ts
```

---

## 🚀 Quick Setup

### 1. Clone the repository

```bash
git clone https://github.com/amaliartnaa/todolist-devops.git
cd todolist-devops
pnpm install
```

### 2. Setup .env

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" >> .env.local
```

### 3. Start the services (Frontend + Backend)

```bash
pnpm dev
```

This runs both frontend and backend concurrently using:

* `pnpm dev:next` for frontend
* `pnpm dev:server` for backend

---

## ⚖️ Docker Setup

### Frontend Build

```bash
docker build -t todo-frontend .
docker run -p 3000:3000 todo-frontend
```

### Backend Build

```bash
docker build -f src/app/server/Dockerfile -t todo-backend .
docker run -p 8080:8080 todo-backend
```

---

## 🤖 CI/CD with GitHub Actions

### Secrets Required

Make sure the following secrets are configured in your GitHub repository:

* `DB_HOST`
* `DB_NAME`
* `DB_PASSWORD`
* `DB_PORT`
* `DB_USER`
* `GCP_PROJECT_ID`
* `GCP_REGION`
* `GCP_SA_KEY`
* `GH_PAT`
* `SENTRY_AUTH_TOKEN`

### Workflow Triggers

CI will run on:

* Push to `main`
* Pull requests to `main`

See `.github/workflows/ci-cd.yml` for full implementation.

---

## 🔬 Testing & Linting

```bash
pnpm test            # Run tests
pnpm test:watch      # Watch mode
pnpm lint            # Run eslint --fix
pnpm format          # Run Prettier
pnpm format:check    # Prettier check only
pnpm typecheck       # TypeScript check
```

---

## 🌐 Production Deployment (Manual)

```bash
gcloud builds submit --config cloudbuild-fe.yaml
# or for backend
gcloud builds submit --config cloudbuild-be.yaml
```

Check the Cloud Run dashboard for deployed URL.

---

## 📊 Monitoring with Sentry

Set up Sentry in both `sentry.server.config.ts` and `sentry.edge.config.ts`.
Ensure the DSN is provided via `.env` or GitHub secrets.

---

## ✨ Features

* Full CRUD (Create, Read, Update, Delete)
* Responsive UI with Tailwind CSS
* Dark mode support
* CI/CD GitHub Actions pipeline
* Dockerized backend and frontend
* Error monitoring via Sentry

---

## 🔄 Architecture Overview

```
Frontend (Next.js) ↔ Backend (Node.js API on Cloud Run) ↔ Custom DB
                                     ↓
                                  Logging
                                     ↓
                                   Sentry
```

---

## 🔧 Tech Stack

* **Frontend**: Next.js 14, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express
* **Deployment**: Google Cloud Run, Cloud Build
* **CI/CD**: GitHub Actions
* **Monitoring**: Sentry
* **Testing**: Vitest

---

## ❓ Troubleshooting

* Cloud Run not working? Check ingress, port, and image.
* Frontend not connecting? Double-check `NEXT_PUBLIC_API_URL`.
* CI failing? Recheck GitHub secrets and workflow logs.
* Sentry not logging? Validate DSN config.

---
