import { CONTACT_WHATSAPP } from "@/lib/landing";
import { SiWhatsapp } from "react-icons/si";

type Props = {
  /** Announced to screen readers, so it is translated like everything else. */
  label: string;
};

/**
 * The standing WhatsApp button, bottom of every page.
 *
 * The same device the parent site carries, pointing at the same number through
 * the same `CONTACT_WHATSAPP` constant — one definition of where "talk to us"
 * goes across both properties, rather than two that drift the first time the
 * number changes.
 *
 * AN ANCHOR, NOT A LINK. `next/link` is for navigation inside the app and this
 * leaves the site entirely.
 *
 * `start-6` rather than `left-6`, so on the Arabic page it sits in the mirrored
 * corner along with everything else.
 *
 * A SHADOW IS ALLOWED HERE and is not a slip against the house rule. That rule
 * reserves `shadow-*` for something which genuinely floats above the page
 * rather than using it to separate two flat surfaces, and this floats over
 * whatever happens to be scrolling underneath it. A hairline cannot separate a
 * circle from the page it is passing over.
 */
export const WhatsAppFloat = ({ label }: Props) => (
  <a
    href={CONTACT_WHATSAPP}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    // The colour is WhatsApp's own, so it is a hex rather than one of our
    // tokens — it is not ours to restyle, and a green picked off our palette
    // would read as "a green button" instead of as WhatsApp.
    className="fixed bottom-6 start-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 focus-visible:outline-none print:hidden"
  >
    {/* From react-icons because lucide dropped its brand marks and has no
        WhatsApp glyph. The house rule bans a hand-written <svg>, and drawing
        this one inline is exactly what it bans. */}
    <SiWhatsapp size={26} />
  </a>
);
