# Crítica independiente — Ronda 2

**Total: 78 / 100 · No aprobado · 0 bloqueantes**

| Categoría | Nota |
|---|---:|
| Jerarquía y tipografía | 8.0 |
| Color y marca | 7.5 |
| Layout, ritmo y responsive | 7.5 |
| Originalidad | 7.0 |
| Copy sanitario | 9.0 |
| UX / conversión | 8.5 |
| Accesibilidad | 8.0 |
| Pulido e interacción | 7.0 |
| Fidelidad a la dirección | 8.0 |
| Credibilidad ante cliente | 7.5 |

Resuelto respecto a la ronda 1: lista compacta en móvil, barra CTA sólida, código de color de ruta, eliminación de botones deshabilitados, copy prudente y alineaciones.

## Problemas y resolución

| Impacto | Problema | Resolución |
|---|---|---|
| Alto | La placa del logo sobresale del header fijo y tapa contenido al hacer scroll; en móvil se ve un resto del lema | La placa se reduce a la altura del header al hacer scroll; recorte ajustado. |
| Alto | Ilustraciones con `multiply`: el blob gris ensucia los fondos y flotan pequeñas | Tratamiento único de "medallón" blanco circular para todas las ilustraciones, a mayor tamaño. |
| Medio | Iconos PNG magenta en contacto, fuera de tokens | Sustituidos por iconos SVG en lilac-100/spai-700; los PNG `ui/` se retiran. |
| Medio | CTA violeta en el header y sage en el hero de adultos | El CTA del header usa sage en rutas de adultos. |
| Medio | Conviven mayúsculas con tracking y eyebrows en tipo oración | Todas las etiquetas pasan a tipo oración. |
| Medio | Home móvil todavía larga | "Por qué Spai" compacto en móvil; fotos de centro y adultos más bajas. |
| Medio | Chips repetidos en las tarjetas de necesidad | Chips eliminados en la home. |
| Bajo | TOC estrecho y números desalineados | Ancho de 17 rem, `baseline` y `tabular-nums`. |
| Bajo | Hueco bajo los CTA del hero | Padding inferior del hero reducido. |
| Bajo | Dos tratamientos distintos de ilustración | Unificado (ver arriba). |
