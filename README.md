# 🏦 NovaPay — Digital Banking & Cloud-Native DevSecOps Platform

> A full-stack digital banking application backed by a production-style AWS
> architecture (S3, CloudFront, ALB, Auto Scaling) and a fully automated
> DevSecOps CI/CD pipeline using GitHub Actions, Docker, Trivy, Docker Hub,
> Kubernetes and Minikube.

![Status](https://img.shields.io/badge/status-completed-brightgreen)
![Stack](https://img.shields.io/badge/stack-MERN-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)
![Security](https://img.shields.io/badge/security-Trivy%20scanned-critical)
![Cloud](https://img.shields.io/badge/cloud-AWS-orange)

---

## 📌 Project Overview

NovaPay is a full-stack digital banking application designed to provide
secure and efficient banking services through a modern web platform. It is
built to demonstrate not just application development, but a complete,
production-style **cloud and DevSecOps engineering workflow** — from a user
clicking a button in the browser, all the way down to a highly available,
auto-scaling backend and a security-scanned container pipeline.

The application provides separate **User** and **Admin** functionality.
Users can manage accounts, perform transactions, complete KYC verification,
raise support tickets, recharge mobile services and pay electricity bills.
The Admin Panel provides centralized management of users, transactions,
deposits, withdrawals, KYC requests, support tickets and analytics.

---

## 🚀 Features

### 👤 User Features

- User Registration and Login
- JWT Authentication
- Secure User Dashboard
- Account Balance Management
- Deposit Money
- Withdraw Money
- Money Transfer
- Transaction History
- Profile Management
- Profile Photo Upload
- KYC Verification
- Support Ticket System
- Mobile Recharge
- Electricity Bill Payment
- Receipt Generation
- Password Management

### 👨‍💼 Admin Features

- Admin Dashboard
- User Management (Add / Edit / View All Users)
- View All Transactions with Filtering & Export
- Deposit Management
- Withdrawal Management
- KYC Verification
- Support Ticket Management
- Analytics Dashboard
- Admin Profile & Password Management

---

## ☁️ Cloud Architecture (AWS)

NovaPay is designed to run on a scalable, highly-available AWS architecture
rather than a single server. Every request from the user's browser passes
through the following layers:

```text
                        ┌───────────────────────────┐
                        │        User / Browser      │
                        └──────────────┬──────────────┘
                                       │
                                       ▼
                        ┌───────────────────────────┐
                        │      Amazon CloudFront      │
                        │   (Global CDN + Edge Cache) │
                        └──────────────┬──────────────┘
                       ┌────────────────┴────────────────┐
                       │                                  │
                       ▼                                  ▼
             ┌──────────────────┐             ┌───────────────────────┐
             │     Amazon S3      │             │  Application Load     │
             │  (Static Assets:   │             │  Balancer (ALB)        │
             │  frontend build,   │             │  Distributes traffic   │
             │  images, receipts) │             │  across instances      │
             └──────────────────┘             └───────────┬────────────┘
                                                            │
                                                            ▼
                                          ┌────────────────────────────────┐
                                          │      Auto Scaling Group          │
                                          │   (EKS / Minikube node pool)     │
                                          │  ┌───────────┐  ┌────────────┐   │
                                          │  │ Frontend   │  │ Backend    │   │
                                          │  │ Pods       │  │ Pods       │   │
                                          │  │ (React)    │  │ (Node/Exp) │   │
                                          │  └───────────┘  └────────────┘   │
                                          └────────────────┬─────────────────┘
                                                            │
                                                            ▼
                                                 ┌────────────────────┐
                                                 │      MongoDB         │
                                                 │  (Primary datastore) │
                                                 └────────────────────┘
```

### 🔎 Why each service is used

| Service | Role in NovaPay | Why it matters |
|---|---|---|
| **Amazon S3** | Stores static frontend build files, user profile photos, and generated receipts | Durable, cheap, highly available object storage — decouples static content from compute |
| **Amazon CloudFront** | CDN in front of S3 and the ALB | Caches content at edge locations close to users, reduces latency, reduces load on backend, adds HTTPS/TLS termination |
| **Application Load Balancer (ALB)** | Entry point for dynamic API traffic | Distributes requests across multiple healthy backend instances, does health checks, enables zero-downtime deployments |
| **Auto Scaling Group** | Scales frontend/backend pods or EC2 instances up and down | Handles traffic spikes (e.g. salary day, festive offers) automatically without manual intervention, keeps cost low during idle hours |
| **MongoDB** | Primary database | Stores users, transactions, KYC data, tickets |

### Traffic flow, step by step

1. **User → CloudFront** — every request (static or dynamic) first hits CloudFront.
2. **CloudFront → S3** — if the request is for a static asset (JS/CSS bundle, image, receipt PDF) and it's cached at the edge, CloudFront serves it directly without touching the backend.
3. **CloudFront → ALB** — if the request is a dynamic API call, CloudFront forwards it to the Application Load Balancer.
4. **ALB → Auto Scaling Group** — the ALB picks a healthy instance/pod from the Auto Scaling group using round-robin / least-connections and health checks.
5. **Auto Scaling Group → MongoDB** — the backend pod processes the request and reads/writes to MongoDB.
6. **Scaling in action** — if CPU/memory or request count crosses a threshold, the Auto Scaling Group automatically launches more frontend/backend pods (or EC2 instances); when traffic drops, it scales back down.

---

## 🏗️ Application Architecture (App Layer)

```text
User
  │
  ▼
React.js Frontend  ──►  Amazon CloudFront + S3 (static hosting)
  │
  ▼
REST APIs
  │
  ▼
Node.js + Express  ──►  Application Load Balancer + Auto Scaling Group
  │
  ▼
MongoDB
```

---

## 🔄 DevSecOps CI/CD Pipeline

```text
Git Push
   │
   ▼
Frontend CI
   │
   ▼
Backend CI
   │
   ▼
Docker Build
   │
   ▼
Trivy Security Scan
   │
   ▼
Docker Hub Push
   │
   ▼
CI Success
   │
   ▼
Self-Hosted GitHub Runner
   │
   ▼
Deploy to Minikube / EKS
   │
   ▼
Rollout Verification
```

### Pipeline Result

- Frontend CI — ✅
- Backend CI — ✅
- Docker Build — ✅
- Trivy Security Scan — ✅
- Docker Hub Push — ✅
- CI Success — ✅
- Self-Hosted Runner — ✅
- Deploy to Minikube — ✅
- Rollout Verification — ✅

### Live run — actual pipeline output

![NovaPay CI/CD pipeline — all stages passed](docs/pipeline-success.png)

All 5 stages (Frontend CI, Backend CI, Docker Build and Security Scan, CI
Success, Deploy to Minikube) completed successfully in 3m 1s on a push to
`main`.

---

## 🔐 DevSecOps

Trivy is integrated into the CI/CD workflow to scan Docker images for
security vulnerabilities **before** deployment, so a vulnerable image never
reaches production.

```text
Docker Build
     │
     ▼
Trivy Scan
     │
     ▼
Security Validation
     │
     ▼
Docker Hub Push
     │
     ▼
Kubernetes Deployment
```

---

## 🐳 Docker

Separate Docker images are used for the frontend and backend:

```text
nitindrathod/novapay-frontend
nitindrathod/novapay-backend
```

Images are tagged using the GitHub commit SHA in the CI/CD workflow, so
every deployment is traceable back to an exact commit.

---

## ☸️ Kubernetes & Minikube

NovaPay is deployed using Kubernetes on Minikube (locally / on EC2), with
the same manifests portable to Amazon EKS behind the ALB + Auto Scaling
architecture described above.

### Deployments

```text
novapay-frontend
novapay-backend
```

### Useful Commands

```bash
kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get svc
```

### Start Minikube

```bash
minikube start --driver=docker
```

### Check Minikube

```bash
minikube status
```

---

## 🤖 Self-Hosted GitHub Actions Runner

The deployment job uses a self-hosted GitHub Actions runner:

```yaml
deploy:
  name: Deploy to Minikube
  runs-on: self-hosted
```

The runner operates in the EC2 environment where Minikube is running,
allowing the CI/CD workflow to communicate directly with the Kubernetes
cluster.

---

## 🔄 Automated Kubernetes Deployment

Backend image update:

```bash
kubectl set image deployment/novapay-backend backend=nitindrathod/novapay-backend:<commit-sha>
```

Frontend image update:

```bash
kubectl set image deployment/novapay-frontend frontend=nitindrathod/novapay-frontend:<commit-sha>
```

Rollout verification:

```bash
kubectl rollout status deployment/novapay-backend --timeout=180s
kubectl rollout status deployment/novapay-frontend --timeout=180s
```

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Source Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Containerization | Docker, Docker Compose |
| Registry | Docker Hub |
| Security | Trivy |
| Orchestration | Kubernetes |
| Local Kubernetes | Minikube |
| Runner | GitHub Self-Hosted Runner |
| **Object Storage** | **Amazon S3** |
| **CDN** | **Amazon CloudFront** |
| **Load Balancing** | **Application Load Balancer (ALB)** |
| **Elasticity** | **Auto Scaling Group** |
| Cloud | AWS EC2, S3, CloudFront, ALB, Auto Scaling |
| OS | Ubuntu / Linux |

---

## 🧩 Tech stack at a glance

<p>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>
<p>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&logo=trivy&logoColor=white" alt="Trivy"/>
<img src="https://img.shields.io/badge/Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Hub"/>
</p>
<p>
<img src="https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" alt="Amazon S3"/>
<img src="https://img.shields.io/badge/CloudFront-8C4FFF?style=for-the-badge&logo=amazonaws&logoColor=white" alt="Amazon CloudFront"/>
<img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white" alt="AWS EC2"/>
<img src="https://img.shields.io/badge/Load_Balancer-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="ALB"/>
<img src="https://img.shields.io/badge/Auto_Scaling-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="Auto Scaling"/>
</p>
<p>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux"/>
</p>

> Badges are pulled live from [shields.io](https://shields.io) using each
> service's official [Simple Icons](https://simpleicons.org) slug — no logo
> files are stored in this repo, so they always render up to date on GitHub.

---

## 📂 Project Structure

```text
novapay-banking-devops/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── kubernetes/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   └── service.yaml
├── aws/
│   ├── s3-bucket.tf
│   ├── cloudfront.tf
│   ├── alb.tf
│   └── autoscaling-group.tf
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
├── Dockerfile.frontend
├── Dockerfile.backend
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/nitindrathod4-alt/novapay-banking-devops.git
cd novapay-banking-devops
```

### Backend

```bash
cd backend
npm install
npm start
```

Backend: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

---

## 🐳 Docker Compose

```bash
docker compose build
docker compose up -d
docker ps
docker compose down
```

---

## 🔐 Application Security

- JWT Authentication
- Role-Based Access Control
- User/Admin Authorization
- Protected Backend Routes
- Password Protection
- Secure API Access
- KYC Verification
- Trivy Container Security Scanning
- HTTPS/TLS termination at CloudFront
- Private subnets for backend & database behind ALB

---

## 🔌 API Modules

### Authentication
- User Login
- User Registration
- JWT Token Generation

### Transactions
- Deposit
- Withdraw
- Transfer
- Transaction History

### User Management
- Create User
- Update User
- Delete User
- User Profile

### KYC
- KYC Submission
- Document Upload
- KYC Verification
- KYC Rejection

### Support
- Create Ticket
- Admin Reply
- Ticket Resolution
- Ticket Status Tracking

### Payments
- Mobile Recharge
- Electricity Bill Payment
- Receipt Generation

---

## 📊 Admin Monitoring

The Admin Panel provides monitoring and management for:

- Users
- Transactions
- Deposits
- Withdrawals
- KYC Requests
- Support Tickets
- User Activities
- Analytics

---

## 🎯 Skills Demonstrated

- Linux
- AWS EC2, S3, CloudFront, ALB, Auto Scaling
- Git & GitHub
- GitHub Actions
- CI/CD Pipeline Design
- DevSecOps
- Docker & Docker Compose
- Docker Hub
- Trivy
- Kubernetes & Minikube
- Self-Hosted GitHub Runner
- Container Deployment
- Automated Rollout Verification
- Highly Available, Auto-Scaling Cloud Architecture Design

---

## 🚀 Future Enhancements

- Full AWS EKS Deployment
- Terraform Infrastructure Automation (IaC for S3, CloudFront, ALB, ASG)
- Helm Charts
- Prometheus Monitoring
- Grafana Dashboards
- SonarQube Integration
- ArgoCD GitOps
- Kubernetes Ingress
- Horizontal Pod Autoscaling
- Production Secret Management (AWS Secrets Manager)
- CloudWatch Monitoring & Alarms
- Multi-AZ RDS/DocumentDB migration for higher database availability

---

## 👨‍💻 Author

### Nitin Rathod

**AWS Cloud & DevOps Engineer**

GitHub: [https://github.com/nitindrathod4-alt](https://github.com/nitindrathod4-alt)

LinkedIn: [https://www.linkedin.com/in/nitin-rathod-2495b320a](https://www.linkedin.com/in/nitin-rathod-2495b320a)

---

## ⭐ Project Status

**✅ Completed**

NovaPay is a full-stack digital banking application backed by a scalable
AWS architecture (S3 + CloudFront + ALB + Auto Scaling) and an automated
DevSecOps CI/CD pipeline.

```text
Build → Secure → Package → Deploy → Verify → Scale
```

---

## 💡 Project Goal

**Full Stack Development + AWS Cloud Architecture + Docker + DevSecOps + CI/CD + Kubernetes**

### 🚀 NovaPay

**Build → Secure → Package → Deploy → Scale**

---

*If you find this project useful, consider giving it a ⭐ on GitHub!*
