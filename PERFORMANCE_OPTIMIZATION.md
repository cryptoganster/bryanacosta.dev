# Plan de Optimización de Rendimiento

## Estado Actual

- **Móvil**: 55/100
- **Desktop**: 58/100
- **Problemas principales**: FCP/LCP lentos, imágenes sin optimizar, JS sin usar

## Optimizaciones a Implementar

### 1. Optimización de Imágenes (Prioridad ALTA)

- [ ] Convertir imágenes a formatos modernos (WebP/AVIF)
- [ ] Agregar width/height explícitos a todas las imágenes
- [ ] Implementar lazy loading para imágenes below-the-fold
- [ ] Comprimir imágenes (ahorro estimado: 2.5MB)
- [ ] Usar next/image con priority para imágenes hero

### 2. Optimización de Fuentes (Prioridad ALTA)

- [ ] Implementar font-display: swap
- [ ] Precargar fuentes críticas
- [ ] Usar variable fonts si es posible
- [ ] Subset de fuentes para reducir tamaño

### 3. Code Splitting y Tree Shaking (Prioridad MEDIA)

- [ ] Analizar bundle con @next/bundle-analyzer
- [ ] Implementar dynamic imports para componentes pesados
- [ ] Eliminar JavaScript sin usar (23-46 KiB)
- [ ] Lazy load componentes no críticos

### 4. Optimización de Animaciones (Prioridad MEDIA)

- [ ] Usar transform/opacity en lugar de propiedades que causan reflow
- [ ] Implementar will-change para animaciones
- [ ] Revisar 7 elementos con animaciones no compuestas

### 5. Optimización de Carga (Prioridad ALTA)

- [ ] Implementar preconnect para dominios externos
- [ ] Reducir tareas largas del hilo principal
- [ ] Implementar ISR o SSG donde sea posible
- [ ] Optimizar hydration de React

### 6. Accesibilidad (Prioridad MEDIA)

- [ ] Agregar nombres accesibles a botones
- [ ] Corregir atributos ARIA prohibidos
- [ ] Mejorar contraste de colores
- [ ] Corregir orden de encabezados

### 7. SEO (Prioridad BAJA)

- [ ] Agregar rel=canonical correcto
- [ ] Revisar configuración de hreflang

## Mejoras Esperadas

- **Objetivo Móvil**: 85+/100
- **Objetivo Desktop**: 90+/100
- **FCP**: < 1.8s
- **LCP**: < 2.5s
