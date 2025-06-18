# Notes Library (CRUD App) - Final Project PSO

This is a comprehensive Notes Library application built with **Next.js 14**, **Tailwind CSS**, **Google Cloud Run**, and **Google Cloud Firestore**. This project demonstrates modern full-stack development with a cloud-native serverless architecture, integrated monitoring with **Sentry**, and robust CI/CD pipelines.

---

## 🚀 Quick Start Guide

### Step-by-Step Setup

#### Initial Setup

1. **Obtain Google Cloud Credentials:**
   
   * You'll need a Google Cloud project with appropriate permissions. For production, consider using a **service account** with specific roles (e.g., Cloud Run Developer, Cloud Firestore User, Secret Manager Secret Accessor).

2. **Install Google Cloud CLI (gcloud):**
   
   * Follow the official [Google Cloud documentation](https://cloud.google.com/sdk/docs/install) for your operating system to install `gcloud CLI`.

#### Configure Google Cloud CLI

```bash
gcloud auth login
gcloud config set project starry-runner-461807
```

Authenticate with your Google account and set your default project ID.

#### Setup Infrastructure (Manual Deployment)

1. **Clone and Setup Project:**

   ```bash
   git clone https://github.com/amaliartnaa/todolist-devops.git
   cd todolist-devops
   npm install
   ```
2. **Deploy Backend to Google Cloud Run:**
  
   * Build your backend application (if separate from the frontend).
  
   * **Deploy your Cloud Run service:**
     ```bash
     gcloud run deploy todo-app --source . --region asia-southeast2 --allow-unauthenticated --project starry-runner-461807
     ```
3. **Create Google Cloud Firestore Database:**
  
   * Navigate to the **Firestore** section in your Google Cloud Console.
   * Create a new database (either Native Mode or Datastore Mode).
   * Set up initial collections or data if necessary.

4. **Copy Google Cloud Run Service URL for Environment:**
   
   * After `gcloud run deploy`, the output will provide your Cloud Run service URL.
   * Copy this URL and add it to your `.env.local` file:
  
     ```bash
     echo "NEXT_PUBLIC_CLOUD_RUN_API_URL=https://todo-app-381607765507.asia-southeast2.run.app/" >> .env.local
     ```

#### Setup GitHub Secrets (for CI/CD)

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

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

---

## 📚 Comprehensive Documentation

📖 **[Comprehensive Final Project PSO Documentation](https://docs.google.com/document/d/1OMCJaaHLdUsa0jNEEthkL5GyQ2sGiMqul9H1ulFk6FY/edit?usp=sharing)**

Covers:

* 📸 Screenshots and demo
* 🔍 System architecture analysis
* 🚀 CI/CD pipeline explanation
* 📊 Performance & monitoring
* 🌟 Project learnings

---

## 🎯 Project Overview

Features full CRUD functionality using:

* **Frontend:** Next.js 14, TypeScript, Tailwind CSS
* **Backend:** Google Cloud Run
* **Database:** Firestore
* **DevOps:** GitHub Actions
* **Monitoring:** Sentry
* **Testing:** Vitest
* **Code Quality:** Husky


---

## 🚀 Features

* CRUD operations
* Responsive design with dark mode
* Real-time search
* Serverless architecture
* CI/CD automation
* Local development with Firestore emulator
* Sentry integration

---

## 🏗️ Architecture

```
Frontend (Next.js) ↔ Google Cloud Run (API) ↔ Google Cloud Firestore
                                  ↓
                            Cloud Logging
                                  ↓
                               Sentry
```

### Tech Stack

* **Frontend:** Next.js 14, TypeScript, Tailwind CSS
* **DevOps:** GitHub Actions, Docker
* **Monitoring:** Sentry, Cloud Logging

---

## 📋 Prerequisites

* Node.js 18+
* Docker & Docker Compose
* Google Cloud account & CLI
* Git
* Sentry account

---

## 🚀 Local Development

### Quick Setup

```bash
git clone https://github.com/amaliartnaa/todolist-devops.git
cd todolist-devops
pnpm install
pnpm dev
```

### Access URLs

* App: `http://localhost:3000`

---

## ☁️ Google Cloud Services Utilized

### Core Services

* **Firestore** - Notes data
* **Cloud Run** - Serverless API
* **Cloud Storage** - Artifact storage

### Monitoring & Logging

* **Sentry** - Error tracking
* **Cloud Logging** - Logs for debugging

### Security & Access

* IAM Roles
* Service Accounts

---

## 🧪 Testing & Development

```bash
# Run unit tests using Vitest
pnpm test

# Watch mode for tests
pnpm run test:watch

# Lint and fix code style issues
pnpm run lint

# Format code using Prettier
pnpm run format

# Type check using TypeScript
pnpm run typecheck
```

---

## 🚀 Deployment & CI/CD

### GitHub Actions

* CI: Testing, building, artifact upload
* CD: Deployment to Cloud Run (staging/prod)

### Manual Deployment

```bash
pnpm run build
# Deploy frontend/backend as per setup
```

---

## 🔧 Common Issues

* Cloud Run issues: Check logs, ingress settings
* Firestore: Check rules, logs
* API: Test endpoint directly
* GitHub Actions: Check secrets and logs
* Sentry: Verify DSN and initialization

---


## 👥 Team Members

| Name          | Student ID |
| ------------- | ---------- |
| Hanin Nuha    | 5026221141 |
| Ratna Amalia  | 5026221209 |
| Muhammad Rafa | 5026221213 |
| Ishaq Yudha   | 5026221214 |

