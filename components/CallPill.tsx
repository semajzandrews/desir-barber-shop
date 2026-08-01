"use client";
import { motion } from "framer-motion";

export default function CallPill() {
  return (
    <motion.a
      href="#book"
      onClick={(e) => { e.preventDefault(); document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" }); }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        background: "var(--crimson)",
        color: "#fff",
        borderRadius: "100px",
        padding: "0.65rem 1.25rem",
        textDecoration: "none",
        fontFamily: "var(--font-body)",
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        boxShadow: "0 4px 24px rgba(196,18,48,0.3)",
        transition: "background 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--crimson-mid)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--crimson)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M1.5 4.25A.75.75 0 012.25 3.5h11.5a.75.75 0 01.75.75v1.75a1.75 1.75 0 000 3.5v1.75a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75V9.5a1.75 1.75 0 000-3.5V4.25z" stroke="white" strokeWidth="1.2"/>
        <path d="M6.75 5.25v5.5" stroke="white" strokeWidth="1.2" strokeDasharray="1.4 1.4"/>
      </svg>
      Write a Ticket
    </motion.a>
  );
}
