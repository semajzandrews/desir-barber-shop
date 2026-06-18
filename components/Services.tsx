"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "The Cut",
    tagline: "Your shape, refined.",
    body:
      "A full precision haircut tailored to your head shape, hair texture, and lifestyle. We consult before we cut.",
    details: ["All lengths", "Textured + natural hair", "Shape consultation"],
    accent: "var(--crimson)",
  },
  {
    num: "02",
    title: "Skin Fade",
    tagline: "Graduated to perfection.",
    body:
      "From high to low, every gradient handled with freehand technique. Clean, seamless, repeatable.",
    details: ["High, mid, and low fades", "Bald fade available", "Blended neckline"],
    accent: "var(--ink-soft)",
  },
  {
    num: "03",
    title: "Beard Work",
    tagline: "Structure. Edge. Definition.",
    body:
      "Shaping, trimming, and lining up your beard to complement your cut and face structure.",
    details: ["Shape design", "Hot lather edge", "Mustache trim"],
    accent: "var(--crimson)",
  },
  {
    num: "04",
    title: "Line Up",
    tagline: "Sharp lines, clean finish.",
    body:
      "A precise edge-up on the hairline, sideburns, and neckline. Quick, exact, impeccable.",
    details: ["Straight razor edge", "Temple detail", "Neckline carve"],
    accent: "var(--ink-soft)",
  },
];

function ServiceCard({ svc, i }: { svc: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const isLarge = i < 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        padding: isLarge ? "clamp(1.75rem, 3vw, 2.5rem)" : "clamp(1.5rem, 2.5vw, 2rem)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        minHeight: isLarge ? "340px" : "240px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Ghost number */}
      <span style={{
        position: "absolute",
        top: "1rem", right: "1.25rem",
        fontFamily: "var(--font-display)",
        fontSize: "5.5rem",
        fontWeight: 900,
        color: "var(--ink)",
        opacity: 0.035,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>
        {svc.num}
      </span>

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "2px",
        background: svc.accent,
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.45s var(--ease)",
      }}
        className="service-accent-bar"
      />

      <div>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: svc.accent === "var(--crimson)" ? "var(--crimson)" : "var(--muted)",
          marginBottom: "0.75rem",
        }}>
          {svc.tagline}
        </p>

        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: isLarge ? "clamp(1.6rem, 2.5vw, 2.25rem)" : "clamp(1.3rem, 2vw, 1.75rem)",
          fontStyle: "italic",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "0.85rem",
          lineHeight: 1.15,
        }}>
          {svc.title}
        </h3>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--ink-soft)",
          lineHeight: 1.65,
          maxWidth: "38ch",
        }}>
          {svc.body}
        </p>
      </div>

      <ul style={{ listStyle: "none", marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {svc.details.map((d) => (
          <li key={d} style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: svc.accent, flexShrink: 0 }} />
            {d}
          </li>
        ))}
      </ul>

      <style>{`
        .group:hover .service-accent-bar { transform: scaleX(1) !important; }
      `}</style>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="services" style={{ background: "var(--bg)", position: "relative" }} className="section-pad">
      <div className="wrap">
        {/* Section header */}
        <div ref={titleRef} style={{ marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
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
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.12,
            }}
          >
            The Full Menu
          </motion.h2>
        </div>

        {/* Top row: 2 large */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          marginBottom: "1px",
          background: "var(--border-crisp)",
        }}
          className="services-top"
        >
          {services.slice(0, 2).map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} i={i} />
          ))}
        </div>

        {/* Bottom row: 2 smaller */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "var(--border-crisp)",
        }}
          className="services-bottom"
        >
          {services.slice(2).map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} i={i + 2} />
          ))}
        </div>

        {/* Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: "2.5rem", textAlign: "center" }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1rem" }}>
            Walk-ins welcome. Call ahead to secure your spot.
          </p>
          <a
            href="tel:+19736402740"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              textDecoration: "none",
              borderBottom: "1px solid var(--crimson)",
              paddingBottom: "2px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            (973) 640-2740 &nbsp;&rarr;
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-top, .services-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
