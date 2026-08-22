# NovaPay Banking DevOps — Complete Click-to-Click Deployment Runbook

> **Scope:** Deployment and DevOps documentation only. This document does **not** modify application code.
>
> **Repository:** `nitindrathod4-alt/novapay-banking-devops`
>
> **Source of truth:** This runbook documents the repository's existing deployment assets: `.github/workflows/ci-cd.yml`, `docker-compose.yml`, `kubernetes/`, `pipeline/helm/`, `pipeline/scripts/`, `pipeline/terraform/`, `pipeline/policies/`, `dashboards/`, `docs/`, and `evidence/`.
>
> **Security:** Never commit real passwords, MongoDB URIs, JWT secrets, cloud credentials, kubeconfig files, API keys, or other secrets.

---

## 1. Project Deployment Flow

```text
Developer
   ↓
GitHub Repository
   ↓
GitHub Actions (ci-cd.yml)
   ↓
Install / Test / Build
   ↓
Docker Build
   ↓
Trivy Security Scan
   ↓
Container Registry
   ↓
Kubernetes / EKS
   ↓
Helm Deployment
   ↓
Health Check
   ↓
Monitoring / Grafana
```

Infrastructure and deployment assets already present in the repository include Kubernetes manifests, a Helm chart, Terraform EKS/VPC/IAM/security-group files, deployment/health/rollback scripts, policy files, a Grafana dashboard, and evidence screenshots. fileciteturn235file0

---

# 2. Repository Locations

| Purpose | Repository path |
|---|---|
| CI/CD | `.github/workflows/ci-cd.yml` |
| Backend | `backend/` |
| Frontend | `frontend/` |
| Local Docker | `docker-compose.yml` |
| Kubernetes | `kubernetes/` |
| Helm | `pipeline/helm/` |
| Terraform | `pipeline/terraform/` |
| Deployment scripts | `pipeline/scripts/` |
| Security policies | `pipeline/policies/` |
| Grafana dashboard | `dashboards/grafana/novapay-dashboard.json` |
| Deployment documentation | `docs/` |
| Evidence | `evidence/` |

The repository currently contains a dedicated CI/CD workflow and separate Kubernetes, Helm, Terraform, scripts, policies, dashboard and evidence areas. fileciteturn234file0 fileciteturn233file0 fileciteturn235file0

---

# 3. Step 1 — Clone Repository

### Run on your PC / Linux VM / Cloud Shell

```bash
git clone https://github.com/nitindrathod4-alt/novapay-banking-devops.git
cd novapay-banking-devops
git checkout main
git pull origin main
git status
```

Confirm the main folders:

```bash
ls
ls backend
ls frontend
ls kubernetes
ls pipeline
ls docs
```

---

# 4. Step 2 — Install Required Tools

Install/check the tools required by the deployment workflow:

```bash
git --version
node --version
npm --version
docker --version
docker compose version
aws --version
terraform --version
kubectl version --client
helm version
trivy --version
```

Required toolset:

- Git
- Node.js + npm
- Docker + Docker Compose
- AWS CLI
- Terraform
- kubectl
- Helm
- Trivy

**MongoDB does not need to be installed locally if the application uses MongoDB Atlas.**

---

# 5. Step 3 — Configure AWS

```bash
aws configure
```

Enter the AWS credentials/profile and region intended for this environment.

Verify the account:

```bash
aws sts get-caller-identity
aws configure get region
```

Do not continue if the returned AWS account is not the intended account.

---

# 6. Step 4 — MongoDB Atlas

If using MongoDB Atlas, create/configure the database before deploying the backend.

### Atlas sequence

```text
MongoDB Atlas
  ↓
Create account / sign in
  ↓
Create Project: NovaPay
  ↓
Create Database Cluster
  ↓
Create Database User
  ↓
Configure Network Access
  ↓
Connect → Drivers
  ↓
Copy MongoDB connection URI
```

Connection URI pattern:

```text
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>?retryWrites=true&w=majority
```

Never put the real URI into Git.

