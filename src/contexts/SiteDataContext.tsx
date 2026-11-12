
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import {
  client as defaultClient,
  contactLinks as defaultContactLinks,
} from "@/config/client";

import {
  servicesList as defaultServices,
  ServiceDefinition,
} from "@/config/services";

import {
  settingsManager,
  servicesManager,
  galleryManager,
  servicePageDetailsManager,
  serviceSeoManager,
  GalleryItem,
  Service,
  SiteSettings,
  Project,
  ServicePageDetails,
  ServiceSEO,
} from "@/lib/supabaseContentManager";

// ======================================
// أنواع البيانات
// ======================================

export interface DynamicContactLinks {
  phone: string;
  whatsapp: string;
  whatsappShort: string;
  designerWhatsapp: string;
  instagram: string;
}

export interface NavigationLink {
  id: number;
  label: string;
  href: string;
  is_active: boolean;
  sort_order: number;
  [key: string]: unknown;
}

export type DynamicServiceDefinition = ServiceDefinition & {
  sort_order?: number;
  is_active?: boolean;
  headerImage?: string | null;
  seoInfo?: ServiceSEO | null;
  databaseId?: number | string;
};
type DynamicClient = Omit<
  typeof defaultClient,
  | "companyName"
  | "shortName"
  | "phone"
  | "phoneDisplay"
  | "phoneIntl"
  | "description"
  | "hero"
> & {
  companyName: string;
  shortName: string;
  phone: string;
  phoneDisplay: string;
  phoneIntl: string;
  description: string;
  logo?: string;
  hero: {
    title: string;
    [key: string]: unknown;
  };
};

export interface DynamicSiteData {
  client: DynamicClient;
  contactLinks: DynamicContactLinks;
  services: DynamicServiceDefinition[];
  servicesById: Record<string, DynamicServiceDefinition>;
  servicePageDetailsById: Record<string, ServicePageDetails>;
  serviceSeoById: Record<string, ServiceSEO>;
  galleryItems: GalleryItem[];
  navigationLinks: NavigationLink[];
  projects: Project[];
  siteSettings: SiteSettings | null;
  loading: boolean;
  isSupabaseConnected: boolean;
  refreshData: () => Promise<void>;
}

// ======================================
// إنشاء السياق
// ======================================

const SiteDataContext = createContext<DynamicSiteData | undefined>(
  undefined
);

// ======================================
// معالجة أسماء الخدمات القديمة
// ======================================

const LEGACY_SERVICE_TITLES = new Set<string>([]);

const cleanServiceTitle = (
  rawTitle?: string | null,
  fallback?: string
): string => {
  const trimmed = rawTitle ? rawTitle.trim() : "";

  if (!trimmed || LEGACY_SERVICE_TITLES.has(trimmed)) {
    return fallback || "";
  }

  return trimmed;
};

// ======================================
// توحيد النصوص للمقارنة
// ======================================

