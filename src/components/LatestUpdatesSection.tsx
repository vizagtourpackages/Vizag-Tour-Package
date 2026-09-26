import { createClient } from "@/lib/supabase/server";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import NewsPromoCard from "./NewsPromoCard";

export default async function LatestUpdatesSection() {
  const supabase = await createClient();

  const { data: dbNewsOffers } = await supabase
    .from('latest_updates_offers')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (!dbNewsOffers || dbNewsOffers.length === 0) {
    return null;
  }

  const displayPromotions = dbNewsOffers?.filter(item => item.type === 'Offer').map(item => ({
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    badgeText: item.badge_text,
    date: item.date,
    imageUrl: item.image_url,
    linkText: item.link_text,
    href: item.href
  })) || [];

  const displayNews = dbNewsOffers?.filter(item => item.type === 'News').map(item => ({
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    badgeText: item.badge_text,
    date: item.date,
    imageUrl: item.image_url,
    linkText: item.link_text,
    href: item.href
  })) || [];

  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-news" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-news)" />
        </svg>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container-max relative z-10">
        <SectionHeading
          title="Vizag Travel Updates, Offers & Tour Deals"
          subtitle="Stay updated with the latest Vizag travel news, new tour packages, seasonal offers, special deals, and exciting travel opportunities from Vizag to Araku, Vanjangi, Lambasingi, and beyond."
          light
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1fr] gap-8 lg:gap-12 mt-16">
          <ScrollReveal delay={0.2} className="w-full min-w-0">
            <div className="w-full">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight">Special Promotions</h3>
                <span className="badge bg-coral/20 text-coral border border-coral/30 tracking-widest text-[10px]">LIMITED</span>
              </div>
              <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                {displayPromotions.map((promo) => (
                  <div key={promo.id} className="w-[85vw] max-w-[300px] lg:max-w-none lg:w-[85%] shrink-0 snap-start">
                    <NewsPromoCard item={promo} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-full h-full bg-white/10 rounded-full" />

          <ScrollReveal delay={0.3} className="w-full min-w-0">
            <div className="w-full">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4 mt-8 lg:mt-0">
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight">Travel News</h3>
                <span className="badge bg-teal/20 text-teal border border-teal/30 tracking-widest text-[10px]">UPDATES</span>
              </div>
              <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                {displayNews.map((news) => (
                  <div key={news.id} className="w-[85vw] max-w-[300px] lg:max-w-none lg:w-[85%] shrink-0 snap-start">
                    <NewsPromoCard item={news} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
