# Estado técnico — Centro Spai

## Estado actual

Mockup estático multipágina de alta fidelidad, responsive y publicado en GitHub Pages. Tras la **corrección de fidelidad de herencia** (22/09/2026) el sitio recupera los servicios, talleres, apps, técnicas, imágenes y datos de contacto que sí publicaba la web original (`centro-espai.com`), y reescribe o marca como propuesta los procesos de atención y explicaciones clínicas que no constan en esa fuente.

Referencias de decisión: `../Recursos/auditoria-herencia-y-sustento-centro-spai.md` (fuente principal), `../Recursos/auditoria-web-centro-espai.md` y `design/inventario-herencia-sitio-original.md` (trazabilidad recurso a recurso).

El detalle de puntos pendientes de validación está en `GAPS.md`; el historial de incidencias, en `BUGS.md`.

## Base técnica

- Framework: Astro 7 + TypeScript + CSS nativo.
- Dependencias directas: `astro@^7.3.2`, `sharp@^0.35.4`.
- Tipografías **Fraunces** y **Source Sans 3** autoalojadas en `public/fonts/` (WOFF2, `font-display: swap`). Cero peticiones a Google Fonts.
- Pipeline de imágenes: `scripts/generate-webp.mjs` genera variantes WebP en cada build; se sirven con `<Picture>`.
- Rama de publicación: `main`. GitHub Pages: `https://edgarlopez95.github.io/doblessa-centro-spai/`.
- Ruta base `/doblessa-centro-spai`: todos los enlaces y assets pasan por `withBase()` / `img()` en `src/lib/site.ts`.
- Datos de contacto heredados centralizados en `CONTACT` (`src/lib/site.ts`).
- Validación automatizada: `scripts/verify-build.mjs` y `scripts/qa-browser-tests.mjs` (Playwright).

## Páginas del sitio

| Ruta | Contenido | Indexación |
|---|---|---|
| `/` | Hero pediátrico, selector de audiencia, necesidades, cólicos destacado, confianza (concepto de marca y dos líneas de cita), primera visita, el centro con dirección heredada, adultos y CTA | `noindex, follow` |
| `/fisioterapia-infantil-burriana/` | Enfoque, servicios por etapa, desarrollo, respiratorio, orientación, **catálogo heredado `#herencia`**, primera visita como propuesta, perfiles pendientes, FAQ | `noindex, follow` |
| `/colicos-del-lactante-burriana/` | Índice, señales, acompañamiento (con **mención histórica a MOVAC**), primera visita como propuesta, cuándo consultar, FAQ | `noindex, follow` |
| `/osteopatia-bebes-burriana/` | Enfoque prudente, para quién, atención como propuesta, FAQ | `noindex, follow` |
| `/fisioterapia-adultos-burriana/` | Tratamientos por objetivo, **inventario heredado `#inventario`** (fisioterapia y osteopatía, embarazo y posparto, bienestar y MTC, fisio-estética), proceso como propuesta, puente a infantil, FAQ | `noindex, follow` |
| `/embarazo-posparto/` | Enfoque, **catálogo heredado** por etapas, proceso como propuesta, aviso sanitario, FAQ | `noindex, follow` |
| `/el-centro/` | Filosofía, enfoque humano, galería con visor, equipo pendiente, visita con dirección y **dos teléfonos heredados** | `noindex, follow` |
| `/talleres/` | **Taller Moquitos · Online** con CTA «Apúntate al taller», **dos apps con recurso gráfico propio y CTA visual de descarga**, banda de apps, **`#otros-talleres`** (Baby-Nesst, estimulación sensorial, lenguaje y signos, masaje infantil) | `noindex, follow` |
| `/contacto/` | Formulario demostrativo en 3 pasos, **datos del centro heredados** (dirección, dos teléfonos, email, WhatsApp), mapa ilustrativo | `noindex, follow` |
| `/politica-de-privacidad/`, `/aviso-legal/` | Estructura legal con placeholders | `noindex, follow` |
| `404` | Página de error | `noindex, follow` |

*SEO*: todas las páginas emiten `noindex, follow` mientras el mockup viva en GitHub Pages, para no canibalizar `centro-espai.com` ni indexar datos sin validar.

## Qué elementos históricos se han recuperado

1. **Datos de contacto**: cita infantil `655 461 568`, tratamientos de adultos `699 952 632`, `info@centro-spai.com` y `Calle San José, 18, 12530 Burriana (Castellón)`, con enlaces `tel:` y `mailto:` en Contacto, pie y El centro. WhatsApp aparece como canal heredado.
2. **Taller Moquitos**: formato **online** recuperado con su cartel (`taller-moquitos-online.jpg`) y CTA de maqueta «Apúntate al taller». Se eliminó la afirmación «No hay inscripción online».
3. **Apps**: *No más Cólicos* y *Anticólicos* con el mismo peso visual, icono propio cada una, distintivo de tiendas y banda promocional. CTA «Descargar app» visual, sin enlaces a tiendas sin verificar.
4. **Oferta infantil histórica**: lesiones infantiles, psicomotricidad, estimulación temprana, valoración del desarrollo, tortícolis congénita, parálisis braquial, respiratorio, masaje e higiene nasal, sueño, alimentación, conducta, control de esfínteres, enuresis/encopresis, celos y los talleres Baby-Nesst, estimulación sensorial, lenguaje y signos y masaje infantil.
5. **Oferta adulta histórica**: terapia manual, osteopatía estructural/craneal/visceral, miofascial, punción seca, kinesiotaping, masaje, drenaje linfático, reeducación postural, electroterapia, lesiones deportivas, pilates, escoliosis y grupos de espalda; embarazo y posparto con hipopresivos, suelo pélvico y cicatriz de cesárea; bienestar con MTC, acupuntura, moxibustión, auriculoterapia, ventosas y fitoterapia; fisio-estética con Indiba, radiofrecuencia, vacumterapia, láser lipolítico, cavitación y presoterapia.
6. **MOVAC**: mención histórica en cólicos, sin descripción clínica ni promesa de resultado.
7. **Recursos gráficos**: `taller-moquitos-online.jpg`, `app-centro-spai.jpg`, `app-centro-spai-pantalla-02.jpg`, `disponible-en-tiendas-app.png`, `medicina-tradicional-china.png` y `fisioterapia-estetica.png`.

