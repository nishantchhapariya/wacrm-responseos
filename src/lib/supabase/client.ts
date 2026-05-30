import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const MISSING_SUPABASE_ENV_MESSAGE =
  'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Configure the public Supabase env vars before using the browser client.'

// Singleton instance — one client shared across the whole browser session.
// Creating multiple clients causes auth-lock contention ("Lock was released
// because another request stole it") and intermittent fetch failures.
let browserClient: SupabaseClient | undefined

function createMissingEnvProxy(): SupabaseClient {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(MISSING_SUPABASE_ENV_MESSAGE)
      },
    }
  ) as SupabaseClient
}

export function createClient() {
  if (browserClient) return browserClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    // Next.js may pre-render client components on the server during build.
    // Returning a throw-on-use proxy keeps prerender from crashing while still
    // failing loudly if app code actually tries to talk to Supabase without
    // the required public env configured.
    if (typeof window === 'undefined') {
      return createMissingEnvProxy()
    }

    throw new Error(MISSING_SUPABASE_ENV_MESSAGE)
  }

  browserClient = createBrowserClient(url, anonKey)

  return browserClient
}
