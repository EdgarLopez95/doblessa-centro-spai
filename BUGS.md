# Registro de incidencias y correcciones (BUGS) — Centro Spai

Este documento detalla los problemas de usabilidad, accesibilidad, coherencia de contenidos, rendimiento y SEO resueltos durante la fase de pulido del mockup estático de **Centro Spai**.

---

### BUG-01: Elementos clave de confianza y contexto ocultos en vista móvil
* **Severidad**: Alta
* **Componente / Página**: `src/pages/index.astro` (`.colic__media`, `.adults__media`, `.need-card__text`)
* **Problema**: En resoluciones móviles (< 640px / < 40rem), los estilos CSS aplicaban `display: none` a las imágenes ilustrativas de cólicos del lactante y fisioterapia de adultos, así como a los textos explicativos de las tarjetas de necesidades familiares.
* **Impacto**: Los visitantes desde smartphones (más del 70% de las familias en búsqueda de atención infantil) se encontraban con tarjetas desprovistas de empatía y bloques de contenido con sensación de "vacío" o maquetación incompleta.
* **Corrección**:
  * Se eliminó el `display: none`.
  * Se estilaron los textos `.need-card__text` con `-webkit-line-clamp: 2` para mantener una lectura ágil sin romper la retícula.
  * Se rediseñó la presentación móvil de `.colic__media` (medallón compacto de 10.5rem) y `.adults__media` (proporción 16:10 con `object-fit: cover` adaptado).

---

### BUG-02: "Cólicos del lactante" inaccesible de forma directa en menú de escritorio
* **Severidad**: Alta
* **Componente**: `src/components/Header.astro`
* **Problema**: En pantallas de escritorio, los elementos de navegación "Infantil" y "Adultos" eran enlaces directos únicos a páginas generales. Un usuario buscando específicamente "Cólicos del lactante" (el servicio pediátrico con mayor demanda de Burriana) se veía obligado a entrar a la página general y hacer scroll para descubrir el servicio.
* **Impacto**: Fricción de navegación y pérdida de conversión en la intención de búsqueda principal.
* **Corrección**:
  * Se transformaron los ítems principales en botones desplegables accesibles (`[data-dropdown]`) con icono indicador `chevron-down`.
  * "Infantil" despliega: *Fisioterapia infantil*, *Cólicos del lactante* y *Osteopatía para bebés*.
  * "Adultos y bienestar" despliega: *Fisioterapia para adultos* y *Embarazo y posparto*.
  * Implementación accesible con soporte de teclado (tecla Escape para cerrar, Flecha Abajo para descender al panel, Tab/Shift+Tab para ciclar) y gestión de foco.
  * Protección contra colisiones de eventos: control de retardo para que la interacción rápida de cursor hover-click mantenga el panel abierto de forma fluida.

---

### BUG-03: Menú móvil recortaba el primer enlace de los submenús
* **Severidad**: Media
* **Componente**: `src/components/Header.astro`
* **Problema**: El renderizado del menú desplegable móvil ejecutaba un `.slice(1)` sobre la lista de páginas hijas (`item.children`), omitiendo intencionadamente el primer servicio ("Fisioterapia infantil").
* **Impacto**: En el menú móvil era imposible acceder a la landing específica de Fisioterapia infantil desde el desplegable de categoría.
* **Corrección**: Se suprimió la llamada a `.slice(1)`, garantizando que todas las páginas hijas se listen explícitamente en el árbol de navegación móvil.

---

### BUG-04: Bloqueo de desplazamiento incompleto al desplegar el menú móvil
* **Severidad**: Baja
* **Componente**: `src/components/Header.astro`
* **Problema**: Al abrir el menú móvil a pantalla completa, el script solo aplicaba `overflow: hidden` sobre `document.body`. En dispositivos iOS Safari, el scroll del `documentElement` seguía respondiendo a gestos táctiles.
* **Impacto**: El fondo de la página se desplazaba por detrás del menú abierto, provocando saltos visuales al cerrarlo.
* **Corrección**: Se añadió el bloqueo y restauración simultánea de `overflow` tanto en `document.body` como en `document.documentElement`.

---

