# NovaPay — AWS DevOps Architecture

## Overview

NovaPay is a full-stack digital banking application. The project can be extended from the current Docker + AWS EC2 deployment into a more production-oriented AWS architecture.

The goal is to use AWS services for:

- Container image management
- Container orchestration
- Application load balancing
- Database management
- File storage
- Monitoring and logging
- Secrets management
- IAM security
- Networking
- CI/CD
- HTTPS and custom domain management

---

# 1. Target AWS Architecture

```text
                         ┌──────────────────┐
                         │      GitHub      │
                         │   Source Code    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  CodePipeline    │
                         │      CI/CD       │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   CodeBuild      │
                         │ Build & Test      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   Amazon ECR      │
                         │ Docker Images     │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │      ECS Fargate         │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │ Frontend Container  │  │
                    │  └────────────────────┘  │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │ Backend Container   │  │
                    │  └────────────────────┘  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │ Application Load │
                       │    Balancer      │
                       └───────┬──────────┘
                               │
                               ▼
                             Users


 Backend ───────────────► Amazon RDS
                              │
                              ▼
                         Application DB

 Frontend/Backend ──────► Amazon S3
                              │
                              ▼
                       KYC / Documents

 Applications ──────────► CloudWatch
                              │
                              ▼
                         Logs / Metrics

 Application Secrets ───► Secrets Manager

 AWS Permissions ───────► IAM

 Network ────────────────► VPC

 Domain ────────────────► Route 53
                              │
                              ▼
                            ACM
                           HTTPS
```

---

# 2. AWS Services Used

| AWS Service | NovaPay Usage |
|---|---|
| Amazon EC2 | Initial server-based deployment |
| Amazon ECR | Store Docker images |
| Amazon ECS | Run containerized application |
| AWS Fargate | Serverless container compute |
| Application Load Balancer | Distribute application traffic |
| Amazon RDS | Managed production database |
| Amazon S3 | Store KYC documents/uploads |
| Amazon CloudWatch | Logs, metrics and monitoring |
| AWS IAM | Permissions and access control |
| AWS Secrets Manager | Store database/API secrets |
| Amazon VPC | Network isolation |
| Route 53 | Custom domain |
| AWS Certificate Manager | HTTPS/SSL |
| AWS CodeBuild | Build and test application |
| AWS CodePipeline | CI/CD pipeline |

---

# 3. Phase 1 — EC2 Deployment

The first deployment can use an Ubuntu EC2 instance.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
AWS EC2
    │
    ▼
Docker
    │
    ├── Frontend Container
    │      Port 5173
    │
    └── Backend Container
           Port 5000
```

Commands:

```bash
ssh ubuntu@<EC2-IP>

cd ~/Project1A-DevOps-CloudEngineer-Nitin-Rathod

docker compose build

docker compose up -d

docker compose ps
```

Check logs:

```bash
docker compose logs --tail=100 frontend
docker compose logs --tail=100 backend
```

---

# 4. Phase 2 — Amazon ECR

Instead of keeping Docker images only on the EC2 server, images can be stored in Amazon ECR.

```text
Source Code
     │
     ▼
Docker Build
     │
     ▼
Docker Image
     │
     ▼
Amazon ECR
```

Create separate repositories:

```text
novapay-frontend
novapay-backend
```

Example workflow:

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com
```

Build:

```bash
docker build -t novapay-frontend ./frontend
docker build -t novapay-backend ./backend
```

Tag:

```bash
docker tag novapay-frontend:latest <AWS_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/novapay-frontend:latest

docker tag novapay-backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/novapay-backend:latest
```

Push:

```bash
docker push <AWS_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/novapay-frontend:latest

docker push <AWS_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/novapay-backend:latest
```

---

# 5. Phase 3 — ECS Fargate

ECS can be used to run NovaPay containers.

```text
Amazon ECR
    │
    ▼
ECS Cluster
    │
    ├── Frontend Service
    │
    └── Backend Service
          │
          ▼
       Fargate
```

Advantages:

- No need to manage Docker hosts manually
- Container orchestration
- Easy scaling
- AWS-managed infrastructure
- Better production deployment model

---

# 6. Frontend and Backend Services

### Frontend

```text
ECS Service
     │
     ▼
Fargate Task
     │
     ▼
NovaPay Frontend Container
```

### Backend

```text
ECS Service
     │
     ▼
Fargate Task
     │
     ▼
NovaPay Backend Container
```

