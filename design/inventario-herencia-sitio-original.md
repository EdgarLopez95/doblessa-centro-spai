# Inventario de herencia del sitio original — Centro Spai

**Fecha:** 22 de septiembre de 2026
**Fuente:** `www.centro-espai.com` (web original), según `Recursos/auditoria-herencia-y-sustento-centro-spai.md` y `Recursos/auditoria-web-centro-espai.md`.
**Regla aplicada:** lo publicado por la web original puede heredarse y rediseñarse. Reorganizarlo es una decisión UX válida. Lo que invente un servicio, un proceso real, un resultado clínico o una capacidad operativa se retira, se reescribe como propuesta o se marca para validación. En salud, no se reproducen como hechos actuales las promesas de cura, los resultados por número de sesiones ni las instrucciones clínicas de riesgo, aunque figuren en la web antigua.

---

## 1. Contenido y datos heredados

| Recurso o contenido original | Evidencia | Uso final | Ruta o sección | Decisión |
| --- | --- | --- | --- | --- |
| Concepto de marca «Bienestar, Salud y Relajación» | Hero de la web original | Bloque de confianza y presentación del centro | `/`, `/el-centro/` | **Recuperado** |
| Núcleo infantil (fisioterapia, osteopatía y desarrollo) | Fisio-Peques | Ruta infantil completa | `/fisioterapia-infantil-burriana/` | **Recuperado** |
| Cólicos del lactante | Bloque extenso del original | Ruta prioritaria propia | `/colicos-del-lactante-burriana/` | **Recuperado** |
| Método MOVAC | Contenido de cólicos del original | Mención histórica, sin descripción clínica | `/colicos-del-lactante-burriana/#como-acompanamos` | **Recuperado como mención** |
| Osteopatía para bebés | Servicio del original | Ruta propia | `/osteopatia-bebes-burriana/` | **Recuperado** |
| Lesiones infantiles, psicomotricidad, estimulación temprana, valoración del desarrollo, tortícolis congénita, parálisis braquial | Fisio-Peques | Catálogo heredado agrupado | `/fisioterapia-infantil-burriana/#herencia` | **Recuperado** |
| Fisioterapia respiratoria infantil, masaje infantil, higiene nasal | Fisio-Peques | Catálogo heredado y sección de respiratorio | `/fisioterapia-infantil-burriana/#herencia`, `#respiratorio` | **Recuperado** |
| Sueño, alimentación, rabietas y conducta, control de esfínteres, enuresis/encopresis, celos | Crianza y hábitos del original | Catálogo heredado, presentado como ámbitos publicados | `/fisioterapia-infantil-burriana/#herencia` | **Recuperado sin claim clínico** |
| Taller Moquitos | Promoción doble en el original | Ficha propia con formato online | `/talleres/#taller-moquitos` | **Recuperado** |
| Formato online del taller y CTA «Apúntate aquí» | Original | Badge «Online» y CTA «Apúntate al taller» (maqueta) | `/talleres/#taller-moquitos` | **Recuperado** |
| Baby-Nesst, estimulación sensorial 0–6 meses, lenguaje y signos, taller de masaje infantil | Talleres del original | Catálogo heredado de talleres | `/talleres/#otros-talleres`, `/fisioterapia-infantil-burriana/#herencia` | **Recuperado** |
| App «No más Cólicos» | Original | Tarjeta con icono y CTA visual | `/talleres/#apps` | **Recuperado** |
| App «Anticólicos» | Original | Tarjeta con icono propio y CTA visual | `/talleres/#apps` | **Recuperado** |
| CTA «Descarga nuestras apps» | Original | Botones «Descargar app» sin enlace a tienda no verificada | `/talleres/#apps` | **Recuperado como maqueta** |
| Fisioterapia y osteopatía de adultos, terapia miofascial, punción seca, kinesiotaping, masaje, drenaje, reeducación postural, electroterapia, lesiones deportivas, pilates, escoliosis, grupos de espalda | Original | Inventario visual heredado | `/fisioterapia-adultos-burriana/#inventario` | **Recuperado** |
| Embarazo: tratamientos y pilates para embarazadas | Original | Bloque «Durante el embarazo» e inventario | `/embarazo-posparto/`, `/fisioterapia-adultos-burriana/#inventario` | **Recuperado** |
| Posparto: osteopatía visceral, hipopresivos, suelo pélvico, cicatriz de cesárea | Original | Bloque «Después del parto» e inventario | `/embarazo-posparto/`, `/fisioterapia-adultos-burriana/#inventario` | **Recuperado** |
| Bienestar: terapias relax, medicina tradicional china, acupuntura, moxibustión, auriculoterapia, ventosas, fitoterapia china | Original | Inventario visual heredado | `/fisioterapia-adultos-burriana/#inventario` | **Recuperado** |
| Fisio-estética: reductores y reafirmantes, Indiba, radiofrecuencia, vacumterapia, láser lipolítico, cavitación, presoterapia | Original | Inventario visual heredado | `/fisioterapia-adultos-burriana/#inventario` | **Recuperado sin promesa de resultado** |
| Teléfono de cita infantil `655 461 568` | Contacto del original | Enlace `tel:` | `/contacto/`, footer, `/el-centro/` | **Recuperado** |
| Teléfono de tratamientos de adultos `699 952 632` | Contacto del original | Enlace `tel:` | `/contacto/`, footer, `/el-centro/` | **Recuperado** |
| Email `info@centro-spai.com` | Contacto del original | Enlace `mailto:` | `/contacto/`, footer | **Recuperado** |
| Dirección `Calle San José, 18, 12530 Burriana (Castellón)` | Contacto del original | Dirección en HTML, sin sello de invalidación | `/`, `/contacto/`, `/el-centro/`, footer | **Recuperado** |
| WhatsApp (widget Joinchat) | Original | Canal presentado visualmente, sin enlace `wa.me` | `/contacto/`, footer | **Recuperado parcialmente**: no se construye enlace porque el número asociado no consta |
| Horario de atención | — | No se muestra | — | **No recuperado**: el original revisado no publica un horario verificable. No se inventa |
| Promesas de «solución» de cólicos o resultados por número de sesiones | Original | No se reproducen | — | **Descartado por seguridad sanitaria** (excepción explícita de la auditoría) |

