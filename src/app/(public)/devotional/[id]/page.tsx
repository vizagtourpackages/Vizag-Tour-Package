import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, Clock } from "lucide-react";
import { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import ScrollCarousel from "@/components/ScrollCarousel";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: destination } = await supabase
    .from("top_destinations")
    .select("name, description, image_url")
    .eq("id", id)
    .single();

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `${destination.name} | Devotional Tours | Vizag Tour Packages`,
    description: destination.description || `Explore ${destination.name} with our comfortable devotional tour packages from Visakhapatnam.`,
    openGraph: {
      images: [destination.image_url],
    }
  };
}

export default async function DevotionalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: destination } = await supabase
    .from("top_destinations")
    .select("*")
    .eq("id", id)
    .single();

  const { data: dbDestinations } = await supabase
    .from("top_destinations")
    .select("*")
    .eq("is_published", true)
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(4);

  const displayDestinations = dbDestinations && dbDestinations.length > 0
    ? dbDestinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      description: dest.description,
      category: dest.location || dest.category || 'Destination',
      price: dest.price,
      distance: dest.distance_km ? `${dest.distance_km} from Vizag` : '',
      duration: dest.duration || '',
      imageUrl: dest.image_url || '/placeholder.jpg',
    }))
    : [];

  if (!destination) {
    return (
      <div className="bg-[#FFFBF4] min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <h1 className="text-4xl font-heading font-black text-[#6B5744] mb-4">Destination Not Found</h1>
        <p className="text-[#6B5744]/60 mb-8 text-center max-w-md">We couldn't find the destination you're looking for.</p>
        <Link href="/" className="bg-[#2D6A4F] text-white py-3 px-8 rounded-full font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  const mainImageUrl = destination.image_url || '/placeholder.jpg';
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking a devotional tour to "${destination.name}". Could you share details?`
  );

  return (
    <div className="bg-warm-white min-h-screen pb-24 font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[450px] lg:h-[75vh]">
        <Image
          fill
          src={mainImageUrl}
          alt={destination.name}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-90"></div>

        {/* Top bar with back button */}
        <div className="absolute top-6 sm:top-10 left-4 sm:left-8 z-20">
          <Link href="/#devotional" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-bold border border-white/20 shadow-sm transition-all hover:bg-white hover:text-charcoal group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
          </Link>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-36 pt-24 container-max z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <span className="inline-block bg-coral text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-coral/20">
                {destination.category || 'Devotional Tour'}
              </span>
              <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Premium Vibe
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {destination.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90 font-medium animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {(destination.location || destination.distance_km) && (
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-sm">
                  <MapPin size={18} className="text-coral" />
                  <span className="text-sm tracking-wide">{destination.location || `${destination.distance_km} from Vizag`}</span>
                </div>
              )}
              {destination.duration && (
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-sm">
                  <Clock size={18} className="text-teal" />
                  <span className="text-sm tracking-wide">{destination.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-28 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] border border-white space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sand/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

              <section className="relative z-10">
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">About {destination.name}</h2>
                <div className="prose prose-lg text-charcoal/70 whitespace-pre-line leading-relaxed">
                  {destination.description || 'Experience a peaceful devotional journey with our comfortable travel services.'}
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3 sticky top-28">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-charcoal/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal/5 rounded-full blur-[30px] group-hover:bg-coral/5 transition-colors duration-700 pointer-events-none" />

              {destination.price && (
                <div className="mb-8 pb-8 border-b border-charcoal/5 text-center relative z-10">
                  <div className="text-xs font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-2">Starting Price</div>
                  <div className="text-5xl font-heading font-black text-charcoal tracking-tight">{destination.price}</div>
                </div>
              )}

              <h3 className="font-heading font-bold text-xl text-charcoal mb-4 text-center">Ready for Darshan?</h3>
              <p className="text-charcoal/60 text-sm mb-6 text-center">
                Contact us to customize your devotional itinerary, arrange comfortable transport, and book your trip.
              </p>

              <Link
                href={`https://wa.me/917780739851?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Book on WhatsApp
              </Link>

              <div className="mt-4 text-center">
                <span className="text-xs text-charcoal/50">
                  Or call us directly at <strong>+917780739851</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Devotionals */}
        {displayDestinations.length > 0 && (
          <div className="mt-16 pt-16 border-t border-charcoal/10">
            <h2 className="font-heading text-3xl font-black text-charcoal mb-8 tracking-tight">Other Devotional Places</h2>
            <ScrollCarousel gap="gap-4">
              {displayDestinations.map((dest) => (
                <div key={dest.id} className="min-w-[280px] w-[280px] sm:w-[calc(33.333%-1rem)] flex-shrink-0 snap-start">
                  <DestinationCard destination={dest as any} basePath="/devotional" />
                </div>
              ))}
            </ScrollCarousel>
          </div>
        )}
      </div>
    </div>
  );
}