### Test the Atlas connection through the backend configuration

Use the environment variable expected by the existing backend configuration. Inspect it without changing code:

```bash
cat backend/config/db.js
```

Then create a local `.env` from the project's documented example/configuration if one exists:

```bash
ls -la backend
```

Add the required MongoDB value locally only. Do not commit it.

---

# 7. Step 5 — Local Backend Verification

```bash
cd backend
npm ci
```

Run the existing application start command from `backend/package.json`:

```bash
npm run
```

Then use the repository's configured start command, for example:

```bash
npm start
```

Return to the root when finished:

```bash
cd ..
```

Do not change application source code as part of deployment setup.

---

# 8. Step 6 — Local Frontend Verification

```bash
cd frontend
npm ci
npm run
```

Run the existing build command shown in `package.json`, typically:

```bash
npm run build
```

Return:

```bash
cd ..
```

---

# 9. Step 7 — Local Docker Compose

The repository contains `docker-compose.yml`. fileciteturn230file0

From the repository root:

```bash
docker compose config
docker compose build
docker compose up -d
docker compose ps
```

View logs:

```bash
docker compose logs --tail=200
```

Follow logs:

```bash
docker compose logs -f
```

Stop:

```bash
docker compose down
```

Do not use `docker compose down -v` unless intentionally deleting local persistent volumes.

---

# 10. Step 8 — Docker Image Check

List images:

```bash
docker images
```

Check running containers:

```bash
docker ps
```

If the project workflow uses Docker Hub, confirm the exact repository/image names from `.github/workflows/ci-cd.yml` before pushing.

---

# 11. Step 9 — Trivy Security Scan

Run against the exact images produced by the project:

```bash
trivy image <BACKEND_IMAGE>:<TAG>
trivy image <FRONTEND_IMAGE>:<TAG>
```

For a blocking HIGH/CRITICAL policy, use only when that policy is intended for the current pipeline:

```bash
trivy image --severity HIGH,CRITICAL --exit-code 1 <IMAGE>:<TAG>
```

Do not change the application's code to fix a scan finding unless explicitly requested; this runbook is deployment-only.

---

# 12. Step 10 — Terraform Infrastructure

The repository stores Terraform under `pipeline/terraform/`, including EKS, IAM, VPC, security groups, variables, outputs, provider and version files. fileciteturn235file0

Run from:

```bash
cd pipeline/terraform
```

Initialize:

```bash
terraform init
```

Format check:

```bash
terraform fmt -check
```

Validate:

```bash
terraform validate
```

Review:

```bash
terraform plan
```

**STOP and review the plan before applying.**

Apply:

```bash
terraform apply
```

Verify state/output:

```bash
terraform state list
terraform output
```

Return to root:

```bash
cd ../..
```

---

# 13. Step 11 — Verify EKS

List clusters:

```bash
aws eks list-clusters --region <AWS_REGION>
```

Configure kubectl:

```bash
aws eks update-kubeconfig \
  --region <AWS_REGION> \
  --name <EKS_CLUSTER_NAME>
```

Verify:

```bash
kubectl config current-context
kubectl cluster-info
kubectl get nodes -o wide
```

Nodes should be `Ready` before application deployment.

---

# 14. Step 12 — Kubernetes Deployment

The repository contains four Kubernetes manifests: backend Deployment/Service and frontend Deployment/Service. fileciteturn233file0

Preview:

```bash
kubectl apply --dry-run=client -f kubernetes/
```

Apply:

```bash
kubectl apply -f kubernetes/
```

Verify:

```bash
kubectl get deployments
kubectl get pods -o wide
kubectl get services
```

Watch:

```bash
kubectl get pods -w
```

---

# 15. Step 13 — Kubernetes Troubleshooting

### Pod not starting

```bash
kubectl get pods
kubectl describe pod <POD_NAME>
kubectl logs <POD_NAME> --tail=200
```

### Previous crashed container

```bash
kubectl logs <POD_NAME> --previous
```

### ImagePullBackOff

```bash
kubectl describe pod <POD_NAME>
```

