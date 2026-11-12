import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { assetPath } from '@/lib/assetPath'

type SessionState = 'loading' | 'valid' | 'invalid' | 'success'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionState, setSessionState] = useState<SessionState>('loading')
  const [errorMessage, setErrorMessage] = useState('رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية')

  const isResolvedRef = useRef(false)

  useEffect(() => {
    let isMounted = true

    const markValid = () => {
      if (!isMounted || isResolvedRef.current) return
      isResolvedRef.current = true
      setSessionState('valid')
    }

    const markInvalid = (msg?: string) => {
      if (!isMounted || isResolvedRef.current) return
      isResolvedRef.current = true
      if (msg) setErrorMessage(msg)
      setSessionState('invalid')
    }

    // Parse URL query parameters and hash fragment
    const hash = window.location.hash.replace(/^#/, '')
    const hashParams = new URLSearchParams(hash)

    // Check for errors returned by Supabase in either query or hash
    const errorParam = searchParams.get('error') || hashParams.get('error')
    const errorDesc = searchParams.get('error_description') || hashParams.get('error_description')

    if (errorParam) {
      const decodedMessage = errorDesc
        ? decodeURIComponent(errorDesc.replace(/\+/g, ' '))
        : 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية'
      markInvalid(decodedMessage)
      return
    }

    if (!supabase) {
      markInvalid('خدمة المصادقة غير مهيأة')
      return
    }

    const pkceCode = searchParams.get('code')
    const hasHashRecovery =
      hashParams.get('type') === 'recovery' ||
      Boolean(hashParams.get('access_token'))
    const hasRecoveryIntent = Boolean(pkceCode) || hasHashRecovery

    // 1. Subscribe to Supabase auth events (PASSWORD_RECOVERY, INITIAL_SESSION, SIGNED_IN)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return

      if (event === 'PASSWORD_RECOVERY') {
        if (session) {
          markValid()
        }
      } else if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        // Valid if session exists and request originated with recovery tokens/code
        if (session && (hasRecoveryIntent || session.user)) {
          markValid()
        }
      }
    })

    // 2. If PKCE code is in the query params, handle exchange explicitly
    if (pkceCode) {
      supabase.auth
        .exchangeCodeForSession(pkceCode)
        .then(({ data, error }) => {
          if (!isMounted) return
          if (error) {
            console.warn('PKCE exchangeCodeForSession error:', error.message)
            // If the code was already consumed automatically by the client, getSession check below will handle it
          } else if (data?.session) {
            markValid()
          }
        })
        .catch((err) => {
          console.warn('PKCE exchange error:', err)
        })
    }

    // 3. Check existing or restored session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!isMounted) return
        if (!error && session && (hasRecoveryIntent || session.user)) {
          markValid()
        }
      })
      .catch((err) => {
        console.warn('getSession error:', err)
      })

    // 4. Fallback timeout to prevent indefinite loading
    // Longer wait if we have recovery tokens/code, shorter if URL has no tokens at all
    const timeoutMs = hasRecoveryIntent ? 4000 : 1500
    const timeoutTimer = setTimeout(() => {
      if (!isMounted) return
      if (!isResolvedRef.current) {
        markInvalid()
      }
    }, timeoutMs)

    return () => {
      isMounted = false
      clearTimeout(timeoutTimer)
      subscription.unsubscribe()
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      toast.error('يرجى إدخال كلمة المرور وتأكيدها')
      return
    }

    if (password !== confirmPassword) {
      toast.error('كلمات المرور غير متطابقة')
      return
    }

    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    setIsSubmitting(true)
    const { error } = await updatePassword(password)
    setIsSubmitting(false)

    if (error) {
      toast.error(error)
    } else {
      setSessionState('success')
      toast.success('تم تحديث كلمة المرور بنجاح')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login')
      }, 2000)
    }
  }

  // 1. Loading State
  if (sessionState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        <Card className="w-full max-w-md shadow-xl text-center p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">جاري التحقق من صلاحية رابط استعادة كلمة المرور...</p>
          </div>
        </Card>
      </div>
    )
  }

  // 2. Invalid or Expired Session State
  if (sessionState === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto h-14 w-24 flex items-center justify-center p-1.5 bg-muted/40 rounded-xl border">
              <img
                src={assetPath('/icon1/rubou-favicon.png')}
                alt="شعار ربوع البلاد"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center bg-destructive/10 text-destructive rounded-full">
              <AlertCircle className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">رابط غير صالح</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/login')} className="w-full">
              العودة لتسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 3. Success State
  if (sessionState === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">تم بنجاح</CardTitle>
            <CardDescription>
              تم تحديث كلمة المرور بنجاح. سيتم توجيهك إلى صفحة تسجيل الدخول...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // 4. Valid Session State - Show Password Reset Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto h-14 w-24 flex items-center justify-center p-1.5 bg-muted/40 rounded-xl border">
            <img
              src={assetPath('/icon1/rubou-favicon.png')}
              alt="شعار ربوع البلاد"
              className="h-full w-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">إعادة تعيين كلمة المرور</CardTitle>
          <CardDescription>أدخل كلمة المرور الجديدة لحسابك</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                'تحديث كلمة المرور'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <button
              onClick={() => navigate('/admin/login')}
              className="hover:text-primary underline"
            >
              العودة لتسجيل الدخول
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
