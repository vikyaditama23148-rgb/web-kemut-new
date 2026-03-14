import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KEMUT - Kecil dan Imut Community",
  description:
    "Website resmi Komunitas KEMUT (Kecil dan Imut) — tempat di mana kehangatan, kebersamaan, dan keceriaan bertemu!",
  keywords: ["KEMUT", "kecil dan imut", "komunitas", "kebersamaan"],
  openGraph: {
    title: "KEMUT - Kecil dan Imut Community",
    description: "Website resmi Komunitas KEMUT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="font-nunito bg-kemut-cream min-h-screen">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#FFD60A",
              color: "#1A0A00",
              fontWeight: "700",
              border: "3px solid #1A0A00",
              borderRadius: "12px",
              boxShadow: "4px 4px 0px #1A0A00",
            },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
