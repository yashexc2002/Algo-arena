'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext'; // 1. HOOK IMPORT KIYA
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function QuestionTable({ topicId, questions }: { topicId: string, questions: any[] }) {
  const { user } = useAuth();
  const { playSound } = useSound(); // 2. FUNCTION NIKALA
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  // ... (useEffect wala code same rahega) ...
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetchProgress = async () => {
      const docSnap = await getDoc(doc(db, 'userProgress', user.uid));
      if (docSnap.exists()) setCompleted(docSnap.data().completed || {});
      setLoading(false);
    };
    fetchProgress();
  }, [user]);

  const handleToggle = async (questionId: number, difficulty: string) => { // 3. DIFFICULTY PASS KI
    if (!user) {
      alert("ERROR: GUEST CANNOT SAVE PROGRESS. LOG IN TO PLAY!");
      return;
    }

    const isCurrentlyDone = !!completed[questionId];
    
    // 4. AGAR NAYA TICK LAGA RAHE HAIN, TOH SOUND PLAY KARO
    if (!isCurrentlyDone) {
      if (difficulty === 'Hard') playSound('boss');
      else playSound('coin');
    } else {
      playSound('click'); // Agar un-tick kiya toh normal click sound
    }

    const newState = { ...completed, [questionId]: !isCurrentlyDone };
    setCompleted(newState);
    
    try {
      await setDoc(doc(db, 'userProgress', user.uid), { completed: newState }, { merge: true });
    } catch (error: any) {
      if (error.code === 'resource-exhausted') alert("🚨 GAME OVER: FIREBASE QUOTA HIT!");
      setCompleted(completed); 
    }
  };

  return (
    <div className="w-full border-4 border-white bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
      
      {/* RPG Header Row */}
      <div className="hidden md:flex justify-between px-6 py-4 text-[10px] text-yellow-400 border-b-4 border-white bg-zinc-900">
        <div className="w-[10%] text-center">STATUS</div>
        <div className="w-[50%]">QUEST NAME</div>
        <div className="w-[20%]">ENEMY</div>
        <div className="w-[20%] text-right">ACTION</div>
      </div>

      {/* Quests */}
      <div className="flex flex-col">
        {questions.map((q: any, index: number) => {
          const isDone = !!completed[q.id];

          return (
            <div key={q.id || index} className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 border-b-4 border-zinc-900 hover:bg-zinc-900/50 transition-colors gap-4">
              
              {/* Checkbox */}
              <div className="w-full md:w-[10%] flex justify-start md:justify-center">
                {/* 5. handleToggle ko difficulty pass ki */}
                <button onClick={() => handleToggle(q.id, q.difficulty)} disabled={loading} className="text-sm md:text-base outline-none">
                  {isDone ? (
                    <span className="text-green-500 animate-pulse">[X]</span>
                  ) : (
                    <span className="text-zinc-600 hover:text-white">[ ]</span>
                  )}
                </button>
              </div>
              
              <div className={`w-full md:w-[50%] text-[10px] md:text-[12px] leading-loose ${isDone ? 'text-zinc-600 line-through' : 'text-white'}`}>
                <span className="text-zinc-600 mr-2">{index + 1}.</span>
                {q.title}
              </div>
              
              <div className="w-full md:w-[20%]">
                {q.difficulty === 'Easy' && <span className="text-[10px] text-green-500">SLIME (+10XP)</span>}
                {q.difficulty === 'Medium' && <span className="text-[10px] text-orange-500">GOBLIN (+20XP)</span>}
                {q.difficulty === 'Hard' && <span className="text-[10px] text-red-500 animate-pulse">BOSS FIGHT (+50XP)</span>}
              </div>
              
              <div className="w-full md:w-[20%] flex md:justify-end">
                {q.link && q.link !== 'nan' ? (
                  <a href={q.link} onClick={() => playSound('click')} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-[10px] border-2 border-white hover:bg-white hover:text-black transition-colors w-full md:w-auto text-center">
                    FIGHT {'>'}
                  </a>
                ) : (
                  <span className="text-[10px] text-zinc-600">LOCKED</span>
                )}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}