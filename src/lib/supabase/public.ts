import { createClient } from "@supabase/supabase-js";

/**
 * Read-only client for the public website: no cookies, and responses are cached for a minute
 * so pages load without waiting on the database. Admin saves clear the cache immediately
 * (they call revalidatePath("/", "layout")). Never use this for admin pages or writes.
 */
export function createPublicClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase credentials missing in .env.local");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, next: { revalidate: 60, tags: ["public"] } }),
    },
  });
}
