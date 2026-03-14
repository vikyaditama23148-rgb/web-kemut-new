import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: upload foto profil anggota
export async function uploadProfilePhoto(
  memberId: string,
  file: File
): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${memberId}.${fileExt}`;
  const filePath = `profiles/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("kemut-photos")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Error uploading photo:", uploadError);
    return null;
  }

  const { data } = supabase.storage
    .from("kemut-photos")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Helper: upload foto galeri
export async function uploadGalleryPhoto(
  file: File,
  eventName: string
): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
  const filePath = `gallery/${eventName}/${fileName}`;

  const { error } = await supabase.storage
    .from("kemut-photos")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading gallery photo:", error);
    return null;
  }

  const { data } = supabase.storage
    .from("kemut-photos")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
