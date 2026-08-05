"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CallOrText from "./CallOrText";
import { site } from "@/lib/site";

export default function Visit() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="visit" ref={ref} className="section-pad" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
        }}
          className="visit-grid"
        >
          {/* Left: info */}
          <div>
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
                marginBottom: "0.85rem",
              }}
            >
              Find Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.12,
                marginBottom: "2rem",
              }}
            >
              Come see us on<br />
              <em>William Street.</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {/* Address */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "36px", height: "36px",
                  border: "1px solid var(--border-crisp)",
                  borderRadius: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: "var(--surface)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5C12.5 3.5 10.5 1.5 8 1.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="var(--ink)" opacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.2rem" }}>Address</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", fontWeight: 500, lineHeight: 1.4 }}>
                    522 William St<br />East Orange, NJ 07017
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "36px", height: "36px",
                  border: "1px solid var(--border-crisp)",
                  borderRadius: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: "var(--surface)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328z" fill="var(--ink)" opacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.2rem" }}>Phone</p>
                  <a
                    href={site.phoneHref}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--crimson)", fontWeight: 500, textDecoration: "none" }}
                  >
                    {site.phone}
                  </a>
                  <div style={{ marginTop: "0.7rem" }}>
                    <CallOrText phone={site.phone} variant="inline" />
                  </div>
                </div>
              </div>

              {/* Note on hours */}
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: "2px solid var(--crimson)",
                borderRadius: "2px",
                padding: "1rem 1.25rem",
              }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  Call ahead to confirm availability. Walk-ins are welcome based on chair openings.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: map embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid var(--border-crisp)",
              height: "clamp(280px, 40vw, 420px)",
            }}>
              <iframe
                title="Desir Barber Shop location"
                src="https://www.google.com/maps?q=522+William+St,+East+Orange,+NJ+07017&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .visit-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
