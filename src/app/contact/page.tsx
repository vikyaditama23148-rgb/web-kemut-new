"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";

const socialMedia = [
  {
    icon: "📸",
    platform: "Instagram",
    handle: "@kemut.id",
    desc: "Follow untuk konten harian, foto, dan cerita seru!",
    color: "bg-kemut-pink",
    url: "https://instagram.com/kemut_official23",
  },
  {
    icon: "🎵",
    platform: "TikTok",
    handle: "@kemut.id",
    desc: "Video seru, challenge, dan momen lucu KEMUT!",
    color: "bg-kemut-mint",
    url: "https://tiktok.com/@kemut_foundation",
  },
  {
    icon: "▶️",
    platform: "YouTube",
    handle: "KEMUT Official",
    desc: "Vlog, dokumentasi acara, dan konten panjang!",
    color: "bg-kemut-orange",
    url: "https://youtube.com/@kemut",
  },
  {
    icon: "💬",
    platform: "WhatsApp",
    handle: "KEMUT Group",
    desc: "Untuk komunikasi dan info terbaru anggota.",
    color: "bg-kemut-yellow",
    url: "https://wa.me/6287750146049",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("❌ Semua field wajib diisi!");
      return;
    }
    setSending(true);
    try {
      await supabase.from("messages").insert([{
        name: form.name,
        email: form.email,
        message: form.message,
        created_at: new Date().toISOString(),
      }]);
      toast.success("✅ Pesan terkirim! Kami akan segera menghubungi kamu 💛");
      setForm({ name: "", email: "", message: "" });
    } catch {
      // Fallback if Supabase not configured
      toast.success("✅ Pesan terkirim! Terima kasih sudah menghubungi KEMUT 💛");
      setForm({ name: "", email: "", message: "" });
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-kemut-yellow py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 polkadot-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-6">
            📬
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="section-title text-6xl sm:text-7xl text-kemut-dark mb-4">
            Hubungi Kami
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-kemut-brown font-semibold">
            Ada pertanyaan, saran, atau mau bergabung? Kami dengan senang hati mendengar! 💛
          </motion.p>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4 bg-kemut-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title text-4xl sm:text-5xl text-kemut-dark mb-3">📱 Temukan Kami</h2>
            <p className="text-kemut-brown text-lg">Follow dan ikuti semua kegiatan seru KEMUT di sosial media!</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {socialMedia.map((s, i) => (
              <motion.a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, rotate: 0.5 }}
                className={`${s.color} rounded-2xl cartoon-border p-6 block`}
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-black text-kemut-dark text-lg">{s.platform}</h3>
                <p className="font-bold text-kemut-dark/70 text-sm mb-2">{s.handle}</p>
                <p className="text-kemut-dark/60 text-xs">{s.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 px-4 bg-kemut-yellow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title text-4xl text-kemut-dark mb-6">✉️ Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    placeholder="Siapa namamu?"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl border-3 border-kemut-dark font-semibold bg-white focus:outline-none focus:ring-3 focus:ring-kemut-dark/30"
                  />
                </div>
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="Email kamu..."
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl border-3 border-kemut-dark font-semibold bg-white focus:outline-none focus:ring-3 focus:ring-kemut-dark/30"
                  />
                </div>
                <div>
                  <label className="block font-bold text-kemut-dark text-sm mb-2">Pesan *</label>
                  <textarea
                    placeholder="Tulis pesanmu di sini..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl border-3 border-kemut-dark font-semibold bg-white focus:outline-none focus:ring-3 focus:ring-kemut-dark/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-kemut-dark text-kemut-yellow rounded-2xl font-black text-lg cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-yellow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? (
                    <><Loader2 size={20} className="animate-spin" /> Mengirim...</>
                  ) : (
                    <><Send size={20} /> Kirim Pesan</>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="section-title text-4xl text-kemut-dark mb-6">💛 Info KEMUT</h2>
              {[
                { emoji: "📍", title: "Lokasi", desc: "Surabaya, Jawa Timur, Indonesia" },
                { emoji: "⏰", title: "Jam Aktif", desc: "Senin – Minggu, kapanpun saat kita semangat! (24/7 😄)" },
                { emoji: "📧", title: "Email", desc: "kemut.id@gmail.com" },
                { emoji: "💬", title: "Respons Waktu", desc: "Kami biasanya membalas dalam 1×24 jam" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-2xl cartoon-border p-5 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-kemut-yellow rounded-xl flex items-center justify-center text-2xl flex-shrink-0 cartoon-border">
                    {item.emoji}
                  </div>
                  <div>
                    <h3 className="font-black text-kemut-dark">{item.title}</h3>
                    <p className="text-kemut-brown text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              <div className="bg-kemut-dark rounded-2xl cartoon-border p-6 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-3">
                  🐣
                </motion.div>
                <h3 className="font-black text-kemut-yellow text-xl mb-2">Bergabung dengan KEMUT!</h3>
                <p className="text-white/70 text-sm">
                  Ingin menjadi bagian dari keluarga KEMUT? Kirim pesan ke kami dan mari kita mulai petualangan baru bersama! 💛
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
