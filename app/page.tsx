'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext'; 
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { questionsData } from '@/lib/data'; 
import { Sword, Shield } from 'lucide-react';

const dsaTopics = Object.keys(questionsData).map(key => ({
  id: key,
  name: questionsData[key].title,
  total: questionsData[key].questions.length,
  questions: questionsData[key].questions,
}));

const getXpForDifficulty = (diff: string) => diff === 'Easy' ? 10 : diff === 'Medium' ? 20 : 50;

const PixelHero = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`transition-transform duration-500 ${frame === 1 ? '-translate-y-1' : ''}`}>
      <img 
        src="/hero.png" 
        alt="Hero" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
        style={{ imageRendering: 'pixelated' }} 
      />
    </div>
  );
};

const PixelMage = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`transition-transform duration-700 ${frame === 1 ? '-translate-y-2' : ''}`}>
      <img 
        src="/boss.png" 
        alt="Boss" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
        style={{ imageRendering: 'pixelated' }} 
      />
    </div>
  );
};

export default function Home() {
  const { user } = useAuth();
  const { playSound } = useSound(); 
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'userProgress', user.uid));
        if (docSnap.exists()) setCompleted(docSnap.data().completed || {});
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, [user]);

  let totalXP = 0;
  let maxXP = 0;
  dsaTopics.forEach(topic => {
    topic.questions.forEach((q: any) => {
      const xp = getXpForDifficulty(q.difficulty);
      maxXP += xp;
      if (completed[q.id]) totalXP += xp;
    });
  });

  const playerLevel = Math.floor(totalXP / 100) + 1;
  const xpPercentage = maxXP === 0 ? 0 : Math.round((totalXP / maxXP) * 100);

  return (
    <div className="space-y-12 pb-20">
      
      <div className="border-4 border-white bg-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative mt-4">
        
        <div className="absolute top-6 right-6 md:top-8 md:right-10 flex flex-col items-center gap-2 opacity-80 pointer-events-none">
           <span className="text-red-500 text-[10px] animate-pulse">BOSS_WAITING</span>
           <PixelMage />
        </div>

        <div className="text-[10px] text-green-400 mb-4 animate-pulse">{'>>>'} SYSTEM READY_</div>
        
        <div className="flex items-center gap-4 md:gap-8 mb-6 pr-20 md:pr-40">
          <div>
            <PixelHero />
          </div>
          <h1 className="text-2xl md:text-4xl text-white leading-loose">
            {user ? `PLAYER: ${user.displayName?.split(' ')[0]}` : 'LOGIN TO SAVE PROGRESS'}
          </h1>
        </div>
        
        {user && (
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-t-4 border-dashed border-zinc-800 pt-6">
            <div>
              <div className="text-sm text-yellow-400 mb-2">LVL {playerLevel}</div>
              <div className="text-[10px] text-zinc-400">TOTAL XP: {totalXP} / {maxXP}</div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex justify-between text-[10px] mb-2">
                <span className="text-zinc-400">PROGRESS</span>
                <span className="text-white">{xpPercentage}%</span>
              </div>
              <div className="w-full h-4 bg-zinc-900 border-2 border-zinc-700 p-0.5">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl text-yellow-400 mb-8 border-b-4 border-white pb-2 inline-block">WORLD MAP // ZONES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dsaTopics.map((topic, idx) => {
            const completedInThisTopic = topic.questions.filter((q: any) => completed[q.id]).length;
            const isDone = completedInThisTopic === topic.total;

            return (
              <Link 
                href={`/topic/${topic.id}`} 
                key={topic.id} 
                className="block group"
                onMouseEnter={() => playSound('hover')}
              >
                <div className={`h-full border-4 ${isDone ? 'border-green-500' : 'border-white group-hover:border-yellow-400 group-hover:-translate-y-2'} bg-black p-5 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]`}>
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] text-zinc-400">ZONE {idx + 1}</span>
                    {isDone ? <Shield className="w-6 h-6 text-green-500" /> : <Sword className="w-6 h-6 text-zinc-600 group-hover:text-yellow-400" />}
                  </div>

                  <h3 className="text-sm md:text-base text-white mb-6 leading-relaxed group-hover:text-yellow-400">
                    {topic.name}
                  </h3>

                  <div className="flex justify-between items-end border-t-4 border-zinc-900 pt-4">
                    <span className="text-[10px] text-zinc-500">QUESTS: {topic.total}</span>
                    <span className={`text-[10px] ${isDone ? 'text-green-500' : 'text-yellow-400'}`}>
                      {completedInThisTopic}/{topic.total} DONE
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <section className="border-4 border-blue-500 bg-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(59,130,246,0.35)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-[10px] text-blue-400 mb-3 animate-pulse">{'>>>'} CREATOR_PROFILE_FOUND_</div>
            <h2 className="text-lg md:text-xl text-white mb-3">THIS WEBSITE WAS BUILT BY YASH OBEROI</h2>
            <p className="text-[10px] leading-loose text-zinc-400">
              Connect with the creator behind Algo Arena on LinkedIn.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/yash-oberoi-12547a370"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border-2 border-blue-500 px-5 py-3 text-[10px] text-blue-400 transition-colors hover:bg-blue-500 hover:text-black"
          >
            <span className="flex h-5 w-5 items-center justify-center border-2 border-current text-xs font-bold normal-case">in</span>
            VIEW CREATOR LINKEDIN
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl border-4 border-zinc-800 bg-black p-6 md:p-10">
        <div className="space-y-5 text-sm leading-8 text-zinc-300 normal-case">
          <h2 className="text-xl leading-relaxed text-yellow-400 md:text-2xl">
            How to use Algo Arena to crack interviews
          </h2>
          <p>
            Technical interviews reward more than knowing a few clever solutions. They measure
            how consistently you can recognize patterns, explain your thinking, and write
            reliable code under pressure. That is why tracking your Data Structures and
            Algorithms progress matters. A clear record shows which topics you have practiced,
            where your confidence is growing, and which skills still need focused attention.
          </p>
          <p>
            Algo Arena gives your preparation a structured training ground. Work through topic
            zones such as arrays, strings, trees, and graphs, then mark questions complete as
            you solve them. Reviewing your progress helps you avoid practicing only familiar
            problems and encourages balanced interview preparation. Use the tracker to set a
            realistic weekly target, revisit questions that took extra effort, and gradually
            increase the difficulty of your challenges.
          </p>
          <p>
            Consistency is the advantage that compounds. Even one focused problem each day can
            build stronger recall and problem-solving speed when you keep showing up. Before
            looking at an editorial, spend time clarifying constraints, considering edge cases,
            and comparing possible approaches. Afterward, record what you learned and return to
            the problem later without hints. This active repetition turns isolated practice into
            lasting skill.
          </p>
          <p>
            Treat Algo Arena as a progress dashboard, not a race. Combine it with mock interviews,
            timed sessions, and clear communication practice. With steady effort and honest
            tracking, you can turn a large DSA syllabus into manageable milestones and approach
            your next technical interview with a stronger, more confident process.
          </p>
        </div>
      </section>
    </div>
  );
}