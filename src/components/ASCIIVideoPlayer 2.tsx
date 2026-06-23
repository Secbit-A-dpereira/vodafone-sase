"use client";

export default function ASCIIVideoPlayer() {
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      background: "#000", border: "1px solid rgba(255,255,255,0.06)"
    }}>
      <iframe
        src="/videos/video1_player"
        style={{
          width: "100%", border: "none", display: "block", minHeight: 480
        }}
        title="ASCII Video Player"
      />
    </div>
  );
}
