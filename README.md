# 🐣 KEMUT Website — Kecil dan Imut

Website resmi komunitas **KEMUT (Kecil dan Imut)** — dibangun dengan Next.js 14, Supabase, Tailwind CSS, dan siap deploy ke Vercel!

---

## ✨ Fitur

- 🏠 **Home** — Landing page dengan hero animasi, info anggota, galeri preview, dan social media
- 💛 **Tentang** — Sejarah KEMUT, nilai-nilai, timeline asal usul, dan maskot Nailong
- 👥 **Anggota** — Kartu profil semua anggota + **upload foto profil via Supabase**
- 📸 **Galeri** — Dokumentasi foto acara + **upload foto baru via Supabase**
- 📬 **Kontak** — Form pesan + info social media lengkap

---

## 🚀 Cara Setup (Step by Step)

### 1. Clone / Buka di VSCode

```bash
# Buka folder ini di VSCode
cd kemut-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

#### A. Buat Project Supabase
1. Pergi ke [supabase.com](https://supabase.com)
2. Klik **"New Project"**
3. Isi nama project: `kemut-website`
4. Catat **URL** dan **anon key** dari **Settings → API**

#### B. Jalankan SQL Setup
1. Buka **Supabase Dashboard → SQL Editor**
2. Copy semua isi file `supabase-setup.sql`
3. Paste dan klik **Run**

#### C. Konfigurasi Environment
1. Buka file `.env.local`
2. Isi dengan kredensial Supabase kamu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

---

## 👤 Cara Update Foto Profil Anggota

1. Pergi ke halaman **Anggota** (`/members`)
2. Di bagian atas, masukkan **kode admin**: `kemutselamanya1`
3. Klik **"Masuk"**
4. Klik ikon 📷 di kartu anggota yang ingin diupdate
5. Pilih foto dari komputer
6. Foto otomatis terupload ke Supabase Storage!

> ⚠️ Ganti kode admin di file `src/app/members/page.tsx` dan `src/app/gallery/page.tsx` sebelum deploy!

---

## 📸 Cara Upload Foto Galeri

1. Pergi ke halaman **Galeri** (`/gallery`)
2. Masukkan kode admin: `kemutselamanya1`
3. Klik **"Upload Foto"**
4. Isi judul, deskripsi, kategori, dan pilih foto
5. Klik **"Upload Foto"** — selesai!

---

## 🌐 Deploy ke Vercel

### Cara Mudah:

1. Push kode ke GitHub:
```bash
git init
git add .
git commit -m "🐣 Initial KEMUT website"
git remote add origin https://github.com/username/kemut-website.git
git push -u origin main
```

2. Buka [vercel.com](https://vercel.com)
3. Import repository dari GitHub
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (isi dengan URL Vercel kamu setelah deploy)
5. Klik **Deploy** — selesai! 🚀

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 14** | Framework React dengan App Router |
| **Supabase** | Database + Storage untuk foto |
| **Tailwind CSS** | Styling utility-first |
| **Framer Motion** | Animasi halus dan interaktif |
| **Vercel** | Hosting & deployment |

---

## 📁 Struktur Project

```
kemut-website/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home
│   │   ├── about/page.tsx    # Tentang KEMUT
│   │   ├── members/page.tsx  # Halaman Anggota
│   │   ├── gallery/page.tsx  # Galeri Foto
│   │   ├── contact/page.tsx  # Kontak
│   │   ├── layout.tsx        # Root Layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── MemberCard.tsx
│   │       └── ProfilePhotoUpload.tsx
│   ├── lib/
│   │   ├── supabase.ts       # Supabase client & helpers
│   │   └── members-data.ts   # Data anggota KEMUT
│   └── types/
│       └── index.ts          # TypeScript types
├── supabase-setup.sql        # Script setup Supabase
├── .env.local                # Environment variables (jangan di-commit!)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## ✏️ Kustomisasi

### Update Data Anggota
Edit file `src/lib/members-data.ts`:
- Tambah/ubah nama, jabatan, deskripsi, fun fact
- Tambah link Instagram/TikTok

### Update Social Media
Edit di `src/components/layout/Footer.tsx` dan `src/app/contact/page.tsx`

### Ganti Kode Admin
Cari `ADMIN_CODE = "kemutselamanya1"` di:
- `src/app/members/page.tsx`
- `src/app/gallery/page.tsx`

---

## 💛 KEMUT — Kecil dan Imut

Dibuat dengan ❤️ untuk komunitas KEMUT yang tercinta!

```
🐣 Kecil dan Imut, tapi semangat selalu besar! 🌟
```
