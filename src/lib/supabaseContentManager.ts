
import { supabase } from './supabase';

// ============================================================================
// Database Types
// ============================================================================

export interface SiteContent {
  id: string;
  content_key: string;
  content_value: string;
  content_type: 'text' | 'image' | 'url' | 'html';
  section: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  short_name?: string | null;
  badge?: string | null;
  image_url?: string;
  sort_order?: number;
  is_active: boolean;
  created_at: string;

  // Legacy UI compatibility
  icon: string | null;
  display_order: number;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image: string;
  image_url?: string;
  alt_text?: string;
  sort_order?: number;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  to: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// ============================================================================
// Service Page Details Types
// ============================================================================

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePageDetails {
  id?: string;
  canonical_id: string;
  service_id?: number | string | null;
  hero_subtitle: string;
  intro_title: string;
  benefits_title: string;
  benefits: string[];
  features: ServiceFeature[];
  header_image: string | null;
  updated_at?: string;
}

export interface ServiceSEO {
  id?: string;
  canonical_id: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  updated_at?: string;
}

// ============================================================================
// Shared Helpers
// ============================================================================

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'حدث خطأ غير متوقع';
};

const normalizeId = (id: string | number): string => String(id);

const now = (): string => new Date().toISOString();

// ============================================================================
// Site Content Management
// ============================================================================

export const contentManager = {
  getAll: async (): Promise<Record<string, SiteContent>> => {
    if (!supabase) return {};

    const { data, error } = await supabase
      .from('site_content')
      .select('*');

    if (error) {
      console.error('Error fetching content:', error);
      return {};
    }

    const contentMap: Record<string, SiteContent> = {};

    data?.forEach((item) => {
      contentMap[item.content_key] = item as SiteContent;
    });

    return contentMap;
  },

  get: async (key: string): Promise<string> => {
    if (!supabase) return '';

    const { data, error } = await supabase
      .from('site_content')
      .select('content_value')
      .eq('content_key', key)
      .maybeSingle();

    if (error) {
      console.error('Error fetching content:', error);
      return '';
    }

    return data?.content_value || '';
  },

  set: async (
    key: string,
    value: string,
    type: 'text' | 'image' | 'url' | 'html' = 'text',
    section = 'general',
    description?: string
  ): Promise<boolean> => {
    if (!supabase) return false;

    const { data: existing, error: fetchError } = await supabase
      .from('site_content')
      .select('id')
      .eq('content_key', key)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking content:', fetchError);
      return false;
    }

    const payload = {
      content_value: value,
      content_type: type,
      section,
      description: description || null,
      updated_at: now(),
    };

    if (existing) {
      const { error } = await supabase
        .from('site_content')
        .update(payload)
        .eq('content_key', key);

      if (error) {
        console.error('Error updating content:', error);
        return false;
      }
    } else {
      const { error } = await supabase
        .from('site_content')
        .insert({
          content_key: key,
          ...payload,
        });

      if (error) {
        console.error('Error inserting content:', error);
        return false;
      }
    }

    return true;
  },

  getBySection: async (section: string): Promise<SiteContent[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('section', section)
      .order('content_key');

    if (error) {
      console.error('Error fetching content by section:', error);
      return [];
    }

    return (data || []) as SiteContent[];
  },
};

// ============================================================================
// Projects Management
// ============================================================================

