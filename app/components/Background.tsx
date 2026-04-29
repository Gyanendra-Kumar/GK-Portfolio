import React, { useEffect, useRef } from "react";

interface BackgroundProps {
  scrollY?: number;
}

type FloatingShapeType = "cube" | "ring" | "sphere";
type FloatingShapeColor = "cyan" | "amber" | "rose";

interface AuroraBlobProps {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: string;
}

interface FloatingShapeProps {
  type: FloatingShapeType;
  size: number;
  top: string;
  left: string;
  delay: string;
  color: FloatingShapeColor;
}

export default function Background({ scrollY = 0 }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapesRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const auroraRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    rx: 0,
    ry: 0,
    dx: 0,
    dy: 0,
  });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setSize();

    // Color-coded particles
    const palette = [
      { color: [125, 211, 252], weight: 0.55 }, // cyan light
      { color: [34, 211, 238], weight: 0.25 }, // cyan
      { color: [251, 191, 36], weight: 0.12 }, // amber
      { color: [251, 113, 133], weight: 0.08 }, // rose
    ];
    const pickColor = () => {
      const r = Math.random();
      let acc = 0;
      for (const p of palette) {
        acc += p.weight;
        if (r <= acc) return p.color;
      }
      return palette[0].color;
    };

    const COUNT = Math.min(200, Math.floor((w * h) / 8000));
    const particles = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 1 + 0.2,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      pulse: Math.random() * Math.PI * 2,
      color: pickColor(),
    }));

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / w - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / h - 0.5) * 2;
      mouseRef.current.dx = e.clientX;
      mouseRef.current.dy = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const render = () => {
      t += 0.016;
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;
      mouseRef.current.rx += (mouseRef.current.dx - mouseRef.current.rx) * 0.18;
      mouseRef.current.ry += (mouseRef.current.dy - mouseRef.current.ry) * 0.18;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      // Radial cursor glow
      const gx = w / 2 + mx * w * 0.3;
      const gy = h / 2 + my * h * 0.25;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 460);
      grad.addColorStop(0, "rgba(34, 211, 238, 0.14)");
      grad.addColorStop(0.5, "rgba(251, 113, 133, 0.05)");
      grad.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const offsetX = mx * 44 * p.z;
        const offsetY = my * 44 * p.z;
        const alpha = 0.3 + p.z * 0.55 + Math.sin(p.pulse) * 0.12;
        const r = p.r * p.z * (0.85 + Math.sin(p.pulse) * 0.15);
        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`;
        ctx.shadowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0.6)`;
        ctx.shadowBlur = 8 * p.z;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 10000) {
            const alpha = (1 - d2 / 10000) * 0.1;
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x + mx * 44 * a.z, a.y + my * 44 * a.z);
            ctx.lineTo(b.x + mx * 44 * b.z, b.y + my * 44 * b.z);
            ctx.stroke();
          }
        }
      }

      // 3D shapes parallax
      if (shapesRef.current) {
        shapesRef.current.style.transform = `translate3d(${mx * -34}px, ${my * -34}px, 0) rotateX(${my * 7}deg) rotateY(${mx * -7}deg)`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `perspective(1000px) rotateX(${60 + my * 5}deg) translateY(${scrollY * 0.15}px) translateX(${mx * -22}px)`;
      }
      if (auroraRef.current) {
        auroraRef.current.style.transform = `translate3d(${mx * -20}px, ${my * -20}px, 0)`;
      }

      // cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.dx - 4}px, ${mouseRef.current.dy - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseRef.current.rx - 19}px, ${mouseRef.current.ry - 19}px, 0)`;
      }

      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [scrollY]);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Aurora blobs */}
        <div
          ref={auroraRef}
          style={{
            position: "absolute",
            inset: 0,
            transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <AuroraBlob
            color="rgba(34,211,238,0.35)"
            size={720}
            top="-10%"
            left="-12%"
            delay="0s"
          />
          <AuroraBlob
            color="rgba(251,191,36,0.22)"
            size={620}
            top="40%"
            left="70%"
            delay="6s"
          />
          <AuroraBlob
            color="rgba(251,113,133,0.22)"
            size={660}
            top="65%"
            left="-8%"
            delay="10s"
          />
          <AuroraBlob
            color="rgba(125,211,252,0.18)"
            size={480}
            top="12%"
            left="55%"
            delay="3s"
          />
        </div>

        {/* Grid floor */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            left: "-30%",
            right: "-30%",
            bottom: "-40%",
            height: "120vh",
            transform: "perspective(1000px) rotateX(60deg)",
            transformOrigin: "center top",
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            opacity: 0.6,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Floating shapes */}
        <div
          ref={shapesRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            perspective: "1200px",
            transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <FloatingShape
            type="cube"
            size={90}
            top="12%"
            left="8%"
            delay="0s"
            color="cyan"
          />
          <FloatingShape
            type="ring"
            size={140}
            top="70%"
            left="6%"
            delay="1.5s"
            color="amber"
          />
          <FloatingShape
            type="sphere"
            size={120}
            top="18%"
            left="85%"
            delay="0.8s"
            color="cyan"
          />
          <FloatingShape
            type="cube"
            size={60}
            top="75%"
            left="88%"
            delay="2.2s"
            color="amber"
          />
          <FloatingShape
            type="sphere"
            size={70}
            top="45%"
            left="50%"
            delay="1.1s"
            color="rose"
          />
          <FloatingShape
            type="ring"
            size={80}
            top="28%"
            left="45%"
            delay="2.8s"
            color="cyan"
          />
        </div>

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(6,8,15,0) 40%, rgba(6,8,15,0.85) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

function AuroraBlob({ color, size, top, left, delay }: AuroraBlobProps) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        animation: `aurora-drift 22s ease-in-out ${delay} infinite`,
        willChange: "transform",
      }}
    />
  );
}

