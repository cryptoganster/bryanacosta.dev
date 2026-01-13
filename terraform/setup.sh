#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  GitHub Branch Protection Setup with Terraform            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Terraform is not installed${NC}"
    echo ""
    echo "Install Terraform:"
    echo "  macOS:   brew install terraform"
    echo "  Linux:   https://developer.hashicorp.com/terraform/downloads"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Terraform is installed: $(terraform version | head -n 1)${NC}"
echo ""

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  GITHUB_TOKEN environment variable is not set${NC}"
    echo ""
    echo "You need a GitHub Personal Access Token with these permissions:"
    echo "  - repo (Full control of private repositories)"
    echo "  - admin:repo_hook (Full control of repository hooks)"
    echo ""
    echo "Create a token at: https://github.com/settings/tokens/new"
    echo ""
    read -p "Enter your GitHub token: " github_token
    export GITHUB_TOKEN="$github_token"
    echo ""
    echo -e "${GREEN}✅ GITHUB_TOKEN set for this session${NC}"
    echo ""
    echo "To persist it, add to your shell profile:"
    echo "  echo 'export GITHUB_TOKEN=\"$github_token\"' >> ~/.zshrc"
    echo ""
else
    echo -e "${GREEN}✅ GITHUB_TOKEN is set${NC}"
    echo ""
fi

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo -e "${YELLOW}⚠️  terraform.tfvars not found${NC}"
    echo ""
    
    if [ -f "terraform.tfvars.example" ]; then
        echo "Copying terraform.tfvars.example to terraform.tfvars..."
        cp terraform.tfvars.example terraform.tfvars
        echo -e "${GREEN}✅ Created terraform.tfvars${NC}"
        echo ""
        echo -e "${YELLOW}📝 Please edit terraform.tfvars with your settings:${NC}"
        echo "  - github_owner: Your GitHub username or organization"
        echo "  - repository_name: Your repository name"
        echo "  - protected_branches: Branches to protect"
        echo ""
        read -p "Press Enter to open terraform.tfvars in your editor..."
        ${EDITOR:-nano} terraform.tfvars
        echo ""
    else
        echo -e "${RED}❌ terraform.tfvars.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ terraform.tfvars exists${NC}"
    echo ""
fi

# Initialize Terraform
echo -e "${BLUE}🔧 Initializing Terraform...${NC}"
terraform init
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Terraform initialization failed${NC}"
    exit 1
fi
echo ""

# Validate configuration
echo -e "${BLUE}✅ Validating Terraform configuration...${NC}"
terraform validate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Terraform validation failed${NC}"
    exit 1
fi
echo ""

# Show plan
echo -e "${BLUE}📋 Showing planned changes...${NC}"
echo ""
terraform plan
echo ""

# Ask to apply
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
read -p "Do you want to apply these changes? (yes/no): " apply_changes

if [ "$apply_changes" = "yes" ]; then
    echo ""
    echo -e "${BLUE}🚀 Applying changes...${NC}"
    terraform apply
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║  ✅ Branch protection rules applied successfully!          ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Next steps:"
        echo "  1. Verify rules in GitHub: https://github.com/$(terraform output -raw repository_full_name 2>/dev/null)/settings/branches"
        echo "  2. Create a pull request to test the rules"
        echo "  3. Ensure GitHub Actions workflows are set up"
        echo ""
    else
        echo -e "${RED}❌ Failed to apply changes${NC}"
        exit 1
    fi
else
    echo ""
    echo -e "${YELLOW}⏭️  Skipped applying changes${NC}"
    echo ""
    echo "To apply later, run:"
    echo "  terraform apply"
    echo ""
fi