### BUG-05: Claim clínico imprudente ("desde la primera sesión") en Fisioterapia de Adultos
* **Severidad**: Alta (Deontológica y Legal)
* **Componente / Página**: `src/pages/fisioterapia-adultos-burriana.astro`
* **Problema**: El encabezado H2 de la sección de metodología contenía la promesa *"desde la primera sesión"*.
* **Impacto**: Vulneración de las directrices sanitarias (R.D. 1907/1996 sobre publicidad con pretensiones terapéuticas) y contradicción con los principios éticos y prudentes fijados para Centro Spai.
* **Corrección**: Se sustituyó el claim por:
  ```html
  <h2>Un plan claro, <em class="well">desde el primer encuentro</em></h2>
  ```
  manteniendo la propuesta de transparencia y diagnóstico inicial riguroso sin promesas de curación o resultados inmediatos.

---

### BUG-06: Asignación de imágenes desalineada con la guía de diseño y mapa SEO
* **Severidad**: Media
* **Componente / Páginas**: `fisioterapia-adultos-burriana.astro`, `embarazo-posparto.astro`
* **Problema**:
  1. En adultos, el bloque de "Dolor musculoesquelético" mostraba la ilustración de fisioestética (`fisioterapia-estetica.png`), generando disonancia con el tratamiento del dolor.
  2. En embarazo y posparto, el hero utilizaba `terapias-de-relax.png` en lugar de una imagen de ejercicio y bienestar corporal.
* **Impacto**: Incoherencia semántica y visual con respecto al manual de marca y a `Recursos/recursos-web/mapa-uso-seo-imagenes.md`.
* **Corrección**:
  * En `/fisioterapia-adultos-burriana/`:
    * Bloque "Dolor": asignada `adultos-bienestar/fisioterapia-adultos.png` (fitball y ejercicio activo).
    * Bloque "Movimiento": asignada `adultos-bienestar/bienestar-y-relax.jpg` con encuadre destacado.
    * Bloque "Bienestar": asignada `terapias-de-relax.png`.
  * En `/embarazo-posparto/`:
    * Hero principal actualizado a `adultos-bienestar/bienestar-y-relax.jpg` con texto alternativo centrado en valoración y acompañamiento maternal.

---

### BUG-07: Falta de aclaración sobre discrepancia de nombre y dominio web
* **Severidad**: Media
* **Componentes**: `src/pages/contacto.astro`, `src/components/Footer.astro`
* **Problema**: La propuesta gráfica utiliza el nombre **Centro Spai**, mientras que el dominio histórico existente es `centro-espai.com`. Los usuarios podían dudar de la legitimidad del sitio web.
* **Impacto**: Confusión en el usuario y pérdida de confianza local en Burriana.
* **Corrección**: Se incorporó el aviso explicativo oficial en la página de Contacto y en el pie de página global:
  > *"El dominio público actual es centro-espai.com. El nombre de marca de esta propuesta es Centro Spai. La grafía definitiva la confirmará el cliente."*

---

### BUG-08: Riesgo de indexación de entorno de demostración en motores de búsqueda
* **Severidad**: Alta
* **Componente**: `src/components/Seo.astro`
* **Problema**: Al publicarse en GitHub Pages bajo `/doblessa-centro-spai/`, las páginas principales figuraban como indexables sin directiva restrictiva en staging, arriesgando la indexación de datos no confirmados por el cliente o canibalización con el dominio real.
* **Impacto**: Posible confusión en Google Search y penalizaciones por contenido duplicado o datos sanitarios no validados.
* **Corrección**: Se estableció `noindex = true` como valor por defecto en `Seo.astro`, generando `<meta name="robots" content="noindex, follow" />` en las 12 páginas del sitio mientras permanezca en fase de mockup estático.

---

### BUG-09: Falta de soporte de formatos de imagen modernos de última generación (WebP)
* **Severidad**: Media
* **Componente**: Build pipeline y templates Astro
* **Problema**: El sitio cargaba exclusivamente imágenes PNG y JPG originales de hasta 290 KB, penalizando métricas de Core Web Vitals en conexiones móviles lentas.
* **Impacto**: Tiempos de carga más elevados y menor puntuación Lighthouse en rendimiento móvil.
* **Corrección**:
  * Se implementó el script `scripts/generate-webp.mjs` utilizando `sharp` (ya presente en el entorno), integrado en `npm run build`.
  * Se creó el componente `src/components/Picture.astro` con elemento `<picture>`, `<source type="image/webp">` y etiqueta `<img>` de respaldo.
  * Se sustituyeron las etiquetas `<img>` de todas las secciones críticas por `<Picture>`.
  * Se configuraron preloads de los recursos hero en formato WebP con `type="image/webp"` en `src/layouts/BaseLayout.astro`.
