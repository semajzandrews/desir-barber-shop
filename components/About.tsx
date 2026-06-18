"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="section-pad" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}
          className="about-grid"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            {/* Frame offset */}
            <div style={{
              position: "absolute",
              top: "16px", left: "-16px", right: "16px", bottom: "-16px",
              border: "1px solid var(--border-crisp)",
              borderRadius: "2px",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "2px",
              overflow: "hidden",
              aspectRatio: "4 / 5",
            }}>
              {/* The real Desir Barber Shop storefront (owner's own Google photo) */}
              <img
                src="/images/storefront.jpg"
                alt="Desir Barber Shop storefront in East Orange, NJ"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* Credential chip */}
            <div style={{
              position: "absolute",
              bottom: "-8px",
              right: "-8px",
              background: "var(--ink)",
              color: "#F7F8FA",
              borderRadius: "2px",
              padding: "0.65rem 1rem",
              zIndex: 3,
            }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.65 }}>Based in</p>
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1rem", fontWeight: 500, lineHeight: 1.2 }}>East Orange</p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: "0.85rem",
            }}>
              The Shop
            </p>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.12,
              marginBottom: "1.5rem",
            }}>
              A chair built on<br />
              <em>trust and craft.</em>
            </h2>

            <div style={{ borderLeft: "2px solid var(--crimson)", paddingLeft: "1.25rem", marginBottom: "1.75rem" }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
              }}>
                "We know the difference between a good cut and one that changes how
                you carry yourself when you walk out the door."
              </p>
            </div>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--ink-soft)",
              lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}>
              Desir Barber Shop has been a part of the East Orange community at
              522 William Street. We take pride in clean work, consistent results,
              and treating every client like their time and appearance matter.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--ink-soft)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}>
              Whether you come in weekly or before a big moment, you leave looking
              sharp. That is the only standard we hold ourselves to.
            </p>

            {/* Info row */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { label: "Address", value: "522 William St" },
                { label: "City", value: "East Orange, NJ" },
                { label: "Phone", value: "(973) 640-2740" },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.2rem",
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
