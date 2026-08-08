# 🚀 NovaPay Banking — DevOps & Cloud Engineering Project

> A full-stack digital banking application built as a practical **DevOps, Cloud, Linux, Docker and AWS deployment project**.

NovaPay combines a modern banking-style frontend with a Node.js backend and administrative workflows. The project demonstrates the complete application lifecycle: development, version control, production build, containerization, orchestration and cloud deployment.

---

## 📌 Project Overview

NovaPay is designed as a production-style digital banking platform where customers can access banking services through a web application while administrators manage users, KYC, deposits, withdrawals, tickets and transactions.

The project focuses on both **application development and DevOps engineering**.

### Engineering Lifecycle

```text
Developer
   │
   ▼
GitHub
   │
   ▼
Source Code
   │
   ├──────────────► Frontend
   │                 React + Vite
   │
   └──────────────► Backend
                     Node.js + Express
                           │
                           ▼
                       Database
                           │
                           ▼
                    Docker Containers
                           │
                           ▼
                    Docker Compose
                           │
                           ▼
                       AWS / Cloud
```

---

# ✨ Key Features

- 🔐 User authentication
- 🔑 Forgot Password / OTP recovery workflow
- 👤 User dashboard
- 👨‍💼 Admin dashboard
- 💰 Banking-style transactions
- 💸 Deposit management
- 💵 Withdrawal management
- 🔄 Money transfer workflow
- 🎫 Customer support tickets
- 🧾 Bill payment interface
- 📱 Mobile recharge interface
- ✈️ Travel booking workflow
- 🪪 KYC management
- 👥 User management
- 📊 Analytics
- ⚙️ Profile and settings
- 🐳 Dockerized frontend and backend
- 🧩 Docker Compose orchestration
- 🐧 Linux/Ubuntu deployment
- ☁️ AWS deployment ready
- 🔄 Git/GitHub version control
- 🚀 Vite production builds

---

# 🏗️ High-Level Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         │     Browser         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Frontend        │
                         │   React + Vite      │
                         │      Port 5173      │
                         └──────────┬──────────┘
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │      Backend        │
                         │ Node.js + Express   │
                         │      Port 5000      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Database       │
                         │   Application Data  │
                         └─────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development and production build |
| JavaScript / JSX | Application logic |
| CSS | Styling |
| React Hooks | Component state |
| REST API | Backend communication |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| JavaScript | Backend implementation |
| Controllers | Business logic |
| Routes | API endpoints |
| Models | Data representation |
| Authentication | Access control |

## DevOps / Cloud

| Technology | Purpose |
|---|---|
| Linux / Ubuntu | Server environment |
| Git | Version control |
| GitHub | Source-code hosting |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| AWS | Cloud infrastructure |
| EC2 | Cloud server |
| Bash | Server administration |
| npm | Dependency management |

---

# 📂 Project Structure

```text
Project1A-DevOps-CloudEngineer-Nitin-Rathod/
│
├── backend/
│   ├── controllers/
│   │   ├── adminTicketController.js
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── ticketController.js
│   │   ├── userController.js
│   │   └── withdrawalController.js
│   │
│   ├── models/
│   │   ├── Booking.js
│   │   └── WithdrawalRequest.js
│   │
│   ├── routes/
│   │   ├── adminTicketRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── withdrawalRoutes.js
│   │   └── ...
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── novapay-logo.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BalanceCard.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   └── TransactionList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDepositPage.jsx
│   │   │   ├── AdminKyc.jsx
│   │   │   ├── AdminProfilePage.jsx
│   │   │   ├── AdminTicketsPage.jsx
│   │   │   ├── AdminWithdrawPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── BillPaymentPage.jsx
│   │   │   ├── ChangePasswordPage.jsx
│   │   │   ├── KycPage.jsx
│   │   │   ├── MobileRechargePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── TicketPage.jsx
│   │   │   ├── TransactionsPage.jsx
│   │   │   ├── TransferPage.jsx
│   │   │   ├── TravelBookingPage.jsx
│   │   │   ├── UserProfilePage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   └── WithdrawPage.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 👤 User Panel

The customer-facing application provides a banking-style experience.

Major areas include:

- Dashboard
- Account information
- Transactions
- Transfers
- Withdrawals
- KYC
- Tickets
- Bill payments
- Mobile recharge
- Travel booking
- Profile
- Settings

---

# 🔐 Authentication

The login interface supports:

- Username
- Password
- Password visibility
- Loading state
- Login API request
- Secure connection indicator

Conceptual flow:

```text
User
 │
 ▼
