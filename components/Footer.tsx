"use client";

export default function Footer() {
  const scrollTo = (hash: string) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--ink)", color: "rgba(247,248,250,0.7)" }}>
      <div className="wrap" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "clamp(2rem, 5vw, 4rem)",
          marginBottom: "2.5rem",
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#F7F8FA",
              marginBottom: "0.65rem",
            }}>
              DÉSIR
            </p>
            <p style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "rgba(247,248,250,0.45)",
              marginBottom: "1rem",
            }}>
              Precision is the art.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.65, maxWidth: "30ch" }}>
              522 William St, East Orange, NJ 07017
            </p>
            <a
              href="tel:+19736402740"
              style={{ display: "block", marginTop: "0.4rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--crimson)", textDecoration: "none" }}
            >
              (973) 640-2740
            </a>
          </div>

          {/* Services */}
          <div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(247,248,250,0.35)",
              marginBottom: "1rem",
            }}>
              Services
            </p>
            {["The Cut", "Skin Fade", "Beard Work", "Line Up"].map((s) => (
              <p key={s} style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
                color: "rgba(247,248,250,0.6)",
              }}>
                {s}
              </p>
            ))}
          </div>

          {/* Navigate */}
          <div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(247,248,250,0.35)",
              marginBottom: "1rem",
            }}>
              Navigate
            </p>
            {[
              { label: "Book a Cut", href: "#book" },
              { label: "Services", href: "#services" },
              { label: "About", href: "#about" },
              { label: "Visit", href: "#visit" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                  color: "rgba(247,248,250,0.6)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F7F8FA")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,248,250,0.6)")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(247,248,250,0.08)",
          paddingTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(247,248,250,0.3)" }}>
            &copy; {new Date().getFullYear()} Desir Barber Shop &bull; 522 William St, East Orange, NJ
          </p>
          <p style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "0.8rem",
            color: "rgba(247,248,250,0.3)",
          }}>
            Precision is the art. &middot; <a href="https://bysemaj.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Built &middot; bysemaj.com</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
