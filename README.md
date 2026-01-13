# Portfolio Hero V2

_Automatically synced with your [v0.app](https://v0.app) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/bryanacosta/v0-portfolio-hero-v2)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/nGwFiNLGavI)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/bryanacosta/v0-portfolio-hero-v2](https://vercel.com/bryanacosta/v0-portfolio-hero-v2)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/nGwFiNLGavI](https://v0.app/chat/nGwFiNLGavI)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Development

### Pre-commit Hooks

This project uses Husky and lint-staged to run automated checks before each commit:

- **TypeScript Type Check**: Ensures no type errors exist
- **ESLint**: Lints and auto-fixes code issues
- **Prettier**: Formats code according to project standards

The pre-commit hook will automatically run when you commit changes. If any check fails, the commit will be blocked until the issues are fixed.

### Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting without modifying files
pnpm type-check       # Run TypeScript type checking

# Building
pnpm build            # Create production build
pnpm start            # Start production server
```

### Manual Quality Checks

You can run the same checks that the pre-commit hook runs manually:

```bash
# Run all checks
pnpm type-check && pnpm lint && pnpm format:check

# Or run them individually
pnpm type-check       # Check TypeScript types
pnpm lint             # Check for linting issues
pnpm format:check     # Check code formatting
```

## Infrastructure as Code

### Branch Protection Rules

This project uses Terraform to manage GitHub branch protection rules. See [`terraform/README.md`](terraform/README.md) for detailed instructions.

**Quick Start:**

```bash
# 1. Set GitHub token
export GITHUB_TOKEN="ghp_your_token_here"

# 2. Configure settings
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your settings

# 3. Apply branch protection
make setup
make plan
make apply
```

**Protected Branches:** `main`, `develop`

**Required Checks:**

- ✅ TypeScript type check
- ✅ ESLint
- ✅ Prettier format check

**Pull Request Requirements:**

- 1 approving review required
- All conversations must be resolved
- Branch must be up to date with base branch
