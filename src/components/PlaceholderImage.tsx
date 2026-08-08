interface PlaceholderImageProps {
  gradient: string;
  alt: string;
  className?: string;
  icon?: React.ReactNode;
  overlay?: boolean;
}

export default function PlaceholderImage({
  gradient,
  alt,
  className = "",
  icon,
  overlay = false,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center text-white/30">
          {icon}
        </div>
      )}
      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,88.27,127.72,73.45,192,65.18,236.36,60,283.81,57.42,321.39,56.44Z" />
        </svg>
      </div>
    </div>
  );
}
