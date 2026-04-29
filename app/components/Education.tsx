import React from "react";
import { education } from "../mock";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div className="section-kicker">05 — Education</div>
        <h2 className="section-title">Where it started.</h2>

        <div style={{ marginTop: 36, display: "grid", gap: 16 }}>
          {education.map((e) => (
            <div
              key={e.id}
              className="glass"
              style={{
                padding: 26,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 22,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--primary-soft)",
                  color: "var(--primary)",
                  border: "1px solid var(--border-strong)",
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>{e.degree}</h3>
                <div
                  style={{
                    color: "var(--primary)",
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  {e.school}
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginTop: 10,
                    maxWidth: 620,
                  }}
                >
                  {e.description}
                </p>
              </div>
              <div
                className="mono hide-sm"
                style={{
                  color: "var(--text-muted)",
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                <div>{e.period}</div>
                <div style={{ marginTop: 4 }}>{e.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          #education .glass { grid-template-columns: auto 1fr !important; }
          #education .hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
