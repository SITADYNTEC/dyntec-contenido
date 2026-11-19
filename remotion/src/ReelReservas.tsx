// R2 · POV — "Reservas con anticipo y check-in QR" (S2 Hospitalidad, 2026-11-23)
// Voz Pablo Rosete + subtítulos karaoke. Transición central: circle-match-iris (video-shotcraft)
// desde una mesa vacía hacia la pantalla de reserva.
import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { Audio } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import { C, HEAD, BODY, clamp, outExpo, inOutCubic, pop, fade } from "./brand";
import { KaraokeCaptions } from "./Captions";
import captionsData from "./data/reservas_captions.json";

export const RESERVAS_DURATION = 930;

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (
  <Sequence from={at} layout="none">
    <Audio src={staticFile(`sfx/${src}.mp3`)} volume={vol} />
  </Sequence>
);

const Bubble: React.FC<{ text: string; at: number; f: number; right?: boolean; w?: number }> = ({ text, at, f, right, w }) => {
  const p = pop(f, at, 9);
  return (
    <div
      style={{
        alignSelf: right ? "flex-end" : "flex-start",
        maxWidth: w ?? 760,
        padding: "26px 34px",
        borderRadius: 34,
        borderBottomLeftRadius: right ? 34 : 8,
        borderBottomRightRadius: right ? 8 : 34,
        background: right ? "#d9f5ef" : "#fff",
        color: C.ink,
        fontFamily: BODY,
        fontWeight: 500,
        fontSize: 46,
        boxShadow: "0 18px 40px rgba(0,0,0,.35)",
        opacity: interpolate(p, [0, 0.3], [0, 1], clamp),
        scale: String(interpolate(p, [0, 1], [0.6, 1])),
        translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
        transformOrigin: right ? "right bottom" : "left bottom",
      }}
    >
      {text}
    </div>
  );
};