const normalizeText = (value?: string | null): string => {
  return (value || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .toLowerCase();
};

// ======================================
// البيانات الافتراضية
// ======================================

const getDefaultServices = (): DynamicServiceDefinition[] =>
  defaultServices.map((service, index) => ({
    ...service,
    sort_order: index + 1,
    is_active: true,
    headerImage: null,
    seoInfo: null,
  }));

const createServicesById = (
  services: DynamicServiceDefinition[]
): Record<string, DynamicServiceDefinition> =>
  Object.fromEntries(
    services.map((service) => [service.id, service])
  );

const getDefaultNavigationLinks = (): NavigationLink[] =>
  defaultClient.navLinks.map((item, index) => ({
    ...item,
    id: index,
    is_active: true,
    sort_order: index,
  })) as unknown as NavigationLink[];

const getDefaultProjects = (): Project[] =>
  defaultClient.projects.map((project, index) => ({
    title: project.title,
    description: project.description,
    link: project.link,
    image:
      (project as typeof project & { image?: string }).image ||
      `/projects/${index + 1}.webp`,
    display_order: index + 1,
    is_active: true,
  })) as unknown as Project[];

// ======================================
// تحويل بيانات تفاصيل الخدمات وSEO إلى خرائط
// ======================================

const createDetailsMap = (
  details: ServicePageDetails[]
): Record<string, ServicePageDetails> =>
  Object.fromEntries(
    details.map((item) => [item.canonical_id, item])
  );

const createSeoMap = (
  seoItems: ServiceSEO[]
): Record<string, ServiceSEO> =>
  Object.fromEntries(
    seoItems.map((item) => [item.canonical_id, item])
  );

// ======================================
// مطابقة الخدمات مع بيانات قاعدة البيانات
// ======================================

const mergeServices = (
  databaseServices: Service[],
  databaseDetails: ServicePageDetails[] = [],
  databaseSeo: ServiceSEO[] = []
): DynamicServiceDefinition[] => {
  const usedDatabaseIds = new Set<string>();

  const mergedServices = defaultServices.map(
    (defaultService, index): DynamicServiceDefinition => {
      const targetOrder = index + 1;

      const defaultTitle = normalizeText(defaultService.title);
      const defaultShortTitle = normalizeText(
        defaultService.shortTitle
      );

      let matchedService = databaseServices.find((service) => {
        const serviceId = String(service.id);

        if (usedDatabaseIds.has(serviceId)) {
          return false;
        }

        const databaseTitle = normalizeText(service.title);

        return (
          databaseTitle === defaultTitle ||
          databaseTitle === defaultShortTitle
        );
      });

      if (!matchedService) {
        matchedService = databaseServices.find((service) => {
          const serviceId = String(service.id);

          return (
            !usedDatabaseIds.has(serviceId) &&
            service.display_order === targetOrder
          );
        });
      }

      const canonicalId = String(defaultService.id);

      const matchedDetails = databaseDetails.find((detail) => {
        if (detail.canonical_id === canonicalId) {
          return true;
        }

        return (
          matchedService &&
          detail.service_id != null &&
          String(detail.service_id) === String(matchedService.id)
        );
      });

      const matchedSeo = databaseSeo.find(
        (seo) => seo.canonical_id === canonicalId
      );

      if (!matchedService) {
        return {
          ...defaultService,
          sort_order: targetOrder,
          is_active: true,

          heroSubtitle:
            matchedDetails?.hero_subtitle ||
            defaultService.heroSubtitle,

          introTitle:
            matchedDetails?.intro_title ||
            defaultService.introTitle,

          benefitsTitle:
            matchedDetails?.benefits_title ||
            defaultService.benefitsTitle,

          benefits:
            matchedDetails?.benefits?.length
              ? matchedDetails.benefits
              : defaultService.benefits,

          features:
            matchedDetails?.features?.length
              ? matchedDetails.features
              : defaultService.features,

          headerImage: matchedDetails?.header_image || null,
          seoInfo: matchedSeo || null,
        };
      }

      usedDatabaseIds.add(String(matchedService.id));

      return {
        ...defaultService,

        title: cleanServiceTitle(
          matchedService.title,
          defaultService.title
        ),

        introDescription:
          matchedService.description ||
          defaultService.introDescription,

        cardImage:
          matchedService.image_url ||
          defaultService.cardImage,

        sort_order:
          typeof matchedService.display_order === "number"
            ? matchedService.display_order
            : targetOrder,

        is_active:
          typeof matchedService.is_active === "boolean"
            ? matchedService.is_active
            : true,

        heroSubtitle:
          matchedDetails?.hero_subtitle ||
          defaultService.heroSubtitle,

        introTitle:
          matchedDetails?.intro_title ||
          defaultService.introTitle,

        benefitsTitle:
          matchedDetails?.benefits_title ||
          defaultService.benefitsTitle,

        benefits:
          matchedDetails?.benefits?.length
            ? matchedDetails.benefits
            : defaultService.benefits,

        features:
          matchedDetails?.features?.length
            ? matchedDetails.features
            : defaultService.features,

        headerImage: matchedDetails?.header_image || null,
        seoInfo: matchedSeo || null,
        databaseId: matchedService.id,
      };
    }
  );

  return mergedServices
    .filter((service) => service.is_active !== false)
    .sort(
      (first, second) =>
        (first.sort_order ?? 0) -
        (second.sort_order ?? 0)
    );
};

// ======================================
// تحويل أرقام التواصل
// ======================================

const getDigits = (value?: string | null): string =>
  (value || "").replace(/\D/g, "");

const toSaudiInternationalNumber = (
  number: string,
  fallback: string
): string => {
  if (!number) {
    return fallback;
  }

  if (number.startsWith("966")) {
    return number;
  }

  return `966${number.replace(/^0+/, "")}`;
};

// ======================================
// التخزين المؤقت المحلي والمزامنة
// ======================================

export const SITE_DATA_CACHE_KEY = "rubou_albilad_site_data_v1";
export const SITE_DATA_SYNC_CHANNEL = "rubou_albilad_site_data_sync";

export interface CachedSiteData {
  siteSettings: SiteSettings | null;
  client: DynamicClient;
  contactLinks: DynamicContactLinks;
  services: DynamicServiceDefinition[];
  servicePageDetailsById?: Record<string, ServicePageDetails>;
  serviceSeoById?: Record<string, ServiceSEO>;
  galleryItems: GalleryItem[];
  navigationLinks: NavigationLink[];
  projects: Project[];
  timestamp: number;
}

const defaultIconsMap = new Map(
  defaultServices.map((service) => [service.id, service.icon])
);

const rehydrateServices = (
  services: DynamicServiceDefinition[]
): DynamicServiceDefinition[] => {
  return services.map((service) => ({
    ...service,
    icon:
      defaultIconsMap.get(service.id) ||
      defaultServices[0].icon,
  }));
};

export const getCachedSiteData = (): CachedSiteData | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(SITE_DATA_CACHE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object" && parsed.client) {
      if (Array.isArray(parsed.services)) {
        parsed.services = rehydrateServices(parsed.services);
      }

      return parsed as CachedSiteData;
    }
  } catch (error) {
    console.warn(
      "Could not read site data cache from localStorage:",
      error
    );
  }

  return null;
};

