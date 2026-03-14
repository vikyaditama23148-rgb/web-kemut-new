"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "🏠 Home" },
  { href: "/about", label: "💛 Tentang" },
  { href: "/members", label: "👥 Anggota" },
  { href: "/gallery", label: "📸 Galeri" },
  { href: "/contact", label: "📬 Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-kemut-yellow border-b-4 border-kemut-dark shadow-kemut"
          : "bg-kemut-yellow/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="text-3xl"
            >
              🐣
            </motion.div>
            <div>
              <span className="font-pacifico text-2xl text-kemut-dark tracking-wide">
                KEMUT
              </span>
              <p className="text-[10px] font-bold text-kemut-brown -mt-1">
                Kecil & Imut
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 ${
                  pathname === link.href
                    ? "bg-kemut-dark text-kemut-yellow shadow-kemut-yellow border-2 border-kemut-yellow"
                    : "text-kemut-dark hover:bg-kemut-dark/10 border-2 border-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl border-3 border-kemut-dark bg-white cartoon-border transition-all hover:scale-110"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-kemut-yellow border-t-4 border-kemut-dark"
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                    pathname === link.href
                      ? "bg-kemut-dark text-kemut-yellow"
                      : "text-kemut-dark hover:bg-kemut-dark/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
