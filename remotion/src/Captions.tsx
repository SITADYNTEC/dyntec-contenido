import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { C, HEAD, clamp } from "./brand";

const Page: React.FC<{ page: TikTokPage; top: number }> = ({ page, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = page.startMs + (frame / fps) * 1000;
  const enter = interpolate(frame, [0, 5], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top,
          maxWidth: 900,
          padding: "18px 34px",
          borderRadius: 26,
          background: "rgba(18,26,34,0.86)",
          fontFamily: HEAD,
          fontWeight: 700,
          fontSize: 62,
          lineHeight: 1.15,
          color: "#fff",
          textAlign: "center",
          opacity: enter,
          scale: String(interpolate(enter, [0, 1], [0.92, 1])),
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((tok) => {
          const active = tok.fromMs <= t && tok.toMs > t;
          const past = tok.toMs <= t;
          return (
            <span key={tok.fromMs} style={{ color: active ? C.mint : past ? "#fff" : "rgba(255,255,255,0.55)" }}>
              {tok.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const KaraokeCaptions: React.FC<{ captions: Caption[]; top?: number }> = ({ captions, top = 1470 }) => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () => createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: 1400 }),
    [captions],
  );
  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const next = pages[i + 1] ?? null;
        const start = Math.round((page.startMs / 1000) * fps);
        const lastEnd = page.tokens[page.tokens.length - 1].toMs;
        const endMs = next ? Math.min(next.startMs, lastEnd + 700) : lastEnd + 900;
        const dur = Math.round((endMs / 1000) * fps) - start;
        if (dur <= 0) return null;
        return (
          <Sequence key={i} from={start} durationInFrames={dur} layout="none">
            <Page page={page} top={top} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
