
import { useEffect, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  settingsManager,
  uploadImage,
  type SiteSettings,
} from "@/lib/supabaseContentManager";
import { useSiteData, getCachedSiteData, setCachedSiteData } from "@/contexts/SiteDataContext";
import {
  Loader2,
  Save,
  Globe,
  Phone,
  MessageSquare,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface SettingsFormData {
  site_name: string;
  phone: string;
  whatsapp: string;
  description: string;
  seo_title: string;
  seo_description: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_paragraph1: string;
  hero_image: string;
}

const initialFormData: SettingsFormData = {
  site_name: "",
  phone: "",
  whatsapp: "",
  description: "",
  seo_title: "",
  seo_description: "",
  logo_url: "",
  hero_title: "",
  hero_subtitle: "",
  hero_paragraph1: "",
  hero_image: "",
};

const SettingsPage = () => {
  const { refreshData } = useSiteData();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] =
    useState<SettingsFormData>(initialFormData);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // تحرير رابط المعاينة المؤقت عند تغييره أو مغادرة الصفحة
  useEffect(() => {
    return () => {
      if (heroImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(heroImagePreview);
      }
    };
  }, [heroImagePreview]);

  // تحميل الإعدادات من Supabase
  const loadSettings = async () => {
    setLoading(true);

    try {
      const data: SiteSettings | null =
        await settingsManager.getSettings();

      if (!data) {
        setFormData(initialFormData);
        setLastUpdated(null);
        return;
      }

      setFormData({
        site_name: data.site_name || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        description: data.description || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        logo_url: data.logo_url || "",
        hero_title: data.hero_title || "",
        hero_subtitle: data.hero_subtitle || "",
        hero_paragraph1: data.hero_paragraph1 || "",
        hero_image: data.hero_image || "",
      });

      setLastUpdated(data.updated_at || null);
      setHeroImageFile(null);
      setHeroImagePreview(null);
    } catch (error) {
      console.error("Error loading settings:", error);
      toast.error("تعذر تحميل إعدادات الموقع");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  const handleChange = (
    field: keyof SettingsFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // اختيار صورة الهيرو ومعاينتها
  const handleHeroImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة صالح");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب ألا يتجاوز 5 ميجابايت");
      event.target.value = "";
      return;
    }

    setHeroImageFile(file);
    setHeroImagePreview(URL.createObjectURL(file));
  };

  // حفظ الإعدادات
  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      let heroImageUrl = formData.hero_image;

      // رفع الصورة الجديدة أولًا عند اختيارها
      if (heroImageFile) {
        toast.info("جاري رفع صورة الواجهة الرئيسية...");

        heroImageUrl = await uploadImage(
          heroImageFile,
          "website-assets",
          "hero"
        );

        if (!heroImageUrl) {
          throw new Error("لم يتم الحصول على رابط صورة الهيرو");
        }
      }

      // الحقول الموجودة في جدول site_settings
      const supportedData = {
        site_name: formData.site_name.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim(),
        description: formData.description.trim(),
        seo_title: formData.seo_title.trim(),
        seo_description: formData.seo_description.trim(),
        logo_url: formData.logo_url.trim(),
        hero_title: formData.hero_title.trim(),
        hero_subtitle: formData.hero_subtitle.trim(),
        hero_paragraph1: formData.hero_paragraph1.trim(),
        hero_image: heroImageUrl,
      };

      const result =
        await settingsManager.updateSettings(supportedData);

      console.log("نتيجة حفظ الإعدادات:", result);

      if (!result.success) {
        toast.error(
          result.error || "فشل حفظ الإعدادات في قاعدة البيانات"
        );
        return;
      }

      setHeroImageFile(null);
      setHeroImagePreview(null);

      // تحديث الكاش المحلي فوراً ومزامنة التبويبات الأخرى
      const currentCache = getCachedSiteData();
      if (currentCache) {
        setCachedSiteData({
          ...currentCache,
          siteSettings: {
            ...currentCache.siteSettings,
            ...supportedData,
          },
          timestamp: Date.now(),
        });
      }

      // إعادة جلب البيانات بعد الحفظ
      await refreshData();
      await loadSettings();

      toast.success("تم حفظ إعدادات الموقع بنجاح");
    } catch (error) {
      console.error("Error saving settings:", error);

      const message =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء حفظ الإعدادات";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-3 text-muted-foreground">
          جاري تحميل إعدادات الموقع...
        </span>
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            إعدادات الموقع
          </h1>
          <p className="mt-1 text-muted-foreground">
            إدارة البيانات الأساسية وأرقام التواصل ومعلومات تحسين محركات البحث
          </p>
        </div>

        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            آخر تحديث: {new Date(lastUpdated).toLocaleString("ar-SA")}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* البيانات العامة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Globe className="h-5 w-5 text-primary" />
              البيانات العامة
            </CardTitle>
            <CardDescription>
              اسم المؤسسة والوصف العام للموقع
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">اسم الموقع / المؤسسة</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) =>
                  handleChange("site_name", e.target.value)
                }
                placeholder="ربوع البلاد للمظلات والسواتر"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">نبذة عن المؤسسة</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                placeholder="نبذة مختصرة عن المؤسسة وخدماتها"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_url" className="flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                رابط الشعار
              </Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) =>
                  handleChange("logo_url", e.target.value)
                }
                placeholder="https://... أو /images/logo.webp"
                dir="ltr"
                className="text-right"
              />

              {formData.logo_url && (
                <div className="mt-2 inline-block rounded-md bg-muted p-2">
                  <img
                    src={formData.logo_url}
                    alt="معاينة الشعار"
                    className="h-12 max-w-48 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* معلومات التواصل */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Phone className="h-5 w-5 text-primary" />
              معلومات التواصل المباشر
            </CardTitle>
            <CardDescription>
              أرقام الاتصال والواتساب المعروضة للعملاء
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="ml-1 inline h-4 w-4" />
                رقم الهاتف الرئيسي
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                placeholder="05XXXXXXXX"
                dir="ltr"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">
                <MessageSquare className="ml-1 inline h-4 w-4 text-green-600" />
                رقم الواتساب
              </Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) =>
                  handleChange("whatsapp", e.target.value)
                }
                placeholder="9665XXXXXXXX"
                dir="ltr"
                className="text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="h-5 w-5 text-primary" />
              إعدادات تحسين محركات البحث (SEO)
            </CardTitle>
            <CardDescription>
              العناوين والأوصاف الافتراضية لمحركات البحث
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo_title">
                عنوان الميتا الافتراضي (SEO Title)
              </Label>
              <Input
                id="seo_title"
                value={formData.seo_title}
                onChange={(e) =>
                  handleChange("seo_title", e.target.value)
                }
                placeholder="ربوع البلاد للمظلات والسواتر | مكة المكرمة والمدينة المنورة"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">
                وصف الميتا لمحركات البحث (SEO Description)
              </Label>
              <Textarea
                id="seo_description"
                rows={3}
                value={formData.seo_description}
                onChange={(e) =>
                  handleChange("seo_description", e.target.value)
                }
                placeholder="تصميم وتنفيذ وتركيب المظلات والسواتر والبرجولات والهناجر في مكة المكرمة والمدينة المنورة..."
                dir="rtl"
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الواجهة الرئيسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ImageIcon className="h-5 w-5 text-primary" />
              إعدادات الواجهة الرئيسية (Hero)
            </CardTitle>
            <CardDescription>
              تعديل العنوان والنص والصورة الظاهرة في أعلى الصفحة الرئيسية
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_title">العنوان الرئيسي</Label>
              <Input
                id="hero_title"
                value={formData.hero_title}
                onChange={(e) =>
                  handleChange("hero_title", e.target.value)
                }
                placeholder="المؤسسة المتخصصة في تصميم وتركيب المظلات والسواتر"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">العنوان الفرعي</Label>
              <Input
                id="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={(e) =>
                  handleChange("hero_subtitle", e.target.value)
                }
                placeholder="أفضل جودة وأسعار منافسة في مكة والمدينة المنورة"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero_paragraph1">النص التعريفي</Label>
              <Textarea
                id="hero_paragraph1"
                rows={3}
                value={formData.hero_paragraph1}
                onChange={(e) =>
                  handleChange("hero_paragraph1", e.target.value)
                }
                placeholder="نقدم تصميم وتركيب المظلات والسواتر والبرجولات والهناجر..."
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label>صورة خلفية الواجهة الرئيسية</Label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {(heroImagePreview || formData.hero_image) && (
                  <div className="relative h-28 w-48 overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={heroImagePreview || formData.hero_image}
                      alt="معاينة صورة الواجهة الرئيسية"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted">
                  <ImageIcon size={16} />
                  اختيار صورة جديدة
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroImageChange}
                    disabled={saving}
                  />
                </label>

                {heroImageFile && (
                  <span className="text-xs text-muted-foreground">
                    الصورة الجديدة جاهزة للرفع عند الحفظ
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* أزرار التحكم */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => void loadSettings()}
            disabled={saving}
          >
            إلغاء التغييرات
          </Button>

          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="ml-2 h-4 w-4" />
            )}
            {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
