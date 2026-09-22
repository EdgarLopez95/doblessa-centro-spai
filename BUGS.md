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
  * Se implementó el script `scripts/generate-webp.mjs` utilizando `sharp`, integrado en `npm run build`.
  * Se creó el componente `src/components/Picture.astro` con elemento `<picture>`, `<source type="image/webp">` y etiqueta `<img>` de respaldo.
  * Se sustituyeron las etiquetas `<img>` de todas las secciones críticas por `<Picture>`.
  * Se configuraron preloads de los recursos hero en formato WebP con `type="image/webp"` en `src/layouts/BaseLayout.astro`.

---

### BUG-10: Dependencia de compilación `sharp` no declarada en package.json
* **Severidad**: Media
* **Componente**: `package.json`, CI pipeline
* **Problema**: `scripts/generate-webp.mjs` ejecutaba `import sharp from 'sharp'`, pero `sharp` solo existía como dependencia opcional interna de Astro y no figuraba en el `dependencies` principal del proyecto.
* **Impacto**: Riesgo de fallo de compilación en entornos de integración continua o despliegues limpios (`npm ci`).
* **Corrección**: Se declaró `"sharp": "^0.35.4"` directamente en `dependencies` de `package.json` y se ejecutó `npm install` asegurando compatibilidad con el lockfile.

---

### BUG-11: Dependencia externa de Google Fonts (privacidad RGPD y rendimiento)
* **Severidad**: Media
* **Componentes**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
* **Problema**: Las fuentes corporativas (*Fraunces* y *Source Sans 3*) se cargaban a través de `fonts.googleapis.com` y `fonts.gstatic.com`.
* **Impacto**: Peticiones externas bloqueantes, potencial infracción de privacidad por cesión de IP a servidores de terceros según la jurisprudencia europea del RGPD, y dependencia de red externa.
* **Corrección**:
  * Se descargaron los archivos WOFF2 optimizados en `public/fonts/`.
  * Se configuraron reglas `@font-face` con `font-display: swap` y la ruta canónica `/doblessa-centro-spai/fonts/` en `src/styles/global.css`.
  * Se eliminaron los enlaces a Google Fonts de `BaseLayout.astro` sustituyéndolos por preloads locales con `crossorigin`.
  * Cero peticiones externas a servicios de Google Fonts en todo el sitio.

---

### BUG-12: Datos de contacto de la web original ocultos sin motivo suficiente
* **Severidad**: Alta (fidelidad y conversión)
* **Componentes**: `src/pages/contacto.astro`, `src/components/Footer.astro`, `src/pages/el-centro.astro`, `src/pages/index.astro`
* **Problema**: El mockup mostraba «Pendiente de confirmar por el centro» en teléfono, email y horario, y un sello «Por validar» sobre la dirección, pese a que la web original publica dos teléfonos diferenciados, email, dirección y widget de WhatsApp.
* **Impacto**: La propuesta parecía menos capaz que la web que venía a sustituir y bloqueaba la vía de conversión principal del negocio local.
* **Corrección**: Datos centralizados en `CONTACT` (`src/lib/site.ts`) y recuperados en Contacto, pie y El centro: cita infantil `655 461 568` y tratamientos de adultos `699 952 632` con enlaces `tel:`, `info@centro-spai.com` con `mailto:`, y la dirección sin sello de invalidación. WhatsApp se representa como canal heredado sin construir un enlace `wa.me`, porque el número no consta en la fuente. El horario no se muestra porque la fuente no lo publica.

---

### BUG-13: La página de talleres contradecía a la web original
* **Severidad**: Alta (fidelidad)
* **Componente / Página**: `src/pages/talleres.astro`
* **Problema**: El mockup afirmaba «No hay inscripción online: el equipo te informará de la próxima convocatoria», mientras que la web original presenta el Taller Moquitos en formato online con la llamada «Apúntate aquí».
* **Impacto**: Se negaba públicamente un servicio existente y se describía un flujo de aviso que el centro nunca ha documentado.
* **Corrección**: Se eliminó la negación, se añadió el distintivo `Taller Moquitos · Online` con el cartel heredado `taller-moquitos-online.jpg` y la CTA «Apúntate al taller», que abre el formulario demostrativo con el motivo preseleccionado (`?tipo=infantil&motivo=taller`). El aviso de maqueta explica que los botones aún no están conectados, sin desmentir el taller.

---

### BUG-14: Apps heredadas presentadas como no disponibles y con recursos sin usar
* **Severidad**: Alta (fidelidad)
* **Componente / Página**: `src/pages/talleres.astro`
* **Problema**: *Anticólicos* se mostraba con un icono genérico de relleno, se afirmaba que no se podía descargar y quedaban sin usar `app-centro-spai.jpg`, `app-centro-spai-pantalla-02.jpg` y `disponible-en-tiendas-app.png`.
* **Impacto**: Dos productos digitales propios del centro aparecían devaluados frente a la web original, que los promociona con «Descarga nuestras apps».
* **Corrección**: Las dos apps se presentan con el mismo peso y su icono real, con CTA visual «Descargar app» que informa de que el enlace se activará cuando el centro confirme la ficha en cada tienda. Se añaden el distintivo de tiendas y una banda promocional con rótulo. No se enlaza a App Store ni Google Play sin verificar.

