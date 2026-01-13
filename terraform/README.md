# GitHub Branch Protection with Terraform

Esta configuración de Terraform gestiona las reglas de protección de ramas (branch protection rules) para el repositorio de GitHub.

## 📋 Requisitos Previos

1. **Terraform** instalado (>= 1.0)

   ```bash
   # macOS
   brew install terraform

   # Verificar instalación
   terraform version
   ```

2. **GitHub Personal Access Token** con permisos:
   - `repo` (Full control of private repositories)
   - `admin:repo_hook` (Full control of repository hooks)

   Crear token en: https://github.com/settings/tokens/new

## 🚀 Configuración Inicial

### 1. Copiar archivo de variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

### 2. Editar `terraform.tfvars`

```hcl
github_owner      = "tu-usuario-github"
repository_name   = "bryanacosta.dev"

protected_branches = ["main", "develop"]

required_approving_review_count = 1
dismiss_stale_reviews           = true

required_status_checks = [
  "type-check",
  "lint",
  "format-check"
]

require_conversation_resolution = true
```

### 3. Configurar GitHub Token

**Opción A: Variable de entorno (Recomendado)**

```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

**Opción B: Archivo terraform.tfvars**

```hcl
github_token = "ghp_your_token_here"
```

⚠️ **Nunca commitear el token al repositorio**

## 📦 Uso

### Inicializar Terraform

```bash
cd terraform
terraform init
```

### Ver cambios planeados

```bash
terraform plan
```

### Aplicar configuración

```bash
terraform apply
```

Terraform mostrará los cambios que se aplicarán. Escribe `yes` para confirmar.

### Destruir recursos (remover protecciones)

```bash
terraform destroy
```

## 🔧 Configuración de Branch Protection

### Reglas Aplicadas

#### Pull Request Reviews

- ✅ Requiere 1 aprobación antes de merge
- ✅ Descarta aprobaciones obsoletas cuando se pushean nuevos commits
- ✅ Requiere aprobación del último push
- ❌ No requiere revisión de code owners (configurable)

#### Status Checks

- ✅ Requiere que las ramas estén actualizadas antes de merge
- ✅ Checks requeridos:
  - `type-check` - Verificación de tipos TypeScript
  - `lint` - Linting con ESLint
  - `format-check` - Verificación de formato con Prettier

#### Restricciones Adicionales

- ✅ Requiere que todas las conversaciones estén resueltas
- ❌ No permite force pushes
- ❌ No permite eliminación de ramas
- ❌ No requiere historial lineal (permite merge commits)
- ❌ No requiere commits firmados
- ❌ No aplica restricciones a administradores

### Personalizar Configuración

Edita `terraform.tfvars` para cambiar:

```hcl
# Proteger más ramas
protected_branches = ["main", "develop", "staging"]

# Requerir más aprobaciones
required_approving_review_count = 2

# Requerir code owner reviews
require_code_owner_reviews = true

# Agregar más status checks
required_status_checks = [
  "type-check",
  "lint",
  "format-check",
  "test",
  "build"
]

# Requerir historial lineal (no merge commits)
require_linear_history = true

# Requerir commits firmados
require_signed_commits = true

# Aplicar restricciones a administradores
enforce_admins = true
```

## 🔄 Integración con CI/CD

### GitHub Actions

Para que los status checks funcionen, necesitas configurar GitHub Actions:

```yaml
# .github/workflows/checks.yml
name: Code Quality Checks

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  type-check:
    name: type-check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm type-check

  lint:
    name: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint

  format-check:
    name: format-check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm format:check
```

## 📊 Verificar Estado

### Ver recursos creados

```bash
terraform show
```

### Ver outputs

```bash
terraform output
```

### Listar estado

```bash
terraform state list
```

## 🔐 Mejores Prácticas

1. **Nunca commitear tokens**: Usa variables de entorno o servicios de secrets
2. **Usar remote state**: Para equipos, configura backend remoto (S3, Terraform Cloud)
3. **Revisar cambios**: Siempre ejecuta `terraform plan` antes de `apply`
4. **Documentar cambios**: Mantén este README actualizado con cambios de configuración
5. **Versionar configuración**: Commitea archivos `.tf` pero no `.tfvars`

## 🐛 Troubleshooting

### Error: "Resource not found"

- Verifica que el token tenga permisos correctos
- Verifica que `github_owner` y `repository_name` sean correctos

### Error: "Insufficient permissions"

- El token necesita permisos `repo` y `admin:repo_hook`
- Regenera el token con los permisos correctos

### Status checks no aparecen

- Los status checks deben ejecutarse al menos una vez antes de poder requerirlos
- Ejecuta un PR o push para que GitHub Actions cree los checks

## 📚 Referencias

- [Terraform GitHub Provider](https://registry.terraform.io/providers/integrations/github/latest/docs)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
