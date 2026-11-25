import { createClient } from '@/lib/supabase/server'
import { getSiteSettings } from '@/lib/settings'
import { BlogSidebarPanel, ContactPanel, HeroPanel, SecurityPanel, SocialPanel } from '@/components/admin/SettingsPanels'

export const metadata = {
  title: 'Site Settings - Admin',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const settings = await getSiteSettings()
  const { data: packages } = await supabase
    .from('tour_packages')
    .select('id, title, duration, cover_image_url, image_url')
    .eq('is_published', true)
    .order('title')

  const pkgs = packages || []

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-1">Contact details, social links, the home hero, the blog sidebar and your password.</p>
      </div>

      <ContactPanel
        initial={{
          contact_phone: settings.contact.phone,
          contact_whatsapp: settings.contact.whatsapp,
          contact_email: settings.contact.email,
          contact_landline: settings.contact.landline,
          contact_address: settings.contact.address,
        }}
      />

      <SocialPanel
        initial={{
          social_facebook: settings.socials.facebook,
          social_instagram: settings.socials.instagram,
          social_youtube: settings.socials.youtube,
          social_x: settings.socials.x,
          social_linkedin: settings.socials.linkedin,
        }}
      />

      <HeroPanel
        initial={{
          hero_package_id: settings.hero.packageId,
          hero_image_2: settings.hero.tile2.image,
          hero_image_2_url: settings.hero.tile2.url,
          hero_image_3: settings.hero.tile3.image,
          hero_image_3_url: settings.hero.tile3.url,
        }}
        packages={pkgs.map((p) => ({ id: p.id, title: p.title }))}
      />

      <BlogSidebarPanel
        initialIds={settings.blogSidebarIds}
        packages={pkgs.map((p) => ({ id: p.id, title: p.title, subtitle: p.duration, image: p.cover_image_url || p.image_url }))}
      />

      <SecurityPanel />
    </div>
  )
}
