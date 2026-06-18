"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HEADLINE_WORDS = ["Precision", "Is", "the", "Art."];

function TypesetWord({ word, delay }: { word: string; delay: number }) {
  const [settled, setSettled] = useState(false);
  const [rot] = useState(() => (Math.random() - 0.5) * 7);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), delay * 1000 + 60);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.span
      initial={{ opacity: 0, rotate: rot, y: 10 }}
      animate={settled
        ? { opacity: 1, rotate: 0, y: 0 }
        : { opacity: 0, rotate: rot, y: 10 }
      }
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "inline-block", marginRight: "0.22em" }}
    >
      {word}
    </motion.span>
  );
}

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!photoRef.current) return;
      const y = window.scrollY * 0.25;
      photoRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Ambient orb */}
      <div
        className="orb-float"
        style={{
          position: "absolute",
          top: "20%", right: "-6%",
          width: "480px", height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,18,48,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="orb-float-alt"
        style={{
          position: "absolute",
          bottom: "10%", left: "-4%",
          width: "340px", height: "340px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,18,48,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="wrap" style={{ width: "100%", paddingTop: "7rem", paddingBottom: "4rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
          className="hero-grid"
        >
          {/* Left: copy */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                marginBottom: "1.25rem",
              }}
            >
              East Orange, NJ &nbsp;&bull;&nbsp; 522 William St
            </motion.p>

            {/* Signature headline: typeset snap */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                lineHeight: 1.08,
                color: "var(--ink)",
                marginBottom: "1.75rem",
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <TypesetWord key={word + i} word={word} delay={0.35 + i * 0.11} />
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                color: "var(--ink-soft)",
                maxWidth: "38ch",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Every cut is an intention. Desir Barber Shop brings the same exacting
              standard to every chair, every client, every time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
            >
              <a
                href="tel:+19736402740"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "var(--crimson)",
                  padding: "0.85rem 2rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--crimson-mid)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
              >
                Call to Book
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
              >
                See Services
                <span style={{ fontSize: "1rem" }}>&#8594;</span>
              </a>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              style={{
                marginTop: "3.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "var(--muted)",
              }}
            >
              <div style={{
                width: "1px",
                height: "42px",
                background: "linear-gradient(to bottom, transparent, var(--border-crisp))",
              }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Scroll
              </span>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
            className="hero-photo-wrap"
          >
            {/* Decorative frame offset */}
            <div style={{
              position: "absolute",
              top: "16px", left: "-16px", right: "16px", bottom: "-16px",
              border: "1px solid var(--border-crisp)",
              borderRadius: "2px",
              pointerEvents: "none",
              zIndex: 0,
            }} />
            {/* Photo */}
            <div
              ref={photoRef}
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "2px",
                overflow: "hidden",
                aspectRatio: "4 / 5",
                background: "var(--bg-2)",
              }}
            >
              {/* Community-accurate stock (Black barber + client), flagged for swap with owner photo */}
              <img
                src="/images/hero.jpg"
                alt="A barber lining up a cut at Desir Barber Shop"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="eager"
              />
              {/* Subtle crimson gradient at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "30%",
                background: "linear-gradient(to top, rgba(12,12,16,0.25), transparent)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              style={{
                position: "absolute",
                bottom: "24px",
                right: "-16px",
                background: "var(--crimson)",
                color: "#fff",
                borderRadius: "2px",
                padding: "0.85rem 1.25rem",
                zIndex: 2,
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>
                4.8
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px", opacity: 0.85 }}>
                Google Stars
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo-wrap { margin-top: 2rem; }
        }
      `}</style>
    </section>
  );
}