export const setCachedSiteData = (
  data: CachedSiteData
): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      SITE_DATA_CACHE_KEY,
      JSON.stringify(data)
    );

    if (typeof BroadcastChannel !== "undefined") {
      try {
        const channel = new BroadcastChannel(
          SITE_DATA_SYNC_CHANNEL
        );

        channel.postMessage({
          type: "CACHE_UPDATED",
          timestamp: data.timestamp,
        });

        channel.close();
      } catch {
        // استخدام حدث التخزين كبديل
      }
    }
  } catch (error) {
    console.warn(
      "Could not write site data cache to localStorage:",
      error
    );
  }
};

// ======================================
// بناء بيانات الموقع والتواصل
// ======================================

const buildClientAndContactLinks = (
  settings: SiteSettings,
  previousClient: DynamicClient = defaultClient as DynamicClient
): {
  client: DynamicClient;
  contactLinks: DynamicContactLinks;
} => {
  const rawPhone = getDigits(settings.phone);
  const cleanPhone = rawPhone || defaultClient.phone;

  const displayPhone =
    settings.phone || defaultClient.phoneDisplay;

  const intlPhone = toSaudiInternationalNumber(
    rawPhone,
    defaultClient.phoneIntl
  );

  const rawWhatsapp = getDigits(settings.whatsapp);

  const whatsappIntl = toSaudiInternationalNumber(
    rawWhatsapp,
    intlPhone
  );

  const client: DynamicClient = {
    ...previousClient,

    companyName:
      settings.site_name || previousClient.companyName,

    shortName:
      settings.site_name || previousClient.shortName,

    phone: cleanPhone || previousClient.phone,

    phoneDisplay:
      displayPhone || previousClient.phoneDisplay,

    phoneIntl: intlPhone || previousClient.phoneIntl,

    description:
      settings.description || previousClient.description,

    logo: settings.logo_url || previousClient.logo,

    hero: {
      ...previousClient.hero,

      title:
        settings.hero_title || previousClient.hero.title,

      subtitle: (
        settings.hero_subtitle ||
        (previousClient.hero as Record<string, unknown>).subtitle
      ) as string,

      paragraph1: (
        settings.hero_paragraph1 ||
        (previousClient.hero as Record<string, unknown>).paragraph1
      ) as string,
    },
  };

  const contactLinks: DynamicContactLinks = {
    phone: cleanPhone
      ? `tel:+${intlPhone}`
      : defaultContactLinks.phone,

    whatsapp: `https://wa.me/${whatsappIntl}?text=${encodeURIComponent(
      "مرحباً، أود الاستفسار عن خدماتكم"
    )}`,

    whatsappShort: `https://wa.me/${whatsappIntl}`,

    designerWhatsapp: defaultContactLinks.designerWhatsapp,

    instagram: defaultContactLinks.instagram,
  };

  return { client, contactLinks };
};

// ======================================
// مزود البيانات
// ======================================

