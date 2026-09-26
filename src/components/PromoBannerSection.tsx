import { createClient } from "@/lib/supabase/server";
import PromoBanner from "./PromoBanner";

export default async function PromoBannerSection() {
  const supabase = await createClient();

  // Fetch the most recently updated active banner
  const { data: banner } = await supabase
    .from('promo_banner')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!banner) return null;

  // Fetch its images
  const { data: images } = await supabase
    .from('promo_banner_images')
    .select('image_url')
    .eq('banner_id', banner.id)
    .order('display_order', { ascending: true });

  if (!images || images.length === 0) return null;

  return <PromoBanner banner={banner} images={images} />;
}
