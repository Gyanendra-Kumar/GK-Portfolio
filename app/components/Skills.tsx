"use client";

import React from "react";
import useInView from "../hooks/useInView";
import { skillMeters, skills } from "../mock";

/* ================= TYPES ================= */

type SkillGroupType = {
  group: string;
  items: string[];
};

type SkillMeter = {
  name: string;
  level: number;
};

/* ⚠️ assuming this exists somewhere in your codebase */
// declare const skillMeters: SkillMeter[];

/* ================= COMPONENT ================= */

export default function Skills() {
  const [metersRef, metersIn] = useInView({
    threshold: 0.25,
    rootMargin: "0px 0px -80px 0px",
  });

  const [headerRef, headerIn] = useInView();

  return (
    <section
      id="skills"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div ref={headerRef} className={`reveal ${headerIn ? "in-view" : ""}`}>
          <div className="section-kicker">02 — Toolkit</div>
          <h2 className="section-title shimmer">The stack I ship with.</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            marginTop: 40,
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            {(skills as SkillGroupType[]).map((group, i) => (
              <SkillGroup key={group.group} group={group} index={i} />
            ))}
          </div>

          <div
            ref={metersRef}
            className="glass"
            style={{ padding: 26, alignSelf: "start" }}
          >
            <div
              style={{
                color: "var(--primary)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Proficiency
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              {skillMeters.map((m: SkillMeter, i: number) => (
                <div key={m.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "var(--text)" }}>{m.name}</span>

                    <span
                      className="mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {m.level}%
                    </span>
                  </div>

                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: metersIn ? `${m.level}%` : "0%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #22d3ee, #fbbf24, #fb7185)",
                        backgroundSize: "200% 100%",
                        animation: metersIn
                          ? "gradient-shift 4s ease infinite"
                          : "none",
                        borderRadius: 999,
                        boxShadow: "0 0 14px rgba(34,211,238,0.4)",
                        transition: `width 1.1s cubic-bezier(0.2,0.8,0.2,1) ${
                          i * 80
                        }ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div
          className="marquee-wrap"
          style={{
            marginTop: 48,
            overflow: "hidden",
            maskImage:
              "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <div className="marquee-track">
            {[
              ...skills.flatMap((g: SkillGroupType) => g.items),
              ...skills.flatMap((g: SkillGroupType) => g.items),
            ].map((it: string, i: number) => (
              <span
                key={i}
                className="mono"
                style={{
                  fontSize: 13,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #skills > div.container-x > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ================= CHILD ================= */

type SkillGroupProps = {
  group: SkillGroupType;
  index: number;
};

function SkillGroup({ group, index }: SkillGroupProps) {
  const [ref, inView] = useInView();
  const delay = `delay-${(index % 4) + 1}`;

  return (
    <div
      ref={ref}
      className={`glass reveal ${delay} ${inView ? "in-view" : ""}`}
      style={{ padding: 20 }}
    >
      <div
        style={{
          color: "var(--primary)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {group.group}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {group.items.map((it: string) => (
          <span
            key={it}
            style={{
              fontSize: 13,
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid var(--border-strong)",
              color: "var(--text)",
              background: "var(--surface-strong)",
              transition:
                "color 0.2s, border-color 0.2s, background-color 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>): void => {
              e.currentTarget.style.color = "var(--primary)";
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.background = "var(--primary-soft)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>): void => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
              e.currentTarget.style.background = "var(--surface-strong)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
