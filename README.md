# 🏦 NovaPay — Digital Banking & DevSecOps Platform

> **A full-stack digital banking application built and presented as an end-to-end Cloud & DevOps engineering project.**
>
> React + Vite • Node.js + Express • MongoDB • Docker • Kubernetes • GitHub Actions • Trivy • Terraform • AWS

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)
![Security](https://img.shields.io/badge/security-Trivy-1904DA)
![Cloud](https://img.shields.io/badge/cloud-AWS-FF9900)

## 🚀 Project at a Glance

**NovaPay** combines a digital banking application with a practical DevSecOps delivery workflow. Users and administrators have separate workflows for banking and management operations, while the engineering side covers source control, CI/CD, containerization, vulnerability scanning, Kubernetes deployment and AWS infrastructure automation.

### 🎯 DevOps Workflow

```text
Code → CI → Build → Security Scan → Docker Hub → Kubernetes → Verify → Operate
```

### 👤 Application Roles

| User | Admin |
|---|---|
| Authentication & account dashboard | Admin dashboard |
| Deposits / withdrawals | User management |
| Money transfers | KYC review |
| Transaction history | Transaction administration |
| KYC & support tickets | Support management |
| Recharge & bill payment | Analytics |
| Receipts & profile management | Admin profile |

---

## 📑 Table of Contents

- [Project at a Glance](#-project-at-a-glance)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [CI/CD & DevSecOps](#-cicd--devsecops)
- [Docker](#-docker)
- [Kubernetes](#-kubernetes)
- [AWS & Terraform](#-aws--terraform)
- [Security](#-security)
- [Observability & Operations](#-observability--operations)
- [Repository Structure](#-repository-structure)
- [Technology Stack](#-technology-stack)
- [Run Locally](#-run-locally)
- [GitHub Actions Secrets](#-github-actions-secrets)
- [Useful Commands](#-useful-commands)
- [DevOps Skills Demonstrated](#-devops-skills-demonstrated)
- [Evidence & Documentation](#-evidence--documentation)
- [Author](#-author)

---

## ✨ Key Features

### 👤 User

- Registration and JWT authentication
- Account dashboard and balance
- Deposits and withdrawals
- Money transfers
- Transaction history
- Profile management and photo upload
- KYC verification
- Support tickets
- Mobile recharge
- Electricity bill payment
- Receipts and statements
- Password management
- Travel / booking workflow

### 🛡️ Admin

- Admin dashboard
- User management
- Deposit and withdrawal management
- KYC review
- Transaction administration
- Support ticket management
- Analytics
- Admin profile management

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React + Vite      │
                         │     Frontend        │
                         └──────────┬──────────┘
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express   │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ MongoDB + Mongoose  │
                         └─────────────────────┘

                 DEVSECOPS / DELIVERY PATH

 GitHub → GitHub Actions → Build → Trivy → Docker Hub
                                      │
                                      ▼
                              Self-hosted Runner
                                      │
                                      ▼
                              Kubernetes / Minikube
```

The repository also contains Terraform definitions for AWS networking, IAM, security groups and EKS, plus Helm templates and Kubernetes manifests. The current deployment workflow targets the Kubernetes cluster available to the self-hosted runner.

---

## 🔄 CI/CD & DevSecOps

```text
Developer Push / Pull Request
            │
            ▼
      Frontend CI
   npm ci + npm run build
            │
            ▼
       Backend CI
   npm ci + syntax checks
            │
            ▼
     Docker Build
   Frontend + Backend
            │
            ▼
       Trivy Scan
     HIGH / CRITICAL
            │
            ▼
      Docker Hub Push
            │
            ▼
    Self-hosted Runner
            │
            ▼
      Kubernetes
   Image update + rollout
            │
            ▼
     Deployment Verify
```

### Pipeline implemented in `.github/workflows/ci-cd.yml`

- Frontend build with Node.js 20
- Backend dependency installation and syntax validation
- Frontend and backend Docker image builds
- Trivy vulnerability scanning
- Docker Hub authentication through GitHub Secrets
- Commit-SHA image tags for traceability
- Kubernetes image updates
- Deployment restart and rollout verification
- Pod and service verification

> **Current implementation note:** Trivy uses `exit-code: 0`, so findings are reported without automatically failing the workflow. This README documents the implementation as it exists rather than claiming a blocking security gate.

---

## 🐳 Docker

Two application images are built by CI:

```text
nitindrathod/novapay-frontend:<commit-sha>
nitindrathod/novapay-backend:<commit-sha>
```

Run the application with Docker Compose:

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

---

## ☸️ Kubernetes

The repository contains Kubernetes manifests for the frontend and backend and a Helm chart under `pipeline/helm`.

```bash
kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get services
```

For Minikube:

```bash
minikube start --driver=docker
minikube status
```

The CI/CD workflow updates running deployments with commit-specific images and waits for rollout completion.

---

## ☁️ AWS & Terraform

Terraform configuration is maintained under `pipeline/terraform` and includes:

- VPC networking
- Security groups
- IAM
- EKS
- Provider/version configuration
- Variables and outputs

This demonstrates infrastructure automation alongside application deployment rather than treating Kubernetes as an isolated tool.

---

## 🔐 Security

The project includes multiple security layers:

- Trivy container image scanning
- Kubernetes policy definitions
- Kyverno label policy
- Rego policy for privileged containers
- Rego policy for resource requirements
- Rego policy for image-tag controls
- JWT-based authentication
- Role-based user/admin authorization
- Protected backend routes
- GitHub Secrets for CI credentials

**Secret-handling rule:** never commit passwords, tokens, AWS credentials or database credentials to the repository.

---

## 📊 Observability & Operations

The repository includes an observability area with Grafana dashboard assets and operational documentation covering:

- Pipeline architecture
- Deployment strategies
- Compliance gates
- Database migration
- Environment promotion
- Rollback specification
- Runbooks / playbooks
- Observability

Evidence screenshots are maintained separately under `evidence/screenshots`.

---

## 📂 Repository Structure

```text
novapay-banking-devops/
│
├── .github/workflows/
│   └── ci-cd.yml                 # GitHub Actions pipeline
│
├── backend/
│   ├── config/                   # Database configuration
│   ├── controllers/              # Business/API controllers
│   ├── middleware/               # Auth, admin and upload middleware
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── utils/                    # Utilities such as email
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/                   # Public assets
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # User/Admin pages
│   │   ├── services/             # API integration
│   │   └── assets/               # NovaPay assets
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── kubernetes/                   # Kubernetes deployments/services
├── pipeline/
│   ├── helm/                     # Helm chart
│   ├── policies/                 # Rego/Kyverno policies
│   ├── scripts/                  # Deploy/health-check/rollback scripts
│   └── terraform/                # AWS/EKS infrastructure
├── dashboards/                   # Grafana dashboard assets
├── docs/                         # Engineering documentation
├── evidence/                     # Project evidence and screenshots
├── docker-compose.yml
├── NovaPay-Transactions.xlsx
└── README.md
```

---

## 🛠️ Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, role-based authorization |
| Source Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Containers | Docker, Docker Compose |
| Registry | Docker Hub |
| Security | Trivy, Rego, Kyverno |
| Orchestration | Kubernetes, Minikube |
| Packaging | Helm |
| IaC | Terraform |
| Cloud | AWS, EC2, VPC, IAM, EKS |
| Observability | Grafana assets + operational documentation |
| Runner | GitHub Actions self-hosted runner |

---

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/nitindrathod4-alt/novapay-banking-devops.git
cd novapay-banking-devops
```

### 2. Backend

```bash
cd backend
npm install
npm start
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

> Configure the required environment variables for your local database and application services before starting the application. Do not commit secrets.

---

## 🔑 GitHub Actions Secrets

The workflow expects Docker Hub credentials through GitHub Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Keep credentials outside source control.

---

## 🧪 Useful Commands

```bash
# Git
git status
git log --oneline -10

# Docker
docker ps
docker images

# Kubernetes
kubectl get pods
kubectl get svc
kubectl rollout status deployment/novapay-backend
kubectl rollout status deployment/novapay-frontend

# Terraform
terraform init
terraform fmt
terraform validate
terraform plan
```

Run infrastructure commands only from the appropriate Terraform directory and AWS environment.

---

## 💼 DevOps Skills Demonstrated

| Skill | Practical Evidence in NovaPay |
|---|---|
| Linux | Runtime administration and operational commands |
| Git & GitHub | Source control and pull-request workflow |
| GitHub Actions | CI/CD automation |
| Docker | Application containerization |
| Docker Hub | Image registry and publishing |
| Trivy | Container vulnerability scanning |
| Kubernetes | Deployments, services and rollouts |
| Helm | Kubernetes packaging |
| Terraform | AWS/EKS infrastructure as code |
| AWS | VPC, IAM, EC2 and EKS infrastructure |
| DevSecOps | Security scanning and policy controls |
| Observability | Grafana assets and operational documentation |
| Troubleshooting | Health checks, rollout verification and runbooks |

### ⭐ Interview-ready summary

> **NovaPay is an end-to-end DevOps project where I worked across application delivery, CI/CD automation, Docker containerization, security scanning, Kubernetes deployment, Terraform-based AWS infrastructure and operational documentation.**

---

## 📸 Evidence & Documentation

The repository separates implementation evidence from runtime source code:

- `docs/` — architecture, deployment, compliance, migration, rollback and observability documentation
- `evidence/` — screenshots, presentation material, reflections and self-assessment
- `dashboards/` — Grafana dashboard assets

This structure keeps the repository easier for engineers and recruiters to review.

---

## 👨‍💻 Author

**Nitin Rathod**

Cloud & DevOps Engineering | AWS | Kubernetes | Docker | Terraform | GitHub Actions | Linux

---

## 📌 Project Status

NovaPay is maintained as a DevOps portfolio/project implementation. Infrastructure and deployment descriptions reflect the files and workflows currently present in the repository; cloud resources are not implied to be continuously running.

---

## ⭐ If you found this project useful

Feel free to explore the repository, review the CI/CD workflow, and inspect the infrastructure, Kubernetes and security configurations.
