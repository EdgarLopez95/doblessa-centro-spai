# Cuestionario de Gaps de Validación — Centro Spai

Este documento recoge el estado de los puntos de información, decisiones de negocio, validaciones clínicas y materiales pendientes de confirmación por parte de la propiedad de **Centro Spai**.

> **Criterio aplicado desde el 22/09/2026 (corrección de fidelidad de herencia).** Lo que la web del centro publica se hereda y se muestra; la falta de confirmación reciente deja de ser motivo para ocultarlo. Los gaps de contacto pasan de «dato oculto» a «dato mostrado, operatividad por confirmar». Solo se mantiene fuera lo que la fuente no publica (horario, número de WhatsApp) o lo que no puede afirmarse sin validación clínica. Trazabilidad en `design/inventario-herencia-sitio-original.md`.
>
> **Cierre del 22/09/2026 (afirmaciones no verificadas).** Las rutas clínicas ya no presentan como hecho actual que el centro explique, acompañe, valore, trate o elija enfoque; el formulario solo afirma que es demostrativo y no almacena datos; y las páginas legales son una presentación neutra, sin placeholders ni obligaciones inventadas. Lo que el cliente aporte para cerrar **GAP-06**, **GAP-08** y **GAP-13** es lo que permitirá convertir esos bloques en afirmaciones reales.
>
> **Ajuste del 22/09/2026 (fidelidad de contenido).** Los pendientes dejan de mostrarse en la interfaz: nada de sellos «Por validar», «pendiente de confirmar» ni referencias a que esto sea una maqueta por validar. En pantalla solo quedan los avisos sanitarios imprescindibles, la aclaración de que formularios y botones son demostrativos y la etiqueta discreta «Propuesta de experiencia para el rediseño» en los recorridos de atención. **Este documento es ahora el único registro de lo que falta**, junto a `ESTADO.md` y el inventario.

---

## Matriz de control y cuestionario para el cliente

