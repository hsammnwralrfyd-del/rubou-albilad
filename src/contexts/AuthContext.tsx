import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { adminManager } from '@/lib/supabaseContentManager'

interface AuthContextType {
  user: User | null
  session: Session | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  resetPasswordForEmail: (email: string) => Promise<{ error: string | null }>
  updatePassword: (password: string) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_TIMEOUT_MS = 6000

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Strictly verify whether a given user is enrolled in admin_users.
  // Never fails open: on any error, missing user, empty record, or timeout, returns false.
  const verifyAdmin = async (currentUser: User | null, signal?: AbortSignal): Promise<boolean> => {
    if (!currentUser || !currentUser.id) return false
    try {
      return await adminManager.isUserAdmin(currentUser.id, signal)
    } catch (err) {
      console.error('Failed to verify admin status:', err)
      return false
    }
  }

  // Safe getSession wrapper with timeout so the initial check never hangs
  const getSessionWithTimeout = async (ms = AUTH_TIMEOUT_MS) => {
    if (!supabase) return { data: { session: null }, error: null }
    let timer: NodeJS.Timeout
    const timeoutPromise = new Promise<{ data: { session: null }; error: Error }>((resolve) => {
      timer = setTimeout(() => {
        resolve({ data: { session: null }, error: new Error('Auth session check timed out') })
      }, ms)
    })
    try {
      return await Promise.race([supabase.auth.getSession(), timeoutPromise])
    } finally {
      clearTimeout(timer!)
    }
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let isMounted = true

    // Check existing session on boot with guaranteed timeout and cancellation
    const initAuth = async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)

      try {
        const { data, error } = await getSessionWithTimeout(AUTH_TIMEOUT_MS)
        if (!isMounted) return

        if (error) {
          console.warn('Auth session check returned error or timed out:', error)
        }

        const initialSession = data?.session
        if (initialSession?.user) {
          setSession(initialSession)
          setUser(initialSession.user)
          const isUserAuthorized = await verifyAdmin(initialSession.user, controller.signal)
          if (isMounted) {
            setIsAdmin(isUserAuthorized)
          }
        } else {
          setSession(null)
          setUser(null)
          setIsAdmin(false)
        }
      } catch (err) {
        console.error('Error during auth initialization:', err)
        if (isMounted) {
          setSession(null)
          setUser(null)
          setIsAdmin(false)
        }
      } finally {
        clearTimeout(timeoutId)
        if (isMounted) {
          setLoading(false) // ALWAYS resolves regardless of success, error, or timeout
        }
      }
    }

    void initAuth()

    // Subscribe to auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)

      try {
        if (newSession?.user) {
          setSession(newSession)
          setUser(newSession.user)
          const isUserAuthorized = await verifyAdmin(newSession.user, controller.signal)
          if (isMounted) {
            setIsAdmin(isUserAuthorized)
          }
        } else {
          setSession(null)
          setUser(null)
          setIsAdmin(false)
        }
      } catch (err) {
        console.error('Error handling auth state change:', err)
        if (isMounted) {
          setIsAdmin(false)
        }
      } finally {
        clearTimeout(timeoutId)
        if (isMounted) {
          setLoading(false) // ALWAYS resolves
        }
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase client is not configured' }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      if (!data.user) {
        return { error: 'فشل استرجاع بيانات المستخدم' }
      }

      // Check admin_users authorization with abort signal
      const isUserAuthorized = await verifyAdmin(data.user, controller.signal)

      if (!isUserAuthorized) {
        // User authenticated in auth.users, but is NOT present in admin_users
        // Immediately terminate session so no unprivileged token remains
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
        setIsAdmin(false)
        return {
          error: 'غير مصرح: هذا البريد الإلكتروني ليس لديه صلاحيات مسؤول في النظام.',
        }
      }

      setSession(data.session)
      setUser(data.user)
      setIsAdmin(true)
      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تسجيل الدخول'
      return { error: message }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  const signOut = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
    } catch (err) {
      console.error('Error during sign out:', err)
    } finally {
      setUser(null)
      setSession(null)
      setIsAdmin(false)
    }
  }

  const refreshSession = async () => {
    if (!supabase) return
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error || !data.session?.user) {
        setUser(null)
        setSession(null)
        setIsAdmin(false)
        return
      }

      setSession(data.session)
      setUser(data.session.user)
      const isUserAuthorized = await verifyAdmin(data.session.user, controller.signal)
      setIsAdmin(isUserAuthorized)
    } catch (err) {
      console.error('Error refreshing session:', err)
      setIsAdmin(false)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  const resetPasswordForEmail = async (email: string) => {
    if (!supabase) {
      return { error: 'Supabase client is not configured' }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/rubou-albilad/admin/reset-password`,
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء إرسال رابط إعادة تعيين كلمة المرور'
      return { error: message }
    }
  }

  const updatePassword = async (password: string) => {
    if (!supabase) {
      return { error: 'Supabase client is not configured' }
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تحديث كلمة المرور'
      return { error: message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        signIn,
        signOut,
        refreshSession,
        resetPasswordForEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
