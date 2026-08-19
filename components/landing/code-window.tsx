"use client";

import { CODE_SCRIPT } from "@/lib/landing";
import { lineOffsets, scriptLength } from "@/lib/terminal";
import { useEffect, useState } from "react";

/** Milliseconds per character. Fast enough to read along with, not to wait on. */
const CHAR_MS = 24;

/** How long the finished log stays up before the session runs again. */
const HOLD_MS = 3400;

/** A beat before the first character, so the window has arrived before it types. */
const OPENING_MS = 700;

const OFFSETS = lineOffsets(CODE_SCRIPT);

const TOTAL = scriptLength(CODE_SCRIPT);

/**
 * The deploy log beside the headline, typing itself out and starting over.
 *
 * The whole script is one character stream and each line works out how much of
 * it has reached them, rather than every line owning a timer of its own. One
 * timer means the lines can never drift apart, and the restart is a single
 * assignment back to zero.
 *
 * Every line is rendered from the first frame at its full height with its text
 * clipped to nothing. Mounting them as they arrive would grow the window seven
 * times while the visitor reads it, and shift the whole hero each time.
 */
export const CodeWindow = () => {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    // A CSS media query cannot reach a JavaScript timer, so the reduced-motion
    // preference is honoured here by hand: the log appears complete, which is
    // the state it spends most of its time in anyway.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Counted in a local rather than read back out of state, so the timer never
    // depends on a render having happened first.
    let count = 0;
    let timer = 0;

    const advance = () => {
      if (reduced) {
        setTyped(TOTAL);

        return;
      }

      count = count >= TOTAL ? 0 : count + 1;
      setTyped(count);
      timer = window.setTimeout(advance, count >= TOTAL ? HOLD_MS : CHAR_MS);
    };

    // Both paths go through the timer. Writing the finished log straight into
    // state from the effect body would be a synchronous setState in an effect —
    // a cascading render, and the one thing this hook is not allowed to do.
    timer = window.setTimeout(advance, OPENING_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sot-hairline-dark bg-sot-night">
      <div className="flex items-center gap-3 border-b border-sot-hairline-dark px-5 py-4">
        {/* Window furniture. Flat discs, not icons — there is nothing here for
            a screen reader to announce, which is why the row is hidden. */}
        <span aria-hidden className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-dev-coral" />
          <span className="h-3 w-3 rounded-full bg-sot-gold" />
          <span className="h-3 w-3 rounded-full bg-dev-pine" />
        </span>
        <p className="font-sot-mono text-xs text-white/40">sot-dev — deploy</p>
      </div>

      <div className="px-5 py-6 sm:px-7">
        {CODE_SCRIPT.map((line, index) => {
          const start = OFFSETS[index] ?? 0;
          const shown = Math.min(
            line.text.length,
            Math.max(0, typed - start),
          );
          const typing = typed > start && typed < start + line.text.length;

          return (
            <p
              key={line.text}
              className={`font-sot-mono flex h-7 items-center text-xs whitespace-pre sm:text-sm ${line.tone}`}
            >
              {line.text.slice(0, shown)}
              {typing && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-caret bg-sot-gold" />
              )}
            </p>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 border-t border-sot-hairline-dark px-5 py-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ring rounded-full bg-dev-pine" />
          <span className="relative h-2 w-2 rounded-full bg-dev-pine" />
        </span>
        <p className="font-sot-mono text-xs text-white/40">
          riyadh-1 · all systems healthy
        </p>
      </div>
    </div>
  );
};
