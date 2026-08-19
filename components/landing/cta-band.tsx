import { Reveal } from "@/components/common/reveal";
import { Dictionary } from "@/lib/dictionary";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_UNIFIED,
  CONTACT_PHONE_UNIFIED_LABEL,
  CONTACT_WHATSAPP,
} from "@/lib/landing";
import { ArrowRight, Mail, Phone } from "lucide-react";

type Props = {
  dict: Dictionary;
};

/**
 * The six flat squares drifting behind the closing band. Whole class names and
 * fixed positions, so the decoration costs a Server Component render and no
 * JavaScript at all.
 */
const DRIFTERS = [
  { colour: "bg-dev-teal", position: "top-12 start-[8%]", size: "h-16 w-16" },
  { colour: "bg-sot-gold", position: "top-32 start-[22%]", size: "h-10 w-10" },
  {
    colour: "bg-dev-violet",
    position: "bottom-16 start-[14%]",
    size: "h-12 w-12",
  },
  { colour: "bg-dev-coral", position: "top-16 end-[10%]", size: "h-14 w-14" },
  { colour: "bg-dev-azure", position: "bottom-24 end-[22%]", size: "h-9 w-9" },
  { colour: "bg-dev-pine", position: "bottom-10 end-[6%]", size: "h-12 w-12" },
];

export const CtaBand = ({ dict }: Props) => (
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
        {dict.sections.cta.eyebrow}
      </p>

      <h2 className="font-sot-heading mt-5 text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {dict.sections.cta.title}
        <span className="text-sot-gold"> {dict.sections.cta.highlight}</span>
      </h2>

      <p className="font-sot mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
        {dict.sections.cta.description}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={CONTACT_WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="font-sot group inline-flex items-center gap-2 rounded-lg bg-sot-gold-deep px-7 py-3.5 text-base text-white transition-colors hover:bg-sot-gold-deep-hover"
        >
          {dict.actions.bookCall}
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </a>

        {/* The email and the phone stay what they are. Every BUTTON on this
            page opens WhatsApp; turning a printed address or a dialable number
            into a third WhatsApp link would be a lie about what it is, and
            takes away the two channels some people actually prefer. */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          dir="ltr"
          className="font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline-dark px-7 py-3.5 text-base text-white transition-colors hover:border-sot-gold hover:text-sot-gold"
        >
          <Mail size={17} />
          {CONTACT_EMAIL}
        </a>
        <a
          href={`tel:${CONTACT_PHONE_UNIFIED}`}
          dir="ltr"
          className="font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline-dark px-7 py-3.5 text-base text-white transition-colors hover:border-sot-gold hover:text-sot-gold"
        >
          <Phone size={17} />
          {CONTACT_PHONE_UNIFIED_LABEL}
        </a>
      </div>
    </Reveal>
  </section>
);
