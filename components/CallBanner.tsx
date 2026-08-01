"use client";
import { motion } from "framer-motion";

export default function CallBanner() {
  return (
    <section
      style={{
        background: "var(--crimson)",
        padding: "clamp(2.5rem, 5vw, 4rem) 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint diagonal */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
        pointerEvents: "none",
      }} />

      <div className="wrap" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "0.85rem",
          }}>
            Ready for a fresh cut?
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3.25rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.12,
            marginBottom: "1.75rem",
          }}>
            Write your ticket. We are ready<br />
            <em>when you are.</em>
          </h2>
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--crimson)",
              background: "#fff",
              padding: "0.9rem 2.5rem",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a Cut
          </a>
          <p style={{ marginTop: "1.1rem" }}>
            <a
              href="tel:+19736402740"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: "2px",
              }}
            >
              or call (973) 640-2740
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
