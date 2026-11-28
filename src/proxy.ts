import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

// Only the admin and login screens need the session check; public pages skip it and load faster.
export const config = {
  matcher: ['/admin/:path*', '/login'],
}