export const SiteDataProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const initialCache = getCachedSiteData();

  const [clientData, setClientData] = useState<DynamicClient>(
    () => initialCache?.client || (defaultClient as DynamicClient)
  );

  const [contactLinksData, setContactLinksData] =
    useState<DynamicContactLinks>(
      () => initialCache?.contactLinks || defaultContactLinks
    );

  const [servicesData, setServicesData] =
    useState<DynamicServiceDefinition[]>(() => {
      return initialCache?.services &&
        initialCache.services.length > 0
        ? initialCache.services
        : getDefaultServices();
    });

  const [servicePageDetailsData, setServicePageDetailsData] =
    useState<Record<string, ServicePageDetails>>(
      () => initialCache?.servicePageDetailsById || {}
    );

  const [serviceSeoData, setServiceSeoData] =
    useState<Record<string, ServiceSEO>>(
      () => initialCache?.serviceSeoById || {}
    );

  const [galleryData, setGalleryData] = useState<GalleryItem[]>(
    () => initialCache?.galleryItems || []
  );

  const [navigationLinksData, setNavigationLinksData] =
    useState<NavigationLink[]>(
      () =>
        initialCache?.navigationLinks ||
        getDefaultNavigationLinks()
    );

  const [projectsData, setProjectsData] = useState<Project[]>(
    () => initialCache?.projects || getDefaultProjects()
  );

  const [siteSettings, setSiteSettings] =
    useState<SiteSettings | null>(
      () => initialCache?.siteSettings || null
    );

  const [loading, setLoading] = useState<boolean>(
    () => !initialCache
  );

  const [isSupabaseConnected, setIsSupabaseConnected] =
    useState<boolean>(() => {
      return Boolean(initialCache && initialCache.siteSettings);
    });

  // الاحتفاظ بأحدث بيانات الحالة
  const latestDataRef = React.useRef({
    clientData,
    contactLinksData,
    servicesData,
    servicePageDetailsData,
    serviceSeoData,
    galleryData,
    siteSettings,
  });

  latestDataRef.current = {
    clientData,
    contactLinksData,
    servicesData,
    servicePageDetailsData,
    serviceSeoData,
    galleryData,
    siteSettings,
  };

  // منع تكرار طلبات التحميل
  const loadingRequestRef =
    React.useRef<Promise<void> | null>(null);

  // ======================================
  // تحميل البيانات من Supabase
  // ======================================

  const loadData = useCallback(async (): Promise<void> => {
    if (loadingRequestRef.current) {
      return loadingRequestRef.current;
    }

    const request = (async () => {
      const currentCache = getCachedSiteData();

      if (!currentCache) {
        setLoading(true);
      }

      try {
        const [
          settings,
          services,
          gallery,
          serviceDetails,
          serviceSeo,
        ] = await Promise.all([
          settingsManager.getSettings(),
          servicesManager.getAllIncludingInactive(),
          galleryManager.getAll(),
          servicePageDetailsManager.getAll(),
          serviceSeoManager.getAll(),
        ]);

        const latest = latestDataRef.current;

        let nextSettings = latest.siteSettings;
        let nextClient = latest.clientData;
        let nextContactLinks = latest.contactLinksData;
        let nextServices = latest.servicesData;
        let nextGallery = latest.galleryData;

        let nextDetails = latest.servicePageDetailsData;
        let nextSeo = latest.serviceSeoData;

        // إعدادات الموقع والتواصل
        if (settings) {
          nextSettings = settings;

          const built = buildClientAndContactLinks(
            settings,
            defaultClient as DynamicClient
          );

          nextClient = built.client;
          nextContactLinks = built.contactLinks;

          setSiteSettings(settings);
          setClientData(nextClient);
          setContactLinksData(nextContactLinks);
        }

        // تفاصيل صفحات الخدمات
        if (serviceDetails) {
          nextDetails = createDetailsMap(serviceDetails);
          setServicePageDetailsData(nextDetails);
        }

        // بيانات SEO للخدمات
        if (serviceSeo) {
          nextSeo = createSeoMap(serviceSeo);
          setServiceSeoData(nextSeo);
        }

        // الخدمات مع تفاصيل الصفحات وSEO
        if (services && services.length > 0) {
          nextServices = mergeServices(
            services,
            serviceDetails || [],
            serviceSeo || []
          );

          setServicesData(nextServices);
        } else if (serviceDetails || serviceSeo) {
          nextServices = mergeServices(
            [],
            serviceDetails || [],
            serviceSeo || []
          );

          setServicesData(nextServices);
        }

        // معرض الأعمال
        if (gallery && gallery.length > 0) {
          nextGallery = [...gallery].sort(
            (first, second) =>
              (first.display_order ?? 0) -
              (second.display_order ?? 0)
          );

          setGalleryData(nextGallery);
        }

        // الروابط والمشاريع الافتراضية
        const nextNavigationLinks =
          getDefaultNavigationLinks();

        const nextProjects = getDefaultProjects();

        setNavigationLinksData(nextNavigationLinks);
        setProjectsData(nextProjects);

        const receivedData = Boolean(
          settings ||
            (services && services.length > 0) ||
            (gallery && gallery.length > 0) ||
            (serviceDetails && serviceDetails.length > 0) ||
            (serviceSeo && serviceSeo.length > 0)
        );

        if (receivedData) {
          setIsSupabaseConnected(true);

          setCachedSiteData({
            siteSettings: nextSettings,
            client: nextClient,
            contactLinks: nextContactLinks,
            services: nextServices,
            servicePageDetailsById: nextDetails,
            serviceSeoById: nextSeo,
            galleryItems: nextGallery,
            navigationLinks: nextNavigationLinks,
            projects: nextProjects,
            timestamp: Date.now(),
          });
        }
      } catch (error) {
        console.error(
          "Could not load dynamic data from Supabase:",
          error
        );

        setIsSupabaseConnected(Boolean(currentCache));
      } finally {
        setLoading(false);
      }
    })();

    loadingRequestRef.current = request;

    try {
      await request;
    } finally {
      loadingRequestRef.current = null;
    }
  }, []);

  // ======================================
  // التحميل الأول مرة واحدة
  // ======================================

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // ======================================
  // مزامنة التحديثات بين تبويبات المتصفح
  // ======================================

  useEffect(() => {
    const applyCacheUpdate = () => {
      const freshCache = getCachedSiteData();

      if (!freshCache) return;

      if (freshCache.siteSettings) {
        setSiteSettings(freshCache.siteSettings);
      }

      if (freshCache.client) {
        setClientData(freshCache.client);
      }

      if (freshCache.contactLinks) {
        setContactLinksData(freshCache.contactLinks);
      }

      if (
        freshCache.services &&
        freshCache.services.length > 0
      ) {
        setServicesData(freshCache.services);
      }

      if (freshCache.servicePageDetailsById) {
        setServicePageDetailsData(
          freshCache.servicePageDetailsById
        );
      }

      if (freshCache.serviceSeoById) {
        setServiceSeoData(freshCache.serviceSeoById);
      }

      if (freshCache.galleryItems) {
        setGalleryData(freshCache.galleryItems);
      }

      if (freshCache.navigationLinks) {
        setNavigationLinksData(freshCache.navigationLinks);
      }

      if (freshCache.projects) {
        setProjectsData(freshCache.projects);
      }

      setIsSupabaseConnected(true);
      setLoading(false);
    };

    let channel: BroadcastChannel | null = null;

    if (typeof BroadcastChannel !== "undefined") {
      try {
        channel = new BroadcastChannel(
          SITE_DATA_SYNC_CHANNEL
        );

        channel.onmessage = (event) => {
          if (event.data?.type === "CACHE_UPDATED") {
            applyCacheUpdate();
          }
        };
      } catch (error) {
        console.warn("BroadcastChannel error:", error);
      }
    }

    const handleStorageEvent = (event: StorageEvent) => {
      if (
        event.key === SITE_DATA_CACHE_KEY &&
        event.newValue
      ) {
        applyCacheUpdate();
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      if (channel) {
        channel.close();
      }

      window.removeEventListener(
        "storage",
        handleStorageEvent
      );
    };
  }, []);

  // ======================================
  // شاشة التحميل الأولى
  // ======================================

  const isFirstVisitLoading = loading && !initialCache;

  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/admin");

  if (isFirstVisitLoading && !isAdminRoute) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-background"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

          <p className="text-lg font-bold text-primary">
            {defaultClient.companyName}
          </p>

          <p className="mt-1 text-sm text-secondary">
            جاري تحميل أحدث البيانات...
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // بيانات السياق
  // ======================================

  const contextValue: DynamicSiteData = {
    client: clientData,
    contactLinks: contactLinksData,

    services: servicesData,
    servicesById: createServicesById(servicesData),

    servicePageDetailsById: servicePageDetailsData,
    serviceSeoById: serviceSeoData,

    galleryItems: galleryData,
    navigationLinks: navigationLinksData,
    projects: projectsData,

    siteSettings,
    loading,
    isSupabaseConnected,
    refreshData: loadData,
  };

  return (
    <SiteDataContext.Provider value={contextValue}>
      {children}
    </SiteDataContext.Provider>
  );
};

// ======================================
// استخدام البيانات داخل المكونات
// ======================================

export const useSiteData = (): DynamicSiteData => {
  const context = useContext(SiteDataContext);

  if (!context) {
    const fallbackServices = getDefaultServices();

    return {
      client: defaultClient as DynamicClient,
      contactLinks: defaultContactLinks,

      services: fallbackServices,
      servicesById: createServicesById(fallbackServices),

      servicePageDetailsById: {},
      serviceSeoById: {},

      galleryItems: [],
      navigationLinks: getDefaultNavigationLinks(),
      projects: getDefaultProjects(),

      siteSettings: null,
      loading: false,
      isSupabaseConnected: false,
      refreshData: async () => {},
    };
  }

  return context;
};
