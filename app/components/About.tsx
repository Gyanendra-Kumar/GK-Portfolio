import React from "react";
import { personal } from "../mock";
import { MapPin, Code2, Zap, Users } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Performance-first",
    text: "I chase milliseconds — SSR, code splitting, memoization, and tight bundle budgets.",
  },
  {
    icon: Code2,
    title: "Clean architecture",
    text: "Typed, testable, composable. I design component APIs that teams love to extend.",
  },
  {
    icon: Users,
    title: "Team-multiplier",
    text: "I build design systems, mentor juniors, and leave codebases better than I found them.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div className="section-kicker">01 — About</div>
        <h2 className="section-title">
          A frontend engineer obsessed with speed &amp; craft.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 48,
            marginTop: 40,
          }}
        >
          <div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16.5,
                lineHeight: 1.85,
              }}
            >
              {personal.summary}
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 16.5,
                lineHeight: 1.85,
                marginTop: 18,
              }}
            >
              I’ve shipped data-dense dashboards for Fortune 500 teams, migrated
              decade-old legacy codebases into modern SPAs, and built design
              systems used across product squads. My happy place is the
              intersection of performance, UX polish, and code that scales.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 24,
                color: "var(--text-muted)",
                fontSize: 14,
              }}
            >
              <MapPin size={15} style={{ color: "var(--primary)" }} />
              {personal.location} • Open to remote & hybrid
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {pillars.map((p) => (
              <div
                key={p.title}
                className="glass"
                style={{
                  padding: 20,
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    border: "1px solid var(--border-strong)",
                    flexShrink: 0,
                  }}
                >
                  <p.icon size={18} />
                </div>
                <div>
                  <h3
                    style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div.container-x > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
