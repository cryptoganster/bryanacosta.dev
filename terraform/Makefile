.PHONY: help init plan apply destroy validate fmt clean

# Environment variable (default: development)
ENV ?= development

# Default target
help:
	@echo "Terraform Branch Protection Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make init      - Initialize Terraform"
	@echo "  make plan      - Show planned changes"
	@echo "  make apply     - Apply changes"
	@echo "  make destroy   - Destroy all resources"
	@echo "  make validate  - Validate Terraform files"
	@echo "  make fmt       - Format Terraform files"
	@echo "  make clean     - Clean Terraform files"
	@echo ""
	@echo "Environment-specific commands:"
	@echo "  make plan ENV=production    - Plan for production"
	@echo "  make apply ENV=production   - Apply for production"
	@echo "  make plan ENV=development   - Plan for development (default)"
	@echo ""
	@echo "Prerequisites:"
	@echo "  1. Copy terraform.tfvars.example to terraform.tfvars"
	@echo "  2. Edit terraform.tfvars with your settings"
	@echo "  3. Set GITHUB_TOKEN environment variable"
	@echo ""
	@echo "Example:"
	@echo "  export GITHUB_TOKEN='ghp_your_token_here'"
	@echo "  make init"
	@echo "  make plan ENV=development"
	@echo "  make apply ENV=development"

# Initialize Terraform
init:
	@echo "🔧 Initializing Terraform..."
	terraform init

# Show planned changes
plan:
	@echo "📋 Planning changes for $(ENV) environment..."
	@if [ -f "environments/$(ENV).tfvars" ]; then \
		terraform plan -var-file="environments/$(ENV).tfvars"; \
	else \
		terraform plan; \
	fi

# Apply changes
apply:
	@echo "🚀 Applying changes for $(ENV) environment..."
	@if [ -f "environments/$(ENV).tfvars" ]; then \
		terraform apply -var-file="environments/$(ENV).tfvars"; \
	else \
		terraform apply; \
	fi

# Apply changes without confirmation (use with caution)
apply-auto:
	@echo "🚀 Applying changes (auto-approve) for $(ENV) environment..."
	@if [ -f "environments/$(ENV).tfvars" ]; then \
		terraform apply -auto-approve -var-file="environments/$(ENV).tfvars"; \
	else \
		terraform apply -auto-approve; \
	fi

# Destroy all resources
destroy:
	@echo "💥 Destroying resources..."
	terraform destroy

# Validate Terraform files
validate:
	@echo "✅ Validating Terraform files..."
	terraform validate

# Format Terraform files
fmt:
	@echo "🎨 Formatting Terraform files..."
	terraform fmt -recursive

# Clean Terraform files
clean:
	@echo "🧹 Cleaning Terraform files..."
	rm -rf .terraform
	rm -f .terraform.lock.hcl
	rm -f terraform.tfstate
	rm -f terraform.tfstate.backup
	rm -f tfplan

# Show current state
show:
	@echo "📊 Showing current state..."
	terraform show

# List resources
list:
	@echo "📝 Listing resources..."
	terraform state list

# Show outputs
output:
	@echo "📤 Showing outputs..."
	terraform output

# Refresh state
refresh:
	@echo "🔄 Refreshing state..."
	terraform refresh

# Check if GITHUB_TOKEN is set
check-token:
	@if [ -z "$$GITHUB_TOKEN" ]; then \
		echo "❌ Error: GITHUB_TOKEN environment variable is not set"; \
		echo ""; \
		echo "Set it with:"; \
		echo "  export GITHUB_TOKEN='ghp_your_token_here'"; \
		exit 1; \
	else \
		echo "✅ GITHUB_TOKEN is set"; \
	fi

# Full setup workflow
setup: check-token init validate
	@echo "✅ Setup complete! Run 'make plan' to see changes."
