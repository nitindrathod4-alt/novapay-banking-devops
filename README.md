# 🏦 NovaPay — Digital Banking & DevSecOps Platform

> A full-stack digital banking application transformed into an end-to-end DevOps / DevSecOps project.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)
![Docker](https://img.shields.io/badge/container-Docker-2496ED)
![Kubernetes](https://img.shields.io/badge/orchestration-Kubernetes-326CE5)
![Terraform](https://img.shields.io/badge/IaC-Terraform-844FBA)
![Security](https://img.shields.io/badge/security-Trivy-1904DA)
![Cloud](https://img.shields.io/badge/cloud-AWS-FF9900)

---

## 📸 Project Preview

> **🖼️ IMAGE PLACEHOLDER — Add NovaPay dashboard screenshot here**
>
> `![NovaPay Dashboard](evidence/screenshots/novapay-dashboard.png)`

> **🖼️ IMAGE PLACEHOLDER — Add GitHub Actions pipeline screenshot here**
>
> `![CI/CD Pipeline](evidence/screenshots/github-actions-success.png)`

> **🖼️ IMAGE PLACEHOLDER — Add Kubernetes screenshot here**
>
> `![Kubernetes](evidence/screenshots/kubernetes.png)`

> **🖼️ IMAGE PLACEHOLDER — Add AWS/EKS screenshot here**
>
> `![AWS EKS](evidence/screenshots/aws-eks.png)`

---

## 📌 Executive Summary

NovaPay is a digital banking application with user and admin workflows. The project demonstrates an engineering lifecycle from source control through CI/CD, container security, image publishing, Kubernetes deployment and operational verification.

### 🔄 End-to-End Flow

```text
Developer
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Build + Validate
   ↓
Docker Build
   ↓
Trivy Security Scan
   ↓
Docker Hub
   ↓
Self-hosted Runner
   ↓
Kubernetes / Minikube
   ↓
Rollout Verification
   ↓
Operations / Monitoring
```

---

## 🧭 Quick Navigation

- [Application Features](#-application-features)
- [Architecture](#-architecture)
- [DevOps Capability Matrix](#-devops-capability-matrix)
- [DevSecOps CI/CD](#-devsecops-cicd-pipeline)
- [Docker](#-containerization)
- [Kubernetes](#️-kubernetes)
- [AWS & Terraform](#️-aws--infrastructure-as-code)
- [Security](#-security--policy)
- [Observability](#-observability--operations)
- [Troubleshooting](#-real-world-troubleshooting)
- [Deployment Documentation](#-deployment-documentation)
- [Repository Structure](#-repository-structure)
- [Technology Stack](#-technology-stack)
- [Local Development](#-local-development)
- [Interview Guide](#-interview-guide)
- [Recruiter Snapshot](#-recruiter-snapshot)

---

# ✨ Application Features

## 👤 User

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

## 🛡️ Admin

- Admin dashboard
- User management
- Deposit and withdrawal management
- KYC review
- Transaction administration
- Support ticket management
- Analytics
- Admin profile management

---

# 🏗️ Architecture

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

                  DEVSECOPS DELIVERY PATH

 GitHub → GitHub Actions → Build → Trivy → Docker Hub
                                      ↓
                              Self-hosted Runner
                                      ↓
                           Kubernetes / Minikube
                                      ↓
                            Rollout Verification
```

### 🖼️ Architecture Evidence

`![NovaPay Architecture](evidence/screenshots/architecture.png)`

---

# 📊 DevOps Capability Matrix

| Capability | Implementation |
|---|---|
| Source Control | Git + GitHub |
| CI/CD | GitHub Actions |
| Containerization | Docker + Docker Compose |
| Container Registry | Docker Hub |
| Security Scanning | Trivy |
| Policy as Code | Rego + Kyverno |
| Orchestration | Kubernetes + Minikube |
| Packaging | Helm |
| Infrastructure as Code | Terraform |
| Cloud | AWS / EKS |
| Observability | Grafana assets + operational docs |
| Deployment Automation | Self-hosted Runner |
| Image Traceability | Commit-SHA tags |

---

# 🔄 DevSecOps CI/CD Pipeline

### Pipeline stages

```text
Push / Pull Request
        ↓
Frontend CI
npm ci + npm run build
        ↓
Backend CI
npm ci + syntax validation
        ↓
Docker Build
Frontend + Backend
        ↓
Trivy Scan
        ↓
Docker Hub Push
        ↓
Self-hosted Runner
        ↓
Kubernetes Deploy
        ↓
Rollout Verification
        ↓
Pods / Services Health
```

Implemented through `.github/workflows/ci-cd.yml`.

### Pipeline capabilities

- Frontend build with Node.js
- Backend dependency installation and validation
- Docker image builds
- Trivy vulnerability scanning
- Docker Hub authentication through GitHub Secrets
- Commit-SHA image tags
- Kubernetes image updates
- Deployment restart
- Rollout verification
- Pod and service verification

> **Security note:** the current Trivy workflow reports findings without automatically failing the job when configured with `exit-code: 0`.

### 🖼️ Pipeline Evidence

`![GitHub Actions](evidence/screenshots/github-actions-success.png)`

---

# 🐳 Containerization

NovaPay packages the frontend and backend as Docker containers.

```text
Frontend → Docker Image
Backend  → Docker Image
```

### Docker Compose

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

### Image Traceability

```text
novapay-frontend:<commit-sha>
novapay-backend:<commit-sha>
```

Commit-based tags make deployed images traceable to the source revision that produced them.

### 🖼️ Docker Evidence

`![Docker Images](evidence/screenshots/docker-images.png)`

---

# ☸️ Kubernetes

Kubernetes is used for container orchestration and deployment management.

Repository areas:

```text
kubernetes/
pipeline/helm/
```

### Common commands

```bash
kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get events --sort-by=.lastTimestamp
```

### Rollout verification

```bash
kubectl rollout status deployment/novapay-backend
kubectl rollout status deployment/novapay-frontend
```

### Minikube

```bash
minikube start --driver=docker
minikube status
```

### Troubleshooting

```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get svc
kubectl get endpoints
```

### 🖼️ Kubernetes Evidence

`![Kubernetes](evidence/screenshots/kubernetes.png)`

---

# ☁️ AWS & Infrastructure as Code

Terraform configuration is maintained under:

```text
pipeline/terraform/
```

Infrastructure areas include:

- VPC networking
- Security groups
- IAM
- EKS
- Provider configuration
- Variables
- Outputs

### Terraform workflow

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

### 🖼️ AWS / EKS Evidence

`![AWS EKS](evidence/screenshots/aws-eks.png)`

---

# 🔐 Security & Policy

Security is integrated into the delivery lifecycle.

### Security technologies

- Trivy container scanning
- Rego policies
- Kyverno policies
- JWT authentication
- Role-based authorization
- Protected backend routes

### Policy areas

- Privileged container controls
- Resource requirements
- Image tag controls
- Kubernetes labels

### 🔑 Secret handling

Use GitHub Secrets and environment variables for sensitive values.

Never commit:

```text
Passwords
Tokens
AWS credentials
MongoDB credentials
Private keys
```

---

# 📊 Observability & Operations

The project includes observability and operational documentation covering:

- Grafana dashboard assets
- Pipeline monitoring
- Deployment operations
- Rollback
- Runbooks
- Database migration
- Environment promotion
- Compliance gates

### 🖼️ Grafana Evidence

`![Grafana Dashboard](evidence/screenshots/grafana-dashboard.png)`

---

# 🧯 Real-World Troubleshooting

A DevOps implementation must also demonstrate recovery from failures.

### Incident workflow

```text
DETECT
  ↓
COLLECT LOGS / EVENTS
  ↓
IDENTIFY ROOT CAUSE
  ↓
APPLY FIX
  ↓
TEST
  ↓
VERIFY ROLLOUT
  ↓
DOCUMENT PREVENTION
```

### Kubernetes investigation

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events --sort-by=.lastTimestamp
kubectl get svc
kubectl get endpoints
```

Useful for investigating common conditions such as:

- `ImagePullBackOff`
- `CrashLoopBackOff`
- Pod startup failures
- Service routing issues
- Deployment rollout failures

---

# 📚 Deployment Documentation

The complete click-to-click deployment procedure should remain in the dedicated runbook so the README stays recruiter-friendly.

## 📖 Complete Deployment Runbook

**[Complete Deployment Runbook](docs/COMPLETE_DEPLOYMENT_RUNBOOK.md)**

The runbook covers:

- Required tools and installation
- Local setup
- Docker / Docker Compose
- Trivy
- AWS CLI
- Terraform
- EKS
- kubectl
- Kubernetes
- Helm
- GitHub Actions
- GitHub Secrets
- MongoDB configuration
- MongoDB Atlas connection
- Health checks
- Rollback
- Troubleshooting
- Final verification

## 📋 Deployment Checklist

**[Deployment Checklist](docs/DEPLOYMENT_CHECKLIST.md)**

---

# 📸 Evidence / Screenshot Locations

Keep project evidence under:

```text
evidence/screenshots/
```

Recommended files:

```text
evidence/screenshots/
├── novapay-dashboard.png
├── github-actions-success.png
├── docker-images.png
├── kubernetes.png
├── aws-eks.png
├── grafana-dashboard.png
└── architecture.png
```

> These paths are intentionally shown as placeholders until the real screenshots are committed.

---

# 📂 Repository Structure

```text
novapay-banking-devops/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── kubernetes/
├── pipeline/
│   ├── helm/
│   ├── policies/
│   ├── scripts/
│   └── terraform/
├── dashboards/
├── docs/
├── evidence/
├── docker-compose.yml
├── NovaPay-Transactions.xlsx
└── README.md
```

---

# 🛠️ Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, RBAC |
| Source Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Containers | Docker, Docker Compose |
| Registry | Docker Hub |
| Security | Trivy, Rego, Kyverno |
| Orchestration | Kubernetes, Minikube |
| Packaging | Helm |
| IaC | Terraform |
| Cloud | AWS, VPC, IAM, EKS |
| Observability | Grafana |
| Runner | GitHub Actions Self-hosted Runner |

---

# 🚀 Local Development

## 1. Clone

```bash
git clone https://github.com/nitindrathod4-alt/novapay-banking-devops.git
cd novapay-banking-devops
```

## 2. Backend

```bash
cd backend
npm install
npm start
```

## 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the required environment variables for your local database and services before starting the application.

---

# 🔑 GitHub Actions Secrets

Expected Docker Hub secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Never hard-code credentials in source code.

---

# 🧪 Operational Commands

### Git

```bash
git status
git log --oneline -10
```

### Docker

```bash
docker ps
docker images
```

### Kubernetes

```bash
kubectl get pods
kubectl get svc
kubectl get deployments
```

### Terraform

```bash
terraform init
terraform fmt
terraform validate
terraform plan
```

---

# 💼 Why This Project Matters for a DevOps Role

NovaPay demonstrates:

**CI/CD · Docker · Security · Kubernetes · Terraform · AWS · Automation · Monitoring · Troubleshooting**

The project connects the tools into one delivery lifecycle rather than simply listing technologies.

> A code change becomes a validated container image, is security-scanned, published with traceable tagging, deployed to Kubernetes and verified through rollout/health checks.

---

# 🧠 Interview Guide

### Why Docker?

Docker provides repeatable application packaging and runtime environments.

### Why Kubernetes?

Kubernetes provides container orchestration, service discovery, deployment management and rollout capabilities.

### Why Terraform?

Terraform makes infrastructure version-controlled, reviewable and reproducible.

### Why Trivy?

Trivy scans container images for vulnerabilities during the delivery workflow.

### Why commit-SHA tags?

They provide traceability between the deployed image and the source revision.

### Why a self-hosted runner?

It allows deployment operations to execute from an environment with the required Kubernetes connectivity and tooling.

### How do you troubleshoot a failed pod?

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events --sort-by=.lastTimestamp
```

Then identify the root cause, apply the smallest safe fix and verify the rollout.

---

# 📋 Recruiter Snapshot

**Project:** NovaPay Digital Banking & DevSecOps Platform  
**Role:** Cloud / DevOps Engineering  
**Core Technologies:** AWS · Kubernetes · Docker · Terraform · GitHub Actions · Trivy · Helm · MongoDB · Linux  
**Focus:** CI/CD · DevSecOps · Infrastructure as Code · Containerization · Deployment Automation · Cloud · Operations

### Resume-ready summary

> **NovaPay — Digital Banking & DevSecOps Platform:** Built and deployed a cloud-native banking application using React, Node.js, Docker, Kubernetes, GitHub Actions, Terraform and AWS-oriented infrastructure, with container security scanning, automated image delivery, deployment verification and operational documentation.

---

# 📌 Project Status

This repository is maintained as a DevOps portfolio/project implementation. Infrastructure and deployment descriptions should be interpreted according to the files and workflows currently present in the repository.

---

# 👨‍💻 Author

**Nitin Rathod**  
Cloud & DevOps Engineering