Check image repository/tag and registry authentication.

### CrashLoopBackOff

```bash
kubectl logs <POD_NAME> --previous
kubectl describe pod <POD_NAME>
```

Check environment configuration, MongoDB connectivity, application startup and port configuration.

### Service has no endpoints

```bash
kubectl get svc
kubectl get endpoints
kubectl describe svc <SERVICE_NAME>
```

Check Service selectors against Pod labels.

---

# 16. Step 14 — Helm Deployment

The repository's Helm chart is under `pipeline/helm/`. fileciteturn235file0

Check chart:

```bash
helm lint pipeline/helm
```

Render before applying:

```bash
helm template novapay pipeline/helm
```

Install/upgrade:

```bash
helm upgrade --install novapay pipeline/helm --wait
```

Verify:

```bash
helm status novapay
helm history novapay
kubectl get pods
kubectl get svc
```

If the chart requires values, inspect first:

```bash
cat pipeline/helm/values.yaml
```

Use only the values defined by the current chart. Do not invent new application configuration keys.

---

# 17. Step 15 — Deployment Script

The repository already contains:

```text
pipeline/scripts/deploy.sh
pipeline/scripts/health-check.sh
pipeline/scripts/rollback.sh
```

These files are present in the repository. fileciteturn235file0

Inspect before execution:

```bash
cat pipeline/scripts/deploy.sh
cat pipeline/scripts/health-check.sh
cat pipeline/scripts/rollback.sh
```

If execution permissions are required:

```bash
chmod +x pipeline/scripts/*.sh
```

Run the existing deployment script only after reviewing its commands:

```bash
./pipeline/scripts/deploy.sh
```

Health check:

```bash
./pipeline/scripts/health-check.sh
```

Rollback when required:

```bash
./pipeline/scripts/rollback.sh
```

---

# 18. Step 16 — GitHub Actions

The repository has one workflow:

```text
.github/workflows/ci-cd.yml
```

The workflow is the repository's CI/CD entry point. fileciteturn234file0

Open:

```text
GitHub → NovaPay repository → Actions → CI/CD workflow
```

For a push-based run:

```bash
git add .
git commit -m "docs: update deployment documentation"
git push origin main
```

Then inspect:

```text
Actions → CI/CD → latest run
```

For a failure:

```text
Open failed job
  ↓
Open failed step
  ↓
Read the first real error
  ↓
Check the corresponding repository file
```

Do not treat a warning as the root failure when a later step contains the actual error.

---

# 19. Step 17 — GitHub Secrets / Variables

Open:

```text
GitHub
 → Settings
 → Secrets and variables
 → Actions
```

Configure only the secrets actually referenced by `.github/workflows/ci-cd.yml`.

Common examples may include:

```text
Docker registry credentials
AWS credentials or OIDC role configuration
MongoDB credentials/URI
Application secrets
```

**Do not blindly create variables that the workflow does not reference.** Read the workflow first.

---

# 20. Step 18 — Monitoring / Grafana

The repository contains a Grafana dashboard definition:

```text
dashboards/grafana/novapay-dashboard.json
```

and Grafana evidence under `evidence/screenshots/`. fileciteturn235file0

If Grafana is running in Kubernetes:

```bash
kubectl get pods -A | grep grafana
kubectl get svc -A | grep grafana
```

For temporary access:

```bash
kubectl port-forward svc/<GRAFANA_SERVICE> 3000:80 -n <NAMESPACE>
```

Open:

```text
http://localhost:3000
```

Import/use the repository dashboard JSON where appropriate.

---

# 21. Step 19 — Policies

The repository contains Rego/Kyverno policy files under:

```text
pipeline/policies/
```

including policies for privileged containers, latest tags, required resources and labels. fileciteturn235file0

Review:

```bash
ls pipeline/policies
```

Do not claim a policy is enforced in a live cluster unless the corresponding admission/policy engine has actually been installed and verified.

---

# 22. Step 20 — Production Verification

Run:

