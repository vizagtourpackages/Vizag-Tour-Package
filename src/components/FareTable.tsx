"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import { useSite } from "@/components/SiteProvider";
import { journeyLabel, rupees, type FareRow } from "@/lib/fares";
import type { Vehicle } from "@/data/vehicles";

const chip = (on: boolean) =>
  `shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ${
    on ? "border-ocean bg-ocean text-white" : "border-ocean/20 bg-white text-ocean hover:border-ocean/50"
  }`;

/** Journey fares for the chosen vehicle. Switching vehicle updates the prices instantly. */
export default function FareTable({ rows, vehicles }: { rows: FareRow[]; vehicles: Vehicle[] }) {
  const { openBooking } = useBooking();
  const { wa } = useSite();

  // only vehicles that have at least one price are worth choosing
  const priced = vehicles.filter((v) => rows.some((r) => r.prices[String(v.id)]));

  const [vehicleId, setVehicleId] = useState(() => String(priced[0]?.id ?? ""));
  if (!rows.length || !priced.length) return null;

  const vehicle = priced.find((v) => String(v.id) === vehicleId) || priced[0];

  return (
    <section aria-labelledby="fares-heading" className="mx-auto max-w-[960px] px-4 pt-6 pb-16 sm:px-6">
      <h2 id="fares-heading" className="text-balance text-center font-heading text-[clamp(1.6rem,4.6vw,2.6rem)] leading-[1.12] text-ocean">
        Fares by journey
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-pretty text-center text-[0.98rem] leading-relaxed text-charcoal/70">
        Choose your vehicle to see its fare for each journey.
      </p>

      <fieldset className="mt-8">
        <legend className="mb-2.5 text-sm font-bold text-ocean">Vehicle</legend>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {priced.map((v) => {
            const on = String(v.id) === String(vehicle.id);
            return (
              <button key={v.id} type="button" aria-pressed={on} onClick={() => setVehicleId(String(v.id))} className={chip(on)}>
                {v.model} <span className={on ? "text-white/80" : "text-ocean/75"}>({v.pax})</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ocean/12 bg-white">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Fares for {vehicle.model}</caption>
          <thead>
            <tr className="border-b border-ocean/12 bg-sand/60 text-sm text-ocean">
              <th scope="col" className="px-4 py-3 font-bold sm:px-6">Journey</th>
              <th scope="col" className="px-2 py-3 text-right font-bold sm:px-4">Fare</th>
              <th scope="col" className="px-4 py-3 sm:px-6"><span className="sr-only">Book</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ocean/10">
            {rows.map((r) => {
              const price = r.prices[String(vehicle.id)];
              const name = journeyLabel(r);
              return (
                <tr key={r.id}>
                  <th scope="row" className="px-4 py-4 align-middle font-semibold text-ocean sm:px-6">
                    <span className="block text-pretty leading-snug">{name}</span>
                  </th>
                  <td className="whitespace-nowrap px-2 py-4 text-right tabular-nums sm:px-4">
                    {price ? <span className="font-heading text-[1.25rem] text-ocean">{rupees(price)}</span> : <span className="text-sm text-charcoal/65">On request</span>}
                  </td>
                  <td className="w-px px-3 py-3 text-right sm:px-6">
                    {price ? (
                      <button
                        type="button"
                        onClick={() => openBooking("cab", { preset: { vehicle, from: r.from, to: r.to, tripType: r.tripType, prices: r.prices } })}
                        aria-label={`Book ${vehicle.model}: ${name}, ${rupees(price)}`}
                        className="min-h-11 rounded-full bg-ocean px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-coral active:scale-[0.97]"
                      >
                        Book
                      </button>
                    ) : (
                      <a
                        href={wa(`Hi! What is the fare for ${name} in a ${vehicle.model}?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask the fare on WhatsApp: ${name}, ${vehicle.model}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-ocean/25 px-5 text-sm font-semibold text-ocean transition-colors hover:border-ocean/60"
                      >
                        Ask
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-sm text-charcoal/65">Our team confirms the final fare for your dates before the trip.</p>
    </section>
  );
}
