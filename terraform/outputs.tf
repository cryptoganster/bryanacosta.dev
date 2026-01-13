output "repository_id" {
  description = "The Node ID of the repository"
  value       = data.github_repository.repo.node_id
}

output "repository_full_name" {
  description = "The full name of the repository"
  value       = data.github_repository.repo.full_name
}

output "protected_branches" {
  description = "List of protected branches"
  value       = var.protected_branches
}

output "branch_protection_rules" {
  description = "Branch protection rules applied"
  value = {
    for branch in var.protected_branches : branch => {
      required_reviews                = var.required_approving_review_count
      dismiss_stale_reviews           = var.dismiss_stale_reviews
      require_code_owner_reviews      = var.require_code_owner_reviews
      required_status_checks          = var.required_status_checks
      require_conversation_resolution = var.require_conversation_resolution
      enforce_admins                  = var.enforce_admins
      allow_force_pushes              = var.allow_force_pushes
      allow_deletions                 = var.allow_deletions
      require_linear_history          = var.require_linear_history
      require_signed_commits          = var.require_signed_commits
    }
  }
}
