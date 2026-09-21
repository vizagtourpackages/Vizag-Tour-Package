import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, Check, X, ChevronRight, Home, Star, MessageCircle, ChevronDown } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import PackageBookingButton from "@/components/PackageBookingButton";
import CustomEnquiryButton from "@/components/booking/CustomEnquiryButton";
import PackageBookingSidebar from "@/components/booking/PackageBookingSidebar";
import PackageTabs from "@/components/PackageTabs";
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

  // Fetch similar packages (just a few others in the same category/type)
  const categoryMatch = pkg.category || pkg.type;

  const { data: similarPackages } = categoryMatch ? await supabase
    .from("tour_packages")
    .select("*")
    .eq("category", categoryMatch)
    .neq("slug", resolvedParams.slug)
    .limit(3) : { data: [] };

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
                <h1 className="text-2xl sm:text-2xl md:text-4xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-md max-w-3xl">
                  {pkg.title}
                </h1>
              </div>
            </div>


            {/* Quick Info & Highlights */}
            <div>

              {/* Destination Tags / Highlights (Pills) */}
              {(pkg.destination_tags || pkg.highlights) && (pkg.destination_tags?.length > 0 || pkg.highlights?.length > 0) && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-charcoal/50 uppercase tracking-wider mb-3">Must Visit Places</h3>
                  <div className="flex flex-wrap gap-2">
                    {(pkg.destination_tags || pkg.highlights).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-teal/5 text-teal font-bold text-sm rounded-full tracking-wide capitalize whitespace-normal border border-teal/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rate Plan Options (Compressed) */}
            {pkg.rate_plans && pkg.rate_plans.length > 0 && (
              <details className="bg-white rounded-[24px] border border-charcoal/10 overflow-hidden shadow-sm group">
                <summary className="p-4 sm:p-5 bg-blue-50/50 border-b border-charcoal/10 flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-blue-100/50 transition-colors">
                  <h3 className="font-heading text-lg font-bold text-charcoal">Rate Plan Options</h3>
                  <ChevronDown className="text-charcoal/50 transition-transform duration-300 group-open:rotate-180" size={20} />
                </summary>
                <div className="divide-y divide-charcoal/10">
                  {pkg.rate_plans.map((plan: any, i: number) => (
                    <div key={i} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          {plan.badge && (
                            <span className="inline-block px-2 py-1 bg-teal/10 text-teal text-[10px] font-bold rounded-full mb-2 border border-teal/20 uppercase tracking-wider">
                              {plan.badge}
                            </span>
                          )}
                          <h4 className="font-heading text-base font-bold text-charcoal mb-2">
                            {plan.title}
                          </h4>
                          {plan.features && plan.features.length > 0 && (
                            <ul className="space-y-1">
                              {plan.features.map((feat: string, fIdx: number) => (
                                <li key={fIdx} className="flex items-start gap-2 text-xs text-charcoal/70">
                                  <Check size={14} className="text-teal shrink-0 mt-0.5" />
                                  <span className="leading-snug">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="sm:text-right shrink-0 flex flex-col justify-center">
                          <div className="mb-3 text-left sm:text-right">
                            {plan.mrp && (
                              <div className="text-xs text-charcoal/40 line-through font-medium mb-0.5">
                                ₹{plan.mrp.toLocaleString('en-IN')}
                              </div>
                            )}
                            <div className="text-xl font-black font-heading text-charcoal tracking-tight">
                              ₹{(plan.price || 0).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-charcoal/50 font-bold uppercase mt-1">per Adult</div>
                          </div>
                          <PackageBookingButton pkg={pkg} plan={plan} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
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
          <div className="mt-24 pt-16 border-t border-charcoal/10">
            <h2 className="font-heading text-3xl font-black text-charcoal mb-10 tracking-tight">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPackages.map((p: any) => (
                <PackageCard
                  key={p.id}
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
                    imageUrl: p.image_url,
                    imageGradient: "from-sky-400 to-teal-500", // fallback
                    originalPrice: p.original_price || p.mrp
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
