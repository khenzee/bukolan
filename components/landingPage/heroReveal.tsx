"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
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
  trailFade = 1.8,
  blurAmount = 18,
}: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blurLayerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const frameCount = useRef(0);
  const renderMaskRef = useRef<() => void>(() => {});

  // ── Keep render function in a ref so it can self-reference ───
  useEffect(() => {
    renderMaskRef.current = () => {
      const canvas = canvasRef.current;
      const blurLayer = blurLayerRef.current;
      if (!canvas || !blurLayer) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width: w, height: h } = canvas;

      // ─ Step 1: Fill white (white = blur visible) ───────────────
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);

      // ─ Step 2: Punch soft holes where the trail is ─────────────
      ctx.globalCompositeOperation = "destination-out";

      // Clean up fully-faded points
      trailRef.current = trailRef.current.filter((p) => p.opacity > 0.01);
      const points = trailRef.current;

      // Draw a smooth gradient circle at each trail point
      for (const pt of points) {
        if (pt.opacity <= 0) continue;
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, revealRadius);
        grad.addColorStop(0, `rgba(0,0,0,${pt.opacity})`);
        grad.addColorStop(0.5, `rgba(0,0,0,${pt.opacity * 0.6})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, revealRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Active cursor — always a full clear circle
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, revealRadius * 1.1);
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(0.55, "rgba(0,0,0,0.8)");
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, revealRadius * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─ Step 3: Apply canvas as CSS mask (throttle toDataURL) ───
      ctx.globalCompositeOperation = "source-over";
      frameCount.current++;

      // Only serialize to dataURL every 2nd frame for performance
      if (frameCount.current % 2 === 0 || points.length === 0) {
        const url = canvas.toDataURL("image/png");
        blurLayer.style.maskImage = `url(${url})`;
        blurLayer.style.webkitMaskImage = `url(${url})`;
        blurLayer.style.maskSize = "100% 100%";
      }

      rafRef.current = requestAnimationFrame(renderMaskRef.current);
    };
  }, [revealRadius]);

  // ── Setup listeners ──────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Size canvas to match container
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Track mouse or touch and build trail
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (window.innerWidth < 1024) return; // Only manual on Desktop

      let clientX, clientY;
      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      mouseRef.current = { x, y, active: true };

      // Add point only if cursor moved enough
      const prev = trailRef.current[trailRef.current.length - 1];
      if (!prev || Math.hypot(x - prev.x, y - prev.y) > 8) {
        const pt: TrailPoint = { x, y, opacity: 1 };
        trailRef.current.push(pt);

        // GSAP fades the point smoothly
        gsap.to(pt, {
          opacity: 0,
          duration: trailFade,
          ease: "power2.out",
        });

        // Cap trail length to prevent memory bloat
        if (trailRef.current.length > 80) {
          trailRef.current.splice(0, 10);
        }
      }
    };

    // Autonomous movement for Mobile/Tablet (Smooth Wandering)
    let autoTween: gsap.core.Tween | null = null;
    let autoTimer: NodeJS.Timeout | null = null;

    const virtualCursor = {
      x: canvas.width / 2 || window.innerWidth / 2,
      y: canvas.height / 2 || window.innerHeight / 2,
    };

    const moveSmoothly = () => {
      // Use current canvas dimensions (or fallback to window if canvas not ready)
      const w = canvas.width || window.innerWidth;
      const h = canvas.height || window.innerHeight;

      const targetX = (0.15 + Math.random() * 0.7) * w;
      const targetY = (0.15 + Math.random() * 0.7) * h;
      const duration = 4 + Math.random() * 4;

      autoTween = gsap.to(virtualCursor, {
        x: targetX,
        y: targetY,
        duration,
        ease: "sine.inOut",
        onUpdate: () => {
          // Only apply auto movement if we're on mobile/tablet
          if (window.innerWidth >= 1024) return;

          const { x, y } = virtualCursor;
          mouseRef.current = { x, y, active: true };

          const prev = trailRef.current[trailRef.current.length - 1];
          if (!prev || Math.hypot(x - prev.x, y - prev.y) > 5) {
            const pt: TrailPoint = { x, y, opacity: 1 };
            trailRef.current.push(pt);
            gsap.to(pt, {
              opacity: 0,
              duration: trailFade * 2.5,
              ease: "power1.inOut",
            });
          }
        },
        onComplete: moveSmoothly,
      });
    };
    
    // Start auto movement (it runs silently on desktop, but only applies to the mask on mobile)
    autoTimer = setTimeout(moveSmoothly, 500);

    const onLeave = () => {
      if (window.innerWidth < 1024) return; // Don't interrupt auto-mode on mobile
      
      mouseRef.current.active = false;
      trailRef.current.forEach((p) => {
        gsap.to(p, { opacity: 0, duration: 0.6, ease: "power1.out" });
      });
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchstart", onMove, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onLeave);
    container.addEventListener("touchcancel", onLeave);

    // Start render loop
    rafRef.current = requestAnimationFrame(renderMaskRef.current);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchstart", onMove);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onLeave);
      container.removeEventListener("touchcancel", onLeave);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      if (autoTween) autoTween.kill();
      if (autoTimer) clearTimeout(autoTimer);
    };
  }, [trailFade]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Off-screen canvas for mask generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Layer 1: Clear image (shows through where mask is transparent) */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none"
        />
      </div>

      {/* Layer 2: Blurred image + tint (masked by canvas) */}
      <div ref={blurLayerRef} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${blurAmount}px)`,
            transform: "scale(1.06)",
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="100vw"
            aria-hidden
            className="object-cover pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Layer 3: Hero content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}