import { Reveal, SplitWords } from "./Motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  /** Small uppercase label above the title. */
  kicker?: string;
  /** Words of the title rendered as italic sunset accent. Defaults to the last word. */
  accent?: string[];
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  kicker,
  accent,
}: SectionHeadingProps) {
  const words = title.trim().split(" ");
  const accentWords = accent ?? [words[words.length - 1]];

  return (
    <div className={`mb-10 sm:mb-14 w-full ${centered ? "text-center flex flex-col items-center" : ""}`}>
      {kicker && (
        <Reveal>
          <p className={`kicker mb-4 ${light ? "!text-amber" : ""}`}>{kicker}</p>
        </Reveal>
      )}
      <h2
        className={`font-heading text-[clamp(1.85rem,4.2vw,3.2rem)] leading-[1.08] max-w-4xl ${
          light ? "text-white" : "text-ocean"
        }`}
      >
        <SplitWords text={title} accent={accentWords} light={light} />
      </h2>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-2xl text-[0.98rem] sm:text-[1.05rem] leading-relaxed ${centered ? "mx-auto" : ""} ${
              light ? "text-white/70" : "text-charcoal/65"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
