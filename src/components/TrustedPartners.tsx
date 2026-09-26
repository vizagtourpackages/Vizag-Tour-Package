import { createClient } from "@/lib/supabase/server";
import ScrollReveal from "./ScrollReveal";

export default async function TrustedPartners() {
  const supabase = await createClient();
  
  // Fetch visibility setting
  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "show_trusted_partners")
    .single();
    
  // If setting exists and is explicitly set to 'false' (as a string or boolean), hide it
  if (setting && (setting.value === 'false' || setting.value === false)) {
    return null;
  }

  return (
    <section className="py-16 bg-white border-y border-charcoal/5">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-lg md:text-xl text-charcoal/40 uppercase tracking-widest">Your Trusted Travel Partner</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {["MakeMyTrip", "Agoda", "Goibibo", "TripAdvisor", "Booking.com"].map((partner, idx) => (
              <div key={idx} className="text-xl md:text-3xl font-black text-charcoal tracking-tight">
                {partner}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
