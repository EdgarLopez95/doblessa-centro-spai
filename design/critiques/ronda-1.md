# Crítica independiente — Ronda 1

**Total: 73,5 / 100 · No aprobado (umbral 85) · 0 bloqueantes**

| Categoría | Nota |
|---|---:|
| Jerarquía visual y tipografía | 8.0 |
| Color y coherencia de marca | 8.0 |
| Layout, ritmo y responsive | 7.0 |
| Originalidad vs plantilla | 6.5 |
| Copy y adecuación sanitaria | 8.5 |
| UX / conversión | 7.5 |
| Accesibilidad | 8.0 |
| Pulido e interacción | 6.5 |
| Fidelidad a la dirección | 7.0 |
| Credibilidad ante cliente | 6.5 |

## Problemas y resolución

| Impacto | Problema | Resolución |
|---|---|---|
| Alto | Hero con bebé de stock | **Se mantiene**: la imagen `inicio/hero-centro-spai.jpg` es un requisito explícito del cliente. Se reduce su altura en móvil. |
| Alto | Ilustración de cólicos en caja blanca, aspecto clipart | Se integra sobre el fondo con `mix-blend-mode: multiply`, sin caja ni sombra (home y heros de ilustración). Se mantiene el recurso porque es la imagen específica pedida. |
| Alto | Home móvil de 10.579 px, 6 tarjetas altas | Necesidades en lista compacta en móvil (icono, título y enlace). |
| Medio | Código de color de ruta débil | Tarjetas de audiencia con fondo lila/sage y títulos de adultos en sage-800. |
| Medio | Botones Llamar/WhatsApp deshabilitados | Sustituidos por una lista informativa, sin controles muertos. |
| Medio | Eyebrows en mayúsculas | Pasan a tipo oración. |
| Medio | Hueco antes del panel de cólicos | Se ajusta el padding. |
| Medio | Barra CTA móvil translúcida | Fondo sólido. |
| Bajo | Lema ilegible en la placa del logo | Recorte del lema en el header; el logo completo se mantiene en el footer. |
| Bajo | Desalineación en "Por qué Spai" | `align-items: start`. |
| Bajo | Subnavegación cortada sin pista | Degradado lateral en móvil. |
| Bajo | Copy que insinúa volumen o credenciales | Reescrito ("Si ya venís con vuestros hijos…", "Atención cuidadosa"). También se corrigen afirmaciones no verificables en El centro e Infantil. |
