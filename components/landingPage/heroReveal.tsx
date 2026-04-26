"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface HeroRevealProps {
  imageSrc: string;
  children?: React.ReactNode;
  revealRadius?: number;
  trailFade?: number;
  blurAmount?: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export default function HeroReveal({
  imageSrc,
  children,
  revealRadius = 80,
  trailFade = 1.5,
  blurAmount = 20,
}: HeroRevealProps) {
  // ── Refs ───
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  const blurredCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const holeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // 1. Pre-render Hole Brush
  useEffect(() => {
    const size = revealRadius * 2;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createRadialGradient(revealRadius, revealRadius, 0, revealRadius, revealRadius, revealRadius);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.5)");
    grad.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(revealRadius, revealRadius, revealRadius, 0, Math.PI * 2);
    ctx.fill();

    holeCanvasRef.current = canvas;
    
    return () => {
      // Memory cleanup for brush
      canvas.width = 0;
      canvas.height = 0;
      holeCanvasRef.current = null;
    };
  }, [revealRadius]);

  // 2. Pre-render Blurred Background
  const renderBlurredVersion = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!img || !container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    // Reuse existing offscreen canvas to prevent thrashing
    const bCanvas = blurredCanvasRef.current || document.createElement("canvas");
    if (!blurredCanvasRef.current) {
      blurredCanvasRef.current = bCanvas;
    }
    
    bCanvas.width = width;
    bCanvas.height = height;
    
    const bCtx = bCanvas.getContext("2d");
    if (!bCtx) return;

    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    const scale = Math.max(width / iw, height / ih) * 1.05;
    const drawW = iw * scale;
    const drawH = ih * scale;
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    bCtx.filter = `blur(${blurAmount}px)`;
    bCtx.drawImage(img, drawX, drawY, drawW, drawH);
    
    bCtx.filter = "none";
    bCtx.fillStyle = "rgba(0, 0, 0, 0.45)"; // Tint overlay
    bCtx.fillRect(0, 0, width, height);
  }, [blurAmount]);

  // 3. Main Render Loop & Events
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Resize Observer
    const ro = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderBlurredVersion();
    });
    ro.observe(container);

    // Event Handlers
    const onMove = (e: MouseEvent | TouchEvent) => {
      const isTouch = "touches" in e;
      const clientX = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      mouseRef.current = { x, y, active: true };

      const trail = trailRef.current;
      const prev = trail[trail.length - 1];
      
      if (!prev || Math.hypot(x - prev.x, y - prev.y) > 8) {
        trail.push({ x, y, opacity: 1 });
        if (trail.length > 60) trail.shift();
      }
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchstart", onMove, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onLeave);

    // Render Loop
    const render = (time: number) => {
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      const holeBrush = holeCanvasRef.current;
      const blurredBg = blurredCanvasRef.current;
      
      if (!blurredBg || !holeBrush) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width: w, height: h } = canvas;

      // Draw blurred foreground
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(blurredBg, 0, 0);

      // Punch holes
      ctx.globalCompositeOperation = "destination-out";
      
      const fadeRate = 1 / trailFade; 
      
      // Filter out faded points while updating in place
      const newTrail: TrailPoint[] = [];
      for (const pt of trailRef.current) {
        pt.opacity -= fadeRate * delta;
        if (pt.opacity > 0.01) {
          newTrail.push(pt);
          ctx.globalAlpha = pt.opacity;
          ctx.drawImage(holeBrush, pt.x - revealRadius, pt.y - revealRadius);
        }
      }
      trailRef.current = newTrail;

      // Active cursor hole
      if (mouseRef.current.active) {
        ctx.globalAlpha = 1;
        const { x, y } = mouseRef.current;
        const size = revealRadius * 2 * 1.15;
        const offset = size / 2;
        ctx.drawImage(holeBrush, x - offset, y - offset, size, size);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchstart", onMove);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onLeave);
      
      // Clean up blurred canvas memory on unmount
      if (blurredCanvasRef.current) {
        blurredCanvasRef.current.width = 0;
        blurredCanvasRef.current.height = 0;
        blurredCanvasRef.current = null;
      }
    };
  }, [revealRadius, renderBlurredVersion, trailFade]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none"
          onLoad={(e) => {
            imgRef.current = e.currentTarget;
            renderBlurredVersion();
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full block pointer-events-none"
      />

      <div className="relative z-20 w-full h-full">{children}</div>
    </section>
  );
}