Login Form
 │
 ▼
POST /auth/login
 │
 ▼
Backend Authentication
 │
 ▼
Authorization
 │
 ▼
Dashboard
```

---

# 🔑 Forgot Password / OTP

NovaPay contains a multi-step password recovery interface.

```text
Forgot Password
      │
      ▼
Enter Username
      │
      ▼
Send OTP
      │
      ▼
Verify OTP
      │
      ▼
Enter New Password
      │
      ▼
Confirm Password
      │
      ▼
Update Password
```

The UI includes separate loading states for sending OTP, verifying OTP and updating the password.

---

# 💰 Banking Dashboard

The dashboard provides a centralized view of account activity.

Typical sections include:

- Balance card
- Quick actions
- Recent transactions
- Navigation
- Profile access
- Banking operations

The UI is divided into reusable React components.

---

# 🔄 Money Transfer

Conceptual transaction flow:

```text
User
 │
 ▼
Transfer Page
 │
 ├── Recipient
 ├── Amount
 ├── Validation
 └── Submit
       │
       ▼
    Backend API
       │
       ▼
 Transaction Processing
```

---

# 💸 Deposits & Withdrawals

The application contains administrative workflows for deposits and withdrawals.

### Withdrawal Flow

```text
User
 │
 ▼
Withdrawal Request
 │
 ▼
Backend API
 │
 ▼
Withdrawal Controller
 │
 ▼
WithdrawalRequest Model
 │
 ▼
Admin Processing
```

The repository contains dedicated withdrawal controller, route and model structures.

---

# 🎫 Ticket Management

NovaPay provides a customer support workflow.

```text
User
 │
 ▼
Create Ticket
 │
 ▼
Ticket API
 │
 ▼
Backend Controller
 │
 ▼
Admin Ticket Dashboard
 │
 ▼
Update / Resolve
```

This architecture separates frontend ticket pages from backend ticket controllers and routes.

---

# 🪪 KYC Management

The project contains user and administrator KYC pages.

Conceptual flow:

```text
User
 │
 ▼
Submit KYC
 │
 ▼
Admin KYC Panel
 │
 ├── Review
 ├── Approve
 └── Reject
```

---

# ✈️ Travel Booking

The application contains a travel booking workflow.

```text
Travel Page
    │
    ▼
Booking API
    │
    ▼
Booking Controller
    │
    ▼
Booking Model
    │
    ▼
Database
```

The backend contains dedicated booking controller, route and model structures.

---

# 📱 Mobile Recharge

NovaPay contains a mobile recharge interface as part of its digital-service experience.

A production integration could connect the page to an external recharge provider.

---

# 🧾 Bill Payment

The project contains a bill-payment page intended to support digital payment workflows such as utilities and other services.

---

# 👨‍💼 Admin Panel

The administrative interface contains dedicated pages for operational management.

Major areas include:

- Admin Dashboard
- Users
- User profiles
- Deposits
- Withdrawals
- KYC
- Tickets
- Transactions
- Analytics
- Admin profile

The admin experience is separated from the normal customer interface.

---

# 📊 Analytics

The project contains an analytics page intended to provide operational visibility.

Potential metrics include:

- Transaction activity
- User activity
- Deposit activity
- Withdrawal activity
- Business statistics

---

# 🐳 Docker

NovaPay is containerized into separate frontend and backend services.

### Frontend

```text
Port: 5173
```

### Backend

```text
Port: 5000
```

---

# 🧩 Docker Compose

Start the application:

```bash
docker compose up -d
```

Build:

```bash
docker compose build
```

Force rebuild:

```bash
docker compose build --no-cache
```

Rebuild only frontend:

```bash
docker compose build --no-cache frontend
```

Start frontend:

```bash
docker compose up -d frontend
```

Check services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs --tail=100 frontend
docker compose logs --tail=100 backend
```

