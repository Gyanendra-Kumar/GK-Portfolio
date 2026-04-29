import React from "react";
import { personal, navLinks } from "../mock";
import { Code, Briefcase, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border)",
        padding: "50px 0 30px",
        marginTop: 40,
        background: "linear-gradient(to bottom, transparent, rgba(6,8,15,0.6))",
      }}
    >
      <div className="container-x">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: 40,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, #22d3ee, #0ea5b7)",
                  color: "#041016",
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                }}
              >
                {personal.initials}
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                {personal.name}
              </span>
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 380,
                marginTop: 14,
              }}
            >
              {personal.title} — building fast, accessible interfaces. Based in{" "}
              {personal.location}.
            </p>
          </div>

          <div>
            <div
              className="mono"
              style={{
                color: "var(--primary)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Navigate
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 13.5,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div
              className="mono"
              style={{
                color: "var(--primary)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Connect
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {personal.socials.map((s) => {
                const Icon =
                  s.icon === "Github"
                    ? Code
                    : s.icon === "Linkedin"
                      ? Briefcase
                      : Mail;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 13.5,
                      textDecoration: "none",
                      display: "inline-flex",
                      gap: 8,
                      alignItems: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    <Icon size={14} /> {s.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 22,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            className="mono"
            style={{ color: "var(--text-dim)", fontSize: 11.5 }}
          >
            © {new Date().getFullYear()} {personal.name}. Crafted with React
            &amp; care.
          </span>
          <button
            onClick={scrollTop}
            className="btn btn-ghost"
            style={{ padding: "8px 14px", fontSize: 12 }}
          >
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          footer > div.container-x > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