function FloatingShape({
  type,
  size,
  top,
  left,
  delay,
  color,
}: FloatingShapeProps) {
  const colorMap: Record<FloatingShapeColor, { accent: string; soft: string }> =
    {
      cyan: { accent: "rgba(34,211,238,0.55)", soft: "rgba(34,211,238,0.1)" },
      amber: { accent: "rgba(251,191,36,0.55)", soft: "rgba(251,191,36,0.1)" },
      rose: { accent: "rgba(251,113,133,0.55)", soft: "rgba(251,113,133,0.1)" },
    };
  const { accent, soft } = colorMap[color];

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    top,
    left,
    width: size,
    height: size,
    animation: `float-y 9s ease-in-out ${delay} infinite`,
    transformStyle: "preserve-3d",
    opacity: 0.88,
  };

  if (type === "cube") {
    const half = size / 2;
    return (
      <div style={baseStyle}>
        <div
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
            transform: "rotateX(55deg) rotateY(45deg)",
          }}
        >
          {[
            { t: `translateZ(${half}px)` },
            { t: `rotateY(180deg) translateZ(${half}px)` },
            { t: `rotateY(90deg) translateZ(${half}px)` },
            { t: `rotateY(-90deg) translateZ(${half}px)` },
            { t: `rotateX(90deg) translateZ(${half}px)` },
            { t: `rotateX(-90deg) translateZ(${half}px)` },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                border: `1px solid ${accent}`,
                background: soft,
                transform: f.t,
                boxShadow: `inset 0 0 22px ${soft}`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "ring") {
    return (
      <div style={baseStyle}>
        <div
          style={{
            width: size,
            height: size,
            border: `1px solid ${accent}`,
            borderRadius: "50%",
            transform: "rotateX(72deg)",
            boxShadow: `0 0 40px ${soft}, inset 0 0 24px ${soft}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: size * 0.7,
            height: size * 0.7,
            border: `1px dashed ${accent}`,
            borderRadius: "50%",
            transform: "rotateX(72deg) rotateZ(45deg)",
          }}
        />
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 70%)`,
          border: `1px solid ${accent}`,
          boxShadow: `0 0 40px ${soft}`,
        }}
      />
    </div>
  );
}
