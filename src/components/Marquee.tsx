const places = [
  "Araku Valley", "Rushikonda Beach", "Lambasingi", "Kailasagiri", "Borra Caves", "Simhachalam", "Vanjangi", "Maredumilli",
  "Yarada Beach", "Katiki Falls", "Submarine Museum", "Tyda", "Ananthagiri",
];

/** Slow, endless place-name ribbon (pure CSS, pauses on hover). */
export default function Marquee() {
  const row = [...places, ...places];
  return (
    <div className="overflow-hidden border-y border-ocean/10 bg-sand py-3" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused]" style={{ animationDuration: "42s" }}>
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-8 font-heading text-[0.95rem] italic text-ocean/65 sm:text-[1.05rem]">
            {p}
            <svg width="10" height="10" viewBox="0 0 24 24" className="text-coral" fill="currentColor"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}
