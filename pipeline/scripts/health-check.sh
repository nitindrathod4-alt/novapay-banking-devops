#!/bin/bash

echo "Checking Pods..."
kubectl get pods

echo ""

echo "Checking Services..."
kubectl get svc

echo ""

echo "Checking Deployment..."
kubectl get deployments

echo ""

echo "Health check completed."