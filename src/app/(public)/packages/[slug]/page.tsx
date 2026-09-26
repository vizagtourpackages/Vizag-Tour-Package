import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, Check, X, ChevronRight, Home, Star, MessageCircle, ChevronDown } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import PackageBookingButton from "@/components/PackageBookingButton";
import CustomEnquiryButton from "@/components/booking/CustomEnquiryButton";
import PackageBookingSidebar from "@/components/booking/PackageBookingSidebar";
import PackageTabs from "@/components/PackageTabs";
import ScrollCarousel from "@/components/ScrollCarousel";
import { siteInfo } from "@/data/siteInfo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase
    .from("tour_packages")
    .select("title, description")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!pkg) {
    return { title: "Package Not Found" };
  }

  return {
    title: `${pkg.title} | ${siteInfo.name}`,
    description: pkg.description || `Book the ${pkg.title} tour package with us today!`,
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch current package
  const { data: pkg } = await supabase
    .from("tour_packages")
    .select(`
      *,
      package_itinerary_days (
        *,
        package_itinerary_stops (*)
      ),
      package_hotels (*)
    `)
    .eq("slug", resolvedParams.slug)
    .single();

  if (!pkg) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <h1 className="text-4xl font-heading font-black text-charcoal mb-4">Package Not Found</h1>
        <p className="text-charcoal/60 mb-8 text-center max-w-md">We couldn't find the tour package you're looking for. It may have been removed or the link is incorrect.</p>
        <Link href="/tour-packages" className="btn-primary py-3 px-8 rounded-full">
          Browse All Packages
        </Link>
      </div>
    );
  }

  // Fetch similar packages
  let { data: similarPackages } = await supabase
    .from("tour_packages")
    .select("*")
    .eq("is_published", true)
    .neq("slug", resolvedParams.slug)
    .order("created_at", { ascending: false })
    .limit(4);

  const originalPrice = pkg.original_price || pkg.mrp;
  const discountPercent = originalPrice && originalPrice > pkg.price
    ? Math.round(((originalPrice - pkg.price) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] md:aspect-[50/30] max-h-[500px] rounded-[32px] overflow-hidden bg-sand shadow-sm flex flex-col justify-end">
              <img
                src={pkg.cover_image_url || pkg.image_url}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6 z-20">
                <Link href="/tour-packages" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-teal transition-colors bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                  <ChevronRight size={14} className="rotate-180" /> Back to Tour Packages
                </Link>
              </div>

              <div className="relative z-10 p-6 sm:p-10 w-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {pkg.badge && !pkg.badge.match(/\d+\s*[DN]/i) && (
                    <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-coral text-white shadow-sm border border-coral/20">
                      {pkg.badge}
                    </span>
                  )}
                  <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-teal text-white shadow-sm">
                    {pkg.duration}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-md max-w-3xl">
                  {pkg.title}
                </h1>
              </div>
            </div>


            {/* Quick Info & Highlights */}
            <div>

              {/* Destination Tags / Highlights (Pills) */}
              {(pkg.destination_tags || pkg.highlights) && (pkg.destination_tags?.length > 0 || pkg.highlights?.length > 0) && (
                <div className="mb-8 overflow-hidden relative w-full group/marquee">
                  <h3 className="text-sm font-bold text-charcoal/50 uppercase tracking-wider mb-3">Must Visit Places</h3>
                  <div className="flex gap-2 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] whitespace-nowrap shrink-0">
                    {(pkg.destination_tags || pkg.highlights).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-teal/5 text-teal font-bold text-sm rounded-full tracking-wide capitalize border border-teal/10 shrink-0 inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {(pkg.destination_tags || pkg.highlights).map((tag: string, i: number) => (
                      <span
                        key={`dup-${i}`}
                        className="px-4 py-2 bg-teal/5 text-teal font-bold text-sm rounded-full tracking-wide capitalize border border-teal/10 shrink-0 inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                    {(pkg.destination_tags || pkg.highlights).map((tag: string, i: number) => (
                      <span
                        key={`dup2-${i}`}
                        className="px-4 py-2 bg-teal/5 text-teal font-bold text-sm rounded-full tracking-wide capitalize border border-teal/10 shrink-0 inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                    {(pkg.destination_tags || pkg.highlights).map((tag: string, i: number) => (
                      <span
                        key={`dup3-${i}`}
                        className="px-4 py-2 bg-teal/5 text-teal font-bold text-sm rounded-full tracking-wide capitalize border border-teal/10 shrink-0 inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rate Plan Options (Always Visible) */}
            {pkg.rate_plans && pkg.rate_plans.length > 0 && (
              <div className="bg-white rounded-[24px] border border-charcoal/10 overflow-hidden shadow-sm">
                <div className="p-4 sm:p-5 bg-blue-50/50 border-b border-charcoal/10 flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-charcoal">Rate Plan Options</h3>
                </div>
                <div className="divide-y divide-charcoal/10">
                  {pkg.rate_plans.map((plan: any, i: number) => {
                    const planMrp = plan.mrp || plan.originalPrice;
                    const planPrice = plan.price || 0;
                    const planDiscount = planMrp && planMrp > planPrice
                      ? Math.round(((planMrp - planPrice) / planMrp) * 100)
                      : 0;

                    return (
                      <div key={i} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-2 items-center">
                          
                          {/* Row 1, Col 1: Title & Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pr-2">
                            <h4 className="font-heading text-sm sm:text-base font-bold text-charcoal leading-tight">
                              {plan.title}
                            </h4>
                            {plan.is_best_value && (
                              <span className="px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-200">
                                Our lowest price
                              </span>
                            )}
                            {plan.badge && !plan.is_best_value && (
                              <span className="px-1.5 sm:px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-200">
                                {plan.badge}
                              </span>
                            )}
                          </div>

                          {/* Row 1, Col 2: Prices */}
                          <div className="text-right">
                            {planMrp && planDiscount > 0 && (
                              <div className="flex items-center justify-end gap-1 mb-0.5">
                                <span className="text-[10px] sm:text-xs text-charcoal/40 line-through font-medium">
                                  ₹{planMrp.toLocaleString('en-IN')}
                                </span>
                                <span className="px-1 sm:px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] sm:text-[10px] font-bold rounded uppercase tracking-wider">
                                  {planDiscount}% OFF
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline justify-end gap-1">
                              <span className="text-lg sm:text-xl font-black font-heading text-charcoal tracking-tight leading-none">
                                ₹{planPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-charcoal/50 font-bold uppercase leading-none">/{pkg.price_label || 'couple'}</span>
                            </div>
                          </div>

                          {/* Row 2, Col 1: Features */}
                          <div className="self-start pr-2">
                            {plan.features && plan.features.length > 0 && (
                              <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 mt-0.5">
                                {plan.features.map((feat: string, fIdx: number) => (
                                  <div key={fIdx} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-charcoal/70 shrink-0">
                                    <Check size={10} className="text-teal sm:w-3 sm:h-3" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Row 2, Col 2: Button */}
                          <div className="self-end text-right min-w-[100px] sm:min-w-[130px] [&>button]:w-full [&>button]:py-1.5 sm:[&>button]:py-2 [&>button]:text-xs sm:[&>button]:text-sm">
                            <PackageBookingButton pkg={pkg} plan={plan} />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Booking Card (shown after Rate Plans, hidden on desktop) */}
            <div className="block lg:hidden">
              <PackageBookingSidebar pkg={pkg} originalPrice={originalPrice} discountPercent={discountPercent} />
            </div>

            {/* Package Tabs (Summary, Itinerary, Hotels) */}
            <PackageTabs pkg={pkg} />

          </div>

          {/* Sidebar / Sticky Booking Card */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <PackageBookingSidebar pkg={pkg} originalPrice={originalPrice} discountPercent={discountPercent} />
            </div>
          </div>
        </div>

        {/* Similar Packages */}
        {similarPackages && similarPackages.length > 0 && (
          <div className="mt-12 pt-12 border-t border-charcoal/10">
            <h2 className="font-heading text-3xl font-black text-charcoal mb-6 tracking-tight">You might also like</h2>
            <ScrollCarousel gap="gap-4">
              {similarPackages.map((p: any) => (
                <div key={p.id} className="w-[320px] sm:w-[320px] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 snap-start h-auto flex flex-col">
                  <PackageCard
                    pkg={{
                      id: p.slug,
                      slug: p.slug,
                      title: p.title,
                      price: p.price,
                      priceLabel: p.price_label,
                      duration: p.duration,
                      people: p.people,
                      badge: p.badge,
                      highlights: p.highlights || [],
                      includes: p.includes || [],
                      excludes: p.excludes || [],
                      category: p.category as any,
                      imageUrl: p.cover_image_url || p.image_url,
                      imageGradient: "from-sky-400 to-teal-500", // fallback
                      originalPrice: p.original_price || p.mrp
                    }}
                  />
                </div>
              ))}
            </ScrollCarousel>
          </div>
        )}
      </div>
    </div>
  );
}
