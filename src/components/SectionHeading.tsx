import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center flex flex-col items-center" : ""}`}>
      <ScrollReveal delay={0}>
        <h2
          className={`text-3xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight ${
            light ? "text-white" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p
            className={`mt-6 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""} ${
              light ? "text-white/70" : "text-charcoal/60"
            }`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.2}>
        <div
          className={`mt-8 h-1.5 w-20 rounded-full bg-coral ${
            centered ? "mx-auto" : ""
          }`}
        />
      </ScrollReveal>
    </div>
  );
}
