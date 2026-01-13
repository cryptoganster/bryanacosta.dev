terraform {
  required_version = ">= 1.0"

  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  # Uncomment and configure for remote state
  # backend "s3" {
  #   bucket = "your-terraform-state-bucket"
  #   key    = "github/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "github" {
  token = var.github_token
  owner = var.github_owner
}
