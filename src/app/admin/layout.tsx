import { LogOut } from 'lucide-react';
import { logout } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/server';
import SidebarNav from '@/components/admin/SidebarNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { count: pkgCount } = await supabase.from('package_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
  const { count: resCount } = await supabase.from('resort_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
  const { count: cabCount } = await supabase.from('cab_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
  const totalPending = (pkgCount || 0) + (resCount || 0) + (cabCount || 0);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center mr-3">
            <span className="font-black text-white">V</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Admin Panel</span>
        </div>

        <SidebarNav 
          pkgCount={pkgCount || 0} 
          resCount={resCount || 0} 
          cabCount={cabCount || 0} 
          totalPending={totalPending} 
        />

        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors group"
            >
              <LogOut className="w-5 h-5 mr-3 text-white/50 group-hover:text-red-400 transition-colors" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-xl font-bold text-gray-900">Content Management System</h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
