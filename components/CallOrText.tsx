"use client";

/**
 * DÉSIR — Call or Text.
 *
 * Plenty of people will never dial a barbershop but will happily text a photo of
 * the cut they want, and for a barber that photo is most of the conversation. So
 * the number is a chooser, not a dial-only link.
 *
 * SKIN (unique to Désir): the popover is a torn PAPER TICKET, the same physical
 * object the booking flow is built around — white stock, hairline crimson rule,
 * a dashed perforation between the two halves, and a punched hole either side of
 * it. Square 2px corners, uppercase Satoshi labels, italic Playfair sub-line.
 *
 * tel: and sms: are both built from E.164 digits by lib/phone.
 */

import { useEffect, useRef, useState } from "react";
import { formatPhone, telHref, smsHref } from "@/lib/phone";
import { SMS_BODY } from "@/lib/site";

type Tone = "crimson" | "paper" | "quiet";

type Props = {
  phone: string;
  smsBody?: string;
  /** sub-label under "Text" */
  smsHint?: string;
  /** stub — trigger + ticket popover. inline — both actions side by side. */
  variant?: "stub" | "inline";
  tone?: Tone;
  /** popover alignment */
  align?: "left" | "right";
  className?: string;
};

function PhoneGlyph({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328z"
        fill={color}
      />
    </svg>
  );
}

