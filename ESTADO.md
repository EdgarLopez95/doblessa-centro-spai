# Estado técnico — Centro Spai

## Estado actual

Mockup estático multipágina de alta fidelidad, completamente responsive y pulido, publicado en GitHub Pages. Incorpora pipeline optimizado de imágenes WebP, navegación accesible de escritorio y móvil, auditoría deontológica de claims terapéuticos, asignación semántica de imágenes y blindaje de indexación en staging.

El detalle de puntos pendientes de validación con el cliente se encuentra en `GAPS.md`, y el historial de incidencias resueltas en `BUGS.md`.

## Base técnica

- Framework: Astro 7 + TypeScript + CSS nativo.
- Pipeline de optimización: script `scripts/generate-webp.mjs` integrado en `npm run build` que genera variantes `.webp` de todas las imágenes estáticas mediante `sharp`.
- Rama de publicación: `main`.
- Despliegue en GitHub Pages: `https://edgarlopez95.github.io/doblessa-centro-spai/`.
- Ruta base: `/doblessa-centro-spai`. Todos los enlaces y assets se resuelven mediante `withBase()` / `img()` en `src/lib/site.ts`.
- Validación automatizada: `scripts/verify-build.mjs` y `scripts/qa-browser-tests.mjs` (Playwright).

## Páginas del sitio

| Ruta | Contenido | Estado de indexación |
|---|---|---|
| `/` | Hero pediátrico, selector de audiencia, necesidades (con textos visibles en móvil), cólicos destacado (con ilustración visible en móvil), confianza, timeline, centro, adultos y CTA | `noindex, follow` (staging) |
| `/fisioterapia-infantil-burriana/` | Enfoque pediátrico, servicios por etapa, desarrollo, respiratorio, orientación, primera visita, perfiles pendientes, FAQ | `noindex, follow` (staging) |
| `/colicos-del-lactante-burriana/` | Índice directo, señales de alerta, acompañamiento respetuoso, primera visita, cuándo consultar, FAQ | `noindex, follow` (staging) |
| `/osteopatia-bebes-burriana/` | Enfoque prudente sin manipulaciones bruscas, para quién, proceso, FAQ | `noindex, follow` (staging) |
| `/fisioterapia-adultos-burriana/` | Tratamientos agrupados por objetivo (dolor, movimiento, bienestar), proceso con claim ético ("desde el primer encuentro"), puente a infantil, FAQ | `noindex, follow` (staging) |
| `/embarazo-posparto/` | Enfoque maternal, embarazo/posparto, proceso, aviso sanitario, hero contextual, FAQ | `noindex, follow` (staging) |
| `/el-centro/` | Filosofía, enfoque humano, galería con visor accesible, equipo pendiente, visita | `noindex, follow` (staging) |
| `/talleres/` | Taller Moquitos y apps (sin fechas, precios ni descargas reales) | `noindex, follow` (staging) |
| `/contacto/` | Formulario demostrativo en 3 pasos, datos del centro con disclaimer de dominio, mapa ilustrativo | `noindex, follow` (staging) |
| `/politica-de-privacidad/` | Estructura legal marcada como pendiente de validación | `noindex, follow` (staging) |
| `/aviso-legal/` | Estructura legal marcada como pendiente de validación | `noindex, follow` (staging) |
| `404` | Página de error amigable con enlaces de recuperación | `noindex, follow` (staging) |

*Nota sobre SEO*: Todas las páginas emiten actualmente `<meta name="robots" content="noindex, follow" />` para evitar indexación prematura y canibalización con `centro-espai.com` durante la fase de validación del cliente en GitHub Pages.

## Componentes principales

`src/components/`:
- `Header.astro`: Barra sticky con placa de marca, navegación de escritorio con menús desplegables accesibles (`aria-expanded`, navegación por teclado, soporte hover con tolerancia de click), y menú móvil a pantalla completa con bloqueo dual de scroll (`body` + `html`).
- `Picture.astro`: Componente de imagen de alto rendimiento con `<picture>`, `<source type="image/webp">` y `<img>` de respaldo con dimensiones explícitas y `display: contents`.
- `Footer.astro`: Pie de página corporativo con logo completo, navegación, aviso legal y nota aclaratoria sobre el dominio público actual.
- `MobileCta.astro`: Barra fija de cita contextual en dispositivos móviles.
- `Seo.astro`: Generador de metaetiquetas (título, descripción, canonical, Open Graph, Twitter Cards, robots unificado) y JSON-LD prudente (sin NAP ficticio ni `FAQPage` sin validar).
- `Breadcrumbs.astro`, `PageHero.astro`, `AudienceSelector.astro`, `NeedCard.astro`, `ServiceEditorial.astro`, `Chips.astro`, `Faq.astro` (`<details>` accesible), `Timeline.astro`, `Gallery.astro` (visor con `<dialog>` nativo), `DemoForm.astro` (formulario interactivo en 3 pasos que nunca envía datos a backend), `CtaBand.astro`, `RouteNav.astro`, `LegalPage.astro`, `Icon.astro`.

