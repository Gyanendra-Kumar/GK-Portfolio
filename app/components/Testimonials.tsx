import React from "react";
import { testimonials } from "../mock";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div className="section-kicker">06 — Kind Words</div>
        <h2 className="section-title">What colleagues say.</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
            marginTop: 36,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "transform 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Quote
                size={22}
                style={{ color: "var(--primary)", opacity: 0.7 }}
              />
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 14.5,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                “{t.quote}”
              </p>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #22d3ee, #fbbf24)",
                    display: "grid",
                    placeItems: "center",
                    color: "#041016",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>
                    {t.name}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .container-x > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