Follow logs:

```bash
docker compose logs -f
```

Stop services:

```bash
docker compose down
```

---

# 🧱 Docker Architecture

```text
                 Docker Compose
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   ┌──────────────┐         ┌──────────────┐
   │   Frontend   │         │   Backend    │
   │ React + Vite │ ──────► │ Node/Express │
   │    :5173     │         │    :5000     │
   └──────────────┘         └──────┬───────┘
                                   │
                                   ▼
                                Database
```

---

# ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The production output is generated in:

```text
frontend/dist/
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
```

If the project contains a development script:

```bash
npm run dev
```

---

# 🧪 Build Verification

Run:

```bash
cd frontend
npm run build
```

A successful build ends with:

```text
✓ built
```

Vite may show a chunk-size warning when a JavaScript bundle exceeds the configured warning threshold. This is a warning rather than a build failure.

---

# 🐧 Linux / Ubuntu Deployment

The application can be operated from an Ubuntu server.

Check Docker:

```bash
docker --version
```

Check Compose:

```bash
docker compose version
```

Navigate to the project:

```bash
cd ~/Project1A-DevOps-CloudEngineer-Nitin-Rathod
```

Start:

```bash
docker compose up -d
```

Verify:

```bash
docker compose ps
```

---

# ☁️ AWS Deployment Architecture

A basic AWS architecture can use EC2 as the application host.

```text
                    AWS Cloud
                       │
                       ▼
                  EC2 Instance
                       │
                       ▼
                Docker Compose
                  │         │
                  ▼         ▼
             Frontend    Backend
              :5173       :5000
                  │         │
                  └────┬────┘
                       ▼
                    Database
```

AWS Security Groups can be used to control access to the server.

For production, HTTPS and a reverse proxy should normally be used rather than exposing development ports directly.

---

# 🔄 Git & GitHub

The project is maintained using Git and GitHub.

Common commands:

```bash
git status
git add .
git commit -m "Update NovaPay application"
git push origin main
```

Remote:

```bash
git remote -v
```

Latest commit:

```bash
git log -1 --oneline
```

Current branch:

```bash
git branch
```

---

# 🚀 CI/CD Pipeline Concept

The project can be extended into a complete automated pipeline:

```text
Developer
   │
   ▼
Git Push
   │
   ▼
GitHub
   │
   ▼
CI/CD Pipeline
   │
   ├── Checkout
   ├── Install Dependencies
   ├── Build Frontend
   ├── Test Backend
   ├── Build Docker Images
   ├── Security Scan
   └── Push Images
          │
          ▼
   Container Registry
          │
          ▼
      AWS Deploy
          │
          ▼
   Running Application
```

Potential tools:

- GitHub Actions
- Jenkins
- Docker Hub
- AWS ECR
- AWS EC2

---

# 🔐 Environment Variables

Sensitive values should never be committed to GitHub.

Example:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Never commit:

- Database passwords
- JWT secrets
- API keys
- AWS credentials
- SMTP passwords
- Production secrets

The repository uses `.gitignore` rules for environment files and generated dependencies.

---

# 🧹 Repository Hygiene

The repository excludes generated or sensitive files such as:

```text
node_modules/
dist/
build/
.env
*.backup
*.bak
*.before-*
*.broken-*
*.failed-*
*.current-broken
```

This keeps the GitHub repository smaller and cleaner.

---

# 🩺 Troubleshooting

## Check containers

```bash
docker compose ps
```

## Frontend logs

```bash
docker compose logs --tail=100 frontend
```

## Backend logs

```bash
docker compose logs --tail=100 backend
```

## Rebuild frontend

```bash
cd frontend
npm run build
cd ..
docker compose build --no-cache frontend
docker compose up -d frontend
```

## Rebuild everything

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## Check ports

```bash
ss -tulpn
```

---

# 🧪 Testing Strategy

