"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { members } from "@/lib/members-data";
import MemberCard from "@/components/ui/MemberCard";

const floatingEmojis = ["💛", "⭐", "🌟", "✨", "🎉", "🐣", "💕", "🌸"];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-kemut-yellow via-kemut-yellow-light to-kemut-cream pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 polkadot-bg opacity-30" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-kemut-orange/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-kemut-pink/20 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-kemut-yellow/30 rounded-full blur-3xl animate-blob [animation-delay:4s]" />

        {/* Floating emojis */}
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl pointer-events-none select-none"
            style={{
              left: `${10 + (i * 11) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-8xl mb-6 block"
          >
            🐣
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-title text-7xl sm:text-8xl lg:text-9xl text-kemut-dark mb-4 leading-none"
            style={{ textShadow: "4px 4px 0px rgba(26,10,0,0.15)" }}
          >
            KEMUT
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-block bg-kemut-dark text-kemut-yellow px-8 py-3 rounded-full font-bold text-xl mb-6 cartoon-border"
          >
            ✨ Kecil dan Imut ✨
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl sm:text-2xl text-kemut-brown font-semibold max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Komunitas kecil yang penuh kehangatan, keceriaan, dan kasih sayang
            yang besar! 💛
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/about"
              className="px-8 py-4 bg-kemut-dark text-kemut-yellow font-bold text-lg rounded-2xl cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              💛 Kenali KEMUT
            </Link>
            <Link
              href="/members"
              className="px-8 py-4 bg-white text-kemut-dark font-bold text-lg rounded-2xl cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              👥 Lihat Anggota
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { emoji: "👥", count: "10", label: "Anggota" },
              { emoji: "🎉", count: "∞", label: "Kenangan" },
              { emoji: "💛", count: "1", label: "Keluarga" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 cartoon-border text-center"
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-pacifico text-2xl text-kemut-dark">
                  {stat.count}
                </div>
                <div className="text-xs font-bold text-kemut-brown">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-3 border-kemut-dark flex items-start justify-center pt-2">
            <div className="w-2 h-2 bg-kemut-dark rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <div className="bg-kemut-yellow relative">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <path
            fill="#FFFBEA"
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          />
        </svg>
      </div>

      {/* About Snippet */}
      <section className="py-20 px-4 bg-kemut-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-5xl sm:text-6xl text-kemut-dark mb-4">
              Apa itu KEMUT? 🤔
            </h2>
            <p className="text-xl text-kemut-brown max-w-2xl mx-auto">
              Lebih dari sekedar komunitas — KEMUT adalah keluarga!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🌱",
                title: "Lahir dari Kebersamaan",
                desc: "KEMUT lahir dari sekumpulan orang-orang kecil nan imut yang punya hati besar dan semangat membara.",
                color: "bg-kemut-yellow",
              },
              {
                emoji: "💪",
                title: "Tumbuh Bersama",
                desc: "Setiap anggota KEMUT tumbuh bersama, saling mendukung, dan merayakan setiap pencapaian kecil maupun besar.",
                color: "bg-kemut-orange",
              },
              {
                emoji: "🌟",
                title: "Bersinar Selamanya",
                desc: "Seperti bintang kecil yang bersinar terang, KEMUT terus menyinari hari-hari dengan keceriaan dan kehangatan.",
                color: "bg-kemut-pink",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`${item.color} rounded-3xl p-8 cartoon-border card-lift`}
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-2xl text-kemut-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-kemut-dark/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kemut-dark text-kemut-yellow font-bold text-lg rounded-2xl cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-lg transition-all duration-200"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        </div>
      </section>

      {/* Members Preview */}
      <section className="py-20 px-4 bg-kemut-yellow relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-5xl sm:text-6xl text-kemut-dark mb-4">
              Keluarga KEMUT 👨‍👩‍👧‍👦
            </h2>
            <p className="text-xl text-kemut-brown font-semibold">
              Kenali orang-orang luar biasa di balik komunitas kita!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.slice(0, 8).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <MemberCard member={member} compact />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/members"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kemut-dark text-kemut-yellow font-bold text-lg rounded-2xl cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-yellow transition-all duration-200"
            >
              👥 Lihat Semua Anggota
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-20 px-4 bg-kemut-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-5xl sm:text-6xl text-kemut-dark mb-4">
              Momen Berharga 📸
            </h2>
            <p className="text-xl text-kemut-brown mb-10">
              Setiap foto menyimpan cerita dan kenangan indah kita bersama!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                "🎉 Gathering Pertama",
                "🎂 Anniversary KEMUT",
                "🏕️ Outing Bareng",
                "🎭 Event Seru",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="bg-kemut-yellow aspect-square rounded-2xl cartoon-border flex items-center justify-center"
                >
                  <span className="text-center font-bold text-kemut-dark p-4">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kemut-pink text-white font-bold text-lg rounded-2xl cartoon-border hover:translate-y-[-2px] hover:shadow-kemut-lg transition-all duration-200"
            >
              📸 Lihat Galeri Lengkap
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 px-4 bg-kemut-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-40 h-40 bg-kemut-yellow/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-kemut-orange/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">📱</div>
            <h2 className="section-title text-4xl sm:text-5xl text-kemut-yellow mb-4">
              Follow Kita di Sosmed!
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Jangan ketinggalan konten seru, momen berharga, dan update terbaru
              dari KEMUT!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  icon: "📸",
                  label: "Instagram",
                  handle: "@kemut.id",
                  color: "bg-kemut-pink",
                },
                {
                  icon: "🎵",
                  label: "TikTok",
                  handle: "@kemut.id",
                  color: "bg-kemut-mint",
                },
                {
                  icon: "▶️",
                  label: "YouTube",
                  handle: "KEMUT Official",
                  color: "bg-kemut-orange",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`${social.color} text-kemut-dark px-6 py-4 rounded-2xl cartoon-border font-bold flex items-center gap-3`}
                >
                  <span className="text-2xl">{social.icon}</span>
                  <div className="text-left">
                    <div className="text-sm">{social.label}</div>
                    <div className="font-black">{social.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
