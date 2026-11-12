import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn('Supabase URL or Publishable Key not found. Supabase features will be disabled.')
}

const fetchWithTimeout: typeof fetch = (input, init) => {
  if (init?.signal) {
    return fetch(input, init)
  }
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort(new Error('Network request timed out'))
  }, 8000)

  return fetch(input, {
    ...init,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId)
  })
}

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: fetchWithTimeout,
      },
    })
  : null
