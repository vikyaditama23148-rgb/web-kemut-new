"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, ZoomIn } from "lucide-react";
import { supabase, uploadGalleryPhoto } from "@/lib/supabase";
import { GalleryItem } from "@/types";
import toast from "react-hot-toast";

const demoGallery: GalleryItem[] = [
  { id: "1", title: "Gathering Perdana KEMUT", description: "Momen bersejarah pertama kali KEMUT ngumpul bareng!", photo_url: "", event_name: "Gathering", created_at: "2024-01-15" },
  { id: "2", title: "Anniversary KEMUT", description: "Rayain hari jadi KEMUT dengan penuh sukacita!", photo_url: "", event_name: "Anniversary", created_at: "2024-03-20" },
  { id: "3", title: "Outing Seru", description: "Jalan-jalan bareng yang penuh tawa dan kenangan!", photo_url: "", event_name: "Outing", created_at: "2024-06-10" },
  { id: "4", title: "Foto Bersama", description: "Satu frame, sepuluh cerita!", photo_url: "", event_name: "Casual", created_at: "2024-08-05" },
];

const eventColors: Record<string, string> = {
  Gathering: "bg-kemut-yellow",
  Anniversary: "bg-kemut-pink",
  Outing: "bg-kemut-mint",
  Casual: "bg-kemut-orange",
  Event: "bg-purple-400",
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(demoGallery);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [newPhoto, setNewPhoto] = useState({ title: "", description: "", event_name: "Gathering", file: null as File | null });
  const ADMIN_CODE = "kemutselamanya1";

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        setGallery(data);
      }
    } catch {
      // Use demo data
    }
  }

  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setAdminMode(true);
    } else {
      toast.error("❌ Kode admin salah!");
    }
  };

  const handleUpload = async () => {
    if (!newPhoto.file || !newPhoto.title) {
      toast.error("❌ Judul dan foto wajib diisi!");
      return;
    }
    setUploading(true);
    toast.loading("📤 Mengupload foto...", { id: "gallery-upload" });
    try {
      const url = await uploadGalleryPhoto(newPhoto.file, newPhoto.event_name);
      if (!url) throw new Error("Upload failed");
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        title: newPhoto.title,
        description: newPhoto.description,
        photo_url: url,
        event_name: newPhoto.event_name,
        created_at: new Date().toISOString(),
      };
      await supabase.from("gallery").insert([newItem]);
      setGallery((prev) => [newItem, ...prev]);
      setShowUploadModal(false);
      setNewPhoto({ title: "", description: "", event_name: "Gathering", file: null });
      toast.success("✅ Foto berhasil diupload!", { id: "gallery-upload" });
    } catch {
      toast.error("❌ Upload gagal!", { id: "gallery-upload" });
    } finally {
      setUploading(false);
    }
  };

  const events = ["Semua", ...Array.from(new Set(gallery.map((g) => g.event_name)))];
  const filtered = activeFilter === "Semua" ? gallery : gallery.filter((g) => g.event_name === activeFilter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-kemut-yellow py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 polkadot-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-6">📸</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="section-title text-6xl sm:text-7xl text-kemut-dark mb-4">
            Galeri KEMUT
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-kemut-brown font-semibold">
            Kumpulan momen berharga dan kenangan indah bersama! 💛
          </motion.p>
        </div>
      </section>

      {/* Admin Panel */}
      <section className="py-6 px-4 bg-kemut-cream border-b-4 border-kemut-yellow">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3 justify-center">
          {!adminMode ? (
            <>
              <span className="text-kemut-brown font-bold text-sm">🔐 Admin Upload Foto:</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Kode admin..."
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="px-4 py-2 rounded-xl border-3 border-kemut-dark font-bold text-sm focus:outline-none focus:ring-2 focus:ring-kemut-yellow"
                />
                <button onClick={handleAdminLogin} className="px-5 py-2 bg-kemut-dark text-kemut-yellow rounded-xl font-bold text-sm cartoon-border hover:scale-105 transition-transform">
                  Masuk
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✅ Mode Admin Aktif</span>
              <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-5 py-2 bg-kemut-yellow cartoon-border rounded-xl font-bold text-kemut-dark hover:scale-105 transition-transform">
                <Upload size={16} /> Upload Foto
              </button>
              <button onClick={() => { setAdminMode(false); setAdminCode(""); }} className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-200">
                Keluar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-4 bg-kemut-cream sticky top-16 z-30 border-b-2 border-kemut-yellow/30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {events.map((e) => (
            <button
              key={e}
              onClick={() => setActiveFilter(e)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 ${
                activeFilter === e ? "bg-kemut-dark text-kemut-yellow cartoon-border" : "bg-white text-kemut-dark cartoon-border hover:bg-kemut-yellow"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 bg-kemut-cream">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-black text-kemut-dark mb-2">Belum ada foto!</h3>
              <p className="text-kemut-brown">Jadilah yang pertama mengabadikan momen KEMUT 💛</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  <div className="bg-white rounded-2xl cartoon-border overflow-hidden card-lift">
                    <div className={`${eventColors[item.event_name] || "bg-kemut-yellow"} aspect-video flex items-center justify-center relative overflow-hidden`}>
                      {item.photo_url ? (
                        <Image src={item.photo_url} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <div className="text-5xl mb-2">📸</div>
                          <span className="text-kemut-dark font-bold text-sm">{item.event_name}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-kemut-dark/0 group-hover:bg-kemut-dark/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="p-4">
                      <span className={`${eventColors[item.event_name] || "bg-kemut-yellow"} text-kemut-dark text-xs font-bold px-3 py-1 rounded-full inline-block mb-2`}>
                        {item.event_name}
                      </span>
                      <h3 className="font-black text-kemut-dark text-sm">{item.title}</h3>
                      {item.description && <p className="text-kemut-brown text-xs mt-1 line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl cartoon-border max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`${eventColors[selected.event_name] || "bg-kemut-yellow"} aspect-video relative flex items-center justify-center`}>
                {selected.photo_url ? (
                  <Image src={selected.photo_url} alt={selected.title} fill className="object-cover" />
                ) : (
                  <div className="text-center"><div className="text-8xl">📸</div></div>
                )}
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 bg-white/90 rounded-full p-1 cartoon-border hover:scale-110 transition-transform">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <span className={`${eventColors[selected.event_name] || "bg-kemut-yellow"} text-kemut-dark text-sm font-bold px-3 py-1 rounded-full inline-block mb-3`}>
                  {selected.event_name}
                </span>
                <h3 className="font-black text-kemut-dark text-xl mb-2">{selected.title}</h3>
                {selected.description && <p className="text-kemut-brown">{selected.description}</p>}
                <p className="text-kemut-brown/50 text-xs mt-3">{new Date(selected.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="bg-white rounded-3xl cartoon-border max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-kemut-dark text-xl">📤 Upload Foto Baru</h3>
                <button onClick={() => setShowUploadModal(false)} className="hover:scale-110 transition-transform">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-1">Judul Foto *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Gathering Agustus 2024"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-3 border-kemut-dark font-semibold focus:outline-none focus:ring-2 focus:ring-kemut-yellow"
                  />
                </div>
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-1">Deskripsi</label>
                  <textarea
                    placeholder="Ceritakan momen ini..."
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-3 border-kemut-dark font-semibold focus:outline-none focus:ring-2 focus:ring-kemut-yellow resize-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-1">Kategori Event</label>
                  <select
                    value={newPhoto.event_name}
                    onChange={(e) => setNewPhoto((p) => ({ ...p, event_name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-3 border-kemut-dark font-semibold focus:outline-none focus:ring-2 focus:ring-kemut-yellow bg-white"
                  >
                    {["Gathering", "Anniversary", "Outing", "Casual", "Event"].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-1">Pilih Foto *</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-3 border-dashed border-kemut-yellow rounded-xl p-6 text-center cursor-pointer hover:bg-kemut-yellow/10 transition-colors"
                  >
                    {newPhoto.file ? (
                      <span className="font-bold text-kemut-dark">✅ {newPhoto.file.name}</span>
                    ) : (
                      <>
                        <div className="text-3xl mb-2">🖼️</div>
                        <span className="text-kemut-brown font-semibold text-sm">Klik untuk pilih foto</span>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setNewPhoto((p) => ({ ...p, file }));
                    }}
                  />
                </div>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full py-4 bg-kemut-yellow cartoon-border rounded-xl font-black text-kemut-dark text-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? (<><Loader2 size={20} className="animate-spin" /> Mengupload...</>) : ("📤 Upload Foto")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
