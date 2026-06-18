"use client";
import { motion } from "framer-motion";

export default function CallPill() {
  return (
    <motion.a
      href="tel:+19736402740"
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
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328z" fill="white"/>
      </svg>
      Call to Book
    </motion.a>
  );
}
