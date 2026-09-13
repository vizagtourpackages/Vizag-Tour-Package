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
    <div className={`mb-8 sm:mb-12 w-full ${centered ? "text-center flex flex-col items-center" : "overflow-hidden"}`}>
      <ScrollReveal delay={0} className="w-full min-w-0 max-w-full px-2">
        <h2
          className={`text-2xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.2] tracking-tight ${
            light ? "text-white" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.1} className="w-full min-w-0 max-w-full px-4">
          <p
            className={`mt-3 sm:mt-6 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""} ${
              light ? "text-white/70" : "text-charcoal/60"
            }`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.2} className="w-full flex justify-center">
        <div
          className={`mt-4 sm:mt-8 h-1 sm:h-1.5 w-16 sm:w-20 rounded-full bg-coral ${
            centered ? "mx-auto" : ""
          }`}
        />
      </ScrollReveal>
    </div>
  );
}