A mature CI/CD implementation can use:

```text
Unit Tests
    │
    ▼
API Tests
    │
    ▼
Integration Tests
    │
    ▼
Frontend Tests
    │
    ▼
Docker Build
    │
    ▼
Deployment Test
```

---

# 🔒 Production Security Roadmap

For real financial workloads, additional security controls are required:

- HTTPS/TLS
- Strong password policies
- Secure password hashing
- Authentication hardening
- Role-based access control
- API authorization
- Rate limiting
- Input validation
- Secure headers
- Audit logging
- Secret rotation
- Database encryption
- Backups
- Disaster recovery
- Dependency scanning
- Container image scanning
- Infrastructure security
- Independent security review

> This project is an engineering and portfolio implementation. It should not be used for real financial transactions without appropriate security, compliance, testing and regulatory controls.

---

# 📈 DevOps Improvement Roadmap

## Phase 1 — Application

- Frontend
- Backend
- Database
- Authentication

## Phase 2 — Containerization

- Dockerfile
- Docker image
- Docker Compose
- Container networking

## Phase 3 — Cloud

- AWS EC2
- Security Groups
- Cloud deployment

## Phase 4 — CI/CD

- GitHub Actions or Jenkins
- Automated builds
- Docker image publishing
- Automated deployment

## Phase 5 — Infrastructure as Code

- Terraform
- AWS networking
- IAM
- EC2
- ECR

## Phase 6 — Kubernetes

- Kubernetes manifests
- Services
- Deployments
- ConfigMaps
- Secrets
- Ingress

## Phase 7 — Observability

- CloudWatch
- Prometheus
- Grafana
- Centralized logging

---

# 💼 Resume Description

### NovaPay Banking — Full-Stack DevOps & Cloud Project

> Built and containerized a full-stack digital banking application using React/Vite and Node.js/Express, implementing authentication, password recovery, KYC, transaction, ticket, withdrawal, booking and administrative workflows. Dockerized frontend and backend services, orchestrated them with Docker Compose, managed source code using Git/GitHub and deployed the application in a Linux/AWS cloud environment.

### Skills Demonstrated

```text
DevOps
Cloud
AWS
Linux
Docker
Docker Compose
Git
GitHub
React
Vite
Node.js
Express.js
REST APIs
CI/CD
Application Deployment
```

---

# 🗺️ Future Enhancements

- [ ] GitHub Actions CI/CD
- [ ] Jenkins pipeline
- [ ] Docker Hub / AWS ECR integration
- [ ] Nginx reverse proxy
- [ ] HTTPS / SSL
- [ ] Custom domain
- [ ] AWS Load Balancer
- [ ] CloudWatch monitoring
- [ ] Centralized logging
- [ ] Prometheus
- [ ] Grafana
- [ ] Automated backups
- [ ] Terraform infrastructure
- [ ] Kubernetes deployment
- [ ] AWS EKS
- [ ] Blue/Green deployment
- [ ] Rolling deployment
- [ ] Disaster recovery automation
- [ ] Automated security scanning

---

# 🧑‍💻 Developer

## Nitin Rathod

**DevOps & Cloud Engineering | Full-Stack Application Development**

Areas of interest:

- DevOps
- Cloud Computing
- AWS
- Linux
- Docker
- Kubernetes
- CI/CD
- Infrastructure as Code
- Application Deployment
- Full-Stack Development

---

# 📌 Repository

**Repository Name:**

```text
novapay-banking-devops
```

**Default Branch:**

```text
main
```

---

# 📜 License

This project is intended for educational, portfolio and engineering demonstration purposes.

Production financial systems require appropriate legal, security, privacy, compliance, reliability and regulatory controls.

---

# ⭐ Final Note

NovaPay demonstrates an end-to-end engineering approach:

```text
Code
 ↓
Build
 ↓
Version Control
 ↓
Containerize
 ↓
Deploy
 ↓
Monitor
 ↓
Improve
```

## 🚀 NovaPay — Build. Deploy. Secure. Scale.

**Full-Stack Application + DevOps + Cloud Engineering**
