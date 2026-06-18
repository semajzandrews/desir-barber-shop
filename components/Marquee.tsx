"use client";

const items = [
  "Fresh Cuts",
  "Skin Fades",
  "Beard Trims",
  "Line Ups",
  "Hot Lather",
  "Clean Taper",
  "Desir Barber Shop",
  "East Orange",
];

export default function Marquee() {
  const all = [...items, ...items];

  return (
    <div
      style={{
        background: "var(--ink)",
        overflow: "hidden",
        padding: "0.9rem 0",
        borderTop: "1px solid var(--border-crisp)",
        borderBottom: "1px solid var(--border-crisp)",
      }}
    >
      <div className="marquee-track" aria-hidden>
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingRight: "3rem",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              color: i % (items.length) === (items.length - 1)
                ? "var(--crimson)"
                : "rgba(247,248,250,0.75)",
              letterSpacing: "0.03em",
            }}>
              {item}
            </span>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--crimson)", flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
