// R7 · Top 3 — "3 señales de que tu restaurante necesita un sistema" (S2, sábado). Sin voz.
// Apertura adaptada de video-shotcraft `countdown-arc-scatter` (ventanas estiradas en proporción,
// escala ×3 para 1080 px); números gigantes cortados al pulso de la pista pop_118bpm.
import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { Audio } from "@remotion/media";
import { C, HEAD, BODY, beatF, clamp, outExpo, outCubic, inOutCubic, fade } from "./brand";

export const SENALES_DURATION = beatF(50);

const lerp = (k: number, a: number, b: number) => a + (b - a) * k;
const seg = (f: number, a: number, b: number, easing?: (n: number) => number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing });

// ---------- Apertura: dial (0 – beat 8) ----------
const NUMS = [12, 10, 9, 7, 6, 5, 3, 2, 1]; // i=6 es el "3": ángulo 0 al detenerse
const R0 = 420;
const SP = 24;
const NUM_SIZE = 150;
const PIV = { x: 540, y: 1180 };
const TARGET = { x: -330, y: -500 }; // posición del "3" como primer carácter del título

const Dial: React.FC = () => {
  const f = useCurrentFrame();
  const stop = beatF(2); // el dial se detiene en el pulso 2
  const rot = lerp(seg(f, 0, stop, outCubic), 96, 0);
  const hand = seg(f, stop, stop + 14, inOutCubic);
  const out = seg(f, stop - 2, stop + 14, Easing.in(Easing.quad));
  const words = [
    { t: "señales", a: beatF(3) },
  ];
  const line2 = seg(f, beatF(4), beatF(4) + 12, outCubic);
  const line3 = seg(f, beatF(5), beatF(5) + 12, outCubic);
  const tint = seg(f, beatF(6), beatF(6) + 10);
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden", fontFamily: HEAD, fontWeight: 700 }}>
      <div style={{ position: "absolute", left: PIV.x, top: PIV.y, width: 0, height: 0 }}>
        {NUMS.map((n, i) => {
          const is3 = i === 6;
          const pa = (i - 6) * SP + rot;
          const rad = (pa * Math.PI) / 180;
          let x = Math.sin(rad) * R0;
          let y = -Math.cos(rad) * R0;
          let rs = pa;
          let op = Math.max(0, Math.min(1, (70 - Math.abs(pa)) / 22));
          if (is3) {
            x = lerp(hand, x, TARGET.x);
            y = lerp(hand, y, TARGET.y);
            rs *= 1 - hand;
          } else op *= 1 - out;
          return (
            <div key={i} style={{ position: "absolute", left: 0, top: 0, fontSize: NUM_SIZE, color: is3 ? C.teal : C.ink, letterSpacing: "-0.03em", opacity: op, transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rs}deg)`, filter: is3 ? undefined : `blur(${out * 9}px)` }}>
              {n}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, transform: `rotate(${rot * 0.35}deg)` }}>
          <div style={{ position: "absolute", left: -5, top: -300, width: 10, height: 78, borderRadius: 5, background: C.teal, opacity: 1 - out }} />
        </div>
        {/* título: el "3" aterriza a la izquierda de "señales" */}
        <div style={{ position: "absolute", left: TARGET.x + 70, top: TARGET.y, transform: "translateY(-50%)", fontSize: NUM_SIZE, color: C.ink, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
          {words.map((w) => {
            const p = seg(f, w.a - 6, w.a + 8, outCubic);
            return (
              <span key={w.t} style={{ display: "inline-block", opacity: p, filter: `blur(${(1 - p) * 18}px)` }}>
                {w.t}
              </span>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: TARGET.x - 60, top: TARGET.y + 110, width: 860, fontSize: 92, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.ink }}>
          <div style={{ opacity: line2, filter: `blur(${(1 - line2) * 14}px)` }}>de que tu restaurante</div>
          <div style={{ opacity: line3, filter: `blur(${(1 - line3) * 14}px)` }}>
            necesita{" "}
            <span style={{ color: `rgb(${Math.round(lerp(tint, 15, 0))},${Math.round(lerp(tint, 26, 148))},${Math.round(lerp(tint, 30, 129))})` }}>un sistema</span>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, bottom: 300, fontFamily: BODY, fontSize: 46, color: C.gray, opacity: fade(f, beatF(6), beatF(7)) }}>
        ¿Cuántas te suenan? 👇
      </div>
    </AbsoluteFill>
  );
};

// ---------- Señal ----------
type SignalProps = { n: number; bg: string; ink: string; accent: string; lines: string[]; sub: string; kicker: string };

const Signal: React.FC<SignalProps> = ({ n, bg, ink, accent, lines, sub, kicker }) => {
  const f = useCurrentFrame(); // 0 = pulso de entrada
  const b = (k: number) => beatF(k) - beatF(0);
  const slam = interpolate(f, [0, 7], [2.4, 1], { ...clamp, easing: outExpo });
  const drift = interpolate(f, [7, b(8)], [0, -40], clamp);
  const shakeX = f < 8 ? Math.sin(f * 2.7) * (8 - f) * 1.6 : 0;
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden", translate: `${shakeX}px 0px` }}>
      {/* número gigante */}
      <div style={{ position: "absolute", right: -40, top: 60, fontFamily: HEAD, fontWeight: 700, fontSize: 900, lineHeight: 0.8, color: accent, letterSpacing: "-0.06em", scale: String(slam), translate: `0px ${drift}px`, transformOrigin: "70% 40%", opacity: fade(f, 0, 3) }}>
        {n}
      </div>
      <div style={{ position: "absolute", left: 90, top: 300, fontFamily: BODY, fontStyle: "italic", fontWeight: 500, fontSize: 42, letterSpacing: ".3em", textTransform: "uppercase", color: accent, opacity: fade(f, 2, 8) }}>
        {kicker}
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 900, fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.0, letterSpacing: "-0.035em", color: ink }}>
        {lines.map((l, i) => {
          const at = b(i + 1);
          const p = seg(f, at - 3, at + 7, outExpo);
          return (
            <div key={l} style={{ opacity: p, translate: `${interpolate(p, [0, 1], [-120, 0])}px 0px`, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
              {l}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 90, right: 120, top: 1320, fontFamily: BODY, fontWeight: 500, fontSize: 50, lineHeight: 1.25, color: ink, opacity: seg(f, b(4) - 2, b(4) + 8, outCubic), translate: `0px ${interpolate(seg(f, b(4) - 2, b(4) + 8, outCubic), [0, 1], [30, 0])}px` }}>
        <span style={{ display: "inline-block", width: 70, height: 8, background: accent, borderRadius: 4, verticalAlign: "middle", marginRight: 22 }} />
        {sub}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Resolución ----------
const Solve: React.FC = () => {
  const f = useCurrentFrame();
  const b = (k: number) => beatF(k) - beatF(0);
  const chips = ["Reservas", "Comandas", "Inventario", "Cobro"];
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 300, fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.ink }}>
        <div style={{ opacity: seg(f, 0, 6), scale: String(interpolate(seg(f, 0, 8, outExpo), [0, 1], [1.2, 1])), transformOrigin: "left center" }}>¿Te sonó</div>
        <div style={{ opacity: seg(f, b(1) - 2, b(1) + 6), color: C.teal }}>alguna?</div>
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 640, fontFamily: BODY, fontWeight: 500, fontSize: 52, lineHeight: 1.3, color: C.ink, opacity: seg(f, b(2), b(2) + 10, outCubic) }}>
        Todo eso cabe en <b>un solo sistema</b>, hecho a la medida de tu restaurante:
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 900, display: "flex", flexWrap: "wrap", gap: 26 }}>
        {chips.map((c, i) => {
          const p = seg(f, b(3 + i * 0.5) - 2, b(3 + i * 0.5) + 8, Easing.bezier(0.34, 1.56, 0.64, 1));
          return (
            <div key={c} style={{ padding: "26px 44px", borderRadius: 999, background: i % 2 ? C.dark : C.teal, color: "#fff", fontFamily: HEAD, fontWeight: 700, fontSize: 58, opacity: seg(f, b(3 + i * 0.5) - 2, b(3 + i * 0.5) + 2), scale: String(p) }}>
              {c}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 1260, fontFamily: BODY, fontWeight: 500, fontSize: 44, color: C.gray, opacity: seg(f, b(6), b(6) + 8) }}>
        …y lo ves funcionando antes de invertir en todo.
      </div>
    </AbsoluteFill>
  );
};

// ---------- CTA ----------
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const b = (k: number) => beatF(k) - beatF(0);
  const p = seg(f, 0, 12, outExpo);
  return (
    <AbsoluteFill style={{ background: C.teal, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 330, color: "#fff", fontFamily: HEAD, fontWeight: 700 }}>
        <div style={{ fontSize: 124, lineHeight: 0.98, letterSpacing: "-0.04em", opacity: p, translate: `0px ${interpolate(p, [0, 1], [70, 0])}px` }}>
          Diagnóstico de 30 min
        </div>
        <div style={{ display: "inline-block", marginTop: 30, padding: "10px 30px", background: C.dark, borderRadius: 16, fontSize: 84, color: C.mint, opacity: seg(f, b(1) - 2, b(1) + 2), scale: String(interpolate(seg(f, b(1) - 2, b(1) + 8, outExpo), [0, 1], [1.4, 1])), transformOrigin: "left center" }}>
          sin costo
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 1000, fontFamily: BODY, fontWeight: 500, fontSize: 42, color: "#fff", opacity: seg(f, b(2), b(2) + 8) }}>
        Escríbenos por WhatsApp
      </div>
      <div style={{ position: "absolute", left: 90, top: 1070, display: "flex", alignItems: "center", gap: 22, padding: "26px 40px", borderRadius: 999, background: "#fff", color: C.ink, fontFamily: HEAD, fontWeight: 700, fontSize: 60, opacity: seg(f, b(2) + 2, b(2) + 6), scale: String(interpolate(seg(f, b(2) + 2, b(2) + 12, Easing.bezier(0.34, 1.56, 0.64, 1)), [0, 1], [0.7, 1])), transformOrigin: "left center" }}>
        <span style={{ width: 76, height: 76, borderRadius: 38, background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 42 }}>✆</span>
        222 352 6054
      </div>
      <div style={{ position: "absolute", left: 90, bottom: 300, display: "flex", alignItems: "center", gap: 18, opacity: seg(f, b(3), b(3) + 8) }}>
        <Img src={staticFile("img/iso_blanco.png")} style={{ height: 72 }} />
        <span style={{ fontFamily: HEAD, fontWeight: 700, letterSpacing: ".12em", fontSize: 36, color: "#fff" }}>DYNTEC</span>
        <span style={{ fontFamily: BODY, fontSize: 34, color: "#fff", opacity: 0.85, marginLeft: 16 }}>dyntec.com.mx</span>
      </div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (
  <Sequence from={at} layout="none">
    <Audio src={staticFile(`sfx/${src}.mp3`)} volume={vol} />
  </Sequence>
);

export const ReelSenales: React.FC = () => {
  const S = [
    { at: 8, n: 3, bg: C.teal, ink: "#fff", accent: C.dark, kicker: "Señal", lines: ["Las reservas", "viven en", "una libreta"], sub: "y nadie sabe qué mesa está libre." },
    { at: 16, n: 2, bg: C.paper, ink: C.ink, accent: C.teal, kicker: "Señal", lines: ["La cuenta", "no cuadra", "al cierre"], sub: "comandas en papel y cobros a mano." },
    { at: 24, n: 1, bg: C.dark, ink: "#fff", accent: C.mint, kicker: "Señal", lines: ["Tu inventario", "vive en", "tu memoria"], sub: "te enteras de que se acabó cuando lo piden." },
  ];
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <Sequence from={0} durationInFrames={beatF(8)}><Dial /></Sequence>
      {S.map((s) => (
        <Sequence key={s.n} from={beatF(s.at)} durationInFrames={beatF(s.at + 8) - beatF(s.at)}>
          <Signal {...s} />
        </Sequence>
      ))}
      <Sequence from={beatF(32)} durationInFrames={beatF(41) - beatF(32)}><Solve /></Sequence>
      <Sequence from={beatF(41)}><Cta /></Sequence>

      <Audio src={staticFile("audio/pista_pop_118bpm.mp3")} volume={(fr) => interpolate(fr, [0, SENALES_DURATION - 24, SENALES_DURATION], [0.9, 0.9, 0], clamp)} />
      <Sfx at={2} src="whoosh-fast" vol={0.35} />
      <Sfx at={beatF(2)} src="lock-quick" vol={0.55} />
      <Sfx at={beatF(2) + 13} src="ui-select-click" vol={0.45} />
      <Sfx at={beatF(8)} src="bass-hit-short" vol={0.6} />
      <Sfx at={beatF(16)} src="bass-hit-short" vol={0.6} />
      <Sfx at={beatF(24)} src="bass-hit-short" vol={0.6} />
      <Sfx at={beatF(32) - 3} src="whoosh-fast" vol={0.4} />
      <Sfx at={beatF(41) - 3} src="transition-snap" vol={0.4} />
    </AbsoluteFill>
  );
};
