import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Sparkles,
  Mail,
  ExternalLinkIcon,
  Link,
  ArrowRight,
} from "lucide-react";
import { personal } from "../mock";
import Image from "next/image";

function useTyping(
  strings: string[],
  typeSpeed = 80,
  deleteSpeed = 40,
  pause = 1400,
) {
  const [display, setDisplay] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[i % strings.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(
        () => {
          setDisplay((d) =>
            deleting
              ? current.slice(0, d.length - 1)
              : current.slice(0, d.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, i, strings, typeSpeed, deleteSpeed, pause]);

  return display;
}

// Scramble text effect — reveals target letter-by-letter with random glyphs
function useScramble(target: string, duration = 1400) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*";
    const final = target.split("");
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * final.length);
      let result = "";
      for (let i = 0; i < final.length; i++) {
        if (i < revealed) result += final[i];
        else if (final[i] === " ") result += " ";
        else result += chars[Math.floor(Math.random() * chars.length)];
      }
      setOut(result);
      if (frame >= totalFrames) {
        setOut(target);
        clearInterval(id);
      }
    }, 30);
    return () => clearInterval(id);
  }, [target, duration]);
  return out;
}

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ to, duration = 1600, suffix = "" }: CountUpProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(e.target as Element);
        }
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  strength?: number;
  style?: React.CSSProperties;
}

function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 18,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const onMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  const sharedStyle: React.CSSProperties = {
    transition:
      "transform 0.2s cubic-bezier(0.2,0.8,0.2,1), background-color 0.25s, box-shadow 0.25s, color 0.25s, border-color 0.25s",
    ...style,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={sharedStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={sharedStyle}
    >
      {children}
    </button>
  );
}

function parseVal(v: string) {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { n: parseInt(m[1], 10), s: m[2] } : { n: 0, s: v };
}

export default function Hero() {
  const typed = useTyping(personal.typingRoles);
  const scrambled = useScramble(personal.firstName, 1200);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 120,
        paddingBottom: 60,
        zIndex: 1,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div className="fade-up">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid var(--border-strong)",
              color: "var(--primary)",
              background: "var(--primary-soft)",
              fontSize: 12,
              fontFamily: "JetBrains Mono, monospace",
              marginBottom: 28,
              boxShadow: "0 0 24px rgba(34,211,238,0.15)",
              animation: "pulse-ring 2.4s ease-in-out infinite",
            }}
          >
            <Sparkles size={12} />
            Available for senior frontend roles
          </div>

          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: "-0.035em",
            }}
          >
            Hi, I’m{" "}
            <span
              className="gradient-text glow-pulse"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "-0.02em",
              }}
            >
              {scrambled}
            </span>
            .
            <br />
            <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>
              I craft&nbsp;
            </span>
            <span className="gradient-text">{typed}</span>
            <span className="caret" />
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: 560,
              fontSize: 17,
              lineHeight: 1.7,
              marginTop: 24,
            }}
          >
            {personal.tagline} Based in {personal.location}. 6+ years turning
            complex data into fast, accessible, and beautiful web experiences.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <MagneticButton href="#projects" className="btn btn-primary">
              View my work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn btn-ghost">
              <Mail size={14} /> Get in touch
            </MagneticButton>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
            {personal.socials.map((s) => {
              const Icon =
                s.icon === "Github"
                  ? ExternalLinkIcon
                  : s.icon === "Linkedin"
                    ? Link
                    : Mail;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: "1px solid var(--border-strong)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--text-muted)",
                    transition:
                      "color 0.25s, border-color 0.25s, background-color 0.25s, transform 0.25s, box-shadow 0.25s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.background = "var(--primary-soft)";
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 22px rgba(34,211,238,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: 3D card stack */}
        <div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ position: "relative", height: 480, perspective: 1400 }}
          className="hide-md"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `rotateX(${tilt.y * -10}deg) rotateY(${tilt.x * 14}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.2s ease-out",
            }}
          >
            <div
              className="glass"
              style={{
                position: "absolute",
                top: 30,
                right: 20,
                width: "72%",
                padding: 22,
                transform: "translateZ(20px)",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,113,133,0.1)",
              }}
            >
              <div
                className="mono"
                style={{
                  color: "var(--primary)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                }}
              >
                ~/metrics
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                {personal.stats.map((s) => {
                  const parsed = parseVal(s.value);
                  return (
                    <div key={s.label}>
                      <div
                        style={{
                          fontFamily: "Space Grotesk",
                          fontSize: 30,
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #22d3ee, #fbbf24)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        <CountUp to={parsed.n} suffix={parsed.s} />
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="glass"
              style={{
                position: "absolute",
                bottom: 20,
                left: 10,
                width: "80%",
                padding: 20,
                transform: "translateZ(80px)",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.14), 0 0 40px rgba(34,211,238,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: "#fb7185",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: "#fbbf24",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: "#22d3ee",
                  }}
                />
                <span
                  className="mono"
                  style={{
                    color: "var(--text-dim)",
                    fontSize: 11,
                    marginLeft: 8,
                  }}
                >
                  developer.tsx
                </span>
              </div>
              <pre
                className="mono"
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontSize: 12.5,
                  lineHeight: 1.75,
                }}
              >
                {`const gyanendra = {
  role: `}
                <span
                  style={{ color: "#fbbf24" }}
                >{`"Frontend Engineer"`}</span>
                {`,
  stack: [`}
                <span style={{ color: "#22d3ee" }}>{`"React"`}</span>
                {`, `}
                <span style={{ color: "#22d3ee" }}>{`"Next.js"`}</span>
                {`],
  loves: `}
                <span style={{ color: "#fb7185" }}>{`() => `}</span>
                {`(
    `}
                <span
                  style={{ color: "#fbbf24" }}
                >{`"shipping fast UIs"`}</span>
                {`
  )
};`}
              </pre>
            </div>

            <div
              style={{
                position: "absolute",
                top: -10,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(251,113,133,0.25))",
                border: "1px solid var(--border-strong)",
                transform: "translateZ(140px) rotate(12deg)",
                backdropFilter: "blur(8px)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(34,211,238,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/gyanendra-kumar.jpeg"
                alt="Gyanendra Kumar"
                width={70}
                height={70}
                style={{
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          color: "var(--text-dim)",
          fontSize: 11,
          fontFamily: "JetBrains Mono, monospace",
          display: "flex",
          alignItems: "center",
          gap: 8,
          letterSpacing: "0.2em",
        }}
      >
        SCROLL{" "}
        <ArrowDown
          size={14}
          style={{ animation: "float-y 2s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @media (max-width: 980px) {
          #home > div.container-x { grid-template-columns: 1fr !important; }
          .hide-md { display: none !important; }
        }
      `}</style>
    </section>
  );
}
