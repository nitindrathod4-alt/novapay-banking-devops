terraform {
  backend "local" {}
}

data "aws_caller_identity" "current" {}

data "aws_availability_zones" "available" {}

locals {
  project_name = "novapay"
  environment  = "dev"

  common_tags = {
    Project     = local.project_name
    Environment = local.environment
    ManagedBy   = "Terraform"
  }
}