# Guía de producción semanal (para la tarea automática)

La tarea corre cada jueves y deja **lista la semana que empieza el lunes siguiente**. Nunca publica: solo crea **borradores** en Metricool. El equipo de Dyntec los revisa y programa el viernes.

## 1. Qué producir

1. Abre `calendario.md` y ubica la fila cuyo lunes es el próximo lunes.
2. Produce todas las piezas marcadas `pendiente` de esa fila. Las marcadas `listo` ya están en `publicar/` y solo se suben como borrador.
3. Carpeta de salida: `publicar/AAAA-MM-DD_semanaN/` (fecha del lunes).
4. Nombres: `post1_N.png` (carrusel, una imagen por lámina), `post2_*.png`, `reelN_<tema>.mp4`, `historia_*.png`, voces en `voces/`.

## 2. Reglas de contenido (obligatorias)

- **Nunca** nombres, logos, dominios, colores de marca ni montos de clientes reales. Casos se describen por giro generalizado ("cadena con más de 50 sucursales", "gimnasio boutique", "inmobiliaria").
- Mockups y capturas siempre con datos ficticios.
- No prometer lo que no está en contrato (nada de "soporte 24/7").
- Para financieras: hablar del sistema ("control de tu cartera"), nunca de préstamos.
- Oferta vigente: **Diagnóstico de 30 minutos sin costo**. CTA: **WhatsApp 222 352 6054** y dyntec.com.mx.
- Tono: directo, cercano, español de México, frases cortas. Mensaje central: "tu negocio, en automático"; "lo ves funcionando antes de invertir en todo".


## 2b. Sistema de variedad (obligatorio)

Ninguna semana puede parecerse a la anterior. Cada pieza del calendario trae un **código de formato**; si dice `libre`, elige uno que no se haya usado en las últimas 3 semanas (revisa `formatos_usados.md` y agrega ahí lo que uses).

### Formatos de reel
| Código | Formato | Cómo se hace |
|---|---|---|
| R1 | Texto cinético | Solo tipografía gigante animada al ritmo de la música, cortes cada 0.5–1 s, fondos que alternan oscuro/teal/claro. Sin mockups. |
| R2 | POV / humor | "POV: eres el dueño y son las 11 p.m.…". Clip IA de 5 s (Veo Lite) + texto en pantalla + música. Voz opcional. |
| R3 | Antes/después en pantalla dividida | Mitad caos (papel, Excel), mitad sistema; contador de tiempo o errores. |
| R4 | Producto en acción 2.5D | Pantallas reales del CRM o demos (datos ficticios) con zoom, inclinación y parallax; cortes sincronizados con efectos de sonido (clic, whoosh). Puedes usar Remotion. |
| R5 | Rayos X / explicativo | Como "Rayos X de un chatbot". Máximo uno cada 4 semanas. |
| R6 | Lluvia de notificaciones | Avalancha de WhatsApps y errores de Excel con sonido; silencio total cuando entra el sistema. |
| R7 | Top 3 / cuenta regresiva | "3 señales…", "3 errores…", números gigantes. |
| R8 | Quiz para comentar | Pregunta con opciones A/B/C, pausa con temporizador, "responde en comentarios". |
| R9 | Socio a cámara | Solo si el equipo sube un video grabado; Claude lo edita con subtítulos y gráficos. |
| R10 | Escena cinematográfica IA | 1–2 clips Veo Lite de un negocio genérico (sin marcas ni rostros reconocibles) + interfaz superpuesta. |

### Formatos de post
| Código | Formato |
|---|---|
| P1 | Carrusel educativo oscuro (el clásico). Máximo uno cada 2 semanas. |
| P2 | Carrusel "Mito vs. realidad" en fondo claro, tachados grandes. |
| P3 | Tarjeta de opinión: una frase fuerte de Dyntec, tipografía enorme, fondo de color pleno. |
| P4 | Checklist para guardar ("guárdalo para tu próxima junta"), fondo teal. |
| P5 | Foto editorial IA a sangre (negocio mexicano genérico) + titular de la plantilla. La IA nunca escribe texto en la imagen. |
| P6 | Infografía/diagrama de un proceso automatizado paso a paso. |
| P7 | Comparativa estilo hoja de cálculo: Excel vs. sistema. |
| P8 | Carrusel quiz: "desliza para ver la respuesta". |
| P9 | Meme propio en 2 paneles ilustrados por IA (sin personajes ni plantillas con derechos). |
| P10 | Ficha de caso con datos ficticios: reto, solución, resultado. |

### Historias
Rota entre: encuesta, slider de emoji, quiz, caja de preguntas, "esto o esto", cuenta regresiva al siguiente post, reshare del post del día y detrás de cámara (pide fotos al equipo en el resumen).

