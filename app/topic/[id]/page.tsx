import Link from 'next/link';
import { ArrowLeft, Target, Code2 } from 'lucide-react';
import { questionsData } from '@/lib/data'; 
import QuestionTable from '@/components/QuestionTable'; 

export const instant = false;

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topicData = questionsData[id];

  if (!topicData) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-in fade-in">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800">
          <Code2 className="w-8 h-8 text-zinc-500" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-white tracking-tight">Topic Not Found</h2>
        <Link href="/">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
            Go Back Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 max-w-6xl mx-auto pb-20 mt-4">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
        <div className="flex items-start md:items-center gap-4">
          <Link href="/">
            <button className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1 text-sm font-medium text-blue-400">
              <Target className="w-4 h-4" />
              <span>Topic Details</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">{topicData.title}</h1>
          </div>
        </div>
        <div className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg backdrop-blur-sm">
          <span className="text-zinc-400 text-sm font-medium">Total Problems: </span>
          <span className="text-white font-bold">{topicData.questions.length}</span>
        </div>
      </div>

      {/* Main Container for the Custom Grid */}
      <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800/60 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent"></div>
        
        <QuestionTable topicId={id} questions={topicData.questions} />
      </div>
      
    </div>
  );
}