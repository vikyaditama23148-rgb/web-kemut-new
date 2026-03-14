"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "Awal Mula",
    emoji: "🌱",
    title: "Benih Persahabatan",
    desc: "Sekelompok orang yang 'kecil dan imut' bertemu dan menemukan kesamaan: semangat, canda tawa, dan hati yang hangat.",
    color: "bg-kemut-yellow",
  },
  {
    year: "Tumbuh",
    emoji: "🌿",
    title: "KEMUT Terbentuk",
    desc: "Nama KEMUT dipilih sebagai identitas — Kecil dan Imut — yang merepresentasikan karakter semua anggotanya yang adorable.",
    color: "bg-kemut-mint",
  },
  {
    year: "Berkembang",
    emoji: "🌸",
    title: "Struktur & Peran",
    desc: "Setiap anggota menemukan peran uniknya masing-masing, membentuk tim yang solid dan saling melengkapi.",
    color: "bg-kemut-pink",
  },
  {
    year: "Bersinar",
    emoji: "⭐",
    title: "KEMUT Hari Ini",
    desc: "Kini KEMUT adalah komunitas yang aktif, hangat, dan terus tumbuh — menjadi tempat di mana setiap anggota merasa diterima.",
    color: "bg-kemut-orange",
  },
];

const values = [
  { emoji: "💛", title: "Kehangatan", desc: "Setiap anggota adalah bagian dari keluarga yang saling peduli dan mendukung satu sama lain." },
  { emoji: "😂", title: "Keceriaan", desc: "Tawa dan senyum adalah bahasa utama KEMUT — karena hidup terlalu singkat untuk tidak bahagia!" },
  { emoji: "🤝", title: "Kebersamaan", desc: "Bersama kita kuat! Setiap tantangan jadi lebih mudah ketika dihadapi bersama-sama." },
  { emoji: "🌱", title: "Pertumbuhan", desc: "KEMUT percaya bahwa setiap anggota punya potensi luar biasa yang terus berkembang." },
  { emoji: "🎨", title: "Kreativitas", desc: "Ide-ide segar dan ekspresi diri bebas selalu disambut hangat di komunitas KEMUT." },
  { emoji: "💪", title: "Semangat", desc: "Api semangat KEMUT tidak pernah padam — selalu ada energi positif yang mengalir di antara kita." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-kemut-yellow py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 polkadot-bg opacity-20" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-kemut-orange/30 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-6">
            💛
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="section-title text-6xl sm:text-7xl text-kemut-dark mb-4">
            Tentang KEMUT
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-kemut-brown font-semibold max-w-2xl mx-auto">
            Kenali lebih dalam tentang komunitas kecil yang imut namun punya semangat sebesar dunia!
          </motion.p>
        </div>
      </section>

      {/* What is KEMUT */}
      <section className="py-20 px-4 bg-kemut-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="kemut-tag mb-4">📖 Tentang Kami</span>
              <h2 className="section-title text-4xl sm:text-5xl text-kemut-dark mb-6">
                Apa itu KEMUT?
              </h2>
              <div className="space-y-4 text-kemut-brown text-lg leading-relaxed">
                <p>
                  <strong>KEMUT</strong> adalah singkatan dari{" "}
                  <strong className="text-kemut-dark bg-kemut-yellow px-2 rounded-lg">"Kecil dan Imut"</strong>{" "}
                  — sebuah komunitas yang lahir dari persahabatan tulus dan keinginan untuk menciptakan ruang yang nyaman bagi semua anggotanya.
                </p>
                <p>
                  Meski namanya "kecil", semangat dan kasih sayang di dalam KEMUT sangatlah besar! Kami adalah sekumpulan orang-orang dengan kepribadian unik yang bersatu dalam satu wadah penuh keceriaan.
                </p>
                <p>
                  Di KEMUT, tidak ada yang terlalu kecil untuk dirayakan dan tidak ada yang terlalu besar untuk dihadapi bersama-sama. Kami percaya bahwa kebersamaan adalah kekuatan terbesar kami.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { emoji: "🐣", label: "Maskot KEMUT", sub: "Nailong si Bebek Imut" },
                { emoji: "💛", label: "Warna Utama", sub: "Kuning — Hangat & Ceria" },
                { emoji: "👨‍👩‍👧‍👦", label: "10 Anggota", sub: "Satu Keluarga Besar" },
                { emoji: "🌟", label: "Motto", sub: '"Kecil Tapi Luar Biasa!"' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="bg-kemut-yellow rounded-2xl cartoon-border p-5 text-center"
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-black text-kemut-dark text-sm">{item.label}</div>
                  <div className="text-kemut-brown text-xs mt-1">{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origin Story / Timeline */}
      <section className="py-20 px-4 bg-kemut-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-title text-4xl sm:text-5xl text-kemut-yellow mb-4">
              Asal Usul KEMUT 📜
            </h2>
            <p className="text-white/60 text-lg">Perjalanan dari benih persahabatan menjadi komunitas yang dicintai</p>
          </motion.div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-kemut-yellow/30 hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className={`${item.color} w-16 h-16 rounded-2xl cartoon-border flex-shrink-0 flex items-center justify-center text-3xl z-10`}>
                    {item.emoji}
                  </div>
                  <div className="bg-white/10 rounded-2xl p-5 flex-1 border border-white/10">
                    <span className="text-kemut-yellow text-xs font-bold uppercase tracking-wider">{item.year}</span>
                    <h3 className="text-white font-black text-xl mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-kemut-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="section-title text-4xl sm:text-5xl text-kemut-dark mb-4">
              Nilai-Nilai KEMUT 🌟
            </h2>
            <p className="text-kemut-brown text-lg">Prinsip yang mengikat kita semua dalam satu keluarga</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, rotate: 0.5 }}
                className="bg-white rounded-2xl cartoon-border p-6"
              >
                <div className="text-5xl mb-4">{v.emoji}</div>
                <h3 className="font-black text-kemut-dark text-xl mb-2">{v.title}</h3>
                <p className="text-kemut-brown text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nailong mascot section */}
      <section className="py-20 px-4 bg-kemut-yellow relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-9xl mb-6">
              🐣
            </motion.div>
            <h2 className="section-title text-4xl sm:text-5xl text-kemut-dark mb-4">
              Maskot KEMUT: Nailong!
            </h2>
            <p className="text-kemut-brown text-lg max-w-2xl mx-auto leading-relaxed">
              Nailong — si bebek kuning yang imut dan ceria — adalah maskot resmi KEMUT! Seperti Nailong yang selalu energik dan menggemaskan, begitu pula semangat seluruh anggota KEMUT dalam menjalani setiap hari. 🐥💛
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