---

### BUG-15: Oferta histórica infantil y adulta reducida en exceso
* **Severidad**: Alta (fidelidad)
* **Componentes / Páginas**: `fisioterapia-infantil-burriana.astro`, `fisioterapia-adultos-burriana.astro`, `embarazo-posparto.astro`, `talleres.astro`
* **Problema**: La simplificación editorial dejó fuera servicios publicados: lesiones infantiles, estimulación temprana, tortícolis congénita, parálisis braquial, hábitos y conducta, control de esfínteres, Baby-Nesst, estimulación sensorial, lenguaje y signos, y en adultos kinesiotaping, electroterapia, reeducación postural, lesiones deportivas, escoliosis, hipopresivos, suelo pélvico, cicatriz de cesárea, acupuntura, moxibustión, ventosas, fitoterapia y el bloque de fisio-estética.
* **Impacto**: El cliente podía percibir que el rediseño le hacía perder catálogo.
* **Corrección**: Secciones de catálogo heredado agrupadas por necesidad — `#herencia` en infantil, `#inventario` en adultos (con `medicina-tradicional-china.png` y `fisioterapia-estetica.png`, hasta entonces sin uso), `#otros-talleres` en talleres y las dos etapas de embarazo/posparto. Se presentan como ámbitos publicados históricamente, sin prometer que todos sigan activos ni convertir diagnósticos en claims de tratamiento.

---

### BUG-16: Procesos de atención y afirmaciones clínicas no sustentados por la fuente
* **Severidad**: Alta (deontológica)
* **Componentes / Páginas**: `Timeline.astro` y las seis landings de servicio
* **Problema**: El sitio describía como práctica actual cosas que la web original no documenta: «manos expertas», «ritmo suave», «pautas para casa», coordinación con pediatría o matrona, cómo es la primera cita, «te orientamos», «te avisamos», «te proponemos un plan» o «para que ganes autonomía».
* **Impacto**: Riesgo de atribuir al centro protocolos y compromisos operativos que nadie ha validado.
* **Corrección**: 29 sustituciones de copy. Los recorridos de atención se mantienen como propuesta de UX pero se etiquetan visiblemente con `.proposal-tag` («Propuesta de experiencia, pendiente de validar con el centro»); las promesas de respuesta pasan a fórmulas sin compromiso de flujo ni plazo; las FAQs dejan de describir circuitos internos y remiten al profesional sanitario. Se conservan los avisos sanitarios y las señales de «cuándo consultar». Se añade la mención histórica a **MOVAC** en cólicos, sin descripción clínica.

---

### BUG-17: El `<source>` de `<Picture>` se convertía en item de grid y descolocaba las imágenes
* **Severidad**: Alta (maquetación)
* **Componentes**: `src/components/Picture.astro`, `src/styles/global.css`
* **Problema**: `picture.spai-picture` usa `display: contents`, así que sus hijos pasan a ser items del contenedor padre. El `<source type="image/webp">` computaba `display: block` y ocupaba la primera celda del grid, empujando la imagen real a la columna siguiente. Medido en `/talleres/`: la tarjeta de app repartía `426px` para el `<source>` y `86px` para el contenido.
* **Impacto**: Iconos y fotos aparecían fuera de su columna, con tamaños erróneos, en cualquier contenedor de tipo grid o flex que usara `<Picture>`.
* **Corrección**: Regla `picture.spai-picture > source { display: none; }` en `global.css` y en el estilo del componente. Se añadió una prueba en `qa-browser-tests.mjs` que falla si algún `<source>` genera caja.

---

### BUG-18: Las reglas CSS con ámbito dejaron de aplicarse a las imágenes tras migrar a `<Picture>`
* **Severidad**: Alta (maquetación)
* **Componentes**: 10 archivos entre páginas y componentes
* **Problema**: Astro limita los estilos al ámbito del componente añadiendo `data-astro-cid-*` a los elementos de su plantilla. Al pasar los `<img>` a `Picture.astro`, la imagen quedó en el ámbito del componente hijo, de modo que reglas como `.workshop__media img`, `.app img`, `.home-hero__media img`, `.brand img` o `.gallery__button img` compilaban a `.x[data-astro-cid-A] img[data-astro-cid-A]` y no encajaban con ninguna imagen.
* **Impacto**: 25 reglas sin efecto: heros sin recorte, logotipo sin dimensionar, galería y tarjetas con imágenes a tamaño natural dentro de contenedores ya dimensionados.
* **Corrección**: Conversión de esos selectores a `.x :global(img)` en los bloques `<style>` de los 10 archivos afectados, comprobando en el CSS compilado que las reglas vuelven a emitirse sin el atributo de ámbito sobre `img`.