### Reglas de diseño para variar
- Rota 3 fondos: oscuro `#121a22`, teal `#009481` y claro (`#F4FAF9` o blanco). Nunca 2 piezas seguidas con el mismo fondo dominante.
- Rota composiciones: tipografía centrada gigante, asimétrica, retícula, foto a sangre, collage. La ola teal es un recurso, no un requisito.
- Gancho visual en el primer segundo; en reels, corte o movimiento cada 1–2 s; nada estático más de 1.5 s.
- Subtítulos palabra por palabra (estilo karaoke) en todo reel con voz; tiempos con ElevenLabs Scribe o Whisper.
- Alterna reels con voz y reels solo con música y texto (al menos 1 de cada 4 sin voz).
- Música: biblioteca de pistas instrumentales propias en `plantillas/audio/` (genera nuevas con ElevenLabs Music solo si faltan; reutilízalas). Efectos de sonido generados una vez y guardados ahí.
- Crea una plantilla nueva por formato la primera vez que se use (`plantillas/formatos/<código>.html`) y reutilízala después con cambios de layout.

### Presupuesto de ElevenLabs (plan Starter, 40,000 créditos/mes, renueva el día 3)
Costos medidos: voz de reel ~450 · imagen IA ~190 · pista de música ~1,500 · clip de video Veo 3.1 Lite de 5 s ~2,400 (**no uses Seedance ni Kling**: ~14,000 por clip).
- Por semana, máximo: 2 voces, 6 imágenes IA, 1 clip de video Veo Lite y 1 pista nueva de música.
- Antes de cualquier video o música corre `estimate_only`; si la semana pasaría de 7,000 créditos, cambia a un formato sin video IA.
- Revisa `account_get_usage` al empezar; si quedan menos de 6,000 créditos, usa solo voz y formatos sin IA generativa.


## 2c. Herramientas para producir con variedad (usar desde la semana 2)

Los reels nuevos se hacen en **Remotion** (proyecto en `remotion/`, se crea la primera vez con el skill `remotion:remotion-create`) apoyándose en las **recetas de video-shotcraft**. Las plantillas HTML de `plantillas/` quedan solo para posts e historias o como respaldo.

**Skills disponibles en la cuenta** (si en la sesión no aparecen, instala `remotion` con npm, consulta la documentación oficial con `remotion:remotion-docs` o la web, y arma las tomas a mano siguiendo la misma lógica; anótalo en el resumen):
- `remotion:remotion-best-practices` (router): leer antes de escribir código Remotion. Temas útiles: `transitions`, `effects`, `light-leaks`, `text-highlights`, `3d`, `audio-visualization`, `sfx`, `local-fonts`, `multi-scene-video`, `voiceover`.
- `remotion:remotion-captions`: subtítulos palabra por palabra. Tiempos con ElevenLabs Scribe (Whisper.cpp puede no descargar su modelo por la red).
- `video-shotcraft:video-shotcraft`: modo **"单镜头/单动效" (una toma)**: elegir una tarjeta de `references/shots/<categoría>/`, leerla completa y adaptar su demo. ~180 tomas en 11 categorías. Componentes en `assets/lib/` (copiarlos al proyecto, no importarlos).
- `marketing:brand-review`: pasar cada semana los textos por revisión de marca antes de crear borradores.
- `marketing:performance-report`: reporte mensual con las métricas de Metricool (`getAnalyticsDataByMetrics`).
- `marketing:content-creation` / `marketing:draft-content`: ganchos y textos de publicación.

**Recetas sugeridas por formato** (tarjetas de video-shotcraft; rota para no repetir):
| Formato | Tomas sugeridas |
|---|---|
| R1 texto cinético | typography: `flying-words`, `cel-flash-stomp`, `lead-word-zoom-assemble`, `split-flap-title`, `scramble`, `gradient-word-sweep`, `type-rhythm-sync` + rhythm: `beat-cut-moves`, `trailer-grammar-moves` |
| R2 POV / R10 escena IA | Clip Veo Lite en `<Video>` con effects `duotone()` (navy/teal), `vignette()`, `chromaticAberration()`, `lightLeak()`; transitions: `white-flash-logo-simplify-cut`, `circle-match-iris` |
| R3 pantalla dividida | data: `before-after-slider-scrub`; rhythm: `quad-split-parallel-scenes`, `speed-ramp-freeze` |
| R4 producto 2.5D | camera: `cursor-flyover`, `depth-layer-moves`, `crash-zoom-punch`, `steep-tilt-glide`; interaction: `ai-stream-response`, `command-palette-summon`, `type-and-filter` (ideal para el Copiloto del CRM) |
| R5 explicativo | ui-entrance: `integration-hub-map`, `draw-svg-trace`; effects: `scan-bracket-sweep`, `fui-hud-moves` |
| R6 lluvia de notificaciones | ui-entrance: `card-stack`, `list-stack-press`, `deck-deal-flyin`; effects: `impact-feedback`; rhythm: `rhythm-interrupt-moves` |
| R7 top 3 | typography: `countdown-arc-scatter`; data: `odometer-digit-roll`, `counter-confetti`, `gauge-readout-moves` |
| R8 quiz | interaction: `chip-grid-single-select-blackout`, `picker-carousel-feature-cycle`, `segmented-thumb-hero` |
| Aperturas (rotar) | opening: `brand-ink-open`, `text-as-mask`, `letterspace-materialize`, `orbit-ring-title-open`, `fracture` |
| Cierres (rotar) | outro: `logo-shrink-wordmark-lockup`, `ui-to-brand-morph`, `grain-dissolve`, `ui-strip-away-outro` |