export const projectsManager = {
  getAll: async (): Promise<Project[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return (data || []) as Project[];
  },

  getAllIncludingInactive: async (): Promise<Project[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return (data || []) as Project[];
  },

  getById: async (id: string | number): Promise<Project | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', normalizeId(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    return data as Project | null;
  },

  create: async (
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Project | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return data as Project;
  },

  update: async (
    id: string | number,
    project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('projects')
      .update({
        ...project,
        updated_at: now(),
      })
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error updating project:', error);
      return false;
    }

    return true;
  },

  delete: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    return true;
  },

  upsertByDisplayOrder: async (
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
  ): Promise<{ success: boolean; data?: Project; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    try {
      const { data: existing, error: fetchError } = await supabase
        .from('projects')
        .select('id')
        .eq('display_order', project.display_order)
        .maybeSingle();

      if (fetchError) {
        return {
          success: false,
          error: fetchError.message,
        };
      }

      const result = existing
        ? await supabase
            .from('projects')
            .update({
              ...project,
              updated_at: now(),
            })
            .eq('id', existing.id)
            .select('*')
            .single()
        : await supabase
            .from('projects')
            .insert(project)
            .select('*')
            .single();

      if (result.error) {
        console.error('Error saving project:', result.error);

        return {
          success: false,
          error: result.error.message,
        };
      }

      return {
        success: true,
        data: result.data as Project,
      };
    } catch (error) {
      console.error('Error in upsertByDisplayOrder:', error);

      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  },
};

export const projectManager = projectsManager;

// ============================================================================
// Navigation Links Management
// ============================================================================

export const navigationManager = {
  getAll: async (): Promise<NavigationLink[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('navigation_links')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation links:', error);
      return [];
    }

    return (data || []) as NavigationLink[];
  },

  getAllIncludingInactive: async (): Promise<NavigationLink[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('navigation_links')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation links:', error);
      return [];
    }

    return (data || []) as NavigationLink[];
  },

  create: async (
    link: Omit<NavigationLink, 'id' | 'created_at'>
  ): Promise<NavigationLink | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('navigation_links')
      .insert(link)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating navigation link:', error);
      return null;
    }

    return data as NavigationLink;
  },

  update: async (
    id: string | number,
    link: Partial<Omit<NavigationLink, 'id' | 'created_at'>>
  ): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('navigation_links')
      .update(link)
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error updating navigation link:', error);
      return false;
    }

    return true;
  },

  delete: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('navigation_links')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting navigation link:', error);
      return false;
    }

    return true;
  },

  upsertBySortOrder: async (
    link: Omit<NavigationLink, 'id' | 'created_at'>
  ): Promise<{ success: boolean; data?: NavigationLink; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { data: existing, error: fetchError } = await supabase
      .from('navigation_links')
      .select('id')
      .eq('sort_order', link.sort_order)
      .maybeSingle();

    if (fetchError) {
      return {
        success: false,
        error: fetchError.message,
      };
    }

    const result = existing
      ? await supabase
          .from('navigation_links')
          .update(link)
          .eq('id', existing.id)
          .select('*')
          .single()
      : await supabase
          .from('navigation_links')
          .insert(link)
          .select('*')
          .single();

    if (result.error) {
      console.error('Error saving navigation link:', result.error);

      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      data: result.data as NavigationLink,
    };
  },

  saveAll: async (
    links: Array<Omit<NavigationLink, 'id' | 'created_at'>>
  ): Promise<{ success: boolean; data: NavigationLink[]; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        data: [],
        error: 'Supabase client not configured',
      };
    }

    const saved: NavigationLink[] = [];

    for (const link of links) {
      const result = await navigationManager.upsertBySortOrder(link);

      if (!result.success || !result.data) {
        return {
          success: false,
          data: saved,
          error: result.error || 'تعذر حفظ أحد روابط القائمة',
        };
      }

      saved.push(result.data);
    }

    return {
      success: true,
      data: saved,
    };
  },
};

// ============================================================================
// Services Management
// ============================================================================

const normalizeService = (row: any): Service => {
  const order = Number(row.sort_order ?? row.display_order ?? 0);
  const createdAt = row.created_at ?? '';

  return {
    id: String(row.id),
    title: row.title ?? '',
    description: row.description ?? '',
    short_name: row.short_name ?? '',
    badge: row.badge ?? '',
    image_url: row.image_url ?? undefined,
    sort_order: order,
    is_active: Boolean(row.is_active),
    created_at: createdAt,
    icon: null,
    display_order: order,
    updated_at: row.updated_at ?? createdAt,
  };
};

