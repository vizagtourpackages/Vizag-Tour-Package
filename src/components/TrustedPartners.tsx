import { createClient } from "@/lib/supabase/server";
import ScrollReveal from "./ScrollReveal";

export default async function TrustedPartners() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["show_trusted_partners", "trusted_partners_list"]);
    
  const getSetting = (key: string, defaultValue: string) => {
    const s = settings?.find(s => s.key === key)
    return s ? s.value : defaultValue
  }

  const showPartners = getSetting("show_trusted_partners", "true")
  if (showPartners === 'false') {
    return null;
  }
  
  const partnersListStr = getSetting("trusted_partners_list", "MakeMyTrip, Agoda, Goibibo, TripAdvisor, Booking.com")
  const partnersList = partnersListStr.split(",").map(s => s.trim()).filter(Boolean)

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
            {partnersList.map((partner, idx) => (
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