```bash
kubectl get nodes
kubectl get pods -o wide
kubectl get deployments
kubectl get services
helm list
```

Then verify the application through its actual exposed endpoint.

Example:

```bash
curl -I http://<APPLICATION_ENDPOINT>
```

Application smoke test:

```text
1. Open NovaPay UI
2. Login
3. Open dashboard
4. Check balance/transactions
5. Test transfer/deposit/withdrawal flow
6. Test KYC/admin flow where applicable
7. Check backend logs
8. Check MongoDB persistence
9. Check monitoring dashboard
```

Only mark the environment production-ready after the actual environment passes these checks.

---

# 23. Step 21 — Rollback

First check Helm history:

```bash
helm history novapay
```

Rollback:

```bash
helm rollback novapay <REVISION> --wait
```

Verify:

```bash
kubectl rollout status deployment/<DEPLOYMENT_NAME>
kubectl get pods
```

The repository also includes `pipeline/scripts/rollback.sh`; inspect it before execution. fileciteturn235file0

---

# 24. Step 22 — Final Security Checklist

```text
[ ] No .env committed
[ ] No AWS access keys committed
[ ] No MongoDB password committed
[ ] No JWT secret committed
[ ] No API key committed
[ ] GitHub Secrets configured where required
[ ] Registry credentials stored securely
[ ] Trivy scan reviewed
[ ] Kubernetes workloads use appropriate permissions
[ ] Latest-tag policy reviewed
[ ] Resource policy reviewed
[ ] Network access reviewed
[ ] Production database access restricted
```

---

# 25. Step 23 — Evidence / Screenshots

The repository already has an `evidence/` directory containing screenshots for GitHub Actions, repository structure, Helm, Terraform, Grafana and pipeline success. fileciteturn235file0

For future deployment evidence, add screenshots in:

```text
evidence/screenshots/
```

Recommended screenshots:

```text
[ IMAGE PLACEHOLDER ] GitHub Actions green
[ IMAGE PLACEHOLDER ] Docker images / registry
[ IMAGE PLACEHOLDER ] Terraform apply
[ IMAGE PLACEHOLDER ] EKS nodes Ready
[ IMAGE PLACEHOLDER ] kubectl get pods
[ IMAGE PLACEHOLDER ] kubectl get services
[ IMAGE PLACEHOLDER ] Helm release
[ IMAGE PLACEHOLDER ] Application UI
[ IMAGE PLACEHOLDER ] MongoDB Atlas cluster
[ IMAGE PLACEHOLDER ] Grafana dashboard
```

**Do not capture secrets in screenshots.**

---

# 26. Final GO / NO-GO Checklist

```text
[ ] Repository cloned
[ ] Required tools installed
[ ] AWS account verified
[ ] MongoDB Atlas configured
[ ] Local environment verified
[ ] Docker Compose verified
[ ] Docker images built
[ ] Trivy scan reviewed
[ ] Terraform initialized
[ ] Terraform validated
[ ] Terraform plan reviewed
[ ] AWS infrastructure applied
[ ] EKS cluster reachable
[ ] EKS nodes Ready
[ ] Kubernetes manifests validated
[ ] Kubernetes deployment healthy
[ ] Helm lint passed
[ ] Helm deployment healthy
[ ] Deployment script reviewed/executed where appropriate
[ ] Health check passed
[ ] GitHub Actions passed
[ ] Secrets configured securely
[ ] Monitoring verified
[ ] Application smoke test passed
[ ] Rollback path verified
[ ] Evidence screenshots updated
```

### GO

Proceed only when all production-required checks are green.

### NO-GO

Stop deployment if any critical item fails, especially:

```text
AWS identity
MongoDB connectivity
Image availability
Pod readiness
Application health
Security scan/policy
Secrets
Rollback readiness
```

---

# 27. Important Note

This document is a **deployment runbook**, not a claim that a live AWS production environment is currently running. The repository contains the deployment assets and evidence listed above; actual live deployment status must be verified by running the commands against the target environment.

**Application source code is intentionally not modified by this documentation work.**
