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
