import React from "react";
import { certifications } from "../mock";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section
      className="section-spacer"
      style={{ position: "relative", zIndex: 1, paddingTop: 40 }}
    >
      <div className="container-x">
        <div className="section-kicker">— Certifications</div>
        <h2
          className="section-title"
          style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
        >
          Continuous learning.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginTop: 28,
          }}
        >
          {certifications.map((c) => (
            <div
              key={c.id}
              className="glass"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "transform 0.3s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--primary-soft)",
                  color: "var(--primary)",
                  border: "1px solid var(--border-strong)",
                }}
              >
                <Award size={16} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                {c.name}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                {c.issuer}
              </div>
              <div
                className="mono"
                style={{
                  color: "var(--primary)",
                  fontSize: 11,
                  marginTop: "auto",
                }}
              >
                {c.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .container-x > div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          section .container-x > div[style*="repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
