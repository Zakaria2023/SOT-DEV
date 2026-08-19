import { Reveal } from "@/components/common/reveal";
import { CONTACT_EMAIL } from "@/lib/landing";
import { ArrowRight, Mail } from "lucide-react";

/**
 * The six flat squares drifting behind the closing band. Whole class names and
 * fixed positions, so the decoration costs a Server Component render and no
 * JavaScript at all.
 */
const DRIFTERS = [
  { colour: "bg-dev-teal", position: "top-12 left-[8%]", size: "h-16 w-16" },
  { colour: "bg-sot-gold", position: "top-32 left-[22%]", size: "h-10 w-10" },
  { colour: "bg-dev-violet", position: "bottom-16 left-[14%]", size: "h-12 w-12" },
  { colour: "bg-dev-coral", position: "top-16 right-[10%]", size: "h-14 w-14" },
  { colour: "bg-dev-azure", position: "bottom-24 right-[22%]", size: "h-9 w-9" },
  { colour: "bg-dev-pine", position: "bottom-10 right-[6%]", size: "h-12 w-12" },
];

export const CtaBand = () => (
  <section className="relative overflow-hidden bg-sot-ink py-24 lg:py-32">
    <div aria-hidden className="absolute inset-0 hidden lg:block">
      {DRIFTERS.map((drifter, index) => (
        // Each square is given a different phase of the same seven-second bob,
        // so the six of them never rise and fall together.
        <span
          key={drifter.position}
          className={`absolute animate-float rounded-lg opacity-20 ${drifter.colour} ${drifter.position} ${drifter.size}`}
          style={{ animationDelay: `${index * 900}ms` }}
        />
      ))}
    </div>

    <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
      <p className="font-sot flex items-center justify-center gap-3 text-xs tracking-widest text-sot-gold uppercase">
        <span className="h-px w-10 bg-sot-gold" />
        Next step
      </p>

      <h2 className="font-sot-heading mt-5 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
        Tell us what is not working,
        <span className="text-sot-gold"> and we will scope it.</span>
      </h2>

      <p className="font-sot mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
        A first call takes half an hour and costs nothing. Bring the process
        that is slowing you down, not a specification — working out what to
        build is the part we are good at.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-sot group inline-flex items-center gap-2 rounded-lg bg-sot-gold px-7 py-3.5 text-base text-white transition-colors hover:bg-sot-gold-dark"
        >
          Book a scoping call
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline-dark px-7 py-3.5 text-base text-white transition-colors hover:border-sot-gold hover:text-sot-gold"
        >
          <Mail size={17} />
          {CONTACT_EMAIL}
        </a>
      </div>
    </Reveal>
  </section>
);