The services can be deployed separately so that they can be scaled independently.

---

# 7. Application Load Balancer

ALB can provide a single public entry point.

```text
                    Internet
                       │
                       ▼
              Application Load
                 Balancer
                  /                        /                         ▼           ▼
          Frontend       Backend
           Service        Service
```

Example routing concept:

```text
/        → Frontend
/api/*   → Backend
```

Benefits:

- Single public endpoint
- Traffic distribution
- Health checks
- Integration with ECS
- HTTPS support

---

# 8. Amazon RDS

For production database management, Amazon RDS can be used instead of running the database manually on the EC2 server.

```text
ECS Backend
     │
     ▼
Amazon RDS
     │
     ▼
NovaPay Database
```

Benefits:

- Managed database service
- Automated backups
- Monitoring
- Easier maintenance
- High availability options

The backend should access the database using environment variables or AWS Secrets Manager rather than hard-coded credentials.

---

# 9. Amazon S3

S3 can be used for user-uploaded documents and other files.

Example:

```text
User
  │
  ▼
NovaPay
  │
  ▼
Backend
  │
  ▼
Amazon S3
  │
  ├── KYC Documents
  ├── Profile Documents
  └── Other Uploads
```

S3 should be protected using appropriate IAM permissions and bucket policies.

---

# 10. AWS Secrets Manager

Sensitive configuration should not be stored directly in GitHub.

Examples:

```text
Database Password
JWT Secret
API Credentials
Third-party Credentials
```

Architecture:

```text
ECS Backend
     │
     ▼
Secrets Manager
     │
     ▼
Application Secrets
```

This is better than committing `.env` files to GitHub.

---

# 11. IAM

IAM controls which AWS resources the application and deployment process can access.

Example:

```text
Developer
    │
    ▼
IAM User / Role
    │
    ├── ECR
    ├── ECS
    ├── CloudWatch
    └── Other Required Services
```

Principle:

> Give each user, service or task only the permissions it actually requires.

---

# 12. VPC

NovaPay production infrastructure can be placed inside an AWS VPC.

```text
                    VPC
                     │
          ┌──────────┴──────────┐
          │                     │
     Public Subnet         Private Subnet
          │                     │
          ▼                     ▼
         ALB              ECS / RDS
```

A production design should avoid exposing the database directly to the public internet.

---

# 13. CloudWatch

CloudWatch can be used for application and infrastructure monitoring.

```text
ECS Containers
      │
      ▼
CloudWatch Logs
      │
      ├── Frontend Logs
      ├── Backend Logs
      └── Error Logs
```

Useful monitoring areas:

- Container logs
- CPU utilization
- Memory utilization
- Request metrics
- Application errors
- Health checks

---

# 14. Route 53

A custom domain can be connected to the application using Route 53.

```text
User
  │
  ▼
novapay.example.com
  │
  ▼
Route 53
  │
  ▼
Application Load Balancer
  │
  ▼
NovaPay
```

---

# 15. HTTPS with ACM

AWS Certificate Manager can provide an SSL/TLS certificate.

```text
User
  │
  │ HTTPS
  ▼
Route 53
  │
  ▼
ALB + ACM Certificate
  │
  ▼
NovaPay
```

This allows the application to be accessed securely over HTTPS.

---

# 16. CI/CD with CodePipeline and CodeBuild

The deployment pipeline can be automated.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
CodePipeline
    │
    ▼
CodeBuild
    │
    ├── Install Dependencies
    ├── Run Tests
    ├── Build Frontend
    ├── Build Docker Images
    └── Push Images to ECR
                │
                ▼
             ECS
                │
                ▼
          New Deployment
```

---

# 17. CI/CD Flow

A typical deployment flow:

```text
1. Developer changes code
        ↓
2. Push to GitHub
        ↓
3. CodePipeline detects change
        ↓
4. CodeBuild starts
        ↓
5. Dependencies installed
        ↓
6. Application tested
        ↓
7. Docker images built
        ↓
8. Images pushed to ECR
        ↓
9. ECS deployment triggered
        ↓
10. New containers started
        ↓
11. Health checks performed
        ↓
12. Application available
```

---

# 18. Recommended Final Architecture

```text
                         GitHub
                            │
                            ▼
                     CodePipeline
                            │
                            ▼
                       CodeBuild
                            │
                     Docker Build
                            │
                            ▼
                          ECR
                    ┌───────┴───────┐
                    │               │
             Frontend Image    Backend Image
                    │               │
                    └───────┬───────┘
                            │
                            ▼
                       ECS Fargate
                    ┌───────┴───────┐
                    │               │
               Frontend         Backend
                    │               │
                    └───────┬───────┘
                            │
                            ▼
                           ALB
                            │
                            ▼
                          Users

