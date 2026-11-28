import { Info } from "lucide-react";

export const PRICE_NOTE =
  "The price shown is for two persons in one room. For more people or rooms the final price will differ. Our team will confirm it, with the best discount we can offer.";

/** Shown prices cover two persons in one room. */
export const needsPriceNote = (persons: number, rooms = 1) => persons > 2 || rooms > 1;

/** The live region stays mounted so screen readers announce the note when it appears. */
export default function PriceNote({ show }: { show: boolean }) {
  return (
    <div role="status">
      {show && (
        <p className="flex items-start gap-2.5 rounded-2xl border border-amber/50 bg-amber/15 px-4 py-3 text-sm leading-relaxed text-ocean">
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span className="text-pretty">{PRICE_NOTE}</span>
        </p>
      )}
    </div>
  );
}