function TextGlyph({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 2.75A.75.75 0 012.75 2h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H6.6L3.4 13.6A.5.5 0 012.6 13.2V11h-.35A.25.25 0 012 10.75v-8z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M5 5.75h6M5 8h3.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function CallOrText({
  phone,
  smsBody = SMS_BODY,
  smsHint = "Send a photo of the cut",
  variant = "stub",
  tone = "crimson",
  align = "right",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pretty = formatPhone(phone);
  const tel = telHref(phone);
  const sms = smsHref(phone, smsBody);

  if (variant === "inline") {
    return (
      <div className={`cot-pair cot-${tone} ${className ?? ""}`}>
        <a href={tel} className="cot-act cot-act-primary">
          <PhoneGlyph size={14} />
          <span>Call {pretty}</span>
        </a>
        <a href={sms} className="cot-act cot-act-second">
          <TextGlyph size={14} />
          <span>Text a photo instead</span>
        </a>

        <style jsx>{`
          .cot-pair {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
          }
          .cot-act {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            border-radius: 2px;
            padding: 0.7rem 1.15rem;
            font-family: var(--font-body);
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            text-decoration: none;
            cursor: none;
            transition: background 0.25s var(--ease), color 0.25s var(--ease),
              border-color 0.25s var(--ease);
          }
          .cot-act-primary {
            background: var(--crimson);
            color: #fff;
            border: 1px solid var(--crimson);
          }
          .cot-act-primary:hover {
            background: var(--crimson-mid);
            border-color: var(--crimson-mid);
          }
          .cot-act-second {
            background: transparent;
            color: var(--ink);
            border: 1px solid var(--border-crisp);
          }
          .cot-act-second:hover {
            border-color: var(--crimson);
            color: var(--crimson);
          }
          .cot-quiet .cot-act-primary {
            background: transparent;
            color: var(--crimson);
          }
          .cot-quiet .cot-act-second {
            border-color: rgba(247, 248, 250, 0.22);
            color: rgba(247, 248, 250, 0.75);
          }
          .cot-paper .cot-act-primary {
            background: #fff;
            color: var(--crimson);
            border-color: #fff;
          }
          .cot-paper .cot-act-primary:hover {
            background: rgba(255, 255, 255, 0.88);
          }
          .cot-paper .cot-act-second {
            border-color: rgba(255, 255, 255, 0.45);
            color: rgba(255, 255, 255, 0.9);
          }
          .cot-paper .cot-act-second:hover {
            border-color: #fff;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`cot cot-${tone} ${className ?? ""}`} ref={rootRef}>
      <button
        type="button"
        className="cot-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Call or text ${pretty}`}
        onClick={() => setOpen((v) => !v)}
      >
        <PhoneGlyph size={14} />
        <span className="cot-num">{pretty}</span>
      </button>

      {/* the torn ticket */}
      <div className={`cot-ticket cot-${align}`} data-open={open} role="menu">
        <span className="cot-stub">Désir · 522 William St</span>
        <a href={tel} role="menuitem" className="cot-row" onClick={() => setOpen(false)}>
          <PhoneGlyph size={15} />
          <span className="cot-copy">
            <strong>Call the shop</strong>
            <em>Straight to the chair</em>
          </span>
          <span className="cot-arrow">&rarr;</span>
        </a>
        <span className="cot-perf" aria-hidden="true" />
        <a href={sms} role="menuitem" className="cot-row" onClick={() => setOpen(false)}>
          <TextGlyph size={15} />
          <span className="cot-copy">
            <strong>Text the shop</strong>
            <em>{smsHint}</em>
          </span>
          <span className="cot-arrow">&rarr;</span>
        </a>
      </div>

      <style jsx>{`
        /* NOT .wrap — that is the global page container on most builds and the
           popover ends up off-screen. */
        .cot {
          position: relative;
          display: inline-block;
        }

        .cot-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--crimson);
          color: #fff;
          border: 1px solid var(--crimson);
          border-radius: 2px;
          padding: 0.72rem 1rem;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: none;
          transition: background 0.25s var(--ease), color 0.25s var(--ease),
            border-color 0.25s var(--ease);
        }
        .cot-trigger:hover {
          background: var(--crimson-mid);
          border-color: var(--crimson-mid);
        }
        .cot-paper .cot-trigger {
          background: #fff;
          color: var(--crimson);
          border-color: #fff;
        }
        .cot-paper .cot-trigger:hover {
          background: rgba(255, 255, 255, 0.88);
        }
        .cot-quiet .cot-trigger {
          background: transparent;
          color: var(--ink-soft);
          border-color: var(--border-crisp);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: none;
        }
        .cot-quiet .cot-trigger:hover {
          color: var(--crimson);
          border-color: var(--crimson);
        }

        /* ARSENAL mobile-first: collapse to a ~46px punch under 560px */
        .cot-num {
          display: none;
        }
        @media (min-width: 560px) {
          .cot-num {
            display: inline;
          }
          .cot-trigger {
            padding: 0.72rem 1.35rem;
          }
        }

        .cot-ticket {
          position: absolute;
          top: calc(100% + 0.6rem);
          z-index: 240;
          width: max-content;
          min-width: 252px;
          background: var(--surface);
          border: 1px solid var(--crimson);
          border-radius: 2px;
          box-shadow: 0 18px 44px rgba(12, 12, 16, 0.16);
          padding: 0.35rem;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: opacity 0.26s var(--ease), transform 0.26s var(--ease);
        }
        .cot-right {
          right: 0;
        }
        .cot-left {
          left: 0;
        }
        .cot-ticket[data-open="true"] {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        /* Under 560px the trigger is often centred in a narrow column, so a
           right- or left-anchored ticket hangs off the screen. Pin it to the
           viewport instead. */
        @media (max-width: 559px) {
          .cot-ticket,
          .cot-ticket.cot-left,
          .cot-ticket.cot-right {
            left: 50%;
            right: auto;
            min-width: 0;
            width: calc(100vw - 2.5rem);
            max-width: 300px;
            transform: translate(-50%, -6px);
          }
          .cot-ticket[data-open="true"] {
            transform: translate(-50%, 0);
          }
        }

        .cot-stub {
          display: block;
          padding: 0.5rem 0.7rem 0.35rem;
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .cot-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem;
          color: var(--ink);
          text-decoration: none;
          cursor: none;
          transition: background 0.25s var(--ease), color 0.25s var(--ease);
        }
        .cot-row:hover {
          background: var(--crimson-dim);
          color: var(--crimson);
        }
        .cot-copy strong {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .cot-copy em {
          display: block;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.8rem;
          color: var(--muted);
          margin-top: 0.1rem;
        }
        .cot-arrow {
          font-size: 0.85rem;
          color: var(--crimson);
        }

        /* the perforation: a dashed tear with a punched hole at each end */
        .cot-perf {
          position: relative;
          display: block;
          height: 1px;
          margin: 0 0.7rem;
          border-top: 1px dashed var(--border-crisp);
        }
        .cot-perf::before,
        .cot-perf::after {
          content: "";
          position: absolute;
          top: -5px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--border-crisp);
        }
        .cot-perf::before {
          left: -1.05rem;
        }
        .cot-perf::after {
          right: -1.05rem;
        }
      `}</style>
    </div>
  );
}
