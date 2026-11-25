'use client'

import { motion } from 'framer-motion'
import { BedDouble, ChevronRight, Snowflake, Sparkles } from 'lucide-react'
import { useBooking } from './BookingContext'
import type { StayOption } from './StayPicker'

const META: Record<string, { icon: any; blurb: string; gradient: string }> = {
  'Non AC': { icon: BedDouble, blurb: 'Clean, comfortable rooms at the best price', gradient: 'from-teal to-sky' },
  'Deluxe AC': { icon: Snowflake, blurb: 'Air-conditioned rooms with added comfort', gradient: 'from-sky to-ocean-light' },
  'Premium AC': { icon: Sparkles, blurb: 'Top-tier rooms with premium amenities', gradient: 'from-coral to-rose' },
}

/** "Choose Your Stay" – one card per accommodation type offered by the hotels attached to the package. */
export default function StayOptions({ pkg, options }: { pkg: any; options: StayOption[] }) {
  const { openBooking } = useBooking()
  if (!options.length) return null

  return (
    <section className="rounded-[28px] border border-charcoal/10 bg-white shadow-card overflow-hidden">
      <div className="px-5 sm:px-6 py-5 bg-sunset-soft border-b border-charcoal/5">
        <h3 className="font-heading text-xl font-black text-charcoal">Choose Your Stay</h3>
        <p className="text-sm text-charcoal/60 mt-0.5">Pick a room type, then your favourite hotel. Prices shown per night unless noted.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-6">
        {options.map((o, i) => {
          const meta = META[o.type] || META['Non AC']
          const Icon = meta.icon
          const from = Math.min(...o.hotels.map(h => h.price))
          return (
            <motion.button
              key={o.type}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                openBooking('package', {
                  title: pkg.title,
                  duration: pkg.duration,
                  rate_plans: pkg.rate_plans,
                  stay_options: options,
                  initial_stay_type: o.type,
                  pickup_location: pkg.pickup_location,
                  drop_location: pkg.drop_location,
                })
              }
              className="group text-left rounded-2xl border-2 border-charcoal/10 hover:border-coral p-5 transition-colors bg-white hover:shadow-card-hover [@media(hover:hover)]:hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-200"
            >
              {/* icon sits beside the text on mobile, above it from md up */}
              <div className="flex items-center gap-4 md:block">
                <span className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center md:mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-lg text-charcoal">{o.type}</h4>
                  <p className="text-xs text-charcoal/60 mt-1 md:min-h-[32px]">{meta.blurb}</p>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40">From</div>
                  <div className="font-heading font-black text-xl text-charcoal">₹{from.toLocaleString('en-IN')}<span className="text-[10px] text-charcoal/50 font-bold"> /{o.hotels[0]?.unit || 'night'}</span></div>
                </div>
                <span className="text-xs font-bold text-coral flex items-center gap-0.5">
                  {o.hotels.length} hotel{o.hotels.length > 1 ? 's' : ''} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
