# 🏦 NovaPay — Digital Banking & DevSecOps Platform

> A full-stack digital banking application engineered as a cloud-native DevOps project, combining a React frontend, Node.js/Express backend, MongoDB, Docker, Kubernetes, GitHub Actions, Trivy and AWS infrastructure.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)
![Security](https://img.shields.io/badge/security-Trivy-1904DA)
![Cloud](https://img.shields.io/badge/cloud-AWS-FF9900)

---

## 🎯 What is NovaPay?

NovaPay is a digital banking application with separate **user** and **admin** workflows. The application includes authentication, account operations, money movement, KYC, support tickets, bill payment, recharge, receipts and administrative analytics.

The project is also a practical DevOps showcase: source code is validated through GitHub Actions, container images are built and scanned with Trivy, images are pushed to Docker Hub, and the deployment workflow updates Kubernetes workloads on a self-hosted runner.

---

## ✨ Application Features

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
- Travel/booking workflow

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

        DevOps path
        ─────────────────────────────────────────────────────
        GitHub → GitHub Actions → Build → Trivy → Docker Hub
                                      │
                                      ▼
                              Self-hosted Runner
                                      │
                                      ▼
                              Kubernetes / Minikube
```

The repository also contains Terraform definitions for AWS networking, IAM, security groups and EKS, plus Helm templates and Kubernetes manifests. The current GitHub Actions deployment job targets the Kubernetes cluster available to the self-hosted runner.

---

## 🔄 DevSecOps CI/CD Pipeline

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
    CI Success Gate
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
- Docker image builds for frontend and backend
- Trivy vulnerability scans
- Docker Hub authentication using GitHub Secrets
- Commit-SHA image tags for traceability
- Kubernetes image updates
- Deployment restart and rollout verification
- Pod and service verification

> **Security note:** the current Trivy workflow uses `exit-code: 0`, so scan findings are reported without automatically failing the job. This is intentional documentation of the current implementation, not a claim that the scan is a blocking security gate.

---

## 🐳 Containerization

Two application images are built by CI:

```text
nitindrathod/novapay-frontend:<commit-sha>
nitindrathod/novapay-backend:<commit-sha>
```

Both applications have their own Dockerfile and can also be run together with Docker Compose.

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

---

## ☸️ Kubernetes

The repository contains Kubernetes manifests for the frontend and backend and a Helm chart under `pipeline/helm`.

Useful commands:

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

The CI/CD workflow updates the running deployments with the commit-specific Docker images and waits for rollout completion.

---

## ☁️ AWS & Infrastructure as Code

Terraform configuration is maintained under `pipeline/terraform` and includes:

- VPC networking
- Security groups
- IAM
- EKS
- Terraform provider/version configuration
- Variables and outputs

The repository therefore demonstrates both **application deployment** and **cloud infrastructure automation** rather than treating Kubernetes as an isolated tool.

---

## 🔐 Security & Policy

The DevOps implementation includes:

- Trivy container image scanning
- Kubernetes policy definitions
- Kyverno label policy
- Rego policies for privileged containers
- Rego policy for resource requirements
- Rego policy for image tag controls
- JWT-based application authentication
- Role-based user/admin authorization
- Protected backend routes

---

## 📊 Observability & Operations

The repository includes an observability area with a Grafana dashboard definition and operational documentation covering:

- Pipeline architecture
- Deployment strategies
- Compliance gates
- Database migration
- Environment promotion
- Rollback specification
- Runbook/playbook
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
│
├── pipeline/
│   ├── helm/                     # Helm chart
│   ├── policies/                 # Rego/Kyverno policies
│   ├── scripts/                  # Deploy/health-check/rollback scripts
│   └── terraform/                # AWS/EKS infrastructure
│
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

## 🚀 Local Development

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

Never hard-code passwords, tokens, AWS credentials or database credentials in source code.

---

## 🧪 Operational Commands

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

## 📸 Evidence & Documentation

The repository keeps implementation evidence and engineering notes separate from application source code:

- `docs/` — architecture, deployment, compliance, migration, rollback and observability documentation
- `evidence/` — screenshots, presentation material, reflections and self-assessment
- `dashboards/` — Grafana dashboard assets

This makes the repository easier for recruiters and engineers to review without mixing documentation with runtime code.

---

## 💼 Why this project matters for a DevOps role

NovaPay demonstrates an end-to-end engineering workflow:

**Code → Validate → Containerize → Security Scan → Publish → Deploy → Verify → Operate**

The project combines application engineering with practical DevOps responsibilities across CI/CD, containers, Kubernetes, infrastructure as code, security policies, cloud infrastructure and operational documentation.

---

## 👨‍💻 Author

**Nitin Rathod**

Cloud & DevOps Engineering | AWS | Kubernetes | Docker | Terraform | GitHub Actions | Linux

---

## 📌 Project Status

This repository is maintained as a DevOps portfolio/project implementation. Infrastructure and deployment descriptions should be interpreted according to the files and workflows currently present in the repository; cloud resources are not implied to be continuously running.
