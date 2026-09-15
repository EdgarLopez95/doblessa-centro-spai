# Dirección visual — “Cuidado experto, desde el primer día”

## Idea central
Una clínica editorial y luminosa: titulares Fraunces con cursiva cálida, mucho aire y fondos que codifican la ruta — **lila/blush para infantil, nube/sage para adultos**. El color no decora: orienta.

## Elemento memorable
1. **La placa de marca**: el logo (texto blanco) vive sobre una placa violeta que “cuelga” del borde superior del header, eco directo del rótulo real de la fachada en Burriana (foto que aparece en la home y en El centro).
2. **El selector de dos rutas** que se superpone al hero: “Para mi bebé o niño” (lila) / “Para mí” (sage). Ese código de color se mantiene en el resto del sitio (banda de ruta, CTA contextual, formulario).

## Tokens
| Semántico | Valor | Nota contraste |
|---|---|---|
| `--brand` spai-700 | #5B437B | blanco sobre él 9.3:1 |
| `--accent` spai-500 | #8062A7 | sobre blanco 5.3:1 (texto de enlace) |
| `--warm` blush-300 | #F2B6C5 | solo superficie/decoración |
| `--info` sky-200 | #BFE1EA | superficie |
| `--well` sage-200 | #CFE3D3 | superficie adultos |
| `--bg` cloud-50 | #FAFAFC | fondo base |
| `--kids` lilac-100 | #F0EBF6 | superficie infantil |
| `--text` ink-900 | #25222A | 15:1 |
| `--text-2` ink-600 | #615C68 | 6.3:1 sobre bg |
Derivados: `--brand-strong #47345F` (hover), `--line #E4DAF0`, `--blush-100 #FCEBF0`, `--sage-100 #EBF4ED`, `--sage-800 #33503C` (texto sobre sage), `--sky-100 #E8F4F7`.

## Tipografía
Fraunces 500–600 (opsz) titulares, cursiva 500 para énfasis emocional. Source Sans 3 400–700 cuerpo/UI. Cuerpo 17/28; H1 clamp 38→52; H2 clamp 30→36; H3 22→24. Eyebrows en Source Sans 600 con tracking suave, sin mayúsculas gritonas.

## Retícula y forma
Contenedor 1184px, gutters 16/20/24. Ritmo 32·56·80·112. Paneles 24px de radio, botones/inputs 12px, chips 999px pequeños. Bordes lilas finos, sombra casi imperceptible. No todo es card: secciones editoriales en dos columnas con listas, filetes y numeración.

## Wireframes
```
DESKTOP HOME
[placa logo] Infantil  Adultos y bienestar  El centro  Talleres  Contacto  [Pedir cita]
┌──────────────────────────────────────────────────────────────┐
│ Eyebrow · Burriana                                  (bebé)   │
│ H1 Fisioterapia infantil y bienestar en Burriana             │
│ lead + [Pedir cita infantil] [Ver cólicos]                   │
└──────────────────────────────────────────────────────────────┘
   ┌── Para mi bebé o niño (lila) ──┐ ┌── Para mí (sage) ──┐   ← solapado
Necesidades (grid 3×2 de tarjetas de lenguaje familiar)
Cólicos destacado: panel blush | ilustración · señales · CTA
Confianza: 4 compromisos + nota de validación
Timeline 1—2—3 horizontal
El centro: foto fachada | texto
Adultos: banda sage con foto
CTA final dos rutas
Footer violeta

MÓVIL
header 64px [placa] ........ [☰]
imagen recortada (bebé) 240px → texto → CTA ancho completo
selector apilado · grid 1 col · timeline vertical · barra CTA fija inferior
```

## Motion
Reveal al entrar en viewport: opacidad + 12px, 220ms ease-out, escalonado 40ms, solo si hay JS. Hover de cards: borde y desplazamiento 2px, 180ms. FAQ con `::details-content` si el navegador lo soporta. Visor de galería con `<dialog>` y fade 200ms. `prefers-reduced-motion`: sin desplazamientos ni transiciones.

## Autocrítica
- ¿Hero centrado + 3 cards? No: hero asimétrico sobre la foto real y selector solapado.
- ¿Todo cards? Las necesidades sí; confianza, cólicos, timeline, centro y adultos son editoriales.
- ¿Demasiado rosa? El blush queda en un solo módulo (cólicos) y detalles; la marca manda en violeta.
- ¿Ilustraciones planas genéricas? Se usan pequeñas y enmarcadas solo en módulos de servicio; el peso emocional lo llevan fotos reales (fachada, salas) y la tipografía.
