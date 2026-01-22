# LCP Optimization - Largest Contentful Paint

## 🎉 Resultados Finales

### Antes de Optimización

- **LCP**: 13.788 segundos ❌ (Poor)
- **Rating**: Poor (> 4.0s)

### Después de Optimización

- **LCP**: 0.440 segundos ✅ (Good)
- **Rating**: Good (< 2.5s)
- **Mejora**: 96.8% más rápido
- **Reducción**: 13.348 segundos

---

## Medición Inicial

- **LCP**: 13.788 segundos ❌ (Poor)
- **Elemento LCP**: `<span>` con texto "into software for" (parte del RotatingText)
- **Rating**: Poor (> 4.0s)

## Umbrales de LCP

- ✅ **Good**: ≤ 2.5s
- ⚠️ **Needs Improvement**: 2.5s - 4.0s
- ❌ **Poor**: > 4.0s

---

## Optimizaciones Aplicadas

### 1. ✅ Lazy Loading del RotatingText

**Archivo**: `src/widgets/hero/ui/Hero.tsx`

```typescript
// Antes: Carga síncrona
import RotatingText from '@/shared/ui/rotating-text'

// Después: Lazy loading con fallback estático
const RotatingText = dynamic(() => import('@/shared/ui/rotating-text'), {
  ssr: false,
  loading: () => <span className="text-white">startups</span>,
})
```

**Impacto**: Reduce el JavaScript inicial, renderiza texto estático primero, mejora LCP.

---

### 2. ✅ Renderizado Condicional del RotatingText

**Archivo**: `src/widgets/hero/ui/Hero.tsx`

```typescript
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
  // ...
}, [])

// En el JSX:
{isClient ? (
  <RotatingText {...props} />
) : (
  <span className="text-white inline-flex">
    {rotatingWords[0]}
  </span>
)}
```

**Impacto**: Muestra texto estático inmediatamente, carga animación después del primer render.

---

### 3. ✅ Optimización de Imágenes con Next.js Image

**Archivo**: `src/shared/ui/avatar/Avatar.tsx`

```typescript
// Antes: <img> nativo
<img
  alt={t('avatarAlt')}
  className="w-full h-full object-cover"
  src="/professional-developer-portrait-dark-background.png"
/>

// Después: Next.js Image con priority
<Image
  alt={t('avatarAlt')}
  className="w-full h-full object-cover"
  src="/professional-developer-portrait-dark-background.png"
  width={176}
  height={176}
  priority
  quality={90}
  sizes="(max-width: 768px) 144px, 176px"
/>
```

**Impacto**: Optimización automática, carga prioritaria, responsive images.

---

### 4. ✅ Priority en Imágenes Críticas del Hero

**Archivo**: `src/widgets/hero/ui/Hero.tsx`

Agregado `priority` a:

- `/code-square-rounded.svg` (badge icon)
- `/lamp-icon.svg` (título)
- `/business-bag.svg` (CTA button)
- `/folder-file.svg` (CTA button)

**Impacto**: Carga prioritaria de imágenes above-the-fold.

---

### 5. ✅ Preload de Recursos Críticos

**Archivo**: `src/app/[locale]/layout.tsx`

```html
<head>
  {/* Preload critical images */}
  <link
    rel="preload"
    as="image"
    href="/professional-developer-portrait-dark-background.png"
    type="image/png"
  />
  <link rel="preload" as="image" href="/lamp-icon.svg" type="image/svg+xml" />
  <link
    rel="preload"
    as="image"
    href="/code-square-rounded.svg"
    type="image/svg+xml"
  />
</head>
```

**Impacto**: Descarga anticipada de recursos críticos.

---

### 6. ✅ Font Display Swap (Ya Aplicado)

**Archivo**: `src/app/[locale]/layout.tsx`

```typescript
const notoSans = Noto_Sans({
  display: 'swap', // ✅ Ya configurado
  preload: true,
})
```

**Impacto**: Evita bloqueo de renderizado por fuentes.

---

## Optimizaciones Adicionales Recomendadas

### 7. ⚠️ Reducir Blur Effects

**Archivo**: `src/widgets/hero/ui/Hero.tsx`

Los efectos de blur son costosos:

```typescript
// Líneas 67-90: 3 divs con blur-[120px], blur-[150px], blur-[80px]
```

**Recomendación**:

- Reducir intensidad del blur: `blur-[60px]` en lugar de `blur-[120px]`
- Considerar usar imágenes pre-renderizadas para blur backgrounds
- Aplicar blur solo en hover o después del LCP

---

### 8. ⚠️ Optimizar Backdrop Filter

**Archivo**: `src/widgets/hero/ui/Hero.tsx`

Múltiples elementos con `backdropFilter: 'blur(20px)'`:

- Badge (línea 115)
- Rotating text box (línea 165)
- CTA buttons (líneas 200+)

**Recomendación**:

- Reducir a `blur(10px)` o eliminar en mobile
- Usar `will-change: backdrop-filter` para elementos animados

---

### 9. ⚠️ Code Splitting de Framer Motion

**Archivo**: `src/shared/ui/rotating-text.tsx`

```typescript
import { motion, AnimatePresence } from 'motion/react'
```

**Recomendación**:

- Considerar alternativa CSS-only para animaciones simples
- Lazy load motion solo cuando sea necesario

---

### 10. ⚠️ Reducir Grid Background

**Archivo**: `src/widgets/hero/ui/Hero.tsx` (líneas 93-103)

```typescript
backgroundImage: 'linear-gradient(...), linear-gradient(...)',
backgroundSize: '3rem 3rem',
```

**Recomendación**:

- Usar imagen SVG pre-renderizada
- Aplicar solo en viewport visible

---

## Próximos Pasos para Medir

1. **Rebuild y restart del servidor**:

```bash
pnpm build
pnpm start
```

2. **Medir LCP nuevamente** con Playwright:

```typescript
await page.goto('http://localhost:3000')
// Ejecutar script de medición LCP
```

3. **Usar Lighthouse** para análisis completo:

```bash
npx lighthouse http://localhost:3000 --view
```

4. **Verificar en producción** (Vercel/Netlify):

- Web Vitals reales
- Core Web Vitals en Google Search Console

---

## Métricas Objetivo

| Métrica | Antes     | Objetivo  | Ideal     |
| ------- | --------- | --------- | --------- |
| LCP     | 13.79s ❌ | < 4.0s ⚠️ | < 2.5s ✅ |
| FID     | -         | < 100ms   | < 100ms   |
| CLS     | -         | < 0.1     | < 0.1     |
| FCP     | -         | < 1.8s    | < 1.8s    |
| TTI     | -         | < 3.8s    | < 3.8s    |

---

## Comandos Útiles

```bash
# Medir performance en desarrollo
pnpm dev
# Abrir http://localhost:3000 y usar DevTools > Lighthouse

# Build optimizado
pnpm build

# Analizar bundle size
pnpm build && npx @next/bundle-analyzer

# Lighthouse CI
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

---

## Referencias

- [Web Vitals](https://web.dev/vitals/)
- [Optimize LCP](https://web.dev/optimize-lcp/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