## Qué no se ha recuperado y por qué

| Elemento | Motivo |
|---|---|
| Horario de atención | La web original revisada no publica un horario verificable. No se inventa |
| Enlace `wa.me` de WhatsApp | El número asociado al widget no consta en la fuente. El canal se muestra, el enlace no se construye |
| Enlaces a App Store y Google Play | No verificados. Se muestra el distintivo de tiendas sin enlazar |
| Promesas de «solución» de cólicos o resultados por número de sesiones | Excepción de seguridad sanitaria de la auditoría: no se reproducen como hechos actuales aunque figuren en la web antigua |
| `logo-centro-spai-movil.png` | Motivo técnico: la cabecera ya recorta el logo principal y lo sirve en WebP; el archivo móvil es un ráster de 144×39 px |
| `bienestar-y-relax-movil.jpg` | Motivo técnico: recorte vertical con menos contraste de la misma foto; el encuadre de escritorio ya se adapta |
| Iconos `ui/` de teléfono, email y dirección | Motivo de diseño: rásteres magenta fuera del sistema de color. Se usan iconos SVG que heredan el color de ruta |

Trazabilidad completa en `design/inventario-herencia-sitio-original.md`.

## Qué textos clínicos u operativos se han suavizado

- «Manos expertas» y «ritmo suave» en el hero infantil → descripción sin atribuir una práctica concreta.
- «Pautas para casa» (home, infantil, cólicos, osteopatía) → tiempo para preguntas y explicaciones, sin prescribir.
- Coordinación con pediatría, matrona o ginecología presentada como práctica → ahora el profesional sanitario figura como referencia, no como circuito del centro.
- «Qué ocurre en la primera cita» / «Así será tu primera cita» / «Cómo es la atención» → «Cómo imaginamos…», con etiqueta visible **«Propuesta de experiencia, pendiente de validar con el centro»** (`.proposal-tag`).
- «Te orientamos», «te proponemos», «te avisamos», «te informará de la próxima convocatoria» → el centro como sujeto de la respuesta, sin prometer flujo ni plazo.
- «Exploramos dónde está el origen» y «para que ganes autonomía» (adultos) → valoración y seguimiento sin promesa de resultado.
- FAQ de número de sesiones → se explicita que no puede anticiparse desde una web.
- FAQ de embarazo y posparto → dejan de describir el circuito del centro y remiten a matrona o especialista.

Se conservan los avisos sanitarios y las señales de «cuándo consultar», que protegen al usuario sin negar la herencia.

## Datos que siguen pendientes solo para una web corporativa real

Dominio y grafía definitivos, operatividad de los teléfonos y número de WhatsApp, horario, equipo y colegiación, validación clínica de textos y FAQs, vigencia de técnicas de adultos, calendario e inscripción del Taller Moquitos, disponibilidad de las apps en tiendas, datos fiscales para los textos legales y sesión fotográfica actualizada. Detalle y responsable en `GAPS.md`.

## Resultado de build y verificaciones

- `npm run build` → 12 rutas estáticas generadas sin errores ni avisos.
- `node scripts/verify-build.mjs` → **0 errores**. Comprueba 12 páginas, 1 H1 por página, cero `href="#"`, `noindex, follow`, cero referencias a Google Fonts, fuentes en disco, rutas de imágenes y WebP, anclas requeridas (incluidas `#herencia`, `#inventario` y `#otros-talleres`), y ahora también: presencia de los datos de contacto heredados en todas las páginas, enlaces `tel:`/`mailto:`, ausencia de frases que contradicen la web original y ausencia de enlaces a tiendas sin verificar.
- `node scripts/qa-browser-tests.mjs` → **0 errores**. Suma a las pruebas previas: enlaces de contacto heredados, formato online y CTA del Taller Moquitos, dos apps con recurso gráfico propio, catálogos heredados de infantil y adultos, y que ningún `<source>` genere caja en el layout.
- QA visual con Playwright en 390 y 1440: sin desbordamiento horizontal, sin errores de consola y sin respuestas 4xx.

## Últimos cambios

Corrección de fidelidad de herencia (recuperación de contacto, taller, apps, catálogos infantil y adulto, y reescritura de claims), más dos correcciones técnicas de calado: `BUG-17` (el `<source>` de `<Picture>` se convertía en item de grid/flex y descolocaba las imágenes) y `BUG-18` (las reglas CSS con ámbito `.x img` dejaron de aplicarse tras migrar a `<Picture>`). Ver `BUGS.md` y `git log`.

## Próxima acción

Presentar el mockup corregido al cliente y recoger la validación de los puntos de `GAPS.md`, empezando por dominio y grafía, operatividad de los canales de contacto y revisión clínica de los contenidos sanitarios.

## Límites y bloqueos

- No hay bloqueos técnicos.
- Las decisiones de marca, alcance o contenido nuevo vuelven al orquestador.
