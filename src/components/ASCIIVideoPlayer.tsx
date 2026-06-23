"use client";
import { useEffect, useRef, useState } from "react";
import pako from "pako";

const SRC_COLS = 1080, SRC_ROWS = 607, FPS = 7.5;
const FILE = "/videos/video1.ascii";

export default function ASCIIVideoPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "playing" | "error">("idle");
  const [info, setInfo] = useState("—");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const playingRef = useRef(false);
  const framesRef = useRef<Uint8Array[] | null>(null);
  const totalRef = useRef(0);
  const curRef = useRef(0);
  const pvRef = useRef<Uint8Array | null>(null);
  const animRef = useRef<number>(0);
  const nextTimeRef = useRef(0);
  const colsRef = useRef(SRC_COLS);
  const rowsRef = useRef(SRC_ROWS);

  // Resize canvas to viewport
  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maxW = Math.min(window.innerWidth - 32, 1080);
    const w = Math.floor(maxW);
    const h = Math.floor(w * SRC_ROWS / SRC_COLS);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      colsRef.current = w;
      rowsRef.current = h;
    }
  }

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function log(msg: string) { console.log(msg); setStatus(msg); }

  async function loadAndDecodeAll() {
    log("⏳ A carregar vídeo completo... (" + (25214483 / 1024 / 1024).toFixed(1) + " MB)");

    const resp = await fetch(FILE);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const raw = new Uint8Array(await resp.arrayBuffer());
    const dv = new DataView(raw.buffer, raw.byteOffset);

    const frameCount = dv.getUint32(0, true);
    log("📽️ " + frameCount + " frames encontrados");
    totalRef.current = frameCount;

    // Parse offset table
    const offs: number[] = [];
    for (let i = 0; i < frameCount; i++) offs.push(Number(dv.getBigUint64(12 + i * 8, true)));
    offs.push(raw.byteLength);

    // Decode all frames
    const frames: Uint8Array[] = [];
    for (let i = 0; i < frameCount; i++) {
      const start = offs[i];
      const end = offs[i + 1];
      const m = raw.slice(start, end);
      const tag = m[4], data = m.subarray(5);

      let r: Uint8Array | null = null;
      if (tag === 0) {
        r = data.slice();
      } else if (tag === 1) {
        try { r = pako.inflate(data); } catch { }
      } else if (tag === 2) {
        if (!pvRef.current) continue;
        try {
          const bd = pako.inflate(data);
          const k = bd.length / 7;
          const cells = new DataView(bd.buffer, bd.byteOffset);
          r = pvRef.current.slice();
          const ix = k * 4;
          for (let j = 0; j < k; j++) {
            const cl = cells.getUint32(j * 4, true);
            r[cl * 3] = bd[ix + j * 3];
            r[cl * 3 + 1] = bd[ix + j * 3 + 1];
            r[cl * 3 + 2] = bd[ix + j * 3 + 2];
          }
        } catch { }
      }
      if (r) pvRef.current = r;
      frames.push(r || pvRef.current || new Uint8Array(SRC_COLS * SRC_ROWS * 3));
    }

    framesRef.current = frames;
    pvRef.current = null;
    log("✅ " + frameCount + " frames descodificados");
    setInfo("1 / " + frameCount);
    setState("ready");

    // Show first frame
    if (frames.length > 0) renderFrame(frames[0]);
  }

  function renderFrame(r: Uint8Array) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const id = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      const sy = Math.floor(y * SRC_ROWS / h);
      for (let x = 0; x < w; x++) {
        const sx = Math.floor(x * SRC_COLS / w);
        const pi = (sy * SRC_COLS + sx) * 3, di = (y * w + x) * 4;
        id.data[di] = r[pi + 2];
        id.data[di + 1] = r[pi + 1];
        id.data[di + 2] = r[pi];
        id.data[di + 3] = 255;
      }
    }
    ctx.putImageData(id, 0, 0);
  }

  function tick(ts: number) {
    if (!playingRef.current || !framesRef.current) return;
    if (ts >= nextTimeRef.current || !nextTimeRef.current) {
      if (curRef.current >= totalRef.current) { curRef.current = 0; }
      renderFrame(framesRef.current[curRef.current]);
      curRef.current++;
      setInfo(curRef.current + " / " + totalRef.current);
      setProgress((curRef.current / totalRef.current) * 100);
      nextTimeRef.current = ts + 1000 / FPS;
    }
    animRef.current = requestAnimationFrame(tick);
  }

  function stopPlaying() {
    playingRef.current = false;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setState((s) => s === "playing" ? "ready" : s);
  }

  async function handlePlay() {
    if (playingRef.current) { stopPlaying(); return; }
    if (state === "loading") return;

    if (!framesRef.current) {
      setState("loading");
      try {
        await loadAndDecodeAll();
      } catch (e: any) {
        log("❌ Erro: " + e.message);
        setState("error");
        return;
      }
    }

    playingRef.current = true;
    setState("playing");
    nextTimeRef.current = 0;
    curRef.current = 0;
    animRef.current = requestAnimationFrame(tick);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!framesRef.current) return;
    stopPlaying();
    curRef.current = Math.floor((parseInt(e.target.value) / 100) * (totalRef.current - 1));
    renderFrame(framesRef.current[curRef.current]);
    setInfo((curRef.current + 1) + " / " + totalRef.current);
  }

  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      background: "#000", border: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div style={{ textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          style={{
            display: "block", margin: "0 auto",
            width: "100%", height: "auto",
            background: "#111",
            imageRendering: "pixelated"
          }}
        />
        <div style={{
          marginTop: 8, display: "flex", gap: 8,
          justifyContent: "center", alignItems: "center"
        }}>
          <button
            onClick={handlePlay}
            disabled={state === "loading"}
            style={{
              background: state === "loading" ? "#555" : "#e60000",
              color: "#fff", border: "none",
              padding: "6px 18px", borderRadius: 4,
              cursor: state === "loading" ? "not-allowed" : "pointer",
              fontSize: 13
            }}
          >
            {state === "loading" ? "⏳..." : state === "playing" ? "⏸ Pause" : "▶ Play"}
          </button>
          <input
            type="range" min="0" max="100" value={progress}
            onChange={handleSeek}
            disabled={!framesRef.current}
            style={{ width: 200 }}
          />
          <span style={{ color: "#888", fontSize: 12 }}>{info}</span>
        </div>
        <div style={{ color: "#888", fontSize: 12 }}>7.5 FPS · 1080×607 · 24 MB</div>
        {status && (
          <div style={{ color: "#e60000", fontSize: 12, marginTop: 4 }}>{status}</div>
        )}
      </div>
    </div>
  );
}