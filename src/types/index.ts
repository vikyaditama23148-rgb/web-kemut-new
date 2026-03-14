export interface Member {
  id: string;
  name: string;
  role: string;
  roleEmoji: string;
  description: string;
  photo_url?: string;
  color: string;
  instagram?: string;
  tiktok?: string;
  fun_fact?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  photo_url: string;
  event_name: string;
  created_at: string;
  uploaded_by?: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
  handle: string;
}
