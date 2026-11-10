'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'coin' | 'boss';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const playBgm = (bgm: HTMLAudioElement | null) => {
  if (!bgm || bgm.error) return;

  bgm.play().catch((error) => {
    if (
      error instanceof DOMException &&
      (error.name === 'NotSupportedError' || error.name === 'NotAllowedError')
    ) return;
    console.error("BGM Play Error: ", error);
  });
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(true);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const interactionDone = useRef(false);
  const soundOnRef = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem('dsa-sound');
    const initialSoundState = saved === null ? true : saved === 'true';
    setIsSoundOn(initialSoundState);
    soundOnRef.current = initialSoundState;

    const bgm = new Audio('/bgm.wav');
    bgm.loop = true;      
    bgm.volume = 0.15;    
    bgmRef.current = bgm;
    if (soundOnRef.current) {
      playBgm(bgm);
    }

    const startBgmInvisibly = () => {
      if (!interactionDone.current) {
        interactionDone.current = true;
        if (soundOnRef.current) {
          playBgm(bgm);
        }
        document.removeEventListener('click', startBgmInvisibly);
        document.removeEventListener('keydown', startBgmInvisibly);
      }
    };

    document.addEventListener('click', startBgmInvisibly);
    document.addEventListener('keydown', startBgmInvisibly);

    return () => {
      document.removeEventListener('click', startBgmInvisibly);
      document.removeEventListener('keydown', startBgmInvisibly);
      bgm.pause();
      bgm.src = '';
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const toggleSound = () => {
    initAudio();
    interactionDone.current = true;

    setIsSoundOn((prev) => {
      const newState = !prev;
      soundOnRef.current = newState;
      localStorage.setItem('dsa-sound', String(newState));
      
      if (newState) {
        playBgm(bgmRef.current);
      } else {
        bgmRef.current?.pause();
      }
      
      return newState;
    });
  };

  const playSound = (type: SoundType) => {
    if (!soundOnRef.current) return;
    initAudio();
    
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square'; 
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;

      if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'hover') {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(990, now + 0.04);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'coin') {
        osc.frequency.setValueAtTime(987.77, now); 
        osc.frequency.setValueAtTime(1318.51, now + 0.1); 
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'boss') {
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) throw new Error("useSound must be used within a SoundProvider");
  return context;
};