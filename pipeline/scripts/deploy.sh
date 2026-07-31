#!/bin/bash

echo "Starting NovaPay deployment..."

kubectl apply -f pipeline/helm/

echo "Waiting for deployment..."

kubectl rollout status deployment/banking-app

echo "Deployment completed successfully."