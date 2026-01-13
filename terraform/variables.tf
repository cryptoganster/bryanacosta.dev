variable "github_token" {
  description = "GitHub Personal Access Token with repo permissions"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub organization or user name"
  type        = string
}

variable "repository_name" {
  description = "Name of the GitHub repository"
  type        = string
  default     = "bryanacosta.dev"
}

variable "protected_branches" {
  description = "List of branches to protect"
  type        = list(string)
  default     = ["main", "develop"]
}

variable "require_code_owner_reviews" {
  description = "Require review from code owners"
  type        = bool
  default     = false
}

variable "required_approving_review_count" {
  description = "Number of required approving reviews"
  type        = number
  default     = 1
}

variable "dismiss_stale_reviews" {
  description = "Dismiss stale pull request approvals when new commits are pushed"
  type        = bool
  default     = true
}

variable "require_conversation_resolution" {
  description = "Require all conversations to be resolved before merging"
  type        = bool
  default     = true
}

variable "required_status_checks" {
  description = "List of required status checks"
  type        = list(string)
  default = [
    "type-check",
    "lint",
    "format-check"
  ]
}

variable "enforce_admins" {
  description = "Enforce restrictions for administrators"
  type        = bool
  default     = false
}

variable "allow_force_pushes" {
  description = "Allow force pushes to the branch"
  type        = bool
  default     = false
}

variable "allow_deletions" {
  description = "Allow deletion of the branch"
  type        = bool
  default     = false
}

variable "require_linear_history" {
  description = "Require linear history (no merge commits)"
  type        = bool
  default     = false
}

variable "require_signed_commits" {
  description = "Require signed commits"
  type        = bool
  default     = false
}
