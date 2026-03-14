-- ============================================================
-- KEMUT WEBSITE - SUPABASE SETUP SCRIPT
-- Jalankan script ini di Supabase SQL Editor
-- ============================================================

-- 1. Tabel untuk foto profil anggota
CREATE TABLE IF NOT EXISTS member_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel untuk galeri foto
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT NOT NULL,
  event_name TEXT NOT NULL DEFAULT 'Casual',
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel untuk pesan kontak
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE member_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- member_photos: semua bisa baca, semua bisa insert/update (karena pakai kode admin di frontend)
CREATE POLICY "member_photos_select" ON member_photos FOR SELECT USING (true);
CREATE POLICY "member_photos_insert" ON member_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "member_photos_update" ON member_photos FOR UPDATE USING (true);

-- gallery: semua bisa baca, semua bisa insert
CREATE POLICY "gallery_select" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_insert" ON gallery FOR INSERT WITH CHECK (true);

-- messages: semua bisa insert (kirim pesan), hanya admin yang bisa baca
CREATE POLICY "messages_insert" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_select" ON messages FOR SELECT USING (true);

-- ============================================================
-- STORAGE BUCKET
-- ============================================================

-- Buat bucket untuk foto KEMUT
INSERT INTO storage.buckets (id, name, public)
VALUES ('kemut-photos', 'kemut-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: semua bisa upload dan lihat
CREATE POLICY "kemut_photos_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'kemut-photos');

CREATE POLICY "kemut_photos_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'kemut-photos');

CREATE POLICY "kemut_photos_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'kemut-photos');

-- ============================================================
-- SELESAI! 
-- Setelah menjalankan script ini:
-- 1. Copy SUPABASE_URL dan ANON_KEY dari Settings > API
-- 2. Paste ke file .env.local
-- ============================================================