const toServiceDatabasePayload = (service: Partial<Service>) => {
  const payload: Record<string, unknown> = {};

  if (service.title !== undefined) payload.title = service.title;

  if (service.description !== undefined) {
    payload.description = service.description;
  }

  if (service.short_name !== undefined) {
    payload.short_name = service.short_name;
  }

  if (service.badge !== undefined) {
    payload.badge = service.badge;
  }

  if (service.image_url !== undefined) {
    payload.image_url = service.image_url;
  }

  if (service.is_active !== undefined) {
    payload.is_active = service.is_active;
  }

  const order = service.display_order ?? service.sort_order;

  if (order !== undefined) {
    payload.sort_order = order;
  }

  return payload;
};

type ServiceWriteInput = {
  title: string;
  description: string;
  short_name?: string | null;
  badge?: string | null;
  image_url?: string | null;
  sort_order?: number;
  is_active: boolean;
  icon?: string | null;
  display_order?: number;
};

export const servicesManager = {
  getAll: async (): Promise<Service[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return (data || []).map(normalizeService);
  },

  getAllIncludingInactive: async (): Promise<Service[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return (data || []).map(normalizeService);
  },

  getById: async (id: string | number): Promise<Service | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', normalizeId(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }

    return data ? normalizeService(data) : null;
  },

  create: async (
    service: ServiceWriteInput
  ): Promise<{ success: boolean; data?: Service; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { data, error } = await supabase
      .from('services')
      .insert(toServiceDatabasePayload(service))
      .select('*')
      .single();

    if (error) {
      console.error('Error creating service:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: normalizeService(data),
    };
  },

  update: async (
    id: string | number,
    service: Partial<ServiceWriteInput>
  ): Promise<{ success: boolean; data?: Service; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { data, error } = await supabase
      .from('services')
      .update(toServiceDatabasePayload(service))
      .eq('id', normalizeId(id))
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error updating service:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        error: 'لم يتم العثور على سجل الخدمة لتحديثه',
      };
    }

    return {
      success: true,
      data: normalizeService(data),
    };
  },

  delete: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting service:', error);
      return false;
    }

    return true;
  },
};

// ============================================================================
// Service Page Details Management
// ============================================================================

const normalizeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item !== null && item !== undefined)
    .map((item) => String(item));
};

const normalizeServiceFeatures = (
  value: unknown
): ServiceFeature[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === 'object' && item !== null
    )
    .map((item) => ({
      title: String(item.title ?? ''),
      description: String(item.description ?? ''),
    }))
    .filter(
      (item) => item.title.trim() || item.description.trim()
    );
};

const normalizeServicePageDetails = (
  row: any
): ServicePageDetails => ({
  id: row.id ? String(row.id) : undefined,
  canonical_id: String(row.canonical_id),
  service_id: row.service_id ?? null,
  hero_subtitle: row.hero_subtitle ?? '',
  intro_title: row.intro_title ?? '',
  benefits_title: row.benefits_title ?? '',
  benefits: normalizeStringArray(row.benefits),
  features: normalizeServiceFeatures(row.features),
  header_image: row.header_image ?? null,
  updated_at: row.updated_at ?? '',
});

