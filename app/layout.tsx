import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { SoundProvider } from "@/context/SoundContext";

const pixelFont = Press_Start_2P({ 
  weight: "400", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALGO ARENA",
  description: "Level up your Data Structures and Algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1296094824779726" />
      </head>
      <body className={`${pixelFont.className} bg-black text-white min-h-screen selection:bg-green-500/30 uppercase antialiased`}>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1296094824779726" crossOrigin="anonymous" strategy="afterInteractive" />
        <AuthProvider>
          <SoundProvider>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center text-[10px] leading-relaxed text-zinc-500">
              DISCLAIMER: Some questions are sourced from LeetCode for educational purposes.
              LeetCode is a trademark of its respective owner. This project is not affiliated
              with or endorsed by LeetCode, and all rights belong to their respective owners.
              <nav className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                <Link href="/privacy" className="hover:text-white">PRIVACY POLICY</Link>
                <Link href="/terms" className="hover:text-white">TERMS OF SERVICE</Link>
                <Link href="/contact" className="hover:text-white">CONTACT US</Link>
                <Link href="/about" className="hover:text-white">ABOUT US</Link>
                <Link href="/disclaimer" className="hover:text-white">DISCLAIMER</Link>
              </nav>
            </footer>
          </SoundProvider>
        </AuthProvider>
      </body>
    </html>
  );
}