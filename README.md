# Final Project - CI/CD Deployment

This repository contains the final project for the PSO (Pengantar Sistem Operasi) course. The focus of this project is to implement and demonstrate **CI/CD deployment** practices in a real-world scenario using modern development tools and environments.

## 🔧 Project Overview

In this project, our team built a simple web-based application and integrated a full CI/CD pipeline. This includes:
- Continuous Integration with GitHub Actions
- Dockerization of the application
- Deployment to cloud platforms (e.g., Google Cloud App Engine / Azure App Services)
- Code quality checks with SonarCloud
- Version control with Git & GitHub
- Package management using `pnpm`

---

## 👥 Team Members

| Name               | Student ID   |
|--------------------|--------------|
| Hanin Nuha         | 5026221141   |
| Ratna Amalia       | 5026221209   |
| Muhammad Rafa      | 5026221213   |
| Ishaq Yudha        | 5026221214   |

---

## 🚀 CI/CD Pipeline Flow

```mermaid
graph LR
A[Push to GitHub] --> B[GitHub Actions]
B --> C[Run Tests]
C --> D[Code Lint & Jest Test]
D --> E[Build Docker Image]
E --> F[Deploy to Cloud Platform]