// ---------- S1: POV en la barra (0–165) ----------
const S1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.dark, overflow: "hidden" }}>
      <Img
        src={staticFile("img/bar_celular.png")}
        style={{
          position: "absolute",
          height: 1920,
          left: -800,
          top: 0,
          scale: String(interpolate(f, [0, 165], [1.08, 1.28], { ...clamp, easing: Easing.inOut(Easing.quad) })),
          transformOrigin: "1307px 1387px",
          filter: "saturate(0.85) contrast(1.05)",
        }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(18,26,34,.92) 0%, rgba(18,26,34,.2) 42%, rgba(18,26,34,.1) 60%, rgba(18,26,34,.75) 100%)" }} />
      <div style={{ position: "absolute", left: 90, top: 200, fontFamily: HEAD, fontWeight: 700, color: "#fff" }}>
        <div style={{ fontSize: 210, lineHeight: 1, letterSpacing: "-0.04em", scale: String(interpolate(f, [0, 8], [1.35, 1], { ...clamp, easing: outExpo })), transformOrigin: "left top", opacity: fade(f, 0, 4) }}>
          POV<span style={{ color: C.mint }}>:</span>
        </div>
        <div style={{ marginTop: 26, display: "inline-flex", gap: 18, alignItems: "center", padding: "14px 28px", borderRadius: 999, background: "rgba(255,255,255,.12)", border: "2px solid rgba(255,255,255,.25)", fontFamily: BODY, fontWeight: 500, fontSize: 44, opacity: fade(f, 40, 50), translate: `${interpolate(f, [40, 52], [-40, 0], { ...clamp, easing: outExpo })}px 0px` }}>
          <span style={{ width: 18, height: 18, borderRadius: 9, background: C.red }} /> Viernes · 11:07 p.m.
        </div>
      </div>
      {/* Notificaciones que entran cuando "tu WhatsApp no para" */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 820, display: "flex", flexDirection: "column", gap: 20 }}>
        {[
          { t: "Nuevo mensaje · Mesa para mañana", at: 120 },
          { t: "Nuevo mensaje · ¿Hay lugar a las 9?", at: 133 },
          { t: "3 mensajes nuevos", at: 146 },
        ].map((n) => {
          const p = pop(f, n.at, 8);
          return (
            <div key={n.at} style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 30px", borderRadius: 30, background: "rgba(28,37,45,.92)", border: "2px solid rgba(90,195,183,.45)", color: "#fff", fontFamily: BODY, fontSize: 40, fontWeight: 500, opacity: interpolate(p, [0, 0.3], [0, 1], clamp), translate: `0px ${interpolate(p, [0, 1], [-50, 0])}px`, scale: String(interpolate(p, [0, 1], [0.85, 1])) }}>
              <span style={{ width: 56, height: 56, borderRadius: 16, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>💬</span>
              {n.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- S2: avalancha de chats (165–262) ----------
const S2: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = 165
  const shift = interpolate(f, [40, 97], [0, -260], { ...clamp, easing: inOutCubic });
  return (
    <AbsoluteFill style={{ background: C.dark2, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 170, background: C.dark, display: "flex", alignItems: "flex-end", padding: "0 60px 26px", gap: 22, zIndex: 2 }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: C.gray }} />
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: "#fff" }}>
          Reservaciones
          <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 30, color: C.mint }}>escribiendo…</div>
        </div>
        <div style={{ marginLeft: "auto", minWidth: 96, height: 72, borderRadius: 36, background: C.red, color: "#fff", fontFamily: HEAD, fontWeight: 700, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          +{Math.min(38, Math.floor(interpolate(f, [0, 97], [9, 38], clamp)))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 260, display: "flex", flexDirection: "column", gap: 26, translate: `0px ${shift}px` }}>
        <Bubble f={f} at={8} text="¿Tienen mesa mañana?" />
        <Bubble f={f} at={49} text="Hola!! ¿me apartas una para 8? 🙏" />
        <Bubble f={f} at={60} text="¿A qué hora cierran cocina?" />
        <Bubble f={f} at={68} text="Somos 6, ¿hay lugar en terraza?" />
        <Bubble f={f} at={76} text="¿Aceptan transferencia?" />
        <Bubble f={f} at={82} text="?? 😅" w={300} />
        <Bubble f={f} at={88} text="Mejor para el sábado" />
      </div>
    </AbsoluteFill>
  );
};

// Coordenadas de la mesa que funciona como ancla del iris (S2b) — mismas en S3
const CX = 740;
const CY = 1015;

// ---------- S2b: el sábado, la mitad no llega (262–336) ----------
const Tables: React.FC = () => {
  const f = useCurrentFrame(); // local 0 = 262
  const cols = 3;
  const items = Array.from({ length: 9 }, (_, i) => i);
  const empty = [1, 3, 5, 6, 8]; // la "mitad"
  const drain = interpolate(f, [30, 50], [0, 1], { ...clamp, easing: outExpo });
  // pulso de la mesa ancla antes del iris
  const pulse = f > 44 ? 1 + 0.12 * Math.abs(Math.sin(((f - 44) / 30) * Math.PI * 2)) : 1;
  return (
    <AbsoluteFill style={{ background: C.dark, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, top: 220, fontFamily: HEAD, fontWeight: 700, color: "#fff", fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.03em", opacity: fade(f, 0, 6), translate: `0px ${interpolate(f, [0, 10], [40, 0], { ...clamp, easing: outExpo })}px` }}>
        Sábado,
        <br />
        <span style={{ color: C.mint }}>8:30 p.m.</span>
      </div>
      {items.map((i) => {
        const x = 300 + (i % cols) * 220;
        const y = 795 + Math.floor(i / cols) * 220;
        const isEmpty = empty.includes(i);
        const p = pop(f, 2 + i * 2, 8);
        const isAnchor = i === 5;
        return (
          <div key={i} style={{ position: "absolute", left: x - 80, top: y - 80, width: 160, height: 160, borderRadius: 80, boxSizing: "border-box", background: isEmpty ? `rgba(0,148,129,${1 - drain})` : C.teal, border: `6px solid ${isEmpty ? `rgba(96,97,97,${drain})` : C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: HEAD, fontWeight: 700, fontSize: 52, scale: String(p * (isAnchor ? pulse : 1)) }}>
            {isEmpty ? <span style={{ color: C.gray, opacity: drain, fontSize: 70 }}>✕</span> : <span>{i + 1}</span>}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- S3: reserva con anticipo en el celular (336–594) ----------
const Chip: React.FC<{ label: string; on: number; f: number }> = ({ label, on, f }) => {
  const a = interpolate(f, [on, on + 6], [0, 1], clamp);
  return (
    <div style={{ flex: 1, padding: "20px 0", borderRadius: 20, textAlign: "center", fontFamily: BODY, fontWeight: 700, fontSize: 26, border: `3px solid ${a > 0.5 ? C.teal : "#d4dfdc"}`, background: `rgba(0,148,129,${a})`, color: a > 0.5 ? "#fff" : C.ink, scale: String(1 + 0.08 * Math.sin(Math.min(1, Math.max(0, (f - on) / 8)) * Math.PI)) }}>
      {label}
    </div>
  );
};

const QR: React.FC<{ size: number }> = ({ size }) => {
  // QR ficticio determinista (no codifica nada)
  const n = 21;
  const cells: React.ReactNode[] = [];
  let s = 7;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      let on = rnd() > 0.52;
      if (finder) {
        const lx = x > 13 ? x - 14 : x;
        const ly = y > 13 ? y - 14 : y;
        on = lx === 0 || ly === 0 || lx === 6 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
      }
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />);
    }
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} style={{ background: "#fff", borderRadius: 12 }}>
      <g fill={C.dark}>{cells}</g>
    </svg>
  );
};

const S3: React.FC = () => {
  const g = useCurrentFrame(); // local 0 = 306 (iris arranca en 30)
  const irisR = interpolate(g, [29, 30, 75], [0, 70, 2300], { ...clamp, easing: inOutCubic });
  const f = g - 30; // 0 = 336
  const phoneIn = interpolate(f, [10, 40], [0, 1], { ...clamp, easing: outExpo });
  const payOn = 93; // 14.3 s "paga el anticipo"
  const paid = 198; // 17.8 s
  const qr = 216; // 18.4 s
  const qrP = pop(f, qr, 12);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${irisR}px at ${CX}px ${CY}px)`, background: C.teal, overflow: "hidden" }}>
      {/* anillo que "recibe" la mesa */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: interpolate(f, [20, 45], [1, 0], clamp) }}>
        <circle cx={CX} cy={CY} r={interpolate(g, [30, 70], [80, 420], { ...clamp, easing: inOutCubic })} fill="none" stroke={C.mint} strokeWidth={14} />
      </svg>
      <div style={{ position: "absolute", left: 90, top: 170, fontFamily: HEAD, fontWeight: 700, color: "#fff", fontSize: 88, lineHeight: 1.02, letterSpacing: "-0.03em", opacity: fade(f, 8, 18) }}>
        Ahora, con sistema:
      </div>
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 330,
          width: 700,
          height: 1090,
          borderRadius: 70,
          background: C.dark,
          padding: 22,
          boxShadow: "0 50px 90px rgba(0,0,0,.35)",
          translate: `0px ${interpolate(phoneIn, [0, 1], [500, 0])}px`,
          rotate: `${interpolate(phoneIn, [0, 1], [6, 0])}deg`,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 52, background: C.paper, overflow: "hidden", padding: "60px 44px", boxSizing: "border-box", fontFamily: BODY, color: C.ink, position: "relative" }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46 }}>Tu reserva</div>
          <div style={{ marginTop: 26, display: "flex", gap: 16 }}>
            {["Sáb 28", "8:30 p.m.", "8 personas"].map((t, i) => (
              <div key={t} style={{ padding: "14px 20px", borderRadius: 16, background: "#fff", border: "2px solid #d4dfdc", fontSize: 28, fontWeight: 500, opacity: fade(f, 30 + i * 6, 38 + i * 6) }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, opacity: fade(f, payOn - 6, payOn + 4) * (1 - qrP) }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: C.gray, letterSpacing: ".08em" }}>ANTICIPO</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, marginTop: 6 }}>$400.00</div>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <Chip f={f} on={124} label="Tarjeta" />
              <Chip f={f} on={146} label="OXXO" />
              <Chip f={f} on={163} label="Transferencia" />
            </div>
          </div>
          <div style={{ marginTop: 34, padding: "26px 0", borderRadius: 22, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: "#fff", background: f >= paid ? C.teal : C.dark, opacity: fade(f, payOn, payOn + 8) * (1 - qrP) }}>
            {f >= paid ? "Pagado ✓" : "Pagar anticipo"}
          </div>
          {/* QR */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, opacity: interpolate(qrP, [0, 0.3], [0, 1], clamp), scale: String(interpolate(qrP, [0, 1], [0.5, 1])) }}>
            <div style={{ padding: "12px 28px", borderRadius: 999, background: C.teal, color: "#fff", fontFamily: HEAD, fontWeight: 700, fontSize: 34 }}>Anticipo pagado ✓</div>
            <QR size={420} />
            <div style={{ fontSize: 28, fontWeight: 500, color: C.gray }}>Preséntalo al llegar</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- S4: llega, escanea y entra (594–657) + "Sin…" (657–756) ----------
const S4: React.FC = () => {
  const f = useCurrentFrame(); // 0 = 594
  const ok = 45; // 21.3 s
  const okP = pop(f, ok, 10);
  const bracket = interpolate(f, [8, 30], [1.25, 1], { ...clamp, easing: outExpo });
  return (
    <AbsoluteFill style={{ background: C.dark, overflow: "hidden" }}>
      <Img src={staticFile("img/entrada_qr.png")} style={{ position: "absolute", height: 1920, left: -1180, top: 0, scale: String(interpolate(f, [0, 63], [1.1, 1.22], clamp)), transformOrigin: "1820px 780px" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(18,26,34,.55) 0%, rgba(18,26,34,0) 35%, rgba(18,26,34,0) 65%, rgba(18,26,34,.6) 100%)" }} />
      {/* corchetes de escaneo sobre el celular */}
      <div style={{ position: "absolute", left: 300, top: 560, width: 470, height: 470, scale: String(bracket), opacity: fade(f, 6, 12) }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} style={{ position: "absolute", width: 90, height: 90, borderColor: C.mint, borderStyle: "solid", borderWidth: 0, ...(k === 0 ? { left: 0, top: 0, borderLeftWidth: 12, borderTopWidth: 12 } : k === 1 ? { right: 0, top: 0, borderRightWidth: 12, borderTopWidth: 12 } : k === 2 ? { left: 0, bottom: 0, borderLeftWidth: 12, borderBottomWidth: 12 } : { right: 0, bottom: 0, borderRightWidth: 12, borderBottomWidth: 12 }), borderRadius: 14 }} />
        ))}
        <div style={{ position: "absolute", left: 20, right: 20, height: 6, background: C.mint, boxShadow: `0 0 30px ${C.mint}`, top: interpolate(f, [10, 44], [20, 440], clamp), opacity: f < ok ? 1 : 0 }} />
      </div>
      <div style={{ position: "absolute", left: 140, right: 140, top: 1110, padding: "30px 36px", borderRadius: 34, background: "#fff", display: "flex", alignItems: "center", gap: 26, boxShadow: "0 30px 60px rgba(0,0,0,.4)", opacity: interpolate(okP, [0, 0.3], [0, 1], clamp), scale: String(interpolate(okP, [0, 1], [0.7, 1])) }}>
        <div style={{ width: 96, height: 96, borderRadius: 48, background: C.teal, color: "#fff", fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700 }}>✓</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: C.ink }}>
          Check-in listo
          <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 32, color: C.gray }}>Mesa 6 · 8 personas · anticipo pagado</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SinLines: React.FC = () => {
  const f = useCurrentFrame(); // 0 = 657
  const lines = [
    { t: "libreta", at: 0 },
    { t: "llamadas", at: 29 },
    { t: "mesas vacías", at: 55 },
  ];
  const wipe = interpolate(f, [0, 10], [100, 0], { ...clamp, easing: outExpo });
  return (
    <AbsoluteFill style={{ background: C.paper, clipPath: `inset(${wipe}% 0 0 0)` }}>
      <div style={{ position: "absolute", left: 90, top: 330, display: "flex", flexDirection: "column", gap: 44 }}>
        {lines.map((l) => {
          const p = interpolate(f, [l.at, l.at + 10], [0, 1], { ...clamp, easing: outExpo });
          const strike = interpolate(f, [l.at + 8, l.at + 18], [0, 1], { ...clamp, easing: outExpo });
          return (
            <div key={l.t} style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 116, lineHeight: 1, letterSpacing: "-0.035em", color: C.ink, opacity: p, translate: `${interpolate(p, [0, 1], [-80, 0])}px 0px` }}>
              <span style={{ color: C.teal }}>Sin </span>
              <span style={{ position: "relative" }}>
                {l.t}
                <span style={{ position: "absolute", left: -6, top: "54%", height: 14, width: `${strike * 104}%`, background: C.red, borderRadius: 7 }} />
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- S5: CTA (756–930) ----------
const Cta: React.FC = () => {
  const f = useCurrentFrame(); // 0 = 756
  const p = interpolate(f, [0, 14], [0, 1], { ...clamp, easing: outExpo });
  const wa = pop(f, 90, 10); // 28.2 s "Escríbenos"
  return (
    <AbsoluteFill style={{ background: C.teal, overflow: "hidden" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 96} y1={0} x2={i * 96} y2={1920} stroke="#fff" strokeWidth={2} />
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 96} x2={1080} y2={i * 96} stroke="#fff" strokeWidth={2} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 90, right: 90, top: 260, color: "#fff", fontFamily: HEAD, fontWeight: 700 }}>
        <div style={{ fontFamily: BODY, fontStyle: "italic", fontWeight: 500, fontSize: 34, letterSpacing: ".28em", textTransform: "uppercase", color: C.dark, opacity: p }}>Agenda tu</div>
        <div style={{ fontSize: 132, lineHeight: 0.98, letterSpacing: "-0.04em", marginTop: 20, opacity: p, translate: `0px ${interpolate(p, [0, 1], [60, 0])}px` }}>
          Diagnóstico
          <br />
          de 30 min
        </div>
        <div style={{ display: "inline-block", marginTop: 26, padding: "10px 30px", background: C.dark, borderRadius: 16, fontSize: 84, color: C.mint, opacity: fade(f, 28, 36), scale: String(interpolate(f, [28, 38], [1.3, 1], { ...clamp, easing: outExpo })), transformOrigin: "left center" }}>
          sin costo
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 900, display: "flex", alignItems: "center", gap: 22, padding: "26px 40px", borderRadius: 999, background: "#fff", color: C.ink, fontFamily: HEAD, fontWeight: 700, fontSize: 56, opacity: interpolate(wa, [0, 0.3], [0, 1], clamp), scale: String(interpolate(wa, [0, 1], [0.7, 1])), transformOrigin: "left center" }}>
        <span style={{ width: 74, height: 74, borderRadius: 37, background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 42 }}>✆</span>
        222 352 6054
      </div>
      <div style={{ position: "absolute", left: 90, bottom: 120, display: "flex", alignItems: "center", gap: 18, opacity: fade(f, 20, 30) }}>
        <Img src={staticFile("img/iso_blanco.png")} style={{ height: 64 }} />
        <span style={{ fontFamily: HEAD, fontWeight: 700, letterSpacing: ".12em", fontSize: 32, color: "#fff" }}>DYNTEC</span>
        <span style={{ fontFamily: BODY, fontSize: 32, color: "#fff", opacity: 0.85, marginLeft: 16 }}>dyntec.com.mx</span>
      </div>
    </AbsoluteFill>
  );
};

