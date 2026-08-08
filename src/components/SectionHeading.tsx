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
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-heading leading-tight ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-charcoal-light/70"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-ocean to-coral ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
