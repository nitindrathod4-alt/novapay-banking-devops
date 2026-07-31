output "cluster_name" {
  description = "EKS Cluster Name"
  value       = var.cluster_name
}

output "aws_region" {
  description = "AWS Region"
  value       = var.aws_region
}

output "node_instance_type" {
  description = "Worker Node Instance Type"
  value       = var.node_instance_type
}