export const servicePageDetailsManager = {
  getAll: async (): Promise<ServicePageDetails[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('service_page_details')
      .select('*')
      .order('canonical_id', { ascending: true });

    if (error) {
      console.error('Error fetching service page details:', error);
      return [];
    }

    return (data || []).map(normalizeServicePageDetails);
  },

  getByCanonicalId: async (
    canonicalId: string
  ): Promise<ServicePageDetails | null> => {
    if (!supabase || !canonicalId) return null;

    const { data, error } = await supabase
      .from('service_page_details')
      .select('*')
      .eq('canonical_id', canonicalId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching service page details:', error);
      return null;
    }

    return data ? normalizeServicePageDetails(data) : null;
  },

  upsert: async (
    details: ServicePageDetails
  ): Promise<{
    success: boolean;
    data?: ServicePageDetails;
    error?: string;
  }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    if (!details.canonical_id) {
      return {
        success: false,
        error: 'معرّف الخدمة مطلوب',
      };
    }

    const payload: Record<string, unknown> = {
      canonical_id: details.canonical_id,
      hero_subtitle: details.hero_subtitle ?? '',
      intro_title: details.intro_title ?? '',
      benefits_title: details.benefits_title ?? '',
      benefits: details.benefits ?? [],
      features: details.features ?? [],
      header_image: details.header_image ?? null,
      updated_at: now(),
    };

    if (details.service_id !== undefined) {
      payload.service_id = details.service_id;
    }

    const { data: existing, error: fetchError } = await supabase
      .from('service_page_details')
      .select('id')
      .eq('canonical_id', details.canonical_id)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking service details:', fetchError);

      return {
        success: false,
        error: fetchError.message,
      };
    }

    const result = existing
      ? await supabase
          .from('service_page_details')
          .update(payload)
          .eq('canonical_id', details.canonical_id)
          .select('*')
          .single()
      : await supabase
          .from('service_page_details')
          .insert(payload)
          .select('*')
          .single();

    if (result.error) {
      console.error('Error saving service details:', result.error);

      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      data: normalizeServicePageDetails(result.data),
    };
  },

  delete: async (
    canonicalId: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { error } = await supabase
      .from('service_page_details')
      .delete()
      .eq('canonical_id', canonicalId);

    if (error) {
      console.error('Error deleting service details:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  },
};

// ============================================================================
// Service SEO Management
// ============================================================================

const normalizeServiceSEO = (row: any): ServiceSEO => ({
  id: row.id ? String(row.id) : undefined,
  canonical_id: String(row.canonical_id),
  seo_title: row.seo_title ?? '',
  seo_description: row.seo_description ?? '',
  seo_keywords: row.seo_keywords ?? '',
  updated_at: row.updated_at ?? '',
});

export const serviceSeoManager = {
  getAll: async (): Promise<ServiceSEO[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('service_seo')
      .select('*')
      .order('canonical_id', { ascending: true });

    if (error) {
      console.error('Error fetching service SEO:', error);
      return [];
    }

    return (data || []).map(normalizeServiceSEO);
  },

  getByCanonicalId: async (
    canonicalId: string
  ): Promise<ServiceSEO | null> => {
    if (!supabase || !canonicalId) return null;

    const { data, error } = await supabase
      .from('service_seo')
      .select('*')
      .eq('canonical_id', canonicalId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching service SEO:', error);
      return null;
    }

    return data ? normalizeServiceSEO(data) : null;
  },

  upsert: async (
    seo: ServiceSEO
  ): Promise<{
    success: boolean;
    data?: ServiceSEO;
    error?: string;
  }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    if (!seo.canonical_id) {
      return {
        success: false,
        error: 'معرّف صفحة الخدمة مطلوب',
      };
    }

    const payload = {
      canonical_id: seo.canonical_id,
      seo_title: seo.seo_title ?? '',
      seo_description: seo.seo_description ?? '',
      seo_keywords: seo.seo_keywords ?? '',
      updated_at: now(),
    };

    const { data: existing, error: fetchError } = await supabase
      .from('service_seo')
      .select('id')
      .eq('canonical_id', seo.canonical_id)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking service SEO:', fetchError);

      return {
        success: false,
        error: fetchError.message,
      };
    }

    const result = existing
      ? await supabase
          .from('service_seo')
          .update(payload)
          .eq('canonical_id', seo.canonical_id)
          .select('*')
          .single()
      : await supabase
          .from('service_seo')
          .insert(payload)
          .select('*')
          .single();

    if (result.error) {
      console.error('Error saving service SEO:', result.error);

      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      data: normalizeServiceSEO(result.data),
    };
  },

  delete: async (
    canonicalId: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { error } = await supabase
      .from('service_seo')
      .delete()
      .eq('canonical_id', canonicalId);

    if (error) {
      console.error('Error deleting service SEO:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  },
};

// ============================================================================
// Gallery Management
// ============================================================================

type GalleryWriteInput = {
  title?: string | null;
  image_url?: string;
  alt_text?: string;
  sort_order?: number;
  display_order?: number;
};

const toGalleryDatabasePayload = (item: GalleryWriteInput) => {
  const payload: Record<string, unknown> = {};

  if (item.title !== undefined) payload.title = item.title;
  if (item.image_url !== undefined) payload.image_url = item.image_url;
  if (item.alt_text !== undefined) payload.alt_text = item.alt_text;

  const sortOrder = item.sort_order ?? item.display_order;

  if (sortOrder !== undefined) {
    payload.sort_order = sortOrder;
  }

  return payload;
};

const normalizeGalleryItem = (row: any): GalleryItem => {
  const order = Number(row.sort_order ?? row.display_order ?? 0);
  const createdAt = row.created_at ?? '';

  return {
    id: String(row.id),
    title: row.title ?? null,
    image: row.image_url ?? '',
    image_url: row.image_url ?? '',
    alt_text: row.alt_text ?? '',
    sort_order: order,
    category: row.category ?? null,
    display_order: order,
    is_active: row.is_active ?? true,
    created_at: createdAt,
    updated_at: row.updated_at ?? createdAt,
  };
};

export const galleryManager = {
  getAll: async (): Promise<GalleryItem[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }

    return (data || []).map(normalizeGalleryItem);
  },

  getAllIncludingInactive: async (): Promise<GalleryItem[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }

    return (data || []).map(normalizeGalleryItem);
  },

  getById: async (id: string | number): Promise<GalleryItem | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', normalizeId(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching gallery item:', error);
      return null;
    }

    return data ? normalizeGalleryItem(data) : null;
  },

  create: async (
    item: GalleryWriteInput
  ): Promise<{ success: boolean; data?: GalleryItem; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { data, error } = await supabase
      .from('gallery')
      .insert(toGalleryDatabasePayload(item))
      .select('*')
      .single();

    if (error) {
      console.error('Error creating gallery item:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: normalizeGalleryItem(data),
    };
  },

  update: async (
    id: string | number,
    item: GalleryWriteInput
  ): Promise<{ success: boolean; data?: GalleryItem; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { data, error } = await supabase
      .from('gallery')
      .update(toGalleryDatabasePayload(item))
      .eq('id', normalizeId(id))
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error updating gallery item:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        error: 'لم يتم العثور على صورة المعرض لتحديثها',
      };
    }

    return {
      success: true,
      data: normalizeGalleryItem(data),
    };
  },

  delete: async (
    id: string | number
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting gallery item:', error);

      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  },
};

