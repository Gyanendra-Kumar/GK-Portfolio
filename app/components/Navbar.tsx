import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../mock";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // determine active section
      const offsets = navLinks.map((l: any) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: l.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a: any, b: any) => a.top - b.top);
      if (offsets[0]) setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 8px 8px 20px",
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: scrolled ? "rgba(10,15,28,0.75)" : "rgba(10,15,28,0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.45)" : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      >
        <button
          onClick={() => jumpTo("home")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text)",
            fontFamily: "Space Grotesk",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #22d3ee, #0ea5b7)",
              color: "#041016",
              fontWeight: 700,
              fontSize: 12,
              boxShadow: "0 0 20px rgba(34,211,238,0.4)",
            }}
          >
            {personal.initials}
          </span>
          <span className="hide-sm">{personal.firstName}</span>
        </button>

        <div
          className="hide-sm"
          style={{ display: "flex", gap: 2, marginLeft: 16 }}
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => jumpTo(l.id)}
              style={{
                background: "transparent",
                border: "none",
                color: active === l.id ? "var(--primary)" : "var(--text-muted)",
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s, background-color 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  active === l.id ? "var(--primary)" : "var(--text-muted)")
              }
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => jumpTo("contact")}
          className="btn btn-primary"
          style={{ padding: "8px 16px", fontSize: 13, marginLeft: 6 }}
        >
          Let’s Talk
        </button>

        <button
          className="show-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: "transparent",
            border: "1px solid var(--border-strong)",
            color: "var(--text)",
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "none",
            placeItems: "center",
            cursor: "pointer",
            marginLeft: 4,
          }}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div
          className="show-sm"
          style={{
            position: "fixed",
            top: 76,
            left: 16,
            right: 16,
            background: "rgba(10,15,28,0.95)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            backdropFilter: "blur(14px)",
            padding: 8,
            display: "grid",
            gap: 4,
            pointerEvents: "auto",
          }}
        >
          {navLinks.map((l: any) => (
            <button
              key={l.id}
              onClick={() => jumpTo(l.id)}
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                color: "var(--text)",
                padding: "12px 14px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .hide-sm { display: none !important; }
          .show-sm { display: grid !important; }
        }
      `}</style>
    </header>
  );
}