Estilos: `src/styles/tokens.css` (sistema de diseño con tokens primitivos y semánticos) y `src/styles/global.css` (estilos base, tipografía, botones, utilidades, animaciones reveal y `prefers-reduced-motion`).

## Imágenes gestionadas (`public/images/`)

Estructura preservada acorde a `Recursos/recursos-web/mapa-uso-seo-imagenes.md`:
- `marca/logo-centro-spai.png` (+ `.webp`)
- `inicio/hero-centro-spai.jpg` (+ `.webp`)
- `infantil/fisioterapia-para-bebes.jpg`, `colicos-del-lactante.png`, `fisioterapia-infantil.png` (+ `.webp`)
- `adultos-bienestar/bienestar-y-relax.jpg`, `fisioterapia-adultos.png`, `fisioterapia-estetica.png`, `medicina-tradicional-china.png`, `terapias-de-relax.png` (+ `.webp`)
- `centro/equipo-centro-spai.jpg`, `instalaciones-centro-spai-01.jpg` a `04.jpg` (+ `.webp`)
- `talleres-app/taller-moquitos.jpg`, `app-centro-spai-presentacion.png`, `app-centro-spai-pantalla-01.jpg` (+ `.webp`)

Cada imagen se procesa automáticamente generando un archivo WebP emparejado de compresión optimizada (82% de calidad) y se sirve mediante `<Picture>`. Los LCP heroes se precargan como `type="image/webp"` en `BaseLayout.astro`.

## Decisiones relevantes y refinamientos aplicados

1. **Visibilidad completa en móvil (Mobile First)**:
   - Se eliminaron todos los `display: none` que ocultaban confianza en móvil en la Home (`.colic__media`, `.adults__media`, `.need-card__text`).
   - `.need-card__text` usa `-webkit-line-clamp: 2` para mantener la cadencia y legibilidad sin desbordamiento.
   - `.colic__media` se adapta como un medallón de 10.5rem con marco suave.
   - `.adults__media` se presenta en proporción horizontal 16:10 compacta.
2. **Navegación accesible y "Cólicos del lactante" en escritorio**:
   - Se crearon menús desplegables accesibles en escritorio para Infantil y Adultos.
   - "Cólicos del lactante" es accesible directamente en 1 solo clic desde el menú principal de escritorio.
   - El menú móvil lista todas las páginas hijas sin aplicar recorte de elementos (`.slice(1)` eliminado).
   - Bloqueo de scroll móvil dual en `document.body` y `document.documentElement`.
3. **Ética y claims terapéuticos**:
   - Revisión completa de todos los H2 y textos del sitio: sin promesas de cura ni resultados inmediatos.
   - En `/fisioterapia-adultos-burriana/`, el claim se ajustó a *"Un plan claro, desde el primer encuentro"*.
4. **Asignación semántica de imágenes**:
   - En Fisioterapia de Adultos, el bloque Dolor usa `fisioterapia-adultos.png` (fitball terapéutico); Movimiento usa `bienestar-y-relax.jpg` enmarcado; Bienestar usa `terapias-de-relax.png`. Se retiró `fisioterapia-estetica.png` de la sección de dolor.
   - En Embarazo y Posparto, el hero principal utiliza `bienestar-y-relax.jpg` enfocado al acompañamiento materno.
   - En Osteopatía para Bebés, `equipo-centro-spai.jpg` mantiene texto alternativo fidedigno describiendo al bebé en camilla.
5. **Aclaración sobre dominio y nombre de marca**:
   - Se incorporó la nota oficial en Contacto y Footer: *"El dominio público actual es centro-espai.com. El nombre de marca de esta propuesta es Centro Spai. La grafía definitiva la confirmará el cliente."*
6. **Formulario interactivo de tres pasos**:
   - Preselección automática con `?tipo=infantil|adulto`.
   - Mensaje explícito de estado de demostración.
   - Sin envío real de datos ni almacenamiento de información personal.

## Verificación de calidad y tests

- `npm run build`: genera las 12 rutas estáticas sin errores.
- `node scripts/verify-build.mjs`:
  - 12 páginas HTML generadas.
  - Exactamente 1 H1 por página.
  - Cero enlaces vacíos (`href="#"`).
  - Todas las anclas requeridas presentes (`#desarrollo`, `#respiratorio`, `#orientacion`, `#tratamientos`, `#bienestar`, `#taller-moquitos`, `#apps`).
  - Cero claims prohibidos.
  - Todas las rutas de imágenes y WebP validadas.
- `node scripts/qa-browser-tests.mjs` (Playwright):
  - Cero desbordamientos horizontales en viewports 360, 390, 768 y 1440.
  - Visibilidad de `.colic__media`, `.adults__media` y `.need-card__text` en móvil 390.
  - Apertura, navegación completa, bloqueo de scroll y cierre con Escape en menú móvil.
  - Apertura, cierre y accesibilidad por teclado en dropdowns de escritorio a 1440.
  - Comportamiento y preselección del formulario en Contacto.
  - Verificación del aviso de dominio en Contacto y Footer.