---

## 2. Recursos gráficos

| Recurso original | Evidencia | Uso final | Ruta o sección | Decisión |
| --- | --- | --- | --- | --- |
| `marca/logo-centro-spai.png` | Cabecera del original | Placa de marca y logo del pie | Header y footer | **En uso** |
| `marca/logo-centro-spai-movil.png` | Variante móvil del original | — | — | **No usado (motivo técnico)**: la cabecera ya recorta el logotipo principal y lo sirve en WebP; el archivo móvil es un ráster de 144×39 px que se vería más blando en pantallas de alta densidad y repite el mismo lema ilegible a ese tamaño |
| `inicio/hero-centro-spai.jpg` | Hero del original | Hero principal + imagen Open Graph | `/` | **En uso** |
| `infantil/fisioterapia-para-bebes.jpg` | Original | Hero de la ruta infantil | `/fisioterapia-infantil-burriana/` | **En uso** |
| `infantil/colicos-del-lactante.png` | Original | Módulo destacado y hero de cólicos | `/`, `/colicos-del-lactante-burriana/` | **En uso** |
| `infantil/fisioterapia-infantil.png` | Original | Bloque de desarrollo y movimiento | `/fisioterapia-infantil-burriana/#desarrollo` | **En uso** |
| `adultos-bienestar/bienestar-y-relax.jpg` | Original | Hero de adultos, bloque de movimiento, inventario y hero de embarazo | `/fisioterapia-adultos-burriana/`, `/embarazo-posparto/`, `/` | **En uso** |
| `adultos-bienestar/bienestar-y-relax-movil.jpg` | Variante móvil del original | — | — | **No usado (motivo técnico)**: es un recorte vertical con mucha menos densidad de contraste de la misma fotografía; el encuadre de escritorio ya se adapta con `object-position` y usar la variante degradaría la imagen en móvil |
| `adultos-bienestar/fisioterapia-adultos.png` | Original | Bloque de dolor e inventario de fisioterapia | `/fisioterapia-adultos-burriana/` | **En uso** |
| `adultos-bienestar/terapias-de-relax.png` | Original | Bloque de bienestar | `/fisioterapia-adultos-burriana/#bienestar` | **En uso** |
| `adultos-bienestar/medicina-tradicional-china.png` | Original | Inventario de bienestar y medicina tradicional china | `/fisioterapia-adultos-burriana/#inventario` | **Recuperado en esta corrección** |
| `adultos-bienestar/fisioterapia-estetica.png` | Original | Inventario de fisio-estética | `/fisioterapia-adultos-burriana/#inventario` | **Recuperado en esta corrección** |
| `centro/instalaciones-centro-spai-01.jpg` | Original | Fachada en home, contacto y galería | `/`, `/contacto/`, `/el-centro/` | **En uso** |
| `centro/instalaciones-centro-spai-02.jpg` a `04.jpg` | Original | Galería de instalaciones con visor | `/el-centro/#instalaciones` | **En uso** |
| `centro/equipo-centro-spai.jpg` | Original | Hero de osteopatía, con alt descriptivo real | `/osteopatia-bebes-burriana/` | **En uso con corrección**: el archivo muestra un bebé, no un retrato de equipo, así que no se usa como foto de plantilla (GAP-07) |
| `talleres-app/taller-moquitos.jpg` | Original | Imagen principal del taller y bloque respiratorio | `/talleres/`, `/fisioterapia-infantil-burriana/#respiratorio` | **En uso** |
| `talleres-app/taller-moquitos-online.jpg` | Original | Bloque «Taller Moquitos · Online» | `/talleres/#taller-moquitos` | **Recuperado en esta corrección** |
| `talleres-app/app-centro-spai-pantalla-01.jpg` | Original | Icono de «No más Cólicos» y recurso en cólicos | `/talleres/#apps`, `/colicos-del-lactante-burriana/` | **En uso** |
| `talleres-app/app-centro-spai-pantalla-02.jpg` | Original | Icono de «Anticólicos» | `/talleres/#apps` | **Recuperado en esta corrección** |
| `talleres-app/app-centro-spai-presentacion.png` | Original | Composición editorial de la app | `/talleres/#apps` | **En uso** |
| `talleres-app/app-centro-spai.jpg` | Original | Banda promocional de las apps | `/talleres/` | **Recuperado en esta corrección** |
| `talleres-app/disponible-en-tiendas-app.png` | Original | Distintivo junto a las apps, sin enlaces externos | `/talleres/#apps` | **Recuperado en esta corrección** |
| `ui/icono-direccion.png`, `ui/icono-email.png`, `ui/icono-telefono.png` | Iconos de interfaz del original | — | — | **No usados (motivo de diseño)**: son rásteres magenta saturado fuera del sistema de color aprobado (`#5B437B` / `#8062A7` / tonos de apoyo). Se sustituyen por iconos SVG del sistema, que además heredan el color de ruta (lila para infantil, sage para adultos). El contenido de contacto siempre está en HTML |

---

## 3. Resumen

- **27 recursos gráficos originales auditados**: 22 en uso en el rediseño, 5 descartados con motivo concreto (2 variantes móviles por calidad técnica, 3 iconos por incompatibilidad con el sistema de color).
- **6 recursos recuperados en esta corrección**: `taller-moquitos-online.jpg`, `app-centro-spai.jpg`, `app-centro-spai-pantalla-02.jpg`, `disponible-en-tiendas-app.png`, `medicina-tradicional-china.png` y `fisioterapia-estetica.png`.
- **Ningún recurso se descarta por falta de confirmación reciente**: los motivos de descarte son técnicos o de sistema de diseño.
- **Datos de contacto**: recuperados los dos teléfonos, el email y la dirección. WhatsApp se representa como canal sin enlace porque el número no consta en la fuente. El horario no se inventa porque la fuente no lo publica.
