# dyntec-contenido

Contenido para redes sociales de Dyntec (Instagram y Facebook): plantillas de marca, scripts de render y piezas listas para publicar.

> Repositorio **público**: Metricool toma los videos e imágenes desde sus enlaces `raw.githubusercontent.com`. Aquí solo va contenido que se va a publicar.

## Reglas de contenido

- Sin nombres, logos, dominios ni colores de marca de clientes. Sin montos de contratos ni cotizaciones.
- Capturas y mockups siempre con datos ficticios.
- Marca oficial (Manual de identidad 2024): `#009481`, `#5ac3b7`, `#121a22`; títulos en Open Sauce One Bold y textos en Roboto (`plantillas/assets/official/fonts/`); isotipo en `plantillas/assets/official/`.
- Voz en off: ElevenLabs, voz **Pablo Rosete** (`ZpHPHPi1Mi7JR15GRhqv`), modelo `eleven_v4`.
- Ritmo (plan Free de Metricool, máx. 20 programadas al mes): **2 reels + 2 posts por semana**. Historias directo en Instagram.

Calendario: [`calendario.md`](calendario.md) · Guía de producción: [`GUIA.md`](GUIA.md)

## Estructura

```
plantillas/            HTML de cada pieza + brand.css + motor de reels (reel_base.*)
  assets/official/     isotipo, imagotipo y fuente Open Sauce One
scripts/
  render_reel.py       renderiza un reel y monta la voz, con cortes en las pausas
  frames.py            captura cuadro por cuadro (Chrome + Playwright)
  shot.py              exporta posts e historias a PNG
publicar/AAAA-MM-DD_semanaN/   piezas finales de cada semana
```

## Flujo semanal

1. **Jueves:** se generan guiones, voces y piezas de la semana siguiente y se suben a `publicar/`.
2. Se crean como **borradores** en el Planificador de Metricool, con fecha y hora.
3. **Viernes:** el equipo revisa y programa cada borrador en Metricool. Lo que no se programa, no se publica.

## Render

```bash
python3 scripts/render_reel.py plantillas/reel2.html voz.mp3 publicar/.../reel2_final.mp4
python3 scripts/shot.py "$PWD/plantillas/post1.html" "publicar/.../post1_%d.png" 1080 1350 .slide
```
