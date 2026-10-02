import { createClient } from "@/lib/supabase/server";
import PromoBanner from "./PromoBanner";

export default async function PromoBannerSection() {
  const supabase = await createClient();

  // Fetch all active banners along with their images
  const { data: banners } = await supabase
    .from('promo_banner')
    .select('*, promo_banner_images(image_url, display_order)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (!banners || banners.length === 0) return null;

  // Format data for the client component
  const formattedBanners = banners.map(banner => {
    // Sort images by display_order
    const images = banner.promo_banner_images
      ? banner.promo_banner_images
          .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
          .map((img: any) => img.image_url)
      : [];
    
    return {
      ...banner,
      images
    };
  });

  return <PromoBanner banners={formattedBanners} />;
}