// ============================================================================
// FAQ Management
// ============================================================================

export const faqManager = {
  getAll: async (): Promise<FAQ[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQ:', error);
      return [];
    }

    return (data || []) as FAQ[];
  },

  getAllIncludingInactive: async (): Promise<FAQ[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQ:', error);
      return [];
    }

    return (data || []) as FAQ[];
  },

  getById: async (id: string | number): Promise<FAQ | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('id', normalizeId(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching FAQ:', error);
      return null;
    }

    return data as FAQ | null;
  },

  create: async (
    faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>
  ): Promise<FAQ | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('faq')
      .insert(faq)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating FAQ:', error);
      return null;
    }

    return data as FAQ;
  },

  update: async (
    id: string | number,
    faq: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('faq')
      .update(faq)
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error updating FAQ:', error);
      return false;
    }

    return true;
  },

  delete: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }

    return true;
  },
};

// ============================================================================
// Contact Messages Management
// ============================================================================

export const contactManager = {
  getAll: async (): Promise<ContactMessage[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }

    return (data || []) as ContactMessage[];
  },

  getById: async (id: string | number): Promise<ContactMessage | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', normalizeId(id))
      .maybeSingle();

    if (error) {
      console.error('Error fetching contact message:', error);
      return null;
    }

    return data as ContactMessage | null;
  },

  create: async (
    message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>
  ): Promise<ContactMessage | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        ...message,
        is_read: false,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating contact message:', error);
      return null;
    }

    return data as ContactMessage;
  },

  markAsRead: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error marking message as read:', error);
      return false;
    }

    return true;
  },

  delete: async (id: string | number): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', normalizeId(id));

    if (error) {
      console.error('Error deleting contact message:', error);
      return false;
    }

    return true;
  },
};

