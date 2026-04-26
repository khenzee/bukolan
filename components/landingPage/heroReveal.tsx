"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const blurredCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderBlurredVersion = useCallback(() => {
    if (!imgRef.current || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const bCanvas = document.createElement("canvas");
    bCanvas.width = width;
    bCanvas.height = height;
    const bCtx = bCanvas.getContext("2d");
    if (!bCtx) return;

    // Draw blurred image
    bCtx.filter = `blur(${blurAmount}px)`;
    // Oversize draw to hide edge artifacts from blur
    bCtx.drawImage(imgRef.current, -20, -20, width + 40, height + 40);
    
    // Apply tint directly to the blurred buffer
    bCtx.filter = "none";
    bCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
    bCtx.fillRect(0, 0, width, height);

    blurredCanvasRef.current = bCanvas;
  }, [blurAmount]);

  // ── Preload Image & Pre-render Blurred Version ───
  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderBlurredVersion();
    };
  }, [imageSrc, renderBlurredVersion]);

  // ── Render Loop ───
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || !blurredCanvasRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width: w, height: h } = canvas;

      // 1. Clear and Draw the blurred foreground
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(blurredCanvasRef.current, 0, 0);

      // 2. Punch holes where the trail is
      ctx.globalCompositeOperation = "destination-out";

      // Clean up fully-faded points
      trailRef.current = trailRef.current.filter((p) => p.opacity > 0.01);
      
      for (const pt of trailRef.current) {
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, revealRadius);
        grad.addColorStop(0, `rgba(0,0,0,${pt.opacity})`);
        grad.addColorStop(0.5, `rgba(0,0,0,${pt.opacity * 0.5})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, revealRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Active cursor hole
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, revealRadius * 1.15);
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(0.6, "rgba(0,0,0,0.8)");
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, revealRadius * 1.15, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [revealRadius]);

  // ── Event Handlers ───
  const { contextSafe } = useGSAP({ scope: containerRef });

  const animatePoint = contextSafe((pt: TrailPoint, duration: number) => {
    gsap.to(pt, {
      opacity: 0,
      duration,
      ease: "power2.out",
    });
  });

  const onMove = (e: MouseEvent | TouchEvent) => {
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    mouseRef.current = { x, y, active: true };

    const prev = trailRef.current[trailRef.current.length - 1];
    if (!prev || Math.hypot(x - prev.x, y - prev.y) > 8) {
      const pt: TrailPoint = { x, y, opacity: 1 };
      trailRef.current.push(pt);

      animatePoint(pt, trailFade);

      if (trailRef.current.length > 60) {
        trailRef.current.shift();
      }
    }
  };

  const onLeave = () => {
    mouseRef.current.active = false;
  };

  useGSAP(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderBlurredVersion();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchstart", onMove, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchstart", onMove);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onLeave);
      ro.disconnect();
    };
  }, { dependencies: [trailFade, renderBlurredVersion], scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Background Layer (Clear) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none"
        />
      </div>

      {/* Interactive Layer (Blurred + Masked) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full block pointer-events-none"
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </section>
  );
}