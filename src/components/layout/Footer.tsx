import Link from "next/link";

const socialLinks = [
  { icon: "📸", label: "Instagram", href: "https://instagram.com/kemut_official23" },
  { icon: "🎵", label: "TikTok", href: "https://tiktok.com/@kemut_foundation" },
  { icon: "▶️", label: "YouTube", href: "https://youtube.com/@kemut" },
  { icon: "💬", label: "WhatsApp", href: "https://wa.me/6287750146049" },
];

export default function Footer() {
  return (
    <footer className="bg-kemut-dark text-white relative overflow-hidden">
      {/* Wavy top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFFBEA"
            d="M0,25 C360,50 720,0 1080,25 L1440,25 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-kemut-yellow/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-kemut-orange/10 rounded-full blur-xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🐣</span>
              <div>
                <h3 className="font-pacifico text-3xl text-kemut-yellow">
                  KEMUT
                </h3>
                <p className="text-kemut-yellow/60 text-xs font-semibold">
                  Kecil dan Imut
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Komunitas yang lahir dari kehangatan, tumbuh dalam kebersamaan,
              dan bersinar dengan keceriaan. 💛
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-kemut-yellow mb-4 text-lg">
              🔗 Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "Tentang KEMUT" },
                { href: "/members", label: "Anggota" },
                { href: "/gallery", label: "Galeri" },
                { href: "/contact", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-kemut-yellow transition-colors text-sm font-medium"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-kemut-yellow mb-4 text-lg">
              📱 Social Media
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-kemut-yellow hover:text-kemut-dark text-white px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                >
                  <span>{social.icon}</span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm text-center">
            © 2024 KEMUT (Kecil & Imut). Made with 💛 and lots of love.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🐣</span>
            <span className="text-2xl animate-bounce [animation-delay:0.1s]">
              💛
            </span>
            <span className="text-2xl animate-bounce [animation-delay:0.2s]">
              🌟
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
