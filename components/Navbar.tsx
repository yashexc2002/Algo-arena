'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext'; // NAYA IMPORT
import { Volume2, VolumeX, Terminal } from 'lucide-react'; // Icons

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { isSoundOn, toggleSound, playSound } = useSound(); // SOUND HOOK

  return (
    <nav className="border-b-4 border-white bg-black p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link href="/" onClick={() => playSound('click')} className="flex items-center gap-3 group">
          <Terminal className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
          <span className="text-white text-lg md:text-xl tracking-widest hover:text-yellow-400 transition-colors">
            ALGO ARENA
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* SOUND TOGGLE BUTTON */}
          <button 
            onClick={() => {
              toggleSound();
              if (!isSoundOn) playSound('click'); // Play click when turning ON
            }} 
            className="text-zinc-400 hover:text-white outline-none"
          >
            {isSoundOn ? <Volume2 className="w-6 h-6 text-green-500" /> : <VolumeX className="w-6 h-6 text-red-500" />}
          </button>

          {/* AUTH BUTTON */}
          {user ? (
            <button onClick={() => { playSound('click'); logout(); }} className="border-2 border-white px-3 py-1.5 text-[10px] text-white hover:bg-white hover:text-black transition-colors">
              LOGOUT
            </button>
          ) : (
            <button onClick={() => { playSound('click'); signInWithGoogle(); }} className="border-2 border-green-500 px-3 py-1.5 text-[10px] text-green-500 hover:bg-green-500 hover:text-black transition-colors animate-pulse">
              LOGIN
            </button>
          )}
        </div>
        
      </div>
    </nav>
  );
}