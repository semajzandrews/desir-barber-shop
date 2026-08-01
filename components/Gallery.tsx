"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
      {/* Full-width image */}
      <div style={{ position: "relative", height: "clamp(300px, 55vw, 580px)", overflow: "hidden" }}>
        {/* Community-accurate stock (young client clipper cut), flagged for swap with owner photo */}
        <img
          src="/images/gallery.jpg"
          alt="A clean clipper cut in progress at Desir Barber Shop"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(12,12,16,0.7) 0%, rgba(12,12,16,0.15) 60%, transparent 100%)",
        }} />

        {/* Overlay content */}
        <div className="wrap" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", paddingBottom: "clamp(1.5rem, 4vw, 3rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              width: "100%",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "0.4rem",
              }}>
                The Shop
              </p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.15,
              }}>
                Where craft<br />meets community.
              </h2>
            </div>
            <a
              href="#book"
              onClick={(e) => { e.preventDefault(); document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "0.7rem 1.5rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Book Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3-column attributes */}
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--border-crisp)",
            marginTop: "0",
          }}
          className="attr-grid"
        >
          {[
            { label: "Neighborhood Anchor", value: "East Orange, NJ" },
            { label: "Standard", value: "Precision Every Time" },
            { label: "Walk-ins", value: "Welcome" },
          ].map((attr) => (
            <div
              key={attr.label}
              style={{
                background: "var(--surface)",
                padding: "clamp(1.25rem, 2.5vw, 2rem)",
                textAlign: "center",
              }}
            >
              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "var(--ink)",
                fontWeight: 500,
                marginBottom: "0.35rem",
              }}>
                {attr.value}
              </p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}>
                {attr.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .attr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
