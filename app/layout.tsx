import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
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
      <body className={`${pixelFont.className} bg-black text-white min-h-screen selection:bg-green-500/30 uppercase antialiased`}>
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
            </footer>
          </SoundProvider>
        </AuthProvider>
      </body>
    </html>
  );
}