export const ReelReservas: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.dark }}>
      <Sequence from={0} durationInFrames={165}><S1 /></Sequence>
      <Sequence from={165} durationInFrames={97}><S2 /></Sequence>
      <Sequence from={262} durationInFrames={120}><Tables /></Sequence>
      <Sequence from={306} durationInFrames={288}><S3 /></Sequence>
      <Sequence from={594} durationInFrames={63}><S4 /></Sequence>
      <Sequence from={657} durationInFrames={99}><SinLines /></Sequence>
      <Sequence from={756}><Cta /></Sequence>
      <KaraokeCaptions captions={captionsData as Caption[]} />

      {/* Audio: voz + cama musical baja + efectos */}
      <Audio src={staticFile("audio/reel_reservas_voz.mp3")} volume={1} />
      <Audio src={staticFile("audio/pista_pop_118bpm.mp3")} volume={(fr) => interpolate(fr, [0, 20, 880, 930], [0, 0.1, 0.1, 0], clamp)} />
      <Sfx at={120} src="ui-message-pop" vol={0.45} />
      <Sfx at={133} src="ui-message-pop" vol={0.45} />
      <Sfx at={146} src="ui-message-pop" vol={0.45} />
      <Sfx at={163} src="swoosh-quick" vol={0.4} />
      <Sfx at={173} src="ui-popup-dry" vol={0.35} />
      <Sfx at={214} src="ui-popup-dry" vol={0.35} />
      <Sfx at={233} src="ui-popup-dry" vol={0.3} />
      <Sfx at={260} src="transition-snap" vol={0.4} />
      <Sfx at={336} src="whoosh-fast" vol={0.45} />
      <Sfx at={460} src="ui-select-click" vol={0.5} />
      <Sfx at={482} src="ui-select-click" vol={0.5} />
      <Sfx at={499} src="ui-select-click" vol={0.5} />
      <Sfx at={534} src="lock-quick" vol={0.5} />
      <Sfx at={552} src="sparkle-touch" vol={0.45} />
      <Sfx at={592} src="swoosh-quick" vol={0.4} />
      <Sfx at={639} src="camera-shutter-hard" vol={0.35} />
      <Sfx at={655} src="transition-snap" vol={0.35} />
      <Sfx at={756} src="bass-hit-short" vol={0.5} />
    </AbsoluteFill>
  );
};
