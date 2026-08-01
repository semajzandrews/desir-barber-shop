"use client";

/**
 * DESIR BARBER SHOP - write your ticket.
 *
 * SPINE (shared across every build): service -> when -> who -> confirm.
 *
 * SKIN (unique to Desir; deliberately not the card stack, the accordion or the
 * editorial takeover used by the other Orange barbershops):
 *   an inline PAPER TICKET that writes itself. The left column is the shop's
 *   numbered menu, 01 through 04, and the right column is a torn service ticket
 *   that fills in line by line as the customer stacks items on it. Nothing pops
 *   over the page, because the ticket is a physical object in the shop.
 *
 * Two things this shop does differently:
 *   - The menu is MULTI-SELECT. A cut plus a beard plus a line up is one visit
 *     and one ticket, not three separate bookings.
 *   - Desir publishes no hours and no prices anywhere on this site, so this flow
 *     invents neither. No clock slots are offered, because offering a time the
 *     shop may be closed for is worse than asking. The customer picks a day and
 *     the part of day that works, the shop confirms the exact time back. Money
 *     is settled in the chair, and the ticket says so.
 *
 * Static export: nothing is charged and nothing is sent to a third party.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * US phone formatting + validation, shared behaviour across every build.
 * Formats to (xxx) xxx-xxxx while typing, hard-caps at 10 digits, and exposes
 * the completeness check the submit gate uses. Non-digits are dropped rather
 * than rejected, so a pasted "973-555-0123" or "+1 973 555 0123" still lands.
 */
