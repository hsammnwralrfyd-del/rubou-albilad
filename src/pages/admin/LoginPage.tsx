import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Lock, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { assetPath } from '@/lib/assetPath'

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور')
      return
    }

    setIsSubmitting(true)
    const { error } = await signIn(email, password)
    setIsSubmitting(false)

    if (error) {
      toast.error(error)
    } else {
      toast.success('تم تسجيل الدخول بنجاح')
      navigate('/admin/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto h-14 w-24 flex items-center justify-center p-1.5 bg-muted/40 rounded-xl border">
            <img
              src={assetPath("/icon1/rubou-favicon.png")}
              alt="شعار ربوع البلاد"
              className="h-full w-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">لوحة التحكم</CardTitle>
          <CardDescription>تسجيل الدخول لإدارة موقع ربوع البلاد</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
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
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>
          <div className="mt-4 space-y-2 text-center text-sm text-muted-foreground">
            <Link to="/admin/reset-password" className="hover:text-primary underline block">
              نسيت كلمة المرور؟
            </Link>
            <Link to="/" className="hover:text-primary underline block">
              العودة للموقع الرئيسي
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
