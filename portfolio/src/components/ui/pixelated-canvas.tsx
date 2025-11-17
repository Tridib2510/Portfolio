"use client";
import React from "react";
import type { StaticImageData } from "next/image";

type DotSample = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  drop: boolean;
  seed: number;
};

type Dimensions = {
  width: number;
  height: number;
  dot: number;
};

type MousePoint = { x: number; y: number };

type CleanupFn = (() => void) | null;

export type PixelatedCanvasProps = {
  src: string | StaticImageData;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "circle" | "square";
  backgroundColor?: string;
  grayscale?: boolean;
  className?: string;
  responsive?: boolean;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "repel" | "attract" | "swirl";
  followSpeed?: number;
  sampleAverage?: boolean;
  tintColor?: string;
  tintStrength?: number;
  maxFps?: number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  jitterStrength?: number;
  jitterSpeed?: number;
  fadeOnLeave?: boolean;
  fadeSpeed?: number;
};

export const PixelatedCanvas: React.FC<PixelatedCanvasProps> = ({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  grayscale = false,
  className,
  responsive = false,
  dropoutStrength = 0.4,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = "#FFFFFF",
  tintStrength = 0.2,
  maxFps = 60,
  objectFit = "cover",
  jitterStrength = 4,
  jitterSpeed = 4,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const samplesRef = React.useRef<DotSample[]>([]);
  const dimsRef = React.useRef<Dimensions | null>(null);

  const targetMouseRef = React.useRef<MousePoint>({ x: -9999, y: -9999 });
  const animMouseRef = React.useRef<MousePoint>({ x: -9999, y: -9999 });

  const rafRef = React.useRef<number | null>(null);
  const lastFrameRef = React.useRef<number>(0);
  const pointerInsideRef = React.useRef<boolean>(false);
  const activityRef = React.useRef<number>(0);
  const activityTargetRef = React.useRef<number>(0);

  const cleanupRef = React.useRef<CleanupFn>(null);

  React.useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = typeof src === "string" ? src : src.src;

    const compute = () => {
      if (!canvas) return;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;

      canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
      canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
      } else {
        ctx.clearRect(0, 0, displayWidth, displayHeight);
      }

      const offscreen = document.createElement("canvas");
      offscreen.width = displayWidth;
      offscreen.height = displayHeight;

      const off = offscreen.getContext("2d");
      if (!off) return;

      const iw = img.naturalWidth || displayWidth;
      const ih = img.naturalHeight || displayHeight;

      let dw = displayWidth;
      let dh = displayHeight;
      let dx = 0;
      let dy = 0;

      if (objectFit === "cover") {
        const scale = Math.max(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = (displayWidth - dw) / 2;
        dy = (displayHeight - dh) / 2;
      } else if (objectFit === "contain") {
        const scale = Math.min(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = (displayWidth - dw) / 2;
        dy = (displayHeight - dh) / 2;
      } else if (objectFit === "fill") {
        dw = displayWidth;
        dh = displayHeight;
      } else {
        dw = iw;
        dh = ih;
        dx = (displayWidth - dw) / 2;
        dy = (displayHeight - dh) / 2;
      }

      off.drawImage(img, dx, dy, dw, dh);

      let imageData: ImageData;
      try {
        imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
      } catch {
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        return;
      }

      const { data } = imageData;
      const stride = offscreen.width * 4;
      const dotSize = Math.max(1, Math.floor(cellSize * dotScale));

      dimsRef.current = { width: displayWidth, height: displayHeight, dot: dotSize };

      const luminance = (px: number, py: number) => {
        const ix = Math.max(0, Math.min(offscreen.width - 1, px));
        const iy = Math.max(0, Math.min(offscreen.height - 1, py));
        const i = iy * stride + ix * 4;
        return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      };

      const hash2D = (ix: number, iy: number) => {
        const v = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123;
        return v - Math.floor(v);
      };

      const samples: DotSample[] = [];

      let tintRGB: [number, number, number] | null = null;
      if (tintColor && tintStrength > 0) {
        const parseRGB = (c: string): [number, number, number] | null => {
          if (c.startsWith("#")) {
            const hex = c.slice(1);
            if (hex.length === 3) {
              return [
                parseInt(hex[0] + hex[0], 16),
                parseInt(hex[1] + hex[1], 16),
                parseInt(hex[2] + hex[2], 16),
              ];
            }
            return [
              parseInt(hex.slice(0, 2), 16),
              parseInt(hex.slice(2, 4), 16),
              parseInt(hex.slice(4, 6), 16),
            ];
          }
          const m = c.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
          return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
        };
        tintRGB = parseRGB(tintColor);
      }

      for (let y = 0; y < offscreen.height; y += cellSize) {
        const cy = Math.min(offscreen.height - 1, y + Math.floor(cellSize / 2));

        for (let x = 0; x < offscreen.width; x += cellSize) {
          const cx = Math.min(offscreen.width - 1, x + Math.floor(cellSize / 2));

          let r = 0, g = 0, b = 0, a = 0;

          if (!sampleAverage) {
            const idx = cy * stride + cx * 4;
            r = data[idx];
            g = data[idx + 1];
            b = data[idx + 2];
            a = data[idx + 3] / 255;
          } else {
            let count = 0;
            for (let oy = -1; oy <= 1; oy++) {
              for (let ox = -1; ox <= 1; ox++) {
                const sx = Math.max(0, Math.min(offscreen.width - 1, cx + ox));
                const sy = Math.max(0, Math.min(offscreen.height - 1, cy + oy));
                const sIdx = sy * stride + sx * 4;
                r += data[sIdx];
                g += data[sIdx + 1];
                b += data[sIdx + 2];
                a += data[sIdx + 3] / 255;
                count++;
              }
            }
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
            a /= count;
          }

          if (grayscale) {
            const L = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
            r = g = b = L;
          } else if (tintRGB) {
            const k = Math.max(0, Math.min(1, tintStrength));
            r = Math.round(r * (1 - k) + tintRGB[0] * k);
            g = Math.round(g * (1 - k) + tintRGB[1] * k);
            b = Math.round(b * (1 - k) + tintRGB[2] * k);
          }

          const Lc = luminance(cx, cy);
          const grad =
            Math.abs(luminance(cx + 1, cy) - luminance(cx - 1, cy)) +
            Math.abs(luminance(cx, cy + 1) - luminance(cx, cy - 1));

          const gradientNorm = Math.min(1, grad / 255);
          const dropoutProb = Math.min(1, (1 - gradientNorm) * dropoutStrength);

          const seed = hash2D(cx, cy);
          const drop = seed < dropoutProb;

          samples.push({ x, y, r, g, b, a, drop, seed });
        }
      }

      samplesRef.current = samples;
    };

    img.onload = () => {
      if (isCancelled) return;

      compute();

      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      if (!interactive) {
        const ctx = canvasEl.getContext("2d");
        const dims = dimsRef.current;
        const samples = samplesRef.current;

        if (!ctx || !dims || !samples) return;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, dims.width, dims.height);

        for (const s of samples) {
          if (s.drop || s.a <= 0) continue;

          ctx.globalAlpha = s.a;
          ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;

          const drawX = s.x + cellSize / 2;
          const drawY = s.y + cellSize / 2;

          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(drawX, drawY, dims.dot / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(drawX - dims.dot / 2, drawY - dims.dot / 2, dims.dot, dims.dot);
          }
        }

        ctx.globalAlpha = 1;
        return;
      }

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvasEl.getBoundingClientRect();
        targetMouseRef.current.x = e.clientX - rect.left;
        targetMouseRef.current.y = e.clientY - rect.top;
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };

      const onPointerEnter = () => {
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };

      const onPointerLeave = () => {
        pointerInsideRef.current = false;

        if (fadeOnLeave) {
          activityTargetRef.current = 0;
        } else {
          targetMouseRef.current = { x: -9999, y: -9999 };
        }
      };

      canvasEl.addEventListener("pointermove", onPointerMove);
      canvasEl.addEventListener("pointerenter", onPointerEnter);
      canvasEl.addEventListener("pointerleave", onPointerLeave);

      const animate = () => {
        const now = performance.now();
        const minDelta = 1000 / Math.max(1, maxFps);

        if (now - lastFrameRef.current < minDelta) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        lastFrameRef.current = now;

        const ctx = canvasEl.getContext("2d");
        const dims = dimsRef.current;
        const samples = samplesRef.current;

        if (!ctx || !dims || !samples) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        animMouseRef.current.x +=
          (targetMouseRef.current.x - animMouseRef.current.x) * followSpeed;

        animMouseRef.current.y +=
          (targetMouseRef.current.y - animMouseRef.current.y) * followSpeed;

        if (fadeOnLeave) {
          activityRef.current +=
            (activityTargetRef.current - activityRef.current) * fadeSpeed;
        } else {
          activityRef.current = pointerInsideRef.current ? 1 : 0;
        }

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, dims.width, dims.height);

        const mx = animMouseRef.current.x;
        const my = animMouseRef.current.y;
        const sigma = Math.max(1, distortionRadius * 0.5);
        const t = now * 0.001 * jitterSpeed;
        const activity = activityRef.current;

        for (const s of samples) {
          if (s.drop || s.a <= 0) continue;

          let drawX = s.x + cellSize / 2;
          let drawY = s.y + cellSize / 2;

          const dx = drawX - mx;
          const dy = drawY - my;
          const dist2 = dx * dx + dy * dy;

          const falloff = Math.exp(-dist2 / (2 * sigma * sigma));
          const influence = falloff * activity;

          if (influence > 0.0005) {
            const dist = Math.sqrt(dist2) + 0.0001;

            if (distortionMode === "repel") {
              drawX += (dx / dist) * distortionStrength * influence;
              drawY += (dy / dist) * distortionStrength * influence;
            } else if (distortionMode === "attract") {
              drawX -= (dx / dist) * distortionStrength * influence;
              drawY -= (dy / dist) * distortionStrength * influence;
            } else if (distortionMode === "swirl") {
              const angle = distortionStrength * 0.05 * influence;
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);
              const rx = cosA * dx - sinA * dy;
              const ry = sinA * dx + cosA * dy;
              drawX = mx + rx;
              drawY = my + ry;
            }

            if (jitterStrength > 0) {
              const k = s.seed * 43758.5453;
              drawX += Math.sin(t + k) * jitterStrength * influence;
              drawY += Math.cos(t + k * 1.13) * jitterStrength * influence;
            }
          }

          ctx.globalAlpha = s.a;
          ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;

          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(drawX, drawY, dims.dot / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(
              drawX - dims.dot / 2,
              drawY - dims.dot / 2,
              dims.dot,
              dims.dot
            );
          }
        }

        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      cleanupRef.current = () => {
        canvasEl.removeEventListener("pointermove", onPointerMove);
        canvasEl.removeEventListener("pointerenter", onPointerEnter);
        canvasEl.removeEventListener("pointerleave", onPointerLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    };

    img.onerror = () => {
      console.error("Failed to load image for PixelatedCanvas:", src);
    };

    if (responsive) {
      const onResize = () => {
        if (img.complete && img.naturalWidth) compute();
      };

      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        window.removeEventListener("resize", onResize);
        if (cleanupRef.current) cleanupRef.current();
      };

      return () => {
        if (cleanupRef.current) cleanupRef.current();
      };
    }

    return () => {
      isCancelled = true;
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [
    src,
    width,
    height,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    grayscale,
    responsive,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    sampleAverage,
    tintColor,
    tintStrength,
    maxFps,
    objectFit,
    jitterStrength,
    jitterSpeed,
    fadeOnLeave,
    fadeSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Pixelated rendering of source image"
      role="img"
    />
  );
};
