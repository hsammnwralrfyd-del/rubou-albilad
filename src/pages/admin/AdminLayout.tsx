import { Outlet, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Settings, 
  Menu as MenuIcon,
  Briefcase,
  FolderKanban,
  Image as ImageIcon,
  FileText,
  Search,
  LogOut,
  Menu,
  X,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { assetPath } from '@/lib/assetPath'

const AdminLayout = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentTab = searchParams.get('tab') || 'settings'

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { tab: 'settings', label: 'إعدادات الموقع', icon: Settings },
    { tab: 'navigation', label: 'القائمة', icon: MenuIcon },
    { tab: 'services', label: 'الخدمات', icon: Briefcase },
    { tab: 'projects', label: 'المشاريع', icon: FolderKanban },
    { tab: 'gallery', label: 'المعرض', icon: ImageIcon },
    { tab: 'details', label: 'صفحات التفصيل', icon: FileText },
    { tab: 'seo', label: 'SEO', icon: Search },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-64 bg-card border-l shadow-lg z-40 transform transition-transform duration-200 ease-in-out flex flex-col justify-between',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full',
          'lg:translate-x-0 lg:fixed lg:z-10'
        )}
      >
        <div>
          <div className="p-5 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-16 bg-muted/60 rounded-lg p-1 flex items-center justify-center overflow-hidden border shrink-0">
                <img
                  src={assetPath("/icon1/rubou-favicon.png")}
                  alt="شعار الموقع"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base font-bold text-primary leading-tight">لوحة التحكم</h1>
                <p className="text-[11px] text-muted-foreground">ربوع البلاد</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname.includes('/admin/dashboard') && currentTab === item.tab
              return (
                <Link
                  key={item.tab}
                  to={`/admin/dashboard?tab=${item.tab}`}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary rounded-md hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>معاينة واجهة الموقع</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:mr-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