| ID | Falta | Dónde se ve | Qué debe enviar el cliente | Cerrable en mockup |
|---|---|---|---|:---:|
| **GAP-01** | **Naming de marca y dominio definitivo** | Header, Footer, Aviso legal, `/contacto/` | Confirmación de grafía oficial (*Centro Spai* vs. *Centro Espai*) y decisión sobre el dominio: migrar a `centro-spai.com` con 301 o conservar `centro-espai.com`. | ❌ Pendiente de cliente *(en pantalla solo se indica «Web actual del centro: centro-espai.com», sin lenguaje de validación)* |
| **GAP-02** | **Operatividad de los teléfonos y número de WhatsApp** | Footer, `/contacto/`, `/el-centro/` | Confirmar que siguen activos `655 461 568` (cita infantil) y `699 952 632` (tratamientos de adultos), y facilitar el número asociado al WhatsApp. | 🟡 **Heredado del original en el mockup** *(ambos teléfonos visibles y enlazados con `tel:`; WhatsApp se muestra como canal, sin enlace `wa.me` porque el número no consta)* |
| **GAP-03** | **Correo electrónico corporativo** | Footer, `/contacto/`, avisos legales | Confirmar que `info@centro-spai.com` sigue operativo y si será el buzón definitivo bajo el dominio elegido. | 🟡 **Heredado del original en el mockup** *(email visible y enlazado con `mailto:`)* |
| **GAP-04** | **Dirección física exacta y concordancia GBP** | Home, Footer, `/contacto/`, `/el-centro/` | Confirmar piso/puerta, accesibilidad para carritos y concordancia con Google Business Profile de *Calle San José, 18, 12530 Burriana (Castellón)*. | 🟡 **Heredada del original en el mockup** *(se retiró el sello «Por validar»; la dirección se muestra como dato publicado)* |
| **GAP-05** | **Horario de atención al público** | Footer, `/contacto/`, `/el-centro/` | Horario de apertura de lunes a viernes (mañanas/tardes), sábados y política de citas concertadas. | ❌ Pendiente de cliente *(la web original no publica horario verificable: no se muestra ninguno ni se inventa)* |
| **GAP-06** | **Equipo profesional y colegiación sanitaria** | `/el-centro/`, `/fisioterapia-infantil-burriana/` | Nombres y apellidos completos de las profesionales, titulación oficial, especialidad y número de colegiación en el ICOFCV (obligatorio por normativa sanitaria). | ❌ Pendiente de cliente *(la web presenta el rol y la especialidad, sin nombres inventados ni etiquetas de pendiente)* |
| **GAP-07** | **Fotografías corporativas del equipo** | `/el-centro/` | Fotografías profesionales del equipo sanitario en las instalaciones (el archivo `equipo-centro-spai.jpg` heredado es un bebé en camilla y no un retrato de plantilla). | ❌ Pendiente de cliente *(sin fotos falsas de stock)* |
| **GAP-08** | **Validación clínica de textos y protocolos** | `/fisioterapia-infantil-burriana/`, `/colicos-del-lactante-burriana/`, `/osteopatia-bebes-burriana/`, `/embarazo-posparto/` | Revisión deontológica y clínica de los enfoques explicados (cólicos, inmadurez digestiva, técnicas manuales suaves, drenaje respiratorio y posparto). | ❌ Pendiente de cliente *(avisos sanitarios visibles, cero promesas de cura y ninguna afirmación de protocolo propio)* |
| **GAP-09** | **Revisión de FAQs especializadas** | 5 landings de servicio | Validación de las respuestas a dudas frecuentes antes de proceder a marcarlas con schema estructurado `FAQPage`. | ❌ Pendiente de cliente *(schema excluido prudencialmente)* |
| **GAP-10** | **Vigencia de las técnicas de adultos y responsable de cada una** | `/fisioterapia-adultos-burriana/#inventario`, `/embarazo-posparto/` | Confirmar cuáles del inventario heredado siguen activas (punción seca, kinesiotaping, electroterapia, Indiba y radiofrecuencia, MTC y acupuntura, hipopresivos, suelo pélvico, fisio-estética…) y quién las presta, con titulación. | 🟡 **Inventario heredado visible** *(se muestra el catálogo completo de la web anterior con aviso de que su vigencia la confirma el centro y no es un compromiso de tratamiento)* |
| **GAP-11** | **Taller Moquitos: calendario, aforo, precio e inscripción real** | `/talleres/#taller-moquitos` | Fechas de próximas convocatorias, aforo, precio por familia y sistema de inscripción al que debe apuntar la CTA. | 🟡 **Taller y formato online heredados** *(se muestra «Taller Moquitos · Online» y la CTA «Apúntate al taller», que abre el formulario demostrativo; ya no se niega la inscripción online)* |
| **GAP-12** | **Fichas de las apps en las tiendas** | `/talleres/#apps` | Enlaces definitivos de *No más Cólicos* y *Anticólicos* en App Store y Google Play, para activar los botones «Descargar app». | 🟡 **Apps heredadas y presentadas** *(ambas con icono propio y CTA visual; no se enlaza a ninguna tienda sin verificar ni se afirma que no estén disponibles)* |
| **GAP-13** | **Datos fiscales y textos legales definitivos** | `/aviso-legal/`, `/politica-de-privacidad/` | Razón social o nombre del autónomo titular, CIF/NIF, domicilio social, datos de inscripción registral sanitaria y designación de responsable/DPD, más la redacción legal completa. | ❌ Pendiente de cliente *(ambas páginas son ahora una presentación neutra: sin placeholders ni obligaciones inventadas, y con directiva noindex)* |
| **GAP-14** | **Sesión fotográfica real de instalaciones** | En todo el sitio | Fotografías actualizadas de la fachada a pie de calle, recepción, sala de fisioterapia pediátrica, cabinas de adultos y camillas. | ❌ Pendiente de cliente *(utilizando imágenes históricas aprobadas)* |
| **GAP-18** | **Validación del recorrido de atención propuesto** | `.proposal-tag` en infantil, cólicos, osteopatía, adultos y embarazo | Confirmar (o corregir) cómo es realmente la primera visita, si hay valoración previa, cómo se explica el plan y qué se entrega a la familia. Mientras tanto se presenta como propuesta de experiencia, no como práctica del centro. | ❌ Pendiente de cliente *(mitigado con la etiqueta discreta «Propuesta de experiencia para el rediseño»)* |
| **GAP-15** | **Dependencia de compilación `sharp`** | Build pipeline (`package.json`) | N/A — Resuelto en el mockup. | ✅ **CERRADO EN MOCKUP** *(declarado `sharp@^0.35.4` en dependencies e instalado)* |
| **GAP-16** | **Self-hosting de fuentes tipográficas** | Frontend assets (`public/fonts/`, CSS) | N/A — Resuelto en el mockup. | ✅ **CERRADO EN MOCKUP** *(Fraunces y Source Sans 3 autoalojadas en WOFF2, 0 Google Fonts)* |
| **GAP-17** | **Confianza móvil (textos truncados)** | Home móvil (`.need-card__text`) | N/A — Resuelto en el mockup. | ✅ **CERRADO EN MOCKUP** *(line-clamp ampliado a 4 líneas sin display:none)* |

---

## Necesidades para la sesión fotográfica profesional (GAP-14)

Para sustituir las imágenes históricas y no recurrir a fotografías de stock despersonalizadas, se requiere programar una jornada fotográfica en Burriana con el siguiente listado de tomas:

1. **Exterior y accesibilidad**:
   - Plano general de la fachada con el rótulo violeta comercial visible desde la acera.
   - Detalle del acceso a cota cero (visibilidad para carritos de bebé y movilidad reducida).
2. **Zonas comunes**:
   - Recepción y mostrador de bienvenida con iluminación natural o cálida.
   - Sala de espera familiar (espacio infantil con juguetes/alfombra higienizada).
3. **Área pediátrica**:
   - Sala diáfana de fisioterapia infantil con colchonetas, rulos de estimulación psicomotriz y luz natural.
   - Tomas de interacción terapéutica con bebé y familia colaboradora (con consentimiento informado de cesión de imagen sanitaria firmado).
4. **Área de adultos y bienestar**:
   - Cabina individual con camilla hidráulica, iluminación regulable indirecta y toallas neutras.
   - Espacio de readaptación y ejercicio activo (fitball, espalderas, bandas elásticas).
5. **Equipo profesional**:
   - Retratos individuales con indumentaria profesional neutra en el entorno del centro.
   - Fotografía conjunta de las profesionales en la zona de recepción o sala principal.
