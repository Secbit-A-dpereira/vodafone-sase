/**
 * ascii-player.js — Componente standalone para renderizar vídeo em ASCII
 *
 * Modo de uso:
 *   const player = new ASCIIPlayer('#container', {
 *     videoUrl: '/recursos/video.mp4',
 *     cols: 200,
 *     fps: 15,
 *     pixel: false
 *   });
 *   player.play();
 *
 * Servido estaticamente pelo Cloudflare Worker.
 * O vídeo é carregado pelo browser e convertido para ASCII no Canvas.
 */

class ASCIIPlayer {
  constructor(containerEl, options = {}) {
    this.container = typeof containerEl === 'string'
      ? document.querySelector(containerEl)
      : containerEl;

    this.videoUrl = options.videoUrl || '';
    this.cols = options.cols || 200;
    this.fps = options.fps || 15;
    this.pixelMode = options.pixel || false;
    this.palette = options.palette || this.DEFAULT_PALETTE;
    this.onReady = options.onReady || null;

    this.video = null;
    this.canvas = null;
    this.ctx = null;
    this.running = false;
    this.animId = null;
    this.frameInterval = 1000 / this.fps;
    this.cellW = 8;
    this.cellH = this.pixelMode ? 8 : 16;
    this._build();
  }

  get DEFAULT_PALETTE() {
    return " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
  }

  _build() {
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;background:#000;border-radius:8px;overflow:hidden;';

    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'display:block;width:100%;height:auto;image-rendering:pixelated;';
    wrapper.appendChild(this.canvas);
    this.container.appendChild(wrapper);
    this.ctx = this.canvas.getContext('2d');
  }

  async load(url) {
    this.videoUrl = url;
    return this.init();
  }

  async init() {
    if (!this.videoUrl) {
      console.error('[ASCIIPlayer] Nenhum URL de vídeo');
      return;
    }

    // Vídeo oculto para decodificação
    this.video = document.createElement('video');
    this.video.src = this.videoUrl;
    this.video.crossOrigin = 'anonymous';
    this.video.preload = 'auto';
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.loop = true;

    return new Promise((resolve) => {
      this.video.onloadedmetadata = () => {
        const vidW = this.video.videoWidth;
        const vidH = this.video.videoHeight;
        const ratio = vidW / Math.max(vidH, 1);

        this.rows = this.pixelMode
          ? Math.floor(this.cols / ratio)
          : Math.floor(this.cols / ratio / 2);
        this.rows = Math.max(this.rows, 10);

        this.canvas.width = this.cols * this.cellW;
        this.canvas.height = this.rows * this.cellH;

        this.ctx.font = `${Math.floor(this.cellH * 0.85)}px monospace`;
        this.ctx.textBaseline = 'top';

        if (this.onReady) this.onReady({ cols: this.cols, rows: this.rows });
        console.log(`[ASCIIPlayer] Pronto: ${this.cols}×${this.rows}, ${vidW}×${vidH}`);
        resolve();
      };
      this.video.onerror = (e) => {
        console.error('[ASCIIPlayer] Erro ao carregar vídeo:', e);
        resolve();
      };
    });
  }

  play() {
    if (!this.video || this.running) return;
    this.running = true;
    this.video.play();
    this.lastFrameTime = 0;
    this._loop();
  }

  pause() {
    this.running = false;
    if (this.video) this.video.pause();
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  stop() {
    this.pause();
    if (this.video) {
      this.video.currentTime = 0;
    }
  }

  toggle() {
    if (this.running) this.pause();
    else this.play();
  }

  destroy() {
    this.stop();
    if (this.video) {
      this.video.src = '';
      this.video.load();
      this.video = null;
    }
    this.container.innerHTML = '';
  }

  _loop() {
    if (!this.running) return;

    const now = performance.now();
    const elapsed = now - this.lastFrameTime;

    if (elapsed >= this.frameInterval) {
      this.lastFrameTime = now - (elapsed % this.frameInterval);
      this._renderFrame();
    }

    this.animId = requestAnimationFrame(() => this._loop());
  }

  _renderFrame() {
    const ctx = this.ctx;
    const cols = this.cols;
    const rows = this.rows;
    const cw = this.cellW;
    const ch = this.cellH;

    // Capturar frame do vídeo para um canvas temporário
    const tmpCanvas = this._tmpCanvas || (() => {
      const c = document.createElement('canvas');
      this._tmpCanvas = c;
      return c;
    })();
    tmpCanvas.width = cols;
    tmpCanvas.height = rows;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(this.video, 0, 0, cols, rows);

    const imageData = tmpCtx.getImageData(0, 0, cols, rows);
    const pixels = imageData.data;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.pixelMode) {
      // Modo Pixel — blocos coloridos
      const scaleW = this.canvas.width / cols;
      const scaleH = this.canvas.height / rows;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmpCanvas, 0, 0, cols, rows, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      // Modo ASCII — caracteres coloridos
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const gray = Math.floor(0.299 * r + 0.587 * g + 0.114 * b);
          const charIdx = Math.floor((gray / 255) * (this.palette.length - 1));
          const ch = this.palette[charIdx] || ' ';
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillText(ch, x * cw, y * ch);
        }
      }
    }
  }
}

// Se estiver em módulo ES
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ASCIIPlayer;
}
