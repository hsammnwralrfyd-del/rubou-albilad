import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { servicesManager, type Service } from '@/lib/supabaseContentManager'
import { Loader2, Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useSiteData } from '@/contexts/SiteDataContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const ServicesPage = () => {
  const { refreshData } = useSiteData()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await servicesManager.getAllIncludingInactive()
      setServices(data)
    } catch (err) {
      console.error('Failed to load services:', err)
      const errorMsg = 'تعذر تحميل قائمة الخدمات من الخادم. يرجى المحاولة مرة أخرى.'
      setLoadError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url || '',
      sort_order: service.sort_order,
      is_active: service.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingService(null)
    setFormData({
      title: '',
      description: '',
      image_url: '',
      sort_order: services.length + 1,
      is_active: true,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('يرجى إدخال عنوان الخدمة')
      return
    }

    setSaving(true)
    let success = false

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image_url: formData.image_url.trim() || null,
      sort_order: Number(formData.sort_order) || 0,
      is_active: formData.is_active,
    }

    let result = { success: false, error: '' }
    if (editingService) {
      const res = await servicesManager.update(editingService.id, payload)
      result = { success: res.success, error: res.error || '' }
    } else {
      const res = await servicesManager.create(payload)
      result = { success: res.success, error: res.error || '' }
    }

    setSaving(false)

    if (result.success) {
      toast.success(editingService ? 'تم تحديث الخدمة بنجاح' : 'تم إضافة الخدمة بنجاح')
      setIsDialogOpen(false)
      loadServices()
      void refreshData()
    } else {
      toast.error(result.error || 'فشل حفظ الخدمة، يرجى المحاولة مرة أخرى')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الخدمة؟')) return

    const res = await servicesManager.delete(id)
    if (res) {
      toast.success('تم حذف الخدمة بنجاح')
      loadServices()
      void refreshData()
    } else {
      toast.error('فشل حذف الخدمة')
    }
  }

  if (loading) {
    return (
      <div dir="rtl" className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-3 text-muted-foreground">جاري تحميل الخدمات...</span>
      </div>
    )
  }

  if (loadError && services.length === 0) {
    return (
      <div dir="rtl" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إدارة الخدمات</h1>
          </div>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-destructive font-medium">{loadError}</p>
            <Button onClick={() => void loadServices()} variant="outline">
              إعادة المحاولة
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة الخدمات</h1>
          <p className="text-muted-foreground mt-1">
            إضافة وتعديل الخدمات المعروضة وترتيبها وحالتها
          </p>
        </div>
        <Button onClick={handleCreate} className="self-start sm:self-auto">
          <Plus className="h-4 w-4 ml-2" />
          إضافة خدمة جديدة
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              {service.image_url && (
                <div className="aspect-video w-full bg-muted rounded-md mb-2 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
              <CardTitle className="flex items-start justify-between text-lg gap-2">
                <span className="line-clamp-1">{service.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    service.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {service.is_active ? 'نشط' : 'معطل'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {service.description || 'لا يوجد وصف'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span>ترتيب العرض: {service.sort_order}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg bg-card text-muted-foreground">
            لا توجد خدمات مسجلة في قاعدة البيانات حالياً.
          </div>
        )}
      </div>

      {/* Dialog for Add / Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent dir="rtl" className="sm:max-w-lg">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الخدمة والترتيب وحالة التفعيل
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="srv-title">عنوان الخدمة *</Label>
                <Input
                  id="srv-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: مظلات وسواتر سيارات حديثة"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="srv-desc">وصف الخدمة</Label>
                <Textarea
                  id="srv-desc"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="تفاصيل ومميزات الخدمة..."
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="srv-img" className="flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4" />
                  رابط صورة الخدمة (URL)
                </Label>
                <Input
                  id="srv-img"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://... أو مسار الصورة"
                  dir="ltr"
                  className="text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="srv-order">ترتيب العرض</Label>
                  <Input
                    id="srv-order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                    dir="ltr"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="srv-active" className="block mb-2">حالة التفعيل</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="srv-active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <span className="text-sm">
                      {formData.is_active ? 'نشط (ظاهر للزوار)' : 'معطل (مخفي)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
                إلغاء
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                حفظ
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ServicesPage
