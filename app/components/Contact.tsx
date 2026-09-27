import React, { useState } from "react";
import { personal } from "../mock";
import { Mail, Phone, MapPin, Send, Code, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      // Persist to localStorage as mock backend
      const prev = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      prev.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem("contact_messages", JSON.stringify(prev));
      toast.success("Message sent! I’ll reply within 24 hours.");
    }, 900);
  };

  return (
    <section
      id="contact"
      className="section-spacer"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="container-x">
        <div className="section-kicker">07 — Contact</div>
        <h2 className="section-title">Let’s build something fast.</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 32,
            marginTop: 40,
          }}
        >
          {/* left info */}
          <div className="glass" style={{ padding: 30 }}>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              Got a role, a freelance gig, or just want to chat about React
              performance? Drop a line — I reply within 24 hours.
            </p>

            <div style={{ display: "grid", gap: 14, marginTop: 26 }}>
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: personal.email,
                  href: `mailto:${personal.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: personal.phone,
                  href: `tel:${personal.phone.replace(/\s/g, "")}`,
                },
                { icon: MapPin, label: "Location", value: personal.location },
              ].map((row) => (
                <a
                  key={row.label}
                  href={row.href || undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    color: "var(--text)",
                    transition: "border-color 0.2s, background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.background = "var(--primary-soft)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "grid",
                      placeItems: "center",
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      border: "1px solid var(--border-strong)",
                    }}
                  >
                    <row.icon size={16} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}
                    >
                      {row.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
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
                    aria-label={s.label}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      border: "1px solid var(--border-strong)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--primary)";
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderColor =
                        "var(--border-strong)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* form */}
          {/* <form
            onSubmit={submit}
            className="glass"
            style={{ padding: 30, display: "grid", gap: 16 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <Field
                label="Your name"
                value={form.name}
                onChange={update("name")}
                placeholder="Ada Lovelace"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
              />
            </div>
            <TextArea
              label="Message"
              value={form.message}
              onChange={update("message")}
              placeholder="Tell me about the role / project..."
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{
                justifyContent: "center",
                padding: "14px 20px",
                fontSize: 14,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  Send message <Send size={14} />
                </>
              )}
            </button>
          </form> */}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div.container-x > div { grid-template-columns: 1fr !important; }
          #contact form > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.2s, background-color 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "rgba(34,211,238,0.04)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
      />
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function TextArea({ label, value, onChange, placeholder }: TextAreaProps) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
          outline: "none",
          fontFamily: "inherit",
          resize: "vertical",
          transition: "border-color 0.2s, background-color 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "rgba(34,211,238,0.04)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
      />
    </label>
  );
}
