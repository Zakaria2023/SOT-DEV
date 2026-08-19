"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True from the moment the returned ref's element first crosses into the
 * viewport, and true for good after that.
 *
 * The observer disconnects on the first intersection deliberately. A reveal
 * that also plays in reverse means a visitor scrolling back up watches the page
 * dismantle itself, and a counter that re-runs turns a fact into a fairground
 * attraction. Each of these animations is an entrance, and an entrance happens
 * once.
 */
export const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry && entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Pulled up off the bottom edge so an element has to be properly on
      // screen before it plays, rather than animating in the sliver of itself
      // that appears while the visitor is still reading the band above.
      { threshold: 0.15, rootMargin: "0px 0px -64px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};
