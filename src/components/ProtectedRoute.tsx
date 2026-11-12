import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      // Must be authenticated AND specifically authorized in admin_users
      if (!user || !isAdmin) {
        navigate('/admin/login', { replace: true })
      }
    }
  }, [user, isAdmin, loading, navigate])

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  // Deny render if not verified admin
  if (!user || !isAdmin) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
