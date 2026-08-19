import { CodeLine } from "@/lib/landing";

/**
 * The character index, within the whole script, at which each line begins.
 *
 * The terminal types one continuous stream and then works out how much of each
 * line that stream has reached, so it needs the running total in front of every
 * line. Computed once at module scope rather than recounted on each of the two
 * hundred-odd renders the animation produces.
 */
export const lineOffsets = (lines: CodeLine[]): number[] => {
  const offsets: number[] = [];
  let consumed = 0;

  for (const line of lines) {
    offsets.push(consumed);
    consumed += line.text.length;
  }

  return offsets;
};

/** Total characters in the script, which is where the animation finishes. */
export const scriptLength = (lines: CodeLine[]): number =>
  lines.reduce((total, line) => total + line.text.length, 0);
