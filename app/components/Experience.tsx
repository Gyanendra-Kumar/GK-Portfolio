import React, { useState } from "react";
import { experience } from "../mock";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";

export default function Experience() {
  const [active, setActive] = useState(experience[0].id);
  const activeJob = experience.find((e) => e.id === active)!;

  return (
    <section
      id="experience"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div className="section-kicker">03 — Experience</div>
        <h2 className="section-title">Where I’ve shipped.</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 32,
            marginTop: 40,
          }}
        >
          {/* company list */}
          <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
            {experience.map((e) => (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                style={{
                  textAlign: "left",
                  padding: "16px 18px",
                  borderRadius: 12,
                  border:
                    "1px solid " +
                    (active === e.id ? "var(--primary)" : "var(--border)"),
                  background:
                    active === e.id ? "var(--primary-soft)" : "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background-color 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600 }}>
                    {e.company}
                  </span>
                  {active === e.id && (
                    <ChevronRight
                      size={16}
                      style={{ color: "var(--primary)" }}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  {e.period}
                </div>
              </button>
            ))}
          </div>

          {/* details */}
          <div className="glass" style={{ padding: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--primary-soft)",
                  color: "var(--primary)",
                  border: "1px solid var(--border-strong)",
                }}
              >
                <Briefcase size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600 }}>
                  {activeJob.role}
                </h3>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 13,
                    marginTop: 3,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>
                    {activeJob.company}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <MapPin size={12} /> {activeJob.location}
                  </span>
                  <span className="mono">{activeJob.period}</span>
                  {activeJob.current && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: "rgba(34,211,238,0.15)",
                        color: "var(--primary)",
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ul
              style={{
                marginTop: 22,
                paddingLeft: 0,
                listStyle: "none",
                display: "grid",
                gap: 12,
              }}
            >
              {activeJob.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    color: "var(--text-muted)",
                    fontSize: 14.5,
                    lineHeight: 1.7,
                  }}
                >
                  <span
                    style={{
                      marginTop: 9,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      flexShrink: 0,
                      boxShadow: "0 0 8px var(--primary)",
                    }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {activeJob.stack.map((s) => (
                <span
                  key={s}
                  className="mono"
                  style={{
                    fontSize: 11,
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #experience > div.container-x > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
