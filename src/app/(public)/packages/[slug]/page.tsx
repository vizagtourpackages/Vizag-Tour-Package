import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Check, X, ArrowRight, ChevronRight, Home } from "lucide-react";
import PackageCard from "@/components/PackageCard";
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
    .select("*")
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

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the "${pkg.title}" package. Could you share more details?`
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      {/* Breadcrumbs */}
      <div className="container-max px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-sm font-medium text-charcoal/60 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-teal flex items-center gap-1.5"><Home size={14} /> Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href="/tour-packages" className="hover:text-teal">Tour Packages</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-charcoal truncate">{pkg.title}</span>
        </nav>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] sm:aspect-video rounded-[32px] overflow-hidden bg-sand shadow-sm">
              <img 
                src={pkg.cover_image_url || pkg.image_url} 
                alt={pkg.title} 
                className="w-full h-full object-cover"
              />
              {pkg.badge && (
                <div className="absolute top-6 left-6 badge bg-coral text-white shadow-sm border border-coral/20">
                  {pkg.badge}
                </div>
              )}
            </div>

            {/* Title & Quick Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-teal">
                  {(pkg.category || pkg.type || 'Tour Package').replace('-', ' ')}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-black text-charcoal mb-6 leading-tight tracking-tight">
                {pkg.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-charcoal/70 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-charcoal/50 uppercase tracking-wider font-bold">Duration</div>
                    <div>{pkg.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-charcoal/50 uppercase tracking-wider font-bold">Group Size</div>
                    <div>{pkg.people}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {pkg.description && (
              <div className="prose prose-lg prose-charcoal max-w-none">
                <h3 className="font-heading text-2xl font-bold mb-4">Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">{pkg.description}</p>
              </div>
            )}

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <h3 className="font-heading text-2xl font-bold mb-6">Key Highlights</h3>
                <div className="flex flex-wrap gap-3">
                  {pkg.highlights.map((h: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-sand text-charcoal/80 font-bold text-sm rounded-full tracking-wide">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-sand/30 p-8 rounded-[32px] border border-charcoal/5">
              <div>
                <h4 className="font-heading text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal">
                    <Check size={16} />
                  </div>
                  What's Included
</h4>
                <ul className="space-y-4">
                  {pkg.includes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal/80">
                      <Check size={18} className="text-teal mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral">
                    <X size={16} />
                  </div>
                  What's Excluded
</h4>
                <ul className="space-y-4">
                  {pkg.excludes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal/80">
                      <X size={18} className="text-coral mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar / Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-charcoal/10 shadow-xl rounded-[32px] p-6 sm:p-8">
              <div className="mb-8 pb-8 border-b border-charcoal/10">
                <div className="text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-2">Starting from</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-black tracking-tight text-charcoal">₹{pkg.price.toLocaleString('en-IN')}</span>
                  <span className="text-charcoal/60 font-medium">{pkg.price_label}</span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={`${siteInfo.whatsappLink}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-center text-lg py-4 shadow-md hover:shadow-lg bg-teal hover:bg-teal-dark"
                >
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary w-full justify-center text-center text-lg py-4 border-charcoal/10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors font-bold"
                >
                  Request Callback
                </Link>
              </div>
              
              <div className="mt-6 text-center text-sm font-medium text-charcoal/50">
                No payment required at this step.
              </div>
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
                    imageGradient: "from-sky-400 to-teal-500" // fallback
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
