# Crítica independiente — Ronda 3

**Total: 80 / 100 · No aprobado · 0 bloqueantes**

| Categoría | Nota |
|---|---:|
| Jerarquía y tipografía | 8.0 |
| Color y marca | 8.0 |
| Layout, ritmo y responsive | 7.5 |
| Originalidad | 7.5 |
| Copy sanitario | 9.0 |
| UX / conversión | 8.5 |
| Accesibilidad | 8.0 |
| Pulido e interacción | 7.5 |
| Fidelidad a la dirección | 8.0 |
| Credibilidad ante cliente | 8.0 |

Confirmado: la placa del header encaja al hacer scroll, el color por ruta es coherente y las etiquetas van en tipo oración.

## Problemas y resolución

| Impacto | Problema | Resolución |
|---|---|---|
| Alto | La mancha gris sigue dentro del medallón; en adultos hay triple marco | Filtro de brillo que aclara la mancha, un solo anillo, más margen interior y sin panel sage en adultos. Las imágenes originales no se editan (son recursos del cliente). |
| Alto | Home móvil de 8778 px | En móvil se ocultan la ilustración de cólicos y la foto de adultos, "Por qué Spai" queda solo con icono y título, y se reduce el padding de sección. |
| Medio | El header translúcido deja ver el texto de detrás | Fondo sólido al hacer scroll. |
| Medio | La placa anima height y padding | Se elimina esa transición. |
| Medio | Huecos verticales de más de 200 px en escritorio | `--section-y` máx. 6 rem; el CTA tras la FAQ pierde el padding superior. |
| Medio | El CTA del hero de cólicos usa otro verbo; medallón grande | "Pedir cita infantil"; medallón de 22 rem. |
| Bajo | Etiquetas de tarjeta a 12 px | 14 px, estilo unificado. |
| Bajo | Targets pequeños | Revisado: migas y enlaces del footer ya tienen `min-height: 44px`. |
