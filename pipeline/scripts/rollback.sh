#!/bin/bash

echo "Rolling back deployment..."

kubectl rollout undo deployment/banking-app

kubectl rollout status deployment/banking-app

echo "Rollback completed successfully."