"use client";

import { useInView } from "@/lib/use-in-view";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Which way the element travels in from. */
  from?: "up" | "left" | "right" | "scale";
  /**
   * Milliseconds to hold the element back once it has crossed the threshold.
   * This is where a row's stagger comes from: the grid hands each card
   * `index * 70` and the row deals itself out instead of snapping in at once.
   */
  delay?: number;
  className?: string;
};

/**
 * The scroll entrance every band on this page uses.
 *
 * The hidden state is a plain CSS rule in `globals.css` keyed off `data-reveal`
 * rather than a class this component toggles, because it has to exist in the
 * very first paint — before hydration. Toggle it from JavaScript and the whole
 * page arrives already assembled, then re-animates once React catches up.
 *
 * The transition delay is an inline style rather than a Tailwind class for the
 * same reason a class built as `delay-${n}` would never be generated: it is a
 * per-element number, not one of a fixed set.
 */
export const Reveal = ({
  children,
  from = "up",
  delay = 0,
  className,
}: Props) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={from}
      data-visible={inView}
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </div>
  );
};