Backend ───────────────► RDS
Backend ───────────────► S3
ECS ───────────────────► CloudWatch
ECS ───────────────────► Secrets Manager

                         VPC
                          │
                 Private/Public Subnets

                         Route 53
                            │
                            ▼
                           ALB
                            │
                           ACM
                         HTTPS
```

---

# 19. Project Implementation Roadmap

## Stage 1 — Current

```text
GitHub
  ↓
EC2
  ↓
Docker
  ↓
Docker Compose
  ↓
Frontend + Backend
```

## Stage 2

```text
GitHub
  ↓
Docker
  ↓
ECR
  ↓
ECS Fargate
```

## Stage 3

```text
ECS
 ↓
ALB
 ↓
HTTPS
 ↓
Route 53 + ACM
```

## Stage 4

```text
Backend
 ├── RDS
 ├── S3
 └── Secrets Manager
```

## Stage 5

```text
GitHub
   ↓
CodePipeline
   ↓
CodeBuild
   ↓
ECR
   ↓
ECS
   ↓
CloudWatch
```

---

# 20. Interview Explanation

If the interviewer asks:

**“How would you deploy NovaPay on AWS?”**

Say:

> I initially deployed NovaPay on an Ubuntu EC2 instance using Docker and Docker Compose. For a more production-oriented architecture, I would move the Docker images to Amazon ECR and run the frontend and backend using ECS Fargate. I would place an Application Load Balancer in front of the services and use Route 53 with ACM for the domain and HTTPS.
>
> For persistent data, I would use Amazon RDS, while user documents such as KYC uploads could be stored in Amazon S3. I would use AWS Secrets Manager for sensitive configuration and IAM for least-privilege access. CloudWatch would be used for logs and monitoring.
>
> Finally, I would automate the deployment using GitHub, AWS CodePipeline and CodeBuild so that a code push can automatically build, test, create Docker images, push them to ECR and deploy the new version to ECS.

---

# 21. Strong DevOps Interview Statement

> NovaPay is not only a development project for me; I am using it as an end-to-end DevOps project. I started with Linux and EC2 deployment, containerized the application using Docker, managed multiple services with Docker Compose, and then designed a scalable AWS architecture using ECR, ECS Fargate, ALB, RDS, S3, CloudWatch, IAM, Secrets Manager, VPC, Route 53 and ACM. The next stage is automating the complete deployment through CI/CD.

---

# 22. Important Security Rules

Never commit:

```text
.env
Passwords
Database Credentials
JWT Secrets
AWS Access Keys
Private Keys
API Secrets
```

Use:

```text
AWS Secrets Manager
IAM Roles
Environment Variables
VPC Security
Private Subnets
Security Groups
HTTPS
```

---

# 23. Final AWS Stack

```text
AWS
│
├── VPC
│
├── IAM
│
├── EC2
│
├── ECR
│
├── ECS
│   └── Fargate
│
├── ALB
│
├── RDS
│
├── S3
│
├── CloudWatch
│
├── Secrets Manager
│
├── Route 53
│
├── ACM
│
├── CodeBuild
│
└── CodePipeline
```

---

# 24. Resume-Level Description

> **NovaPay — Cloud & DevOps Banking Application**
>
> Deployed and containerized a full-stack digital banking application using Docker and AWS. Implemented a production-oriented architecture using Amazon ECR, ECS Fargate, Application Load Balancer, Amazon RDS, Amazon S3, CloudWatch, IAM, Secrets Manager and VPC. Designed a CI/CD workflow using GitHub, AWS CodeBuild and CodePipeline for automated build, container image management and deployment. Implemented secure configuration management, container monitoring, application logging and cloud-based deployment practices.

---

# 25. Technologies for Resume

```text
AWS:
EC2, ECR, ECS, Fargate, ALB, RDS, S3,
CloudWatch, IAM, Secrets Manager, VPC,
Route 53, ACM, CodeBuild, CodePipeline

DevOps:
Git, GitHub, Docker, Docker Compose, CI/CD

Frontend:
React, Vite

Backend:
Node.js, REST API

OS:
Ubuntu Linux
```
 readme me create kr git hub la thevayla