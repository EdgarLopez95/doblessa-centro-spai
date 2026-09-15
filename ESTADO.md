# Estado técnico — Centro Spai

## Estado actual

Mockup estático completo del rediseño implementado y publicado en GitHub Pages. Diseño dirigido por `design/brief.md` y `design/direction.md`, con QA visual en `design/qa/` y crítica independiente en `design/critiques/`.

## Base técnica

- Framework: Astro 7 + TypeScript + CSS nativo, sin dependencias añadidas.
- Rama de publicación: `main`.
- GitHub Pages: `https://edgarlopez95.github.io/doblessa-centro-spai/`.
- Base: `/doblessa-centro-spai`. Enlaces y assets pasan por `withBase()` / `img()` en `src/lib/site.ts`.
- Validación: `npm run build`.

## Páginas creadas

| Ruta | Contenido | Indexable |
|---|---|---|
| `/` | Hero pediátrico, selector de audiencia, necesidades, cólicos destacado, confianza, timeline, centro, adultos y CTA | Sí |
| `/fisioterapia-infantil-burriana/` | Enfoque, servicios por etapa, desarrollo, respiratorio, orientación, primera visita, perfiles pendientes, FAQ | Sí |
| `/colicos-del-lactante-burriana/` | Índice, señales, acompañamiento, primera visita, cuándo consultar, FAQ | Sí |
| `/osteopatia-bebes-burriana/` | Enfoque prudente, para quién, proceso, FAQ | Sí |
| `/fisioterapia-adultos-burriana/` | Tratamientos agrupados por objetivo, proceso, puente a infantil, FAQ | Sí |
| `/embarazo-posparto/` | Enfoque, embarazo/posparto, proceso, aviso sanitario, FAQ | Sí |
| `/el-centro/` | Filosofía, enfoque humano, galería con visor, equipo pendiente, visita | Sí |
| `/talleres/` | Taller Moquitos y apps (sin fechas, precios ni descargas) | `noindex` |
| `/contacto/` | Formulario demostrativo, datos del centro, mapa ilustrativo | Sí |
| `/politica-de-privacidad/`, `/aviso-legal/` | Estructura legal marcada como pendiente de validación | `noindex` |
| `404` | Página de error | `noindex` |

## Componentes principales

`src/components/`: `Header` (sticky, placa de marca y menú móvil accesible), `Footer`, `MobileCta` (barra de cita contextual en móvil), `Seo` (title, description, canonical, OG, JSON-LD prudente), `Breadcrumbs`, `PageHero`, `AudienceSelector`, `NeedCard`, `ServiceEditorial`, `Chips`, `Faq` (`<details>` accesible), `Timeline`, `Gallery` (visor con `<dialog>`), `DemoForm`, `CtaBand`, `RouteNav`, `LegalPage`, `Icon`.
Estilos: `src/styles/tokens.css` (tokens primitivos y semánticos) y `src/styles/global.css` (base, tipografía, botones, utilidades, reveal y reduced-motion).

## Imágenes copiadas (`public/images/`, estructura y nombres SEO preservados)

- `marca/logo-centro-spai.png`
- `inicio/hero-centro-spai.jpg`
- `infantil/fisioterapia-para-bebes.jpg`, `colicos-del-lactante.png`, `fisioterapia-infantil.png`
- `adultos-bienestar/bienestar-y-relax.jpg`, `fisioterapia-adultos.png`, `fisioterapia-estetica.png`, `medicina-tradicional-china.png`, `terapias-de-relax.png`
- `centro/equipo-centro-spai.jpg`, `instalaciones-centro-spai-01.jpg` a `04.jpg`
- `talleres-app/taller-moquitos.jpg`, `app-centro-spai-presentacion.png`, `app-centro-spai-pantalla-01.jpg`

No copiadas por no usarse: `logo-centro-spai-movil.png`, `bienestar-y-relax-movil.jpg`, `taller-moquitos-online.jpg`, `app-centro-spai.jpg`, `app-centro-spai-pantalla-02.jpg`, `disponible-en-tiendas-app.png`. Los iconos `ui/` (magenta, fuera de tokens) se retiraron tras la crítica y se sustituyeron por iconos SVG decorativos.

## Decisiones relevantes

- **Placa de marca**: el logo tiene el texto en blanco, así que se muestra sobre una placa violeta que evoca el rótulo real de la fachada. En el header se recorta el lema (ilegible a ese tamaño); el logo completo aparece en el footer.
- **Ilustraciones** (cólicos, desarrollo, adultos, embarazo) con un tratamiento único de medallón blanco circular.
- **Código de color por ruta**: lila/blush para infantil, sage para adultos, en tarjetas, CTA, formulario y subnavegación.
- **Datos no verificados**: la dirección aparece marcada "Por validar". Teléfono, email, horario, credenciales y perfiles se muestran como pendientes. Sin `tel:`, WhatsApp ni botones inactivos.
- **`equipo-centro-spai.jpg`** no muestra un equipo (es un bebé), por eso se usa en osteopatía con un alt descriptivo real.
- **JSON-LD** solo con `WebSite`, `WebPage`, `BreadcrumbList`, `Service` y `MedicalBusiness` con nombre y ámbito; sin NAP, `FAQPage` (FAQs pendientes de revisión clínica), personas ni reseñas.
- **Talleres y legales** con `noindex` y fuera del sitemap hasta tener información real (criterio de `seo-propuesto.md`).
- **Formulario**: `?tipo=infantil|adulto` preselecciona el tipo; validación inline; `preventDefault` siempre y mensaje "Solicitud demostrativa…".
- **Imágenes**: se sirven los originales (≤ 290 KB) con `width`/`height`, `loading="lazy"` fuera del hero y `preload` + `fetchpriority="high"` solo en el hero. No se generan AVIF/WebP para no añadir pipeline sobre `public/`.
- **Fuentes**: Google Fonts (Fraunces variable + Source Sans 3) con `preconnect` y `display=swap`.
- `robots.txt` y `sitemap.xml` estáticos en `public/`. Como el sitio vive en un subdirectorio, `robots.txt` no será efectivo hasta tener dominio propio.

## Resultado de build

`npm run build` → 12 páginas generadas sin errores ni avisos. Verificación con script: todos los enlaces y assets bajo `/doblessa-centro-spai/`, anclas existentes, 1 H1 por página, sin `href="#"`. Capturas en 360/390/768/1024/1280/1440 sin errores de consola, sin 4xx y sin overflow horizontal.

## Último cambio

Implementación completa del rediseño y correcciones de la crítica independiente. Ver `git log`.

## Próxima acción

Presentar el mockup al cliente y recoger la validación de los puntos pendientes:
1. Dominio definitivo (`centro-spai.com` frente a `centro-espai.com`) y nombre "Spai"/"Espai".
2. Dirección, teléfonos (infantil/adultos), WhatsApp, email y horario.
3. Perfiles profesionales: nombres, titulaciones, nº de colegiación y fotos del equipo.
4. Revisión clínica de textos y FAQs (cólicos, osteopatía, embarazo/posparto).
5. Tratamientos de adultos vigentes (punción seca, Indiba, MTC, fisioestética…).
6. Taller Moquitos (fechas, modalidad, inscripción) y disponibilidad de las apps.
7. Textos legales reales y política de cookies.
8. Nueva sesión fotográfica (instalaciones actuales, equipo, familias con consentimiento).

## Límites y bloqueos

- No hay bloqueos técnicos.
- Las decisiones de marca, alcance o contenido nuevo vuelven al orquestador.
