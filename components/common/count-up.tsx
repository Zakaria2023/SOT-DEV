"use client";

import { decimalPlaces, formatCount } from "@/lib/format";
import { useInView } from "@/lib/use-in-view";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  suffix: string;
  /** How long the count takes once it starts, in milliseconds. */
  duration?: number;
};

/**
 * A statistic that counts up to its value the first time it is seen.
 *
 * Driven by `requestAnimationFrame` against a real clock rather than by a
 * `setInterval` adding a fixed step. An interval that misses frames — which it
 * will, on a page with four marquees running — arrives late and at the wrong
 * speed, whereas reading the elapsed time each frame means a dropped frame
 * costs a little smoothness and nothing else.
 */
export const CountUp = ({ value, suffix, duration = 1700 }: Props) => {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      // Ease-out cubic: the number covers most of its distance immediately and
      // then settles, instead of running at a constant speed and stopping dead
      // on the target.
      const eased = 1 - Math.pow(1 - progress, 3);

      // Snapped to the exact target on the last frame. Easing leaves a
      // fractional remainder, and a figure that finishes on 41.9 of 42 is a
      // wrong number on the page for the sake of an animation.
      setShown(progress < 1 ? value * eased : value);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {formatCount(shown, decimalPlaces(value))}
      {suffix}
    </span>
  );
};
