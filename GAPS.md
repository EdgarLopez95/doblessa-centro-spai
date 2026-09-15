# Gaps de validación y contenidos pendientes — Centro Spai

Este documento recoge de manera exhaustiva todos los puntos de información, decisiones de negocio, validaciones clínicas y materiales pendientes de confirmación por parte de la propiedad de **Centro Spai** antes de pasar el proyecto de mockup estático a fase de producción.

---

## 1. Naming de marca y dominio definitivo

* **Discrepancia detectada**:
  * Dominio histórico y activo: `centro-espai.com`.
  * Nombre propuesto en el rediseño y rótulo de marca: `Centro Spai` (sin "E" inicial).
* **Decisiones pendientes con el cliente**:
  1. Confirmar la grafía oficial de marca: ¿**Centro Spai** o **Centro Espai**?
  2. Confirmar la estrategia de dominio web:
     * Adquirir `centro-spai.com` y configurar redirección 301 desde `centro-espai.com`.
     * Mantener `centro-espai.com` como dominio principal y ajustar el naming o lema si procede.
  3. Establecer las cuentas de correo corporativo bajo el dominio definitivo.

---

## 2. Datos de contacto, ubicación y atención (NAP)

Actualmente la web muestra marcadores de "Por validar" o textos demostrativos sin enlazar números ficticios ni botones muertos.

* **Elementos requeridos**:
  * **Dirección postal completa**: Calle/Avenida, número, piso/puerta, código postal (Burriana, Castellón). Confirmar concordancia exacta con la ficha de Google Business Profile.
  * **Teléfonos de contacto**:
    * ¿Línea única centralizada o líneas independientes para Infantil y Adultos?
    * Teléfono móvil con WhatsApp Business habilitado para solicitud directa de citas.
  * **Correo electrónico oficial**: Dirección operativa para recepción de solicitudes generales o administrativas.
  * **Horario de apertura**:
    * Días laborables (mañana y tarde) y política de citas programadas / urgencias respiratorias pediátricas.
  * **Instrucciones de acceso**: Accesibilidad para carritos de bebé, opciones de aparcamiento cercano y transporte público.

---

## 3. Equipo profesional y colegiación sanitaria

La normativa sanitaria y deontológica exige rigor en la presentación del personal sanitario y sus atribuciones.

* **Elementos requeridos**:
  * **Nombres y apellidos completos** de cada fisioterapeuta y profesional del centro.
  * **Número de colegiación oficial** en el Colegio Oficial de Fisioterapeutas de la Comunidad Valenciana (ICOFCV).
  * **Titulaciones y especialidades clínicas acreditadas**:
    * Fisioterapia pediátrica y estimulación del desarrollo.
    * Fisioterapia respiratoria infantil.
    * Terapia manual y osteopatía pediátrica/infantil.
    * Fisioterapia del suelo pélvico, obstetricia y reeducación uroginecológica.
    * Fisioterapia neurológica y musculoesquelética en adultos.
  * **Fotografías reales del equipo**:
    * *Nota técnica*: El archivo `equipo-centro-spai.jpg` heredado de la web anterior mostraba la foto de un bebé en camilla, no a los profesionales. Se requiere una fotografía corporativa real y de calidad del equipo en el centro.

---

## 4. Validación clínica y deontológica de contenidos

Los textos del mockup han sido redactados desde un enfoque riguroso, prudente y respetuoso con la evidencia científica, eliminando cualquier promesa de cura o beneficio inmediato ("desde la primera sesión" ha sido erradicado).

* **Aspectos a validar por el equipo clínico**:
  * **Cólicos del lactante**:
    * Adecuación de la explicación sobre inmadurez digestiva, tensiones biomecánicas y pautas de alivio para familias.
    * Protocolo de la primera sesión: valoración global, historia clínica de parto, observación de tomas y respeto al ritmo del recién nacido.
  * **Osteopatía para bebés**:
    * Enfoque no invasivo basado en técnicas manuales suaves y craneosacrales sutiles.
    * Coordinación y derivación con pediatras y matronas.
  * **Fisioterapia respiratoria infantil**:
    * Explicación del manejo de secreciones, mocos y bronquiolitis; desmitificación del dolor durante el drenaje.
  * **Embarazo y posparto**:
    * Criterios y tiempos de valoración de suelo pélvico (cuarentena vs. 6-8 semanas posparto).
    * Advertencias y contraindicaciones de ejercicio físico adaptado.
  * **Preguntas frecuentes (FAQs)**:
    * Revisión de las 5 secciones de FAQ en cada servicio especializado antes de marcarlas con schema estructurado `FAQPage`.

---

## 5. Catálogo de tratamientos de adultos y aparatología

En la web anterior coexistían servicios muy diversos con diferente grado de vigencia y demanda.

* **Servicios por confirmar con la dirección**:
  * ¿Se mantienen en cartelera tratamientos específicos como **Indiba Activ** (radiofrecuencia), **punción seca**, **neuromodulación** o **terapias miofasciales**?
  * ¿Se ofrece **Medicina Tradicional China / Acupuntura** en la actualidad?
  * ¿Se oferta **Fisioestética / Fisioterapia dermatofuncional** de forma activa o se prioriza exclusivamente la fisioterapia de dolor y readaptación?
  * ¿Se publicarán tarifas, bonos de sesiones o se mantendrá exclusivamente información bajo consulta previa?

---

## 6. Talleres para familias y aplicaciones móviles

La web incluye una página `/talleres/` que se mantiene deliberadamente en `noindex` hasta disponer de datos operativos.

* **Taller Moquitos**:
  * ¿Continúa impartiéndose de forma regular o bajo demanda para grupos de familias?
  * ¿Modalidad presencial, online o mixta?
  * Calendario, duración, aforo máximo y precio por unidad familiar.
* **Aplicaciones móviles**:
  * En la web anterior se referenciaban aplicaciones móviles vinculadas a Centro Spai.
  * ¿Siguen publicadas y mantenidas activamente en Apple App Store y Google Play Store?
  * En caso afirmativo: proporcionar enlaces vigentes a las tiendas.
  * En caso negativo: confirmar la eliminación definitiva de esta sección en el rediseño.

---

## 7. Cumplimiento legal y RGPD

Las páginas `/aviso-legal/` y `/politica-de-privacidad/` están creadas como plantillas estructurales y bloqueadas con `noindex`.

* **Datos legales obligatorios**:
  * Denominación social o nombre fiscal del titular (persona física o jurídica).
  * NIF o CIF.
  * Domicilio fiscal completo.
  * Datos registrales (Registro Mercantil si procede, o Registro de Centros, Servicios y Establecimientos Sanitarios de la Generalitat Valenciana).
  * Delegado de Protección de Datos (DPD) o email de ejercicio de derechos ARCO/RGPD.
  * Política de cookies y herramienta CMP (Consent Management Platform) si se van a instalar scripts de analítica (Google Analytics 4, Tag Manager, etc.).

---

## 8. Banco de imágenes y sesión fotográfica profesional

El mockup actual combina imágenes históricas aprobadas de `Recursos/` convertidas a formato WebP de alto rendimiento. Para la versión final comercial se recomienda planificar:

* **Sesión fotográfica en Burriana**:
  * Fachada exterior y rótulo comercial accesible a pie de calle.
  * Sala de espera y recepción.
  * Sala de fisioterapia pediátrica y psicomotricidad.
  * Cabinas de tratamiento de adultos y camillas especializadas.
  * Fotografías de interacción profesional-bebé y profesional-adulto con modelos locales y consentimientos firmados para uso sanitario y publicitario.
