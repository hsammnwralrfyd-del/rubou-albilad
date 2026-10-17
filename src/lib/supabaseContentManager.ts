import { supabase } from './supabase';

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
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image: string;
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

// Site Content Management
export const contentManager = {
  // Get all content
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
    data?.forEach(item => {
      contentMap[item.content_key] = item;
    });
    
    return contentMap;
  },

  // Get specific content
  get: async (key: string): Promise<string> => {
    if (!supabase) return '';
    
    const { data, error } = await supabase
      .from('site_content')
      .select('content_value')
      .eq('content_key', key)
      .single();
    
    if (error) {
      console.error('Error fetching content:', error);
      return '';
    }
    
    return data?.content_value || '';
  },

  // Set content
  set: async (key: string, value: string, type: 'text' | 'image' | 'url' | 'html' = 'text', section: string = 'general', description?: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .eq('content_key', key)
      .single();
    
    if (existing) {
      const { error } = await supabase
        .from('site_content')
        .update({
          content_value: value,
          content_type: type,
          section,
          description: description || null,
          updated_at: new Date().toISOString()
        })
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
          content_value: value,
          content_type: type,
          section,
          description: description || null
        });
      
      if (error) {
        console.error('Error inserting content:', error);
        return false;
      }
    }
    
    return true;
  },

  // Get content by section
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
    
    return data || [];
  }
};

// Projects Management
export const projectsManager = {
  getAll: async (): Promise<Project[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return data || [];
  },

  getAllIncludingInactive: async (): Promise<Project[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return data || [];
  },

  getById: async (id: string): Promise<Project | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }
    
    return data;
  },

  create: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      return null;
    }
    
    return data;
  },

  update: async (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating project:', error);
      return false;
    }
    
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }
    
    return true;
  }
};

// Services Management
export const servicesManager = {
  getAll: async (): Promise<Service[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    
    return data || [];
  },

  getAllIncludingInactive: async (): Promise<Service[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    
    return data || [];
  },

  getById: async (id: string): Promise<Service | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }
    
    return data;
  },

  create: async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating service:', error);
      return null;
    }
    
    return data;
  },

  update: async (id: string, service: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating service:', error);
      return false;
    }
    
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting service:', error);
      return false;
    }
    
    return true;
  }
};

// Gallery Management
export const galleryManager = {
  getAll: async (): Promise<GalleryItem[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
    
    return data || [];
  },

  getAllIncludingInactive: async (): Promise<GalleryItem[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
    
    return data || [];
  },

  getById: async (id: string): Promise<GalleryItem | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching gallery item:', error);
      return null;
    }
    
    return data;
  },

  create: async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('gallery')
      .insert(item)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating gallery item:', error);
      return null;
    }
    
    return data;
  },

  update: async (id: string, item: Partial<Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('gallery')
      .update(item)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating gallery item:', error);
      return false;
    }
    
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting gallery item:', error);
      return false;
    }
    
    return true;
  }
};

// FAQ Management
export const faqManager = {
  getAll: async (): Promise<FAQ[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching FAQ:', error);
      return [];
    }
    
    return data || [];
  },

  getAllIncludingInactive: async (): Promise<FAQ[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching FAQ:', error);
      return [];
    }
    
    return data || [];
  },

  getById: async (id: string): Promise<FAQ | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching FAQ:', error);
      return null;
    }
    
    return data;
  },

  create: async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('faq')
      .insert(faq)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating FAQ:', error);
      return null;
    }
    
    return data;
  },

  update: async (id: string, faq: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('faq')
      .update(faq)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating FAQ:', error);
      return false;
    }
    
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }
    
    return true;
  }
};

// Contact Messages Management
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
    
    return data || [];
  },

  getById: async (id: string): Promise<ContactMessage | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching contact message:', error);
      return null;
    }
    
    return data;
  },

  create: async (message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<ContactMessage | null> => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        ...message,
        is_read: false
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating contact message:', error);
      return null;
    }
    
    return data;
  },

  markAsRead: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) {
      console.error('Error marking message as read:', error);
      return false;
    }
    
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting contact message:', error);
      return false;
    }
    
    return true;
  }
};

// Image Upload Helper
export const uploadImage = async (file: File, bucket: string, path: string): Promise<string | null> => {
  if (!supabase) return null;
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  
  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return null;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return publicUrl;
};