export function formatPhone(input: string): string {
  const d = input.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
export const isPhoneComplete = (v: string) => v.replace(/\D/g, "").length === 10;

/* The shop's own menu, verbatim from the Services section. Nothing added. */
const MENU: { num: string; title: string; tagline: string }[] = [
  { num: "01", title: "The Cut",     tagline: "Your shape, refined." },
  { num: "02", title: "Skin Fade",   tagline: "Graduated to perfection." },
  { num: "03", title: "Beard Work",  tagline: "Structure. Edge. Definition." },
  { num: "04", title: "Line Up",     tagline: "Sharp lines, clean finish." },
];

/**
 * No hours are published for Desir, so no clock times are generated. The
 * customer states the part of day that works and the shop replies with the
 * exact time it can hold.
 */
const WINDOWS: { key: string; label: string; note: string }[] = [
  { key: "first",     label: "First opening", note: "Whenever the chair frees up." },
  { key: "morning",   label: "Morning",       note: "Early in the day." },
  { key: "afternoon", label: "Afternoon",     note: "Middle of the day." },
  { key: "evening",   label: "Evening",       note: "After work." },
];

function nextDays(n: number) {
  const out: { key: string; dow: string; day: string; month: string }[] = [];
  const today = new Date();
  for (let i = 0; i <= n; i++) {
    const x = new Date(today);
    x.setDate(today.getDate() + i);
    out.push({
      key: `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`,
      dow: x.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(x.getDate()),
      month: x.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

const prettyDay = (k: string) =>
  new Date(k + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const label = {
  fontFamily: "var(--font-body)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border-crisp)",
  borderRadius: "2px",
  padding: "0.7rem 0.85rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  color: "var(--ink)",
  outline: "none",
};

function Chip({
  on,
  onClick,
  children,
  align = "left",
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        textAlign: align,
        background: on ? "var(--crimson)" : "var(--surface)",
        color: on ? "#fff" : "var(--ink)",
        border: `1px solid ${on ? "var(--crimson)" : "var(--border-crisp)"}`,
        borderRadius: "2px",
        padding: "0.7rem 0.9rem",
        cursor: "none",
        fontFamily: "var(--font-body)",
        transition: "background 0.25s var(--ease), border-color 0.25s var(--ease), color 0.25s var(--ease)",
      }}
    >
      {children}
    </button>
  );
}

export default function Ticket() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [picked, setPicked] = useState<string[]>([]);
  const [dayKey, setDayKey] = useState("");
  const [win, setWin] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [stub, setStub] = useState("");

  const days = useMemo(() => nextDays(13), []);

  /* Every "book" control on the page fires this, so nothing dials by surprise. */
  useEffect(() => {
    const onBook = () => {
      const el = document.getElementById("book");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("desir:book", onBook as EventListener);
    return () => window.removeEventListener("desir:book", onBook as EventListener);
  }, []);

  const toggle = (t: string) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const ready =
    picked.length > 0 && !!dayKey && !!win && name.trim().length > 1 && isPhoneComplete(phone);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setStub(String(Math.floor(1000 + Math.random() * 9000)));
    setSent(true);
  }

  function reset() {
    setPicked([]);
    setDayKey("");
    setWin("");
    setName("");
    setPhone("");
    setNotes("");
    setSent(false);
  }

  const winLabel = WINDOWS.find((w) => w.key === win)?.label ?? "";

  return (
    <section
      id="book"
      ref={ref}
      className="section-pad"
      style={{ background: "var(--bg-2)", position: "relative", scrollMarginTop: "64px" }}
    >
      <div className="wrap">
        {/* Section header, same idiom as Services and Visit */}
        <div style={{ marginBottom: "3rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ ...label, color: "var(--crimson)", letterSpacing: "0.18em", marginBottom: "0.75rem" }}
          >
            Book a Cut
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.12,
            }}
          >
            Write your <em>ticket.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--ink-soft)",
              maxWidth: "52ch",
              marginTop: "1rem",
            }}
          >
            Stack everything you want in one visit, tell us the day and the stretch of it that
            works, and we text you back the exact time we are holding.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="ticket-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
            gap: "clamp(1.5rem, 3vw, 3rem)",
            alignItems: "start",
          }}
        >
          {/* LEFT: the menu and the details */}
          <form
            onSubmit={submit}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-crisp)",
              borderRadius: "2px",
              padding: "clamp(1.25rem, 3vw, 2.25rem)",
              minWidth: 0,
            }}
          >
            {/* 01 - what goes on the ticket */}
            <p style={{ ...label, marginBottom: "0.9rem" }}>
              <span style={{ color: "var(--crimson)" }}>01</span> &nbsp;What are we doing
            </p>
            <div
              className="ticket-menu"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}
            >
              {MENU.map((m) => {
                const on = picked.includes(m.title);
                return (
                  <Chip key={m.num} on={on} onClick={() => toggle(m.title)}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontStyle: "italic",
                          fontSize: "1.05rem",
                          fontWeight: 500,
                        }}
                      >
                        {m.title}
                      </span>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "0.12em", opacity: 0.6 }}>
                        {m.num}
                      </span>
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        marginTop: "0.3rem",
                        opacity: on ? 0.85 : 0.65,
                      }}
                    >
                      {m.tagline}
                    </span>
                  </Chip>
                );
              })}
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginTop: "0.7rem",
              }}
            >
              Pick as many as you want. It all rides on one ticket.
            </p>

            {/* 02 - the day */}
            <p style={{ ...label, margin: "2rem 0 0.9rem" }}>
              <span style={{ color: "var(--crimson)" }}>02</span> &nbsp;What day
            </p>
            <div
              data-lenis-prevent
              style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", minWidth: 0 }}
            >
              {days.map((d) => (
                <Chip key={d.key} on={dayKey === d.key} onClick={() => setDayKey(d.key)} align="center">
                  <span
                    style={{
                      display: "block",
                      minWidth: "44px",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {d.dow}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {d.day}
                  </span>
                  <span style={{ display: "block", fontSize: "0.62rem", opacity: 0.65 }}>{d.month}</span>
                </Chip>
              ))}
            </div>

            {/* 03 - the stretch of day */}
            <p style={{ ...label, margin: "2rem 0 0.9rem" }}>
              <span style={{ color: "var(--crimson)" }}>03</span> &nbsp;What stretch of it
            </p>
            <div
              className="ticket-windows"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}
            >
              {WINDOWS.map((w) => (
                <Chip key={w.key} on={win === w.key} onClick={() => setWin(w.key)}>
                  <span style={{ display: "block", fontSize: "0.9rem", fontWeight: 500 }}>{w.label}</span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      marginTop: "0.2rem",
                      opacity: win === w.key ? 0.85 : 0.6,
                    }}
                  >
                    {w.note}
                  </span>
                </Chip>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginTop: "0.7rem",
              }}
            >
              We do not post fixed slots online, so the shop texts back the exact time it can hold
              for you.
            </p>

            {/* 04 - who */}
            <p style={{ ...label, margin: "2rem 0 0.9rem" }}>
              <span style={{ color: "var(--crimson)" }}>04</span> &nbsp;Who is in the chair
            </p>
            <div
              className="ticket-fields"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}
            >
              <input
                aria-label="Your name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={fieldStyle}
              />
              <input
                aria-label="Mobile number"
                inputMode="tel"
                placeholder="(973) 000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                style={fieldStyle}
              />
            </div>
            <textarea
              aria-label="Anything we should know"
              placeholder="Anything we should know. Length, part, who you usually sit with."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              style={{ ...fieldStyle, marginTop: "0.6rem", resize: "vertical" }}
            />

            <button
              type="submit"
              disabled={!ready}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                background: ready ? "var(--crimson)" : "var(--bg-2)",
                color: ready ? "#fff" : "var(--muted)",
                border: `1px solid ${ready ? "var(--crimson)" : "var(--border-crisp)"}`,
                borderRadius: "2px",
                padding: "0.95rem 1.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                cursor: "none",
                transition: "background 0.25s var(--ease), color 0.25s var(--ease)",
              }}
            >
              {sent ? "Ticket is in" : "Send the ticket"}
            </button>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.7rem",
                textAlign: "center",
              }}
            >
              No deposit. Nothing is charged here. Priced in the shop.
            </p>
          </form>

          {/* RIGHT: the ticket stub, writing itself */}
          <div
            className="ticket-stub"
            style={{
              position: "sticky",
              top: "88px",
              background: "var(--surface)",
              border: "1px solid var(--border-crisp)",
              borderTop: "3px solid var(--crimson)",
              borderRadius: "2px",
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                }}
              >
                DÉSIR
              </p>
              <p style={{ ...label, fontSize: "0.62rem" }}>
                {sent ? `No. ${stub}` : "Service ticket"}
              </p>
            </div>
            <div className="ruled" style={{ margin: "0.9rem 0 1.1rem" }} />

            {!sent ? (
              <>
                <TicketLine title="Services">
                  {picked.length === 0 ? (
                    <Blank>Nothing on the ticket yet</Blank>
                  ) : (
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {MENU.filter((m) => picked.includes(m.title)).map((m) => (
                        <li
                          key={m.num}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "0.75rem",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.88rem",
                            color: "var(--ink)",
                          }}
                        >
                          <span>{m.title}</span>
                          <span style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                            {m.num}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </TicketLine>

                <TicketLine title="When">
                  {dayKey || win ? (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink)" }}>
                      {dayKey ? prettyDay(dayKey) : "Day not set"}
                      {winLabel ? ` · ${winLabel}` : ""}
                    </p>
                  ) : (
                    <Blank>Day and stretch not set</Blank>
                  )}
                </TicketLine>

                <TicketLine title="Name">
                  {name.trim() ? (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink)" }}>
                      {name}
                    </p>
                  ) : (
                    <Blank>Not signed</Blank>
                  )}
                </TicketLine>

                <TicketLine title="Text back to">
                  {isPhoneComplete(phone) ? (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink)" }}>
                      {phone}
                    </p>
                  ) : (
                    <Blank>Ten digits, please</Blank>
                  )}
                </TicketLine>

                <div className="ruled" style={{ margin: "1.1rem 0 0.9rem" }} />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  Walk-ins are still welcome. A ticket just means you are not standing around
                  waiting on a chair.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                aria-live="polite"
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                    marginBottom: "0.85rem",
                  }}
                >
                  Ticket is in, {name.split(" ")[0]}.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--ink-soft)",
                    lineHeight: 1.65,
                  }}
                >
                  {picked.join(", ")} for {prettyDay(dayKey)}, {winLabel.toLowerCase()}. We text{" "}
                  {phone} with the exact time we are holding. If you need it sooner, call the shop
                  and ask for ticket {stub}.
                </p>

                <div className="ruled" style={{ margin: "1.2rem 0 1rem" }} />
                <a
                  href="tel:+19736402740"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--crimson)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--crimson)",
                    paddingBottom: "2px",
                  }}
                >
                  (973) 640-2740 &nbsp;&rarr;
                </a>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    display: "block",
                    marginTop: "1.4rem",
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    textDecoration: "underline",
                    cursor: "none",
                  }}
                >
                  Write another ticket
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        #book input::placeholder, #book textarea::placeholder { color: var(--muted); }
        #book input:focus, #book textarea:focus { border-color: var(--crimson); }
        #book button:disabled { cursor: none; }
        @media (max-width: 900px) {
          .ticket-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .ticket-stub { position: static !important; }
        }
        @media (max-width: 520px) {
          .ticket-menu, .ticket-windows, .ticket-fields { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function TicketLine({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <p style={{ ...label, fontSize: "0.62rem", marginBottom: "0.35rem" }}>{title}</p>
      {children}
    </div>
  );
}

function Blank({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.85rem",
        color: "var(--muted)",
        fontStyle: "italic",
        opacity: 0.8,
      }}
    >
      {children}
    </p>
  );
}