// ============================================================================
// Image Upload Helper
// ============================================================================

export const uploadImage = async (
  file: File,
  bucket: string,
  path: string
): Promise<string | null> => {
  if (!supabase) return null;

  try {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';

    const randomId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const safePath = path.replace(/^\/+|\/+$/g, '');
    const filePath = `${safePath}/${randomId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return publicUrl || null;
  } catch (error) {
    console.error('Unexpected image upload error:', error);
    return null;
  }
};

// ============================================================================
// Admin Management
// ============================================================================

export const adminManager = {
  isUserAdmin: async (
    userId: string,
    signal?: AbortSignal
  ): Promise<boolean> => {
    if (!supabase || !userId || signal?.aborted) return false;

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return data?.user_id === userId;
  },
};

// ============================================================================
// Site Settings Management
// ============================================================================

export interface SiteSettings {
  id?: string | number;
  site_name: string;
  phone: string;
  whatsapp: string;
  description: string;
  seo_title: string;
  seo_description: string;

  // Homepage SEO keywords
  seo_keywords?: string;

  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_paragraph1: string;
  hero_image: string;
  created_at?: string;
  updated_at?: string;
}

export const settingsManager = {
  getSettings: async (): Promise<SiteSettings | null> => {
    if (!supabase) {
      console.error('Supabase client not configured');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching site settings:', error);
        return null;
      }

      return data as SiteSettings | null;
    } catch (error) {
      console.error('Error in getSettings:', error);
      return null;
    }
  },

  updateSettings: async (
    settings: Partial<SiteSettings>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase client not configured',
      };
    }

    try {
      const updateData: Record<string, unknown> = {
        updated_at: now(),
      };

      const fields: (keyof SiteSettings)[] = [
        'site_name',
        'phone',
        'whatsapp',
        'description',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'logo_url',
        'hero_title',
        'hero_subtitle',
        'hero_paragraph1',
        'hero_image',
      ];

      fields.forEach((field) => {
        if (settings[field] !== undefined) {
          updateData[field] = settings[field];
        }
      });

      const { data: existing, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking existing settings:', fetchError);

        return {
          success: false,
          error: `تعذر قراءة إعدادات الموقع: ${fetchError.message}`,
        };
      }

      if (existing?.id) {
        const { data, error } = await supabase
          .from('site_settings')
          .update(updateData)
          .eq('id', existing.id)
          .select('id')
          .maybeSingle();

        if (error) {
          console.error('Error updating site settings:', error);

          return {
            success: false,
            error: `فشل تحديث الإعدادات: ${error.message}`,
          };
        }

        if (!data) {
          return {
            success: false,
            error: 'لم يتم تحديث أي سجل. تحقق من صلاحيات قاعدة البيانات RLS.',
          };
        }

        return { success: true };
      }

      const { data, error } = await supabase
        .from('site_settings')
        .insert(updateData)
        .select('id')
        .single();

      if (error) {
        console.error('Error inserting site settings:', error);

        return {
          success: false,
          error: `فشل إنشاء الإعدادات: ${error.message}`,
        };
      }

      if (!data?.id) {
        return {
          success: false,
          error: 'لم يتم تأكيد إنشاء سجل الإعدادات.',
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in updateSettings:', error);

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'حدث خطأ غير متوقع أثناء حفظ الإعدادات',
      };
    }
  },
};

// ============================================================================
// Helper: Match Database Services With Canonical Website Services
// ============================================================================

export const matchDbServiceToCanonical = (
  service: Service,
  canonicalId?: string,
  canonicalDisplayOrder?: number,
  canonicalTitle?: string
): boolean => {
  if (canonicalId) {
    return String(service.id) === String(canonicalId);
  }

  if (canonicalDisplayOrder !== undefined) {
    return (
      service.sort_order === canonicalDisplayOrder ||
      service.display_order === canonicalDisplayOrder
    );
  }

  if (canonicalTitle) {
    return service.title?.trim() === canonicalTitle.trim();
  }

  return false;
};
