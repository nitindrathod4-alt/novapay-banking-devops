variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
  default     = "novapay-eks"
}

variable "node_instance_type" {
  description = "EKS Worker Node Instance Type"
  type        = string
  default     = "t3.medium"
}