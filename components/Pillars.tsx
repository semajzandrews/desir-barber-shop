"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    index: "I",
    title: "Precision",
    body:
      "A great barber does not just cut hair. They read the grain, map the growth patterns, and design around the person in the chair. Precision is not a speed -- it is a standard.",
  },
  {
    index: "II",
    title: "Consistency",
    body:
      "The best haircut you ever got should not be a one-time thing. We build a relationship with your hair so that the result is reliable whether it is your first visit or your fortieth.",
  },
  {
    index: "III",
    title: "Presence",
    body:
      "Desir is a shop inside a community. We are here when you need a fresh cut before an interview, a date, or just because you want to feel your best. That is what a neighborhood barbershop is for.",
  },
];

export default function Pillars() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
      {/* Faint orb */}
      <div
        className="orb-float"
        style={{
          position: "absolute",
          top: "0%", right: "0%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,18,48,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="wrap">
        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: "0.75rem",
            }}
          >
            The Principles
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              color: "#F7F8FA",
              lineHeight: 1.12,
            }}
          >
            What we stand by.
          </motion.h2>
        </div>

        {/* Pillar columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(247,248,250,0.1)",
        }}
          className="pillars-grid"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.13 }}
              style={{
                padding: "clamp(1.75rem, 3vw, 2.5rem)",
                background: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--crimson)",
                fontWeight: 400,
              }}>
                {p.index}
              </span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 600,
                color: "#F7F8FA",
                lineHeight: 1.15,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "rgba(247,248,250,0.58)",
                lineHeight: 1.75,
              }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
