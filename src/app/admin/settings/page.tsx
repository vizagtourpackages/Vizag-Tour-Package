import { createClient } from '@/lib/supabase/server'
import SettingToggle from '@/components/admin/SettingToggle'

export const metadata = {
  title: 'Site Settings - Admin',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('*')
  
  const getSetting = (key: string, defaultValue: string) => {
    const s = settings?.find(s => s.key === key)
    return s ? s.value : defaultValue
  }

  const showTrustedPartners = getSetting('show_trusted_partners', 'true') === 'true'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Homepage Sections</h2>
        
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
          <div>
            <h3 className="font-bold text-gray-900">Show "Trusted Travel Partner" Section</h3>
            <p className="text-sm text-gray-500 mt-1">Displays the logos of travel partners (MakeMyTrip, Agoda, etc.) on the Homepage and About page.</p>
          </div>
          
          <SettingToggle settingKey="show_trusted_partners" initialValue={showTrustedPartners} />
        </div>
      </div>
    </div>
  )
}
