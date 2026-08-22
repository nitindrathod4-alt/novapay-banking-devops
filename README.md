# 🏦 NovaPay — Digital Banking & DevSecOps Platform

> **A full-stack digital banking application turned into an end-to-end DevOps engineering case study.**
>
> NovaPay combines React, Node.js/Express and MongoDB with GitHub Actions, Docker, Trivy, Kubernetes, Helm, Terraform and AWS-oriented infrastructure.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)
![Security](https://img.shields.io/badge/security-Trivy-1904DA)
![Cloud](https://img.shields.io/badge/cloud-AWS-FF9900)
![Containers](https://img.shields.io/badge/containers-Docker-2496ED)
![Orchestration](https://img.shields.io/badge/orchestration-Kubernetes-326CE5)

---

## 📌 Executive Summary

**NovaPay** is a digital banking application with separate user and admin workflows. The project goes beyond application development by demonstrating how an application can be **validated, containerized, security-scanned, published, deployed and operated** through a DevOps workflow.

**Engineering flow:**

`Code → Validate → Build → Security Scan → Publish → Deploy → Verify → Operate`

The repository is designed as a practical portfolio project for demonstrating cloud, DevOps, DevSecOps, containerization, Kubernetes and infrastructure-as-code skills.

---

## 🧭 Quick Navigation

- [What is NovaPay?](#-what-is-novapay)
- [Application Features](#-application-features)
- [Architecture](#️-architecture)
- [DevOps Capability Matrix](#-devops-capability-matrix)
- [CI/CD Pipeline](#-devsecops-cicd-pipeline)
- [Containerization](#-containerization)
- [Kubernetes](#️-kubernetes)
- [AWS & Terraform](#️-aws--infrastructure-as-code)
- [Security](#-security--policy)
- [Observability](#-observability--operations)
- [Real-World Troubleshooting](#-real-world-troubleshooting)
- [Repository Structure](#-repository-structure)
- [Technology Stack](#️-technology-stack)
- [Local Development](#-local-development)
- [Interview Guide](#-interview-guide)
- [Author](#-author)

---

## 🎯 What is NovaPay?

NovaPay includes authentication, account operations, money movement, KYC, support tickets, bill payment, recharge, receipts, statements and administrative analytics.

The DevOps implementation uses GitHub Actions for CI/CD, Docker for containerization, Trivy for image scanning, Docker Hub for image publishing and a self-hosted runner for Kubernetes deployment. Terraform, Helm and policy files extend the project into infrastructure and platform engineering.

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

                 DEVOPS / DEVSECOPS DELIVERY PATH

 GitHub → GitHub Actions → Build → Trivy → Docker Hub
                                      │
                                      ▼
                              Self-hosted Runner
                                      │
                                      ▼
                           Kubernetes / Minikube
                                      │
                                      ▼
                            Rollout Verification
```

The repository also contains Terraform definitions for AWS networking, IAM, security groups and EKS, plus Helm templates, Kubernetes manifests, deployment scripts and policy definitions.

---

## 📊 DevOps Capability Matrix

| Capability | Implementation in NovaPay |
|---|---|
| **Source Control** | Git + GitHub |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker + Docker Compose |
| **Container Registry** | Docker Hub |
| **Security Scanning** | Trivy |
| **Policy as Code** | Rego + Kyverno |
| **Orchestration** | Kubernetes + Minikube |
| **Packaging** | Helm |
| **Infrastructure as Code** | Terraform |
| **Cloud** | AWS / EKS-oriented infrastructure |
| **Observability** | Grafana dashboard assets + operational docs |
| **Deployment Automation** | Self-hosted runner + deployment scripts |
| **Image Traceability** | Commit-SHA image tags |

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
     Self-hosted Runner
            │
            ▼
      Kubernetes Deploy
   Image update + restart
            │
            ▼
     Rollout Verification
            │
            ▼
       Pods / Services
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

> **Security accuracy:** the current Trivy workflow uses `exit-code: 0`, so scan findings are reported without automatically failing the job. This README documents the current implementation rather than claiming Trivy is a blocking gate.

---

## 🐳 Containerization

Two application images are built by CI:

```text
nitindrathod/novapay-frontend:<commit-sha>
nitindrathod/novapay-backend:<commit-sha>
```

Run locally with Docker Compose:

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

**Why commit-SHA tags?** They provide a direct relationship between a deployed image and the source revision that produced it, improving traceability during deployments and troubleshooting.

---

## ☸️ Kubernetes

The repository contains Kubernetes manifests for the application and a Helm chart under `pipeline/helm`.

Useful commands:

```bash
kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get services
kubectl rollout status deployment/novapay-backend
kubectl rollout status deployment/novapay-frontend
```

For Minikube:

```bash
minikube start --driver=docker
minikube status
```

The CI/CD workflow updates running deployments with commit-specific images and waits for rollout completion.

---

## ☁️ AWS & Infrastructure as Code

Terraform configuration is maintained under `pipeline/terraform` and includes infrastructure for:

- VPC networking
- Security groups
- IAM
- EKS
- Terraform provider/version configuration
- Variables and outputs

The project demonstrates the relationship between **application delivery, Kubernetes platform operations and cloud infrastructure automation**.

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

### Secret handling

Docker Hub credentials are expected through GitHub Secrets. Application credentials and database connection values should remain in environment-specific configuration and must never be committed to source control.

---

## 📊 Observability & Operations

The repository includes an observability area with Grafana dashboard assets and operational documentation covering:

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

## 🧯 Real-World Troubleshooting

A strong DevOps project is not only about successful deployment; it is also about recovering when something fails.

### Recommended incident workflow

```text
DETECT
  ↓
COLLECT EVENTS / LOGS
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

### Example investigation commands

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events --sort-by=.lastTimestamp
kubectl get svc
kubectl get endpoints
```

This workflow helps investigate common Kubernetes failures such as image pull problems, container crashes, service routing issues and unhealthy deployments without guessing at the root cause.

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

> Configure the required environment variables for your local database and application services before starting the application. Never commit secrets.

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

This separation makes the project easier for recruiters and engineers to review.

---

## 💼 Why this project matters for a DevOps role

NovaPay demonstrates an end-to-end engineering workflow across:

**CI/CD · Containers · Security · Kubernetes · IaC · AWS · Automation · Operations**

Instead of presenting a list of tools, the repository shows how those tools connect into one delivery lifecycle:

> **A code change becomes a validated container image, passes security checks, is published with traceable tagging, is deployed to Kubernetes and is verified through rollout/health checks.**

---

## 🧠 Interview Guide

### Why use commit-SHA Docker tags?

They make image versions traceable to source revisions and reduce ambiguity during deployment and rollback investigations.

### Why Docker?

Docker packages application dependencies and runtime requirements into repeatable containers, making local and deployment environments more consistent.

### Why Kubernetes?

Kubernetes provides workload orchestration, service discovery, rollout management and a platform for operating containerized applications.

### Why Terraform?

Terraform allows infrastructure configuration to be version-controlled, reviewed and reproduced instead of manually creating cloud resources.

### Why Trivy?

Trivy provides container vulnerability scanning inside the delivery workflow so security findings can be surfaced before images are deployed.

### Why a self-hosted runner?

The deployment workflow can execute Kubernetes-related operations from an environment that has the required cluster connectivity and tooling.

### How would you investigate a failed deployment?

Start with pod status and events, inspect logs and service/endpoints, identify the root cause, apply the smallest safe fix, then verify rollout and application health.

---

## 📋 Recruiter Snapshot

**Project:** NovaPay Digital Banking & DevSecOps Platform  
**Role demonstrated:** Cloud / DevOps Engineering  
**Core technologies:** AWS · Kubernetes · Docker · Terraform · GitHub Actions · Trivy · Linux  
**Engineering focus:** CI/CD · DevSecOps · Infrastructure as Code · Containerization · Deployment Automation · Operations

### Resume-ready summary

> **NovaPay — Digital Banking & DevSecOps Platform:** Built and deployed a cloud-native banking application using React, Node.js, Docker, Kubernetes, GitHub Actions, Terraform and AWS-oriented infrastructure, with container security scanning, automated image delivery, deployment verification and operational documentation.

---

## 📌 Project Status

This repository is maintained as a DevOps portfolio/project implementation. Infrastructure and deployment descriptions should be interpreted according to the files and workflows currently present in the repository; cloud resources are not implied to be continuously running.

---

## 👨‍💻 Author

**Nitin Rathod**  
Cloud & DevOps Engineering | AWS | Kubernetes | Docker | Terraform | GitHub Actions | Linux

---

⭐ **If you are reviewing this repository as a recruiter or interviewer, start with the Architecture, CI/CD Pipeline, DevOps Capability Matrix and Interview Guide sections.**
