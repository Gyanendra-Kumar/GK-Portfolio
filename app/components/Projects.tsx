import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import useInView from "../hooks/useInView";
import { projects } from "../mock";

interface Project {
  id: string;
  accent: "amber" | "cyan" | string;
  name: string;
  tagline: string;
  description: string;
  metrics: string[];
  tags: string[];
}

interface ProjectCardProps {
  p: Project;
  index: number;
}

export default function Projects() {
  const [headerRef, headerIn] = useInView();
  return (
    <section
      id="projects"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div ref={headerRef} className={`reveal ${headerIn ? "in-view" : ""}`}>
          <div className="section-kicker">04 — Selected Work</div>
          <h2 className="section-title shimmer">Projects I’m proud of.</h2>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 640,
              marginTop: 14,
              fontSize: 15.5,
              lineHeight: 1.7,
            }}
          >
            A selection of interfaces, platforms and design systems built across
            Infosys and IBM.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginTop: 36,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #projects > div.container-x > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, index }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>();
  const accentColor = p.accent === "amber" ? "#fbbf24" : "#22d3ee";
  const accentSoft =
    p.accent === "amber" ? "rgba(251,191,36,0.15)" : "rgba(34,211,238,0.15)";

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };
  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  const delay = `delay-${(index % 4) + 1}`;

  return (
    <div
      ref={ref}
      className={`reveal ${delay} ${inView ? "in-view" : ""}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      style={{ perspective: 1000, cursor: "pointer" }}
    >
      <div className="conic-wrap">
        <div
          style={{
            position: "relative",
            transform: `rotateX(${tilt.y * -9}deg) rotateY(${tilt.x * 12}deg) translateZ(0)`,
            transition: "transform 0.2s ease-out",
            transformStyle: "preserve-3d",
            padding: 26,
            borderRadius: 17,
            border: `1px solid ${hover ? accentColor : "var(--border)"}`,
            background: "rgba(10,15,28,0.75)",
            backdropFilter: "blur(14px)",
            overflow: "hidden",
            minHeight: 260,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: hover
                ? `radial-gradient(420px circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, ${accentSoft}, transparent 60%)`
                : "transparent",
              pointerEvents: "none",
              transition: "background 0.2s",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
              transform: "translateZ(30px)",
            }}
          >
            <div
              className="mono"
              style={{
                color: accentColor,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(4).padStart(2, "0")}
            </div>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background: accentSoft,
                color: accentColor,
                border: `1px solid ${accentColor}`,
                opacity: hover ? 1 : 0.75,
                transform: hover
                  ? "translateZ(50px) rotate(-12deg) scale(1.08)"
                  : "translateZ(0)",
                transition:
                  "transform 0.35s cubic-bezier(0.2,0.8,0.2,1), opacity 0.2s, box-shadow 0.25s",
                boxShadow: hover ? `0 0 20px ${accentSoft}` : "none",
              }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>

          <h3
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginTop: 18,
              transform: "translateZ(40px)",
            }}
          >
            {p.name}
          </h3>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 14,
              marginTop: 6,
              transform: "translateZ(30px)",
            }}
          >
            {p.tagline}
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 13.5,
              lineHeight: 1.7,
              marginTop: 14,
              transform: "translateZ(20px)",
            }}
          >
            {p.description}
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              transform: "translateZ(24px)",
            }}
          >
            {p.metrics.map((m) => (
              <div key={m}>
                <div
                  className="mono"
                  style={{ color: accentColor, fontSize: 13, fontWeight: 600 }}
                >
                  {m}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              transform: "translateZ(20px)",
            }}
          >
            {p.tags.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: "4px 9px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
