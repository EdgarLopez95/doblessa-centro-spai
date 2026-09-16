# Cuestionario de Gaps de Validación — Centro Spai

Este documento recoge el estado de los puntos de información, decisiones de negocio, validaciones clínicas y materiales pendientes de confirmación por parte de la propiedad de **Centro Spai**.

---

## Matriz de control y cuestionario para el cliente

| ID | Falta | Dónde se ve | Qué debe enviar el cliente | Cerrable en mockup |
|---|---|---|---|:---:|
| **GAP-01** | **Naming de marca y dominio definitivo** | Header, Footer, Aviso legal, `/contacto/` | Confirmación de grafía oficial (*Centro Spai* vs. *Centro Espai*) y decisión sobre el dominio: migrar a `centro-spai.com` con 301 o conservar `centro-espai.com`. | ❌ Pendiente de cliente *(mitigado con aviso aclaratorio en UI)* |
| **GAP-02** | **Teléfonos de contacto y WhatsApp** | Footer, `/contacto/`, barra móvil de cita | Teléfono principal de recepción, teléfono de urgencias respiratorias pediátricas (si aplica) y número móvil con WhatsApp Business activo para reservas. | ❌ Pendiente de cliente *(mitigado mostrando «Pendiente de confirmar» sin enlaces falsos)* |
| **GAP-03** | **Correo electrónico corporativo** | Footer, `/contacto/`, formularios y avisos legales | Dirección de email oficial bajo el dominio definitivo para recepción de solicitudes generales y de privacidad. | ❌ Pendiente de cliente *(mitigado sin enlaces mailto ficticios)* |
| **GAP-04** | **Dirección física exacta y concordancia GBP** | Home, Footer, `/contacto/`, `/el-centro/` | Confirmar si la dirección de la web antigua (*Calle San José, 18, 12530 Burriana*) sigue vigente, piso/puerta, accesibilidad para carritos y concordancia con Google Business Profile. | ❌ Pendiente de cliente *(mitigado con sello visible «Por validar» en cada aparición)* |
| **GAP-05** | **Horario de atención al público** | Footer, `/contacto/`, `/el-centro/` | Horario de apertura de lunes a viernes (mañanas/tardes), sábados y política de citas concertadas o urgencias. | ❌ Pendiente de cliente *(mitigado con texto explicativo)* |
| **GAP-06** | **Equipo profesional y colegiación sanitaria** | `/el-centro/`, `/fisioterapia-infantil-burriana/` | Nombres y apellidos completos de las profesionales, titulación oficial, especialidad y número de colegiación en el ICOFCV (obligatorio por normativa sanitaria). | ❌ Pendiente de cliente *(mitigado con bloque «Perfiles pendientes de validar»)* |
| **GAP-07** | **Fotografías corporativas del equipo** | `/el-centro/` | Fotografías profesionales del equipo sanitario en las instalaciones (el archivo `equipo-centro-spai.jpg` heredado es un bebé en camilla y no un retrato de plantilla). | ❌ Pendiente de cliente *(sin fotos falsas de stock)* |
| **GAP-08** | **Validación clínica de textos y protocolos** | `/fisioterapia-infantil-burriana/`, `/colicos-del-lactante-burriana/`, `/osteopatia-bebes-burriana/`, `/embarazo-posparto/` | Revisión deontológica y clínica de los enfoques explicados (cólicos, inmadurez digestiva, técnicas manuales suaves, drenaje respiratorio y posparto). | ❌ Pendiente de cliente *(mitigado con avisos sanitarios visibles y cero promesas de cura)* |
| **GAP-09** | **Revisión de FAQs especializadas** | 5 landings de servicio | Validación de las respuestas a dudas frecuentes antes de proceder a marcarlas con schema estructurado `FAQPage`. | ❌ Pendiente de cliente *(schema excluido prudencialmente)* |
| **GAP-10** | **Catálogo de técnicas de adultos y tecnologías** | `/fisioterapia-adultos-burriana/` | Confirmar qué técnicas de la web anterior siguen activas: radiofrecuencia (Indiba Activ), punción seca, medicina tradicional china (MTC), fisioestética o masajes relax. | ❌ Pendiente de cliente *(mitigado con aviso expreso de no compromiso)* |
| **GAP-11** | **Taller Moquitos (organización e inscripción)** | `/talleres/` | Confirmar si el taller sigue activo, modalidad (presencial u online), fechas de próximas convocatorias, aforo máximo y precio por familia. | ❌ Pendiente de cliente *(mitigado con aviso visible de no inscripción)* |
| **GAP-12** | **Disponibilidad y vigencia de las apps** | `/talleres/` | Confirmar si las aplicaciones *No más Cólicos* y *Anticólicos* continúan publicadas en App Store / Google Play o si deben despublicarse de la web. | ❌ Pendiente de cliente *(sin enlaces de descarga no operativos)* |
| **GAP-13** | **Datos fiscales para Aviso Legal y RGPD** | `/aviso-legal/`, `/politica-de-privacidad/` | Razón social o nombre del autónomo titular, CIF/NIF, domicilio social, datos de inscripción registral sanitaria y designación de responsable/DPD. | ❌ Pendiente de cliente *(plantillas con placeholders y directiva noindex)* |
| **GAP-14** | **Sesión fotográfica real de instalaciones** | En todo el sitio | Fotografías actualizadas de la fachada a pie de calle, recepción, sala de fisioterapia pediátrica, cabinas de adultos y camillas. | ❌ Pendiente de cliente *(utilizando imágenes históricas aprobadas)* |
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