**Más ideas para variar:**
- Textura de la semana: rota un efecto global distinto (`halftone()`, `paper()`, `noise()`, `scanlines()`, `duotone()` con colores de marca).
- Isotipo en 3D (Three.js con `ThreeCanvas`) para aperturas especiales, máximo una vez al mes.
- Barras de audio (`audio-visualization`) bajo la voz en reels tipo "nota de voz".
- Carruseles mixtos: Instagram admite videos dentro del carrusel. Alterna láminas fijas con 1 o 2 clips cortos renderizados en Remotion.
- Prueba de ganchos: para un reel por mes, crea un segundo borrador como `TRIAL_REEL` (solo lo ven no seguidores) con otro gancho, y compara en Metricool.
- Posts: Remotion puede exportar fotogramas fijos (`renderStill`) con los mismos componentes que los reels; úsalo para carruseles con el estilo de la semana.

**Audio y licencias:**
- Efectos de sonido: usa los de `video-shotcraft/assets/audio/sfx/` que tengan licencia registrada en `ATTRIBUTION.md` (Mixkit) o genera con ElevenLabs SFX. Los de `remotion.media` no descargan (dominio no permitido).
- Música: **no uses las pistas de `video-shotcraft/assets/audio/bgm/`** (licencia comercial sin confirmar). Usa solo pistas generadas con ElevenLabs Music guardadas en `plantillas/audio/`.

## 3. Marca

- Usa solo las plantillas de `plantillas/` y `brand.css`. Colores `#121a22`, `#009481`, `#5ac3b7`. Títulos Open Sauce One Bold, textos Roboto. Isotipo `assets/official/iso_blanco.png`.
- Carruseles y posts: 1080×1350, partir de `post1.html` u `oferta.html` (fondo oscuro arriba, ola teal abajo, tarjeta/mockup blanco).
- Historias: 1080×1920, partir de `story1.html`; dejar espacio libre al centro si lleva encuesta.
- Reels: 1080×1920, partir de `reel2.html` o `reel3.html` (usan `reel_base.css` + `reel_base.js`): escenas `#s1…#sN`, arreglos `window.T` (cortes) y `LV` (altura de ola) y función `anim(t,T)`. Revisa cuadros clave con `scripts/frames.py` + `scripts/sheet.py` antes de renderizar completo.

## 4. Voz (ElevenLabs)

- Voz **Pablo Rosete** `ZpHPHPi1Mi7JR15GRhqv`, modelo `eleven_v4`, **generations_count = 1** (ahorra créditos).
- Guion de 20 a 35 s (55 a 90 palabras), con pausas marcadas por puntos o "…" entre escenas.
- Descarga el MP3 en cuanto termine (`creative_get_flow_run_status` → `content_url`, el enlace caduca en horas) con `curl` a `voces/`.
- Render: `python3 scripts/render_reel.py plantillas/<reel>.html voces/<voz>.mp3 publicar/.../<reel>.mp4`. Revisa con `silencedetect` que los cortes caigan en las pausas correctas; si no, pásale los cortes a mano.

## 5. Subir y crear borradores

1. `git add`, commit y `git push` a `main` (repo público: Metricool toma los archivos de `https://raw.githubusercontent.com/SITADYNTEC/dyntec-contenido/main/<ruta>`).
2. Metricool, marca `blogId 8136891`, red `instagram`, zona `America/Mexico_City`. Para cada pieza de la semana, `createScheduledPost` con `"draft": true`, a las 13:00 del día que marca el calendario:
   - Reel: `instagramData.type = "REEL"`, `isAiGenerated: true` (voz sintética).
   - Carrusel/post: `type = "POST"`, `media` con las imágenes en orden.
   - Historias **no** se suben a Metricool: quedan en `publicar/` para subirlas a mano.
3. Texto de cada publicación: 1 a 3 líneas + CTA con el WhatsApp + 4 a 6 hashtags (#Puebla #PyMEs #Automatización + del tema).
4. Antes de crear, revisa con `getScheduledPosts` que no exista ya un borrador para ese día (no duplicar).

## 6. Cierre

- Actualiza `calendario.md`: marca como `listo` lo producido.
- Envía al equipo un resumen corto: piezas de la semana, día y hora, enlace al Planificador de Metricool, y las historias que deben subir a mano. Recuerda que hay que **programar los borradores antes del lunes**.
- Si algo falla (créditos, render, Metricool), deja lo que sí quedó listo, explica qué faltó y no reintentes generaciones de voz pagadas.
