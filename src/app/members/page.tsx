"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { members as defaultMembers } from "@/lib/members-data";
import { supabase } from "@/lib/supabase";
import { Member } from "@/types";
import MemberCard from "@/components/ui/MemberCard";

const roles = ["Semua", "Ketua Umum", "Sekretaris", "Bendahara", "Brand Ambassador", "Dokter Pribadi", "Manager", "Keamanan", "Editor / PDD", "Mommy KEMUT"];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [showUpload, setShowUpload] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const ADMIN_CODE = "kemutselamanya1";

  // Load photos from Supabase
  useEffect(() => {
    async function loadPhotos() {
      try {
        const { data, error } = await supabase
          .from("member_photos")
          .select("member_id, photo_url");
        if (error || !data) return;
        setMembers((prev) =>
          prev.map((m) => {
            const found = data.find((d: { member_id: string; photo_url: string }) => d.member_id === m.id);
            return found ? { ...m, photo_url: found.photo_url } : m;
          })
        );
      } catch {
        // Supabase not configured yet — use defaults
      }
    }
    loadPhotos();
  }, []);

  const handlePhotoUpdate = async (memberId: string, newUrl: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, photo_url: newUrl } : m))
    );
    // Save to Supabase
    await supabase.from("member_photos").upsert({ member_id: memberId, photo_url: newUrl });
  };

  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setAdminMode(true);
      setShowUpload(true);
    } else {
      alert("❌ Kode admin salah!");
    }
  };

  const filtered = activeFilter === "Semua"
    ? members
    : members.filter((m) => m.role === activeFilter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-kemut-yellow py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 polkadot-bg opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-kemut-pink/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-6">
            👨‍👩‍👧‍👦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="section-title text-6xl sm:text-7xl text-kemut-dark mb-4">
            Keluarga KEMUT
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-kemut-brown font-semibold">
            {members.length} anggota luar biasa yang membuat KEMUT semakin berwarna! 🌈
          </motion.p>
        </div>
      </section>

      {/* Admin Panel */}
      <section className="py-6 px-4 bg-kemut-cream border-b-4 border-kemut-yellow">
        <div className="max-w-7xl mx-auto">
          {!adminMode ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <span className="text-kemut-brown font-bold text-sm">🔐 Mode Admin (untuk update foto):</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Masukkan kode admin..."
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="px-4 py-2 rounded-xl border-3 border-kemut-dark font-bold text-sm focus:outline-none focus:ring-2 focus:ring-kemut-yellow"
                />
                <button
                  onClick={handleAdminLogin}
                  className="px-5 py-2 bg-kemut-dark text-kemut-yellow rounded-xl font-bold text-sm cartoon-border hover:scale-105 transition-transform"
                >
                  Masuk
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span className="text-green-600 font-bold">✅ Mode Admin Aktif — Klik ikon kamera untuk update foto!</span>
              <button
                onClick={() => { setAdminMode(false); setShowUpload(false); setAdminCode(""); }}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-200 transition-colors"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-4 bg-kemut-cream sticky top-16 z-30 border-b-2 border-kemut-yellow/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {["Semua", ...Array.from(new Set(members.map((m) => m.role)))].map((role) => (
              <button
                key={role}
                onClick={() => setActiveFilter(role)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 ${
                  activeFilter === role
                    ? "bg-kemut-dark text-kemut-yellow cartoon-border"
                    : "bg-white text-kemut-dark cartoon-border hover:bg-kemut-yellow"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 px-4 bg-kemut-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((member, i) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <MemberCard
                  member={member}
                  showUpload={showUpload}
                  onPhotoUpdate={handlePhotoUpdate}
                />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-kemut-brown font-bold text-lg">Tidak ada anggota dengan jabatan ini</p>
            </div>
          )}
        </div>
      </section>

      {/* Hierarchy Visual */}
      <section className="py-20 px-4 bg-kemut-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-4xl sm:text-5xl text-kemut-yellow mb-12">
            Struktur Organisasi 🏛️
          </h2>
          <div className="space-y-4">
            {/* Top */}
            <div className="flex justify-center">
              <div className="bg-kemut-yellow rounded-2xl cartoon-border px-8 py-4 font-black text-kemut-dark text-lg">
                👑 Ketua Umum
              </div>
            </div>
            {/* Arrow */}
            <div className="text-kemut-yellow text-2xl">▼</div>
            {/* Second row */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { emoji: "📝", label: "Sekretaris" },
                { emoji: "💰", label: "Bendahara" },
                { emoji: "📊", label: "Manager" },
              ].map((item) => (
                <div key={item.label} className="bg-kemut-orange rounded-xl cartoon-border-yellow px-5 py-3 font-bold text-kemut-dark text-sm">
                  {item.emoji} {item.label}
                </div>
              ))}
            </div>
            <div className="text-kemut-yellow text-2xl">▼</div>
            {/* Third row */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { emoji: "⭐", label: "Brand Ambassador" },
                { emoji: "🩺", label: "Dokter Pribadi" },
                { emoji: "🛡️", label: "Keamanan (2)" },
                { emoji: "🎨", label: "Editor/PDD" },
                { emoji: "💝", label: "Mommy KEMUT" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 border border-kemut-yellow/30 rounded-xl px-4 py-2 text-white text-sm font-semibold">
                  {item.emoji} {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
