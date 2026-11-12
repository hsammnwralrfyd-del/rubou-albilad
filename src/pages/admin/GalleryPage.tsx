import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { galleryManager, type GalleryItem } from '@/lib/supabaseContentManager'
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

const GalleryPage = () => {
  const { refreshData } = useSiteData()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    alt_text: '',
    sort_order: 0,
  })

  useEffect(() => {
    loadGallery()
      void refreshData()
  }, [])

  const loadGallery = async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await galleryManager.getAll()
      setGallery(data)
    } catch (err) {
      console.error('Failed to load gallery:', err)
      const errorMsg = 'تعذر تحميل صور المعرض من الخادم. يرجى المحاولة مرة أخرى.'
      setLoadError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      image_url: item.image_url,
      alt_text: item.alt_text || '',
      sort_order: item.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      image_url: '',
      alt_text: '',
      sort_order: gallery.length + 1,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image_url.trim()) {
      toast.error('يرجى إدخال رابط الصورة')
      return
    }

    setSaving(true)
    let success = false

    const payload = {
      title: formData.title.trim() || null,
      image_url: formData.image_url.trim(),
      alt_text: formData.alt_text.trim() || null,
      sort_order: Number(formData.sort_order) || 0,
    }

    let result = { success: false, error: '' }
    if (editingItem) {
      const res = await galleryManager.update(editingItem.id, payload)
      result = { success: res, error: res ? '' : 'فشل التحديث' }
    } else {
      const res = await galleryManager.create(payload)
      result = { success: res.success, error: res.error || '' }
    }

    setSaving(false)

    if (result.success) {
      toast.success(editingItem ? 'تم تحديث بيانات الصورة بنجاح' : 'تم إضافة الصورة بنجاح')
      setIsDialogOpen(false)
      loadGallery()
    } else {
      toast.error(result.error || 'فشل حفظ الصورة، يرجى التحقق من الاتصال وصلاحيات RLS')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة نهائياً؟')) return

    const res = await galleryManager.delete(id)
    if (res) {
      toast.success('تم حذف الصورة بنجاح')
      loadGallery()
    } else {
      toast.error('فشل حذف الصورة')
    }
  }

  if (loading) {
    return (
      <div dir="rtl" className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-3 text-muted-foreground">جاري تحميل صور المعرض...</span>
      </div>
    )
  }

  if (loadError && gallery.length === 0) {
    return (
      <div dir="rtl" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">معرض الصور</h1>
          </div>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-destructive font-medium">{loadError}</p>
            <Button onClick={() => void loadGallery()} variant="outline">
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
          <h1 className="text-3xl font-bold tracking-tight">معرض الصور</h1>
          <p className="text-muted-foreground mt-1">
            إدارة صور الأعمال والمشاريع وترتيب ظهورها والنصوص البديلة
          </p>
        </div>
        <Button onClick={handleCreate} className="self-start sm:self-auto">
          <Plus className="h-4 w-4 ml-2" />
          إضافة صورة جديدة
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-square bg-muted relative group">
                <img
                  src={item.image_url}
                  alt={item.alt_text || item.title || 'صورة المعرض'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = ''
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center')
                  }}
                />
              </div>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-base line-clamp-1">
                  {item.title || 'بدون عنوان'}
                </CardTitle>
                {item.alt_text && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Alt: {item.alt_text}
                  </p>
                )}
              </CardHeader>
            </div>
            <CardContent className="p-3 pt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                <span>الترتيب: {item.sort_order}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {gallery.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed rounded-lg bg-card text-muted-foreground">
            <ImageIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-50" />
            لا توجد صور في المعرض حالياً.
          </div>
        )}
      </div>

      {/* Dialog for Add / Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent dir="rtl" className="sm:max-w-md">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'تعديل بيانات الصورة' : 'إضافة صورة إلى المعرض'}
              </DialogTitle>
              <DialogDescription>
                أدخل رابط الصورة وعنوانها وترتيب ظهورها
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="gal-img">رابط الصورة (Image URL) *</Label>
                <Input
                  id="gal-img"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://... أو مسار الصورة"
                  dir="ltr"
                  className="text-right"
                  required
                />
                {formData.image_url && (
                  <div className="mt-2 h-24 w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={formData.image_url}
                      alt="معاينة"
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gal-title">عنوان الصورة (اختياري)</Label>
                <Input
                  id="gal-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: مظلات هرمية للفلل"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gal-alt">النص البديل لمحركات البحث (Alt Text)</Label>
                <Input
                  id="gal-alt"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="وصف الصورة لمحركات البحث ومساعدات القراءة"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gal-order">ترتيب العرض</Label>
                <Input
                  id="gal-order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                  dir="ltr"
                  className="text-right"
                />
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

export default GalleryPage
