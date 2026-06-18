"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about"    },
  { label: "Visit",    href: "#visit"    },
];

export default function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          borderBottom: scrolled ? "1px solid var(--border-crisp)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          backgroundColor: scrolled ? "rgba(247,248,250,0.88)" : "transparent",
          transition: "background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            DÉSIR
          </Link>

          {/* Desktop links */}
          <div style={{ alignItems: "center", gap: "2.25rem" }} className="hidden md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+19736402740"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fff",
                background: "var(--crimson)",
                padding: "0.5rem 1.25rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--crimson-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
            >
              Book a Cut
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "none", padding: "8px" }}
            aria-label="Toggle menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{
                display: "block", width: "22px", height: "1.5px",
                background: "var(--ink)",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                transition: "transform 0.3s",
              }} />
              <span style={{
                display: "block", width: "22px", height: "1.5px",
                background: "var(--ink)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }} />
              <span style={{
                display: "block", width: "22px", height: "1.5px",
                background: "var(--ink)",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                transition: "transform 0.3s",
              }} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              background: "var(--bg)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 3rem)",
                  fontStyle: "italic",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:+19736402740"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "#fff",
                background: "var(--crimson)",
                padding: "0.75rem 2.5rem",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              (973) 640-2740
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
