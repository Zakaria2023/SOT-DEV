"use client";

import { FAQ } from "@/lib/landing";
import { Plus } from "lucide-react";
import { useState } from "react";

/**
 * The five questions, one open at a time.
 *
 * The answers stay mounted and are collapsed with a grid row going from `0fr`
 * to `1fr` rather than being unmounted or given a fixed `max-height`. That is
 * the one way to animate to a height nobody has measured: unmounting cannot
 * transition at all, and a guessed `max-height` either clips the long answers
 * or leaves the short ones easing through empty space.
 *
 * `aria-expanded` and `aria-controls` are what make it an accordion rather than
 * a heading that happens to move — a screen reader announces the state and can
 * jump straight to the answer it opened.
 */
export const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      {FAQ.map((item, index) => {
        const expanded = openIndex === index;

        return (
          <div key={item.question} className="border-b border-sot-hairline">
            <button
              type="button"
              id={`faq-question-${index}`}
              aria-expanded={expanded}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(expanded ? null : index)}
              className="font-sot-heading flex w-full items-center justify-between gap-6 py-6 text-left text-lg text-sot-ink transition-colors hover:text-sot-gold"
            >
              {item.question}
              {/* One icon doing both jobs: a plus that turns forty-five degrees
                  into a close. */}
              <Plus
                size={20}
                className={`shrink-0 text-sot-gold transition-transform duration-300 ${
                  expanded ? "rotate-45" : ""
                }`}
              />
            </button>

            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`grid overflow-hidden transition-all duration-300 ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="font-sot pb-6 text-base leading-relaxed text-sot-body">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
