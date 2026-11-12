
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Database, ExternalLink, Layers, Settings,
  Menu as MenuIcon, Briefcase, FolderKanban,
  Image as ImageIcon, FileText, Search, Upload,
  Save, Loader2, Plus, Edit3, Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { client as defaultClient } from '@/config/client';
import {
  servicesList as defaultServices,
  ServiceDefinition,
} from '@/config/services';
import { seoData as defaultSeoData } from '@/utils/seo/seoData';

import {
  settingsManager,
  servicesManager,
  galleryManager,
  uploadImage,
  matchDbServiceToCanonical,
} from '@/lib/supabaseContentManager';

import { useSiteData } from '@/contexts/SiteDataContext';
import { assetPath } from '@/lib/assetPath';
import { supabase } from '@/lib/supabase';

type DashboardSiteSettings = {
  site_name: string;
  phone: string;
  whatsapp: string;
  description: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_paragraph1: string;
  hero_image: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
};

type DashboardNavLink = {
  id: number;
  label: string;
  to: string;
  is_active: boolean;
};

type DashboardService = ServiceDefinition & {
  supabaseId?: string;
  sort_order: number;
  is_active: boolean;
};

type DashboardGalleryItem = {
  id: string | number;
  title: string | null;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

type DashboardProject = {
  id: number;
  supabaseId?: number;
  title: string;
  description: string;
  image: string;
  link: string;
  display_order: number;
};

type ServiceFeature = {
  title: string;
  description: string;
};

const LEGACY_SERVICE_TITLES = new Set([
  'مظلات المدينة المنورة',
  'سواتر المدينة المنورة',
  'برجولات المدينة المنورة',
  'هناجر المدينة المنورة',
  'ساندوتش بانل المدينة المنورة',
  'الشبوك والتسوير مكة المكرمة',
  ' الشبوك والتسوير مكة المكرمة',
  'بيوت شعر المدينة المنورة',
  'قراميد المدينة المنورة',
  'هناجر قماش',
]);

const projectImages = [
  'canopies/1.webp',
  'shutters/1.webp',
  'Pergolas1/1.webp',
  'sandwich-warehouses/1.webp',
  'pyramidal-car-canopies/1.webp',
  'fencing/1.webp',
];

const defaultGallery: DashboardGalleryItem[] = [
  {
    id: 1,
    title: 'مظلات سيارات هرمية',
    image_url: '/pyramidal-car-canopies/1.webp',
    alt_text: 'مظلات سيارات مكة والمدينة',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'سواتر شرائح حديد',
    image_url: '/shutters/1.webp',
    alt_text: 'سواتر شرائح ومجدول',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'برجولات جلسات حدائق',
    image_url: '/Pergolas1/1.webp',
    alt_text: 'برجولات حدائق مودرن',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'تشييد هناجر تجارية',
    image_url: '/WarehousesDetail1/1.webp',
    alt_text: 'هناجر ومستودعات',
    sort_order: 4,
  },
  {
    id: 5,
    title: 'ساندوتش بانل المدينة المنورة عازل',
    image_url: '/sandwich-warehouses/1.webp',
    alt_text: 'ساندوتش بانل المدينة المنورة عازل',
    sort_order: 5,
  },
  {
    id: 6,
    title: 'شبوك تسوير منشآت',
    image_url: '/fencing/1.webp',
    alt_text: 'شبوك حماية ومزارع',
    sort_order: 6,
  },
];

const emptyFeatures: ServiceFeature[] = [
  { title: '', description: '' },
  { title: '', description: '' },
  { title: '', description: '' },
  { title: '', description: '' },
];

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'settings';
  const { refreshData } = useSiteData();

  const [isSupabaseOnline] = useState<boolean>(!!supabase);
  const [isSaving, setIsSaving] = useState(false);

  // ============================================================
  // إعدادات الموقع - أبقينا آلية الحفظ كما هي
  // ============================================================

  const [siteSettings, setSiteSettings] =
    useState<DashboardSiteSettings>({
      site_name: defaultClient.companyName,
      phone: defaultClient.phoneDisplay,
      whatsapp: defaultClient.phoneIntl,
      description: defaultClient.description,
      logo_url: '/icon1/icon.webp',
      hero_title: defaultClient.hero.title,
      hero_subtitle: defaultClient.hero.subtitle,
      hero_paragraph1: defaultClient.hero.paragraph1,
      hero_image: '/hero-bg.webp',
      seo_title: defaultSeoData.home.title,
      seo_description: defaultSeoData.home.description,
      seo_keywords: defaultSeoData.home.keywords,
    });

  const [heroImagePreview, setHeroImagePreview] =
    useState<string | null>(null);
  const [logoPreview, setLogoPreview] =
    useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  // ============================================================
  // القائمة
  // ============================================================

  const [navLinks, setNavLinks] = useState<DashboardNavLink[]>(
    defaultClient.navLinks.map((item, index) => ({
      ...item,
      id: index + 1,
      is_active: true,
    }))
  );

  // ============================================================
  // الخدمات
  // ============================================================

  const [services, setServices] = useState<DashboardService[]>(
    defaultServices.map((service, index) => ({
      ...service,
      sort_order: index + 1,
      is_active: true,
    }))
  );

  const [editingService, setEditingService] =
    useState<DashboardService | null>(null);

  const [serviceForm, setServiceForm] = useState({
    title: '',
    shortTitle: '',
    badge: '',
    introDescription: '',
    cardImage: '',
    sort_order: 1,
    is_active: true,
  });

  const [serviceImagePreview, setServiceImagePreview] =
    useState<string | null>(null);
  const [serviceFile, setServiceFile] = useState<File | null>(null);

  // ============================================================
  // المشاريع
  // ============================================================

  const [projects, setProjects] = useState<DashboardProject[]>(
    defaultClient.projects.map((project, index) => ({
      ...project,
      id: index + 1,
      image:
        (project as any).image ||
        projectImages[index % projectImages.length],
      display_order: index + 1,
    }))
  );

  const [editingProject, setEditingProject] =
    useState<DashboardProject | null>(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    link: '',
    image: '',
  });

  const [projectImagePreview, setProjectImagePreview] =
    useState<string | null>(null);
  const [projectFile, setProjectFile] = useState<File | null>(null);

  // ============================================================
  // المعرض
  // ============================================================

  const [galleryImages, setGalleryImages] =
    useState<DashboardGalleryItem[]>(defaultGallery);

  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    image_url: '',
    alt_text: '',
    sort_order: 7,
  });

  const [galleryPreview, setGalleryPreview] =
    useState<string | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] =
    useState(false);

  // ============================================================
  // تفاصيل صفحات الخدمات
  // ============================================================

  const [selectedDetailId, setSelectedDetailId] =
    useState<string>('canopies');

  const selectedDetailService =
    services.find((service) => service.id === selectedDetailId) ||
    services[0];

  const [detailForm, setDetailForm] = useState({
    title: '',
    heroSubtitle: '',
    introTitle: '',
    introDescription: '',
    benefitsTitle: '',
    headerImage: '',
    benefits: [] as string[],
    features: [] as ServiceFeature[],
  });

  const [detailHeaderPreview, setDetailHeaderPreview] =
    useState<string | null>(null);
  const [detailHeaderFile, setDetailHeaderFile] =
    useState<File | null>(null);

  // ============================================================
  // SEO
  // ============================================================

  const [selectedSeoPage, setSelectedSeoPage] =
    useState<string>('home');

  const [seoForm, setSeoForm] = useState({
    title: siteSettings.seo_title,
    description: siteSettings.seo_description,
    keywords: siteSettings.seo_keywords,
  });

  // ============================================================
  // أدوات مساعدة
  // ============================================================

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void,
    setFile?: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('يرجى اختيار ملف صورة صالح.');
      event.target.value = '';
      return;
    }

    if (setFile) setFile(file);

    const reader = new FileReader();

    reader.onload = () => setPreview(reader.result as string);
    reader.onerror = () => toast.error('تعذرت قراءة الصورة.');
    reader.readAsDataURL(file);
  };

  const getCanonicalId = (service: DashboardService) =>
    String(service.id);

  // ============================================================
  // تحميل البيانات من Supabase
  // ============================================================

  const fetchDashboardData = useCallback(async () => {
    if (!supabase) return;

    try {
      const [
        settingsResult,
        servicesResult,
        galleryResult,
        projectsResult,
        navigationResult,
        detailsResult,
        seoResult,
      ] = await Promise.all([
        settingsManager.getSettings(),
        servicesManager.getAllIncludingInactive(),
        galleryManager.getAll(),
        supabase.from('projects')
          .select('*')
          .order('display_order', { ascending: true }),
        supabase.from('navigation_links')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase.from('service_page_details').select('*'),
        supabase.from('service_seo').select('*'),
      ]);

      // الإعدادات - لا نغيّر منطقها
      if (settingsResult) {
        setSiteSettings((previous) => ({
          ...previous,
          site_name: settingsResult.site_name || previous.site_name,
          phone: settingsResult.phone || previous.phone,
          whatsapp: settingsResult.whatsapp || previous.whatsapp,
          description: settingsResult.description || previous.description,
          logo_url: settingsResult.logo_url || previous.logo_url,
          seo_title: settingsResult.seo_title || previous.seo_title,
          seo_description:
            settingsResult.seo_description || previous.seo_description,
          seo_keywords:
            settingsResult.seo_keywords || previous.seo_keywords,
          hero_title: settingsResult.hero_title || previous.hero_title,
          hero_subtitle:
            settingsResult.hero_subtitle || previous.hero_subtitle,
          hero_paragraph1:
            settingsResult.hero_paragraph1 || previous.hero_paragraph1,
          hero_image: settingsResult.hero_image || previous.hero_image,
        }));
      }

      // الخدمات
      if (servicesResult?.length) {
        setServices((previous) =>
          previous.map((definition, index) => {
            const expectedOrder = index + 1;

            const matched = servicesResult.find(
              (dbService) =>
                Number(dbService.sort_order ?? dbService.display_order) ===
                expectedOrder
            );

            if (!matched) return definition;

            const rawTitle = matched.title?.trim() || '';

            return {
              ...definition,
              supabaseId: String(matched.id),
              title: rawTitle || definition.title,
              introDescription:
                matched.description || definition.introDescription,
              cardImage: matched.image_url || definition.cardImage,
              sort_order: matched.sort_order ?? expectedOrder,
              is_active: matched.is_active ?? true,
            };
          })
        );
      }

      // القائمة
      if (!navigationResult.error && navigationResult.data?.length) {
        setNavLinks(
          navigationResult.data.map((item: any) => ({
            id: Number(item.id),
            label: item.label || '',
            to: item.to || '/',
            is_active: Boolean(item.is_active),
          }))
        );
      }

      // المشاريع
      if (!projectsResult.error && projectsResult.data?.length) {
        setProjects(
          projectsResult.data.map((item: any) => ({
            id: Number(item.id),
            supabaseId: Number(item.id),
            title: item.title || '',
            description: item.description || '',
            image: item.image || '',
            link: item.link || '',
            display_order: item.display_order ?? 0,
          }))
        );
      }

      // المعرض
      if (galleryResult?.length) {
        setGalleryImages(
          galleryResult.map((item: any) => ({
            id: String(item.id),
            title: item.title ?? null,
            image_url: item.image_url || item.image || '',
            alt_text: item.alt_text || item.title || '',
            sort_order: item.sort_order ?? item.display_order ?? 0,
          }))
        );
      }

      // تفاصيل صفحات الخدمات
      if (!detailsResult.error && detailsResult.data?.length) {
        const current = detailsResult.data.find(
          (item: any) => item.canonical_id === selectedDetailId
        );

        if (current) {
          setDetailForm((previous) => ({
            ...previous,
            heroSubtitle: current.hero_subtitle || previous.heroSubtitle,
            introTitle: current.intro_title || previous.introTitle,
            benefitsTitle: current.benefits_title || previous.benefitsTitle,
            benefits: Array.isArray(current.benefits)
              ? current.benefits
              : previous.benefits,
            features: Array.isArray(current.features)
              ? current.features
              : previous.features,
            headerImage: current.header_image || previous.headerImage,
          }));
        }
      }

      // SEO للصفحات
      if (!seoResult.error && seoResult.data?.length) {
        const currentSeo = seoResult.data.find(
          (item: any) => item.canonical_id === selectedSeoPage
        );

        if (currentSeo && selectedSeoPage !== 'home') {
          setSeoForm({
            title: currentSeo.seo_title || '',
            description: currentSeo.seo_description || '',
            keywords: currentSeo.seo_keywords || '',
          });
        }
      }
    } catch (error) {
      console.error('Dashboard load error:', error);
      toast.error('تعذر تحميل بعض بيانات لوحة التحكم.');
    }
  }, [selectedDetailId, selectedSeoPage]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ============================================================
  // تحديث نموذج تفاصيل الخدمة عند تغيير الخدمة
  // ============================================================

  useEffect(() => {
    if (!selectedDetailService) return;

    setDetailForm({
      title: selectedDetailService.title,
      heroSubtitle: selectedDetailService.heroSubtitle || '',
      introTitle: selectedDetailService.introTitle || '',
      introDescription: selectedDetailService.introDescription || '',
      benefitsTitle: selectedDetailService.benefitsTitle || '',
      headerImage:
        selectedDetailService.cardImage ||
        `/${selectedDetailService.folder}/header.webp`,
      benefits: [...(selectedDetailService.benefits || [])],
      features: [...(selectedDetailService.features || [])],
    });

    setDetailHeaderPreview(null);
    setDetailHeaderFile(null);
  }, [selectedDetailId]);

  // ============================================================
  // تحديث نموذج SEO عند اختيار صفحة
  // ============================================================

  useEffect(() => {
    if (selectedSeoPage === 'home') {
      setSeoForm({
        title: siteSettings.seo_title,
        description: siteSettings.seo_description,
        keywords: siteSettings.seo_keywords,
      });
      return;
    }

    const service = services.find(
      (item) => item.id === selectedSeoPage
    );

    if (service) {
      setSeoForm({
        title: `${service.title} | ربوع البلاد`,
        description: service.introDescription || '',
        keywords: `${service.title}, تركيب ${service.title}, ${service.shortTitle || ''}`,
      });
    }
  }, [
    selectedSeoPage,
    siteSettings.seo_title,
    siteSettings.seo_description,
    siteSettings.seo_keywords,
  ]);

  // ============================================================
  // حفظ إعدادات الموقع - كما هي
  // ============================================================

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      if (!supabase) {
        toast.error('اتصال Supabase غير متاح.');
        return;
      }

      let finalLogoUrl = siteSettings.logo_url;
      let finalHeroUrl = siteSettings.hero_image;

      if (logoFile) {
        const uploaded = await uploadImage(
          logoFile,
          'website-assets',
          'logo'
        );

        if (!uploaded) {
          toast.error('تعذر رفع الشعار.');
          return;
        }

        finalLogoUrl = uploaded;
      }

      if (heroFile) {
        const uploaded = await uploadImage(
          heroFile,
          'website-assets',
          'hero'
        );

        if (!uploaded) {
          toast.error('تعذر رفع صورة Hero.');
          return;
        }

        finalHeroUrl = uploaded;
      }

      const result = await settingsManager.updateSettings({
        site_name: siteSettings.site_name,
        phone: siteSettings.phone,
        whatsapp: siteSettings.whatsapp,
        description: siteSettings.description,
        logo_url: finalLogoUrl,
        seo_title: siteSettings.seo_title,
        seo_description: siteSettings.seo_description,
        hero_title: siteSettings.hero_title,
        hero_subtitle: siteSettings.hero_subtitle,
        hero_paragraph1: siteSettings.hero_paragraph1,
        hero_image: finalHeroUrl,
      });

      if (!result.success) {
        toast.error(result.error || 'تعذر حفظ الإعدادات.');
        return;
      }

      setSiteSettings((previous) => ({
        ...previous,
        logo_url: finalLogoUrl,
        hero_image: finalHeroUrl,
      }));

      setLogoPreview(null);
      setLogoFile(null);
      setHeroImagePreview(null);
      setHeroFile(null);

      await refreshData();
      toast.success('تم حفظ إعدادات الموقع بنجاح.');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'حدث خطأ أثناء حفظ الإعدادات.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // حفظ القائمة في navigation_links
  // ============================================================

  const handleSaveNavigation = async () => {
    if (!supabase) {
      toast.error('اتصال Supabase غير متاح.');
      return;
    }

    setIsSaving(true);

    try {
      const { error: deleteError } = await supabase
        .from('navigation_links')
        .delete()
        .neq('id', 0);

      if (deleteError) throw deleteError;

      const payload = navLinks.map((item, index) => ({
        label: item.label.trim(),
        to: item.to.trim(),
        is_active: item.is_active,
        sort_order: index + 1,
      }));

      const { error } = await supabase
        .from('navigation_links')
        .insert(payload);

      if (error) throw error;

      await refreshData();
      toast.success('تم حفظ القائمة وترتيب روابطها بنجاح.');
    } catch (error: any) {
      console.error('Navigation save error:', error);
      toast.error(error?.message || 'تعذر حفظ القائمة.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveService = async () => {
    if (!editingService || !supabase) return;

    setIsSaving(true);

    try {
      let finalImageUrl = serviceForm.cardImage;

      // رفع صورة الخدمة إذا تم اختيار صورة جديدة
      if (serviceFile) {
        const uploaded = await uploadImage(
          serviceFile,
          'website-assets',
          `services/${editingService.id}`
        );

        if (!uploaded) {
          toast.error('تعذر رفع صورة الخدمة.');
          return;
        }

        finalImageUrl = uploaded;
      }

      // الأعمدة المؤكدة في جدول services
      const payload = {
        title: serviceForm.title.trim(),
        description: serviceForm.introDescription,
        image_url: finalImageUrl,
        sort_order: serviceForm.sort_order,
        is_active: serviceForm.is_active,
      };

      let result;

      // تحديث السجل الموجود فعلياً
      if (editingService.supabaseId) {
        result = await supabase
          .from('services')
          .update(payload)
          .eq('id', editingService.supabaseId)
          .select('*')
          .single();
      } else {
        // إضافة سجل جديد إذا لم يكن للخدمة سجل في قاعدة البيانات
        result = await supabase
          .from('services')
          .insert(payload)
          .select('*')
          .single();
      }

      if (result.error) {
        console.error('Supabase service save error:', result.error);
        toast.error(`فشل حفظ الخدمة: ${result.error.message}`);
        return;
      }

      if (!result.data) {
        toast.error('لم يتم العثور على سجل الخدمة بعد الحفظ.');
        return;
      }

      const savedService = result.data;

      // تحديث بيانات الخدمة في لوحة التحكم
      setServices((previous) =>
        previous.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                supabaseId: String(savedService.id),
                title: savedService.title,
                introDescription: savedService.description ?? '',
                cardImage: savedService.image_url ?? '',
                sort_order: savedService.sort_order,
                is_active: savedService.is_active,
              }
            : service
        )
      );

      // تحديث بيانات الموقع
      await refreshData();

      toast.success('تم حفظ الخدمة في قاعدة البيانات بنجاح.');

      setEditingService(null);
      setServiceFile(null);
      setServiceImagePreview(null);

    } catch (error: any) {
      console.error('Service save error:', error);
      toast.error(error?.message || 'حدث خطأ أثناء حفظ الخدمة.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // حفظ صفحة التفصيل في service_page_details
  // ============================================================

  const handleSaveDetail = async () => {
    if (!selectedDetailService || !supabase) {
      toast.error('لم يتم تحديد الخدمة.');
      return;
    }

    setIsSaving(true);

    try {
      let finalHeaderImage = detailForm.headerImage;

      if (detailHeaderFile) {
        const uploaded = await uploadImage(
          detailHeaderFile,
          'website-assets',
          `service-details/${selectedDetailId}`
        );

        if (!uploaded) {
          toast.error('تعذر رفع صورة الترويسة.');
          return;
        }

        finalHeaderImage = uploaded;
      }

      const servicePayload = {
        title: detailForm.title.trim(),
        description: detailForm.introDescription,
      };

      const allDb = await servicesManager.getAllIncludingInactive();

      let matched = selectedDetailService.supabaseId
        ? allDb.find(
            (item) =>
              String(item.id) ===
              String(selectedDetailService.supabaseId)
          )
        : undefined;

      if (!matched) {
        matched = allDb.find((item) =>
          matchDbServiceToCanonical(
            item,
            undefined,
            undefined,
            selectedDetailService.title
          )
        );
      }

      let serviceSaveResult: any;

      if (matched) {
        serviceSaveResult = await servicesManager.update(
          matched.id,
          servicePayload
        );
      } else {
        serviceSaveResult = await servicesManager.create({
          ...servicePayload,
          image_url: selectedDetailService.cardImage || '',
          sort_order:
            services.findIndex(
              (item) => item.id === selectedDetailId
            ) + 1,
          is_active: true,
        });
      }

      if (!serviceSaveResult?.success || !serviceSaveResult.data) {
        throw new Error(
          serviceSaveResult?.error || 'تعذر حفظ عنوان الخدمة ووصفها.'
        );
      }

      const detailPayload = {
        canonical_id: selectedDetailId,
        service_id: Number(serviceSaveResult.data.id),
        hero_subtitle: detailForm.heroSubtitle,
        intro_title: detailForm.introTitle,
        benefits_title: detailForm.benefitsTitle,
        benefits: detailForm.benefits,
        features: detailForm.features,
        header_image: finalHeaderImage,
      };

      const { error } = await supabase
        .from('service_page_details')
        .upsert(detailPayload, { onConflict: 'canonical_id' });

      if (error) throw error;

      setServices((previous) =>
        previous.map((service) =>
          service.id === selectedDetailId
            ? {
                ...service,
                supabaseId: String(serviceSaveResult.data.id),
                title: detailForm.title.trim(),
                introDescription: detailForm.introDescription,
                heroSubtitle: detailForm.heroSubtitle,
                introTitle: detailForm.introTitle,
                benefitsTitle: detailForm.benefitsTitle,
                benefits: detailForm.benefits,
                features: detailForm.features,
              }
            : service
        )
      );

      setDetailForm((previous) => ({
        ...previous,
        headerImage: finalHeaderImage,
      }));

      setDetailHeaderPreview(null);
      setDetailHeaderFile(null);

      await refreshData();
      toast.success('تم حفظ تفاصيل صفحة الخدمة بالكامل.');
    } catch (error: any) {
      console.error('Detail save error:', error);
      toast.error(error?.message || 'تعذر حفظ تفاصيل الصفحة.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // حفظ المشاريع في projects
  // ============================================================

  const handleSaveProject = async () => {
    if (!editingProject || !supabase) return;

    setIsSaving(true);

    try {
      let finalImage = projectForm.image;

      if (projectFile) {
        const uploaded = await uploadImage(
          projectFile,
          'website-assets',
          `projects/${editingProject.id}`
        );

        if (!uploaded) {
          toast.error('تعذر رفع صورة المشروع.');
          return;
        }

        finalImage = uploaded;
      }

      const payload = {
        title: projectForm.title.trim(),
        description: projectForm.description,
        image: finalImage,
        link: projectForm.link,
        display_order: editingProject.display_order,
        is_active: true,
      };

      let saved: any;

      if (editingProject.supabaseId) {
        const { data, error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.supabaseId)
          .select()
          .single();

        if (error) throw error;
        saved = data;
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        saved = data;
      }

      setProjects((previous) =>
        previous.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                id: Number(saved.id),
                supabaseId: Number(saved.id),
                title: saved.title,
                description: saved.description || '',
                image: saved.image || '',
                link: saved.link || '',
                display_order: saved.display_order ?? project.display_order,
              }
            : project
        )
      );

      setEditingProject(null);
      setProjectImagePreview(null);
      setProjectFile(null);

      await refreshData();
      toast.success('تم حفظ المشروع وصورته في قاعدة البيانات.');
    } catch (error: any) {
      console.error('Project save error:', error);
      toast.error(error?.message || 'تعذر حفظ المشروع.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // إضافة صورة للمعرض
  // ============================================================

  const handleSaveNewGallery = async () => {
    if (!galleryFile || !galleryPreview || !supabase) {
      toast.error('اختر صورة من جهازك أولاً.');
      return;
    }

    setIsSaving(true);

    try {
      const finalUrl = await uploadImage(
        galleryFile,
        'website-assets',
        'gallery'
      );

      if (!finalUrl) throw new Error('تعذر رفع الصورة إلى Storage.');

      const nextOrder =
        galleryImages.length > 0
          ? Math.max(...galleryImages.map((item) => item.sort_order || 0)) + 1
          : 1;

      const result = await galleryManager.create({
        title: newGalleryItem.title || 'صورة من المعرض',
        image_url: finalUrl,
        alt_text:
          newGalleryItem.alt_text ||
          newGalleryItem.title ||
          'صورة من المعرض',
        sort_order: nextOrder,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'فشل حفظ الصورة.');
      }

      const saved = result.data;

      setGalleryImages((previous) => [
        ...previous,
        {
          id: String(saved.id),
          title: saved.title,
          image_url: saved.image_url || finalUrl,
          alt_text: saved.alt_text || '',
          sort_order: saved.sort_order ?? nextOrder,
        },
      ]);

      setIsGalleryDialogOpen(false);
      setGalleryPreview(null);
      setGalleryFile(null);

      setNewGalleryItem({
        title: '',
        image_url: '',
        alt_text: '',
        sort_order: nextOrder + 1,
      });

      await refreshData();
      toast.success('تمت إضافة الصورة وحفظها بنجاح.');
    } catch (error: any) {
      console.error('Gallery add error:', error);
      toast.error(error?.message || 'تعذر إضافة الصورة.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // حذف صورة المعرض
  // ============================================================

  const handleDeleteGallery = async (id: string | number) => {
    if (!window.confirm('هل تريد حذف هذه الصورة نهائياً؟')) return;
    if (!supabase) return;

    setIsSaving(true);

    try {
      const result = await galleryManager.delete(String(id));

      if (!result.success) {
        throw new Error(result.error || 'تعذر حذف الصورة.');
      }

      setGalleryImages((previous) =>
        previous.filter((item) => String(item.id) !== String(id))
      );

      await refreshData();
      toast.success('تم حذف الصورة.');
    } catch (error: any) {
      console.error('Gallery delete error:', error);
      toast.error(error?.message || 'حدث خطأ أثناء حذف الصورة.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // حفظ SEO
  // ============================================================

  const handleSaveSeo = async () => {
    if (!supabase) {
      toast.error('اتصال Supabase غير متاح.');
      return;
    }

    setIsSaving(true);

    try {
      if (selectedSeoPage === 'home') {
        const result = await settingsManager.updateSettings({
          seo_title: seoForm.title,
          seo_description: seoForm.description,
          seo_keywords: seoForm.keywords,
        });

        if (!result.success) {
          throw new Error(result.error || 'تعذر حفظ SEO الرئيسية.');
        }

        setSiteSettings((previous) => ({
          ...previous,
          seo_title: seoForm.title,
          seo_description: seoForm.description,
          seo_keywords: seoForm.keywords,
        }));

        await refreshData();
        toast.success('تم حفظ SEO الصفحة الرئيسية بنجاح.');
        return;
      }

      const service = services.find(
        (item) => item.id === selectedSeoPage
      );

      if (!service) {
        throw new Error('الخدمة المحددة غير موجودة.');
      }

      const { error } = await supabase
        .from('service_seo')
        .upsert(
          {
            canonical_id: selectedSeoPage,
            seo_title: seoForm.title,
            seo_description: seoForm.description,
            seo_keywords: seoForm.keywords,
          },
          { onConflict: 'canonical_id' }
        );

      if (error) throw error;

      await refreshData();
      toast.success(`تم حفظ SEO لخدمة ${service.title}.`);
    } catch (error: any) {
      console.error('SEO save error:', error);
      toast.error(error?.message || 'تعذر حفظ بيانات SEO.');
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // التبويبات
  // ============================================================

  const tabs = [
    { id: 'settings', label: 'إعدادات الموقع', icon: Settings },
    { id: 'navigation', label: 'القائمة', icon: MenuIcon },
    { id: 'services', label: 'الخدمات', icon: Briefcase },
    { id: 'projects', label: 'المشاريع', icon: FolderKanban },
    { id: 'gallery', label: 'المعرض', icon: ImageIcon },
    { id: 'details', label: 'صفحات التفصيل', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Search },
  ];

  // ============================================================
  // واجهة لوحة التحكم
  // ============================================================

  return (
    <div dir="rtl" className="space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary">
              لوحة التحكم
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              إدارة الموقع — إدارة محتوى الموقع
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
            >
              <ExternalLink size={16} />
              معاينة الموقع
            </Link>

            <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-semibold">
              <Database size={14} className="text-primary" />
              مصدر البيانات: Supabase
            </Badge>

            <Badge className={`gap-1.5 px-3 py-1.5 text-xs font-semibold ${
              isSupabaseOnline
                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
            }`}>
              <span className={`h-2 w-2 rounded-full ${
                isSupabaseOnline ? 'animate-pulse bg-green-600' : 'bg-amber-600'
              }`} />
              {isSupabaseOnline ? 'Supabase مهيأ' : 'Supabase غير مهيأ'}
            </Badge>

            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs font-semibold">
              <Layers size={14} className="text-accent" />
              22 صفحة تفصيلية
            </Badge>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================== */}
      {/* إعدادات الموقع */}
      {/* ====================================================== */}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">بيانات المؤسسة والشعار</CardTitle>
              <CardDescription>
                المعلومات الأساسية الظاهرة في الترويسة والتذييل وفي كامل الموقع
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site_name">اسم الموقع / المؤسسة</Label>
                  <Input
                    id="site_name"
                    value={siteSettings.site_name}
                    onChange={(event) =>
                      setSiteSettings({ ...siteSettings, site_name: event.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف الظاهر للاتصال</Label>
                  <Input
                    id="phone"
                    value={siteSettings.phone}
                    onChange={(event) =>
                      setSiteSettings({ ...siteSettings, phone: event.target.value })
                    }
                    dir="ltr"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">رقم الواتساب (مع الرمز الدولي)</Label>
                  <Input
                    id="whatsapp"
                    value={siteSettings.whatsapp}
                    onChange={(event) =>
                      setSiteSettings({ ...siteSettings, whatsapp: event.target.value })
                    }
                    dir="ltr"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label>شعار الموقع (Logo)</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted p-1">
                      <img
                        src={logoPreview || assetPath(siteSettings.logo_url)}
                        alt="Logo"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>

                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted">
                      <Upload size={16} />
                      استبدال الشعار من الجهاز
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          handleFileSelect(event, setLogoPreview, setLogoFile)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">النبذة التعريفية للمؤسسة</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={siteSettings.description}
                  onChange={(event) =>
                    setSiteSettings({ ...siteSettings, description: event.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">واجهة الصفحة الرئيسية (Hero Section)</CardTitle>
              <CardDescription>نصوص الترحيب وصورة الخلفية الرئيسية</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title">العنوان الرئيسي</Label>
                <Input
                  id="hero_title"
                  value={siteSettings.hero_title}
                  onChange={(event) =>
                    setSiteSettings({ ...siteSettings, hero_title: event.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">العنوان الفرعي</Label>
                <Input
                  id="hero_subtitle"
                  value={siteSettings.hero_subtitle}
                  onChange={(event) =>
                    setSiteSettings({ ...siteSettings, hero_subtitle: event.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_p1">نص الفقرة التعريفية</Label>
                <Textarea
                  id="hero_p1"
                  rows={2}
                  value={siteSettings.hero_paragraph1}
                  onChange={(event) =>
                    setSiteSettings({ ...siteSettings, hero_paragraph1: event.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>صورة خلفية الهيرو الرئيسية</Label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-48 overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={heroImagePreview || assetPath(siteSettings.hero_image)}
                      alt="Hero Background"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted">
                    <Upload size={16} />
                    استبدال صورة الهيرو من الجهاز
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleFileSelect(event, setHeroImagePreview, setHeroFile)
                      }
                    />
                  </label>
                </div>
                <p className="text-xs text-amber-700">
                  حقول Hero تُحفظ في Supabase، وصورة الخلفية تُرفع إلى Storage عند الضغط على زر الحفظ.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving
                ? <Loader2 size={16} className="ml-2 animate-spin" />
                : <Save size={16} className="ml-2" />}
              حفظ جميع إعدادات الموقع
            </Button>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* القائمة */}
      {/* ====================================================== */}

      {activeTab === 'navigation' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">روابط القائمة الرئيسية والتنقل</CardTitle>
            <CardDescription>
              تعديل مسميات الروابط وروابط التوجيه الظاهرة في القائمة العلوية
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {navLinks.map((link, index) => (
              <div
                key={link.id}
                className="flex flex-col items-center gap-3 rounded-lg border bg-muted/30 p-3 sm:flex-row"
              >
                <span className="w-6 text-xs font-bold text-muted-foreground">
                  #{index + 1}
                </span>

                <div className="w-full flex-1 sm:w-auto">
                  <Input
                    value={link.label}
                    onChange={(event) =>
                      setNavLinks((previous) =>
                        previous.map((item) =>
                          item.id === link.id
                            ? { ...item, label: event.target.value }
                            : item
                        )
                      )
                    }
                    placeholder="اسم الرابط"
                  />
                </div>

                <div className="w-full flex-1 sm:w-auto">
                  <Input
                    value={link.to}
                    onChange={(event) =>
                      setNavLinks((previous) =>
                        previous.map((item) =>
                          item.id === link.id
                            ? { ...item, to: event.target.value }
                            : item
                        )
                      )
                    }
                    dir="ltr"
                    placeholder="/route"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={link.is_active}
                    onCheckedChange={(checked) =>
                      setNavLinks((previous) =>
                        previous.map((item) =>
                          item.id === link.id
                            ? { ...item, is_active: checked }
                            : item
                        )
                      )
                    }
                  />
                  <span className="text-xs">
                    {link.is_active ? 'ظاهر' : 'مخفي'}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveNavigation} disabled={isSaving}>
                {isSaving && <Loader2 size={16} className="ml-2 animate-spin" />}
                <Save size={16} className="ml-2" />
                حفظ ترتيب ومسميات القائمة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ====================================================== */}
      {/* الخدمات */}
      {/* ====================================================== */}

      {activeTab === 'services' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            إدارة بطاقات الخدمات وحفظ بياناتها في Supabase.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={service.id} className="flex flex-col justify-between overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={assetPath(service.cardImage || `/${service.folder}/1.webp`)}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute right-2 top-2 bg-primary/90 text-xs">
                    {service.shortTitle || service.title}
                  </Badge>
                </div>

                <CardHeader className="p-4 pb-2">
                  <CardTitle className="line-clamp-1 text-base">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {service.introDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  <div className="flex items-center justify-between border-t pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        الترتيب: #{service.sort_order ?? index + 1}
                      </span>
                      <Badge
                        variant={service.is_active === false ? 'destructive' : 'secondary'}
                        className="text-[10px]"
                      >
                        {service.is_active === false ? 'معطل' : 'نشط'}
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingService(service);
                        setServiceForm({
                          title: service.title,
                          shortTitle: service.shortTitle || '',
                          badge: service.badge || '',
                          introDescription: service.introDescription || '',
                          cardImage: service.cardImage || `/${service.folder}/1.webp`,
                          sort_order: service.sort_order ?? index + 1,
                          is_active: service.is_active !== false,
                        });
                        setServiceImagePreview(null);
                        setServiceFile(null);
                      }}
                    >
                      <Edit3 size={14} className="ml-1" />
                      تعديل الخدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
            <DialogContent dir="rtl" className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>تعديل خدمة: {editingService?.title}</DialogTitle>
                <DialogDescription>
                  يتم حفظ العنوان والوصف والصورة والترتيب وحالة التفعيل في جدول services.
                  الاسم المختصر والشارة لا يدعمهما مخطط الجدول الحالي.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-3">
                <div className="space-y-2">
                  <Label>العنوان الكامل للخدمة</Label>
                  <Input
                    value={serviceForm.title}
                    onChange={(event) =>
                      setServiceForm({ ...serviceForm, title: event.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>الاسم المختصر (عرض محلي)</Label>
                    <Input
                      value={serviceForm.shortTitle}
                      onChange={(event) =>
                        setServiceForm({ ...serviceForm, shortTitle: event.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الشارة (عرض محلي)</Label>
                    <Input
                      value={serviceForm.badge}
                      onChange={(event) =>
                        setServiceForm({ ...serviceForm, badge: event.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>ترتيب الظهور</Label>
                    <Input
                      type="number"
                      min="1"
                      value={serviceForm.sort_order}
                      onChange={(event) =>
                        setServiceForm({
                          ...serviceForm,
                          sort_order: parseInt(event.target.value) || 1,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>حالة التفعيل</Label>
                    <div className="flex h-10 items-center justify-between rounded-md border px-3">
                      <span className="text-xs font-semibold">
                        {serviceForm.is_active ? 'نشط (ظاهر)' : 'معطل (مخفي)'}
                      </span>
                      <Switch
                        checked={serviceForm.is_active}
                        onCheckedChange={(checked) =>
                          setServiceForm({ ...serviceForm, is_active: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الوصف التقديمي للخدمة</Label>
                  <Textarea
                    rows={3}
                    value={serviceForm.introDescription}
                    onChange={(event) =>
                      setServiceForm({
                        ...serviceForm,
                        introDescription: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>صورة الخدمة</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={serviceImagePreview || assetPath(serviceForm.cardImage)}
                        alt="Service Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted">
                      <Upload size={14} />
                      اختيار صورة
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          handleFileSelect(event, setServiceImagePreview, setServiceFile)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setEditingService(null)}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveService} disabled={isSaving}>
                  {isSaving && <Loader2 size={16} className="ml-2 animate-spin" />}
                  حفظ وتطبيق في Supabase
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* ====================================================== */}
      {/* المشاريع */}
      {/* ====================================================== */}

      {activeTab === 'projects' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">مشاريع المؤسسة</CardTitle>
            <CardDescription>إدارة بطاقات المشاريع النموذجية المنجزة</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={assetPath(project.image)}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setEditingProject(project);
                        setProjectForm({
                          title: project.title,
                          description: project.description,
                          link: project.link,
                          image: project.image,
                        });
                        setProjectImagePreview(null);
                        setProjectFile(null);
                      }}
                    >
                      <Edit3 size={14} className="ml-1" />
                      تعديل المشروع والصورة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
              <DialogContent dir="rtl" className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>تعديل المشروع: {editingProject?.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>اسم المشروع</Label>
                    <Input
                      value={projectForm.title}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, title: event.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>وصف المشروع</Label>
                    <Textarea
                      rows={2}
                      value={projectForm.description}
                      onChange={(event) =>
                        setProjectForm({
                          ...projectForm,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>رابط المشروع</Label>
                    <Input
                      value={projectForm.link}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, link: event.target.value })
                      }
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>صورة المشروع</Label>
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-24 overflow-hidden rounded border bg-muted">
                        <img
                          src={projectImagePreview || assetPath(projectForm.image)}
                          alt="Project Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <label className="cursor-pointer rounded border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                        اختيار صورة من الجهاز
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            handleFileSelect(event, setProjectImagePreview, setProjectFile)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSaveProject} disabled={isSaving}>
                    {isSaving && <Loader2 size={16} className="ml-2 animate-spin" />}
                    حفظ المشروع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* ====================================================== */}
      {/* المعرض */}
      {/* ====================================================== */}

      {activeTab === 'gallery' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl">معرض الصور والأعمال</CardTitle>
                <CardDescription>
                  إدارة الصور المحفوظة في Supabase
                </CardDescription>
              </div>
              <Button onClick={() => setIsGalleryDialogOpen(true)}>
                <Plus size={16} className="ml-1" />
                إضافة صورة للمعرض
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border bg-muted"
                >
                  <div className="aspect-square w-full">
                    <img
                      src={assetPath(image.image_url)}
                      alt={image.alt_text || image.title || 'صورة من المعرض'}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="border-t bg-card p-3">
                    <p className="line-clamp-1 text-sm font-bold">
                      {image.title || 'صورة من المعرض'}
                    </p>
                    <div className="mt-2 flex items-center justify-between border-t pt-2">
                      <p className="truncate text-xs text-muted-foreground">
                        Alt: {image.alt_text}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDeleteGallery(image.id)}
                        disabled={isSaving}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Dialog
              open={isGalleryDialogOpen}
              onOpenChange={(open) => {
                setIsGalleryDialogOpen(open);
                if (!open) {
                  setGalleryPreview(null);
                  setGalleryFile(null);
                }
              }}
            >
              <DialogContent dir="rtl" className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة صورة جديدة للمعرض</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>اختيار الصورة من الجهاز</Label>
                    <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed bg-muted/30 p-4">
                      {galleryPreview ? (
                        <div className="h-32 w-full overflow-hidden rounded-md border">
                          <img
                            src={galleryPreview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <ImageIcon size={36} className="text-muted-foreground opacity-50" />
                      )}
                      <label className="cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                        تصفح ملفات جهازك
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            handleFileSelect(event, setGalleryPreview, setGalleryFile)
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>عنوان الصورة</Label>
                    <Input
                      value={newGalleryItem.title}
                      onChange={(event) =>
                        setNewGalleryItem({
                          ...newGalleryItem,
                          title: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>النص البديل لمحركات البحث (Alt Text)</Label>
                    <Input
                      value={newGalleryItem.alt_text}
                      onChange={(event) =>
                        setNewGalleryItem({
                          ...newGalleryItem,
                          alt_text: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsGalleryDialogOpen(false)}
                    disabled={isSaving}
                  >
                    إلغاء
                  </Button>
                  <Button onClick={handleSaveNewGallery} disabled={isSaving}>
                    {isSaving && <Loader2 size={16} className="ml-2 animate-spin" />}
                    إضافة وحفظ في Supabase
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* ====================================================== */}
      {/* صفحات التفصيل */}
      {/* ====================================================== */}

      {activeTab === 'details' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-xl">تعديل صفحات التفصيل الـ 22</CardTitle>
                  <CardDescription>تعديل وحفظ بيانات صفحات الخدمات</CardDescription>
                </div>

                <select
                  value={selectedDetailId}
                  onChange={(event) => setSelectedDetailId(event.target.value)}
                  className="rounded-lg border bg-background px-3 py-2 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} ({service.route})
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {selectedDetailService && (
                <>
                  <div className="space-y-2">
                    <Label>الصورة الترويسية لصفحة الخدمة</Label>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="relative h-28 w-56 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={
                            detailHeaderPreview ||
                            assetPath(
                              detailForm.headerImage ||
                              `/${selectedDetailService.folder}/header.webp`
                            )
                          }
                          alt="Header"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src = assetPath(
                              `/${selectedDetailService.folder}/1.webp`
                            );
                          }}
                        />
                      </div>

                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted">
                        <Upload size={14} />
                        استبدال صورة الترويسة
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            handleFileSelect(
                              event,
                              setDetailHeaderPreview,
                              setDetailHeaderFile
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>عنوان الصفحة الرئيسي</Label>
                      <Input
                        value={detailForm.title}
                        onChange={(event) =>
                          setDetailForm({ ...detailForm, title: event.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>العنوان الفرعي في الهيرو</Label>
                      <Input
                        value={detailForm.heroSubtitle}
                        onChange={(event) =>
                          setDetailForm({
                            ...detailForm,
                            heroSubtitle: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>عنوان قسم المقدمة</Label>
                    <Input
                      value={detailForm.introTitle}
                      onChange={(event) =>
                        setDetailForm({ ...detailForm, introTitle: event.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>الوصف التعريفي المفصل</Label>
                    <Textarea
                      rows={4}
                      value={detailForm.introDescription}
                      onChange={(event) =>
                        setDetailForm({
                          ...detailForm,
                          introDescription: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>عنوان قسم المميزات</Label>
                    <Input
                      value={detailForm.benefitsTitle}
                      onChange={(event) =>
                        setDetailForm({
                          ...detailForm,
                          benefitsTitle: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <Label className="text-base font-bold">
                      المميزات الأربع المخصصة للخدمة
                    </Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {detailForm.features.map((feature, index) => (
                        <div
                          key={index}
                          className="space-y-2 rounded-lg border bg-muted/20 p-3"
                        >
                          <Input
                            value={feature.title}
                            onChange={(event) =>
                              setDetailForm((previous) => {
                                const updated = [...previous.features];
                                updated[index] = {
                                  ...updated[index],
                                  title: event.target.value,
                                };
                                return { ...previous, features: updated };
                              })
                            }
                            placeholder="عنوان الميزة"
                            className="font-semibold"
                          />
                          <Textarea
                            rows={2}
                            value={feature.description}
                            onChange={(event) =>
                              setDetailForm((previous) => {
                                const updated = [...previous.features];
                                updated[index] = {
                                  ...updated[index],
                                  description: event.target.value,
                                };
                                return { ...previous, features: updated };
                              })
                            }
                            placeholder="وصف الميزة"
                            className="text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveDetail} disabled={isSaving}>
                      {isSaving
                        ? <Loader2 size={16} className="ml-2 animate-spin" />
                        : <Save size={16} className="ml-2" />}
                      حفظ جميع تفاصيل الصفحة
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ====================================================== */}
      {/* SEO */}
      {/* ====================================================== */}

      {activeTab === 'seo' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl">تحسين محركات البحث (SEO)</CardTitle>
                <CardDescription>
                  تعديل بيانات SEO للصفحة الرئيسية وصفحات الخدمات
                </CardDescription>
              </div>

              <select
                value={selectedSeoPage}
                onChange={(event) => setSelectedSeoPage(event.target.value)}
                className="rounded-lg border bg-background px-3 py-2 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="home">الصفحة الرئيسية (/)</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} ({service.route})
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo-title">عنوان الميتا (Meta Title)</Label>
              <Input
                id="seo-title"
                value={seoForm.title}
                onChange={(event) =>
                  setSeoForm({ ...seoForm, title: event.target.value })
                }
              />
              <span className="text-xs text-muted-foreground">
                الطول الموصى به: 50-60 حرفاً
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo-desc">وصف محركات البحث (Meta Description)</Label>
              <Textarea
                id="seo-desc"
                rows={3}
                value={seoForm.description}
                onChange={(event) =>
                  setSeoForm({ ...seoForm, description: event.target.value })
                }
              />
              <span className="text-xs text-muted-foreground">
                الطول الموصى به: 120-160 حرفاً
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo-keywords">الكلمات المفتاحية المستهدفة</Label>
              <Textarea
                id="seo-keywords"
                rows={3}
                value={seoForm.keywords}
                onChange={(event) =>
                  setSeoForm({ ...seoForm, keywords: event.target.value })
                }
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveSeo} disabled={isSaving}>
                {isSaving
                  ? <Loader2 size={16} className="ml-2 animate-spin" />
                  : <Save size={16} className="ml-2" />}
                حفظ بيانات SEO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
