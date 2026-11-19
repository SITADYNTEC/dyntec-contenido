import { loadFont } from "@remotion/fonts";
import { staticFile, interpolate, Easing } from "remotion";

export const C = {
  dark: "#121a22",
  dark2: "#1c252d",
  teal: "#009481",
  mint: "#5ac3b7",
  gray: "#606161",
  paper: "#f4faf9",
  ink: "#0f1a1e",
  red: "#e46a5e",
};

export const HEAD = "Open Sauce One";
export const BODY = "Roboto";

export const fontsReady = Promise.all([
  loadFont({ family: HEAD, url: staticFile("fonts/open-sauce-one-latin-500-normal.woff2"), weight: "500" }),
  loadFont({ family: HEAD, url: staticFile("fonts/open-sauce-one-latin-700-normal.woff2"), weight: "700" }),
  loadFont({ family: BODY, url: staticFile("fonts/roboto-latin-400-normal.woff2"), weight: "400" }),
  loadFont({ family: BODY, url: staticFile("fonts/roboto-latin-500-normal.woff2"), weight: "500" }),
  loadFont({ family: BODY, url: staticFile("fonts/roboto-latin-700-normal.woff2"), weight: "700" }),
]);

export const FPS = 30;

// Pista plantillas/audio/pista_pop_118bpm.mp3: ~117.98 BPM, beat n en 0.0273 + 0.50863·n s
export const beatF = (n: number) => Math.round((0.0273 + 0.50863 * n) * FPS);

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const outCubic = Easing.out(Easing.cubic);
export const inOutCubic = Easing.inOut(Easing.cubic);

// Pop de entrada (0→1) con rebote suave
export const pop = (f: number, start: number, dur = 10) =>
  interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });

export const fade = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
