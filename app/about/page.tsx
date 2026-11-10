export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-10 pb-16">
      <header className="border-4 border-white bg-black p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] md:p-10">
        <p className="mb-4 text-[10px] text-green-400">{"///"} PLAYER GUIDE: ORIGIN</p>
        <h1 className="text-2xl leading-relaxed text-white md:text-4xl">ABOUT ALGO ARENA</h1>
        <p className="mt-5 text-[10px] leading-loose text-zinc-400">
          A SIMPLE TRAINING GROUND FOR CONSISTENT DATA STRUCTURES AND ALGORITHMS PRACTICE.
        </p>
      </header>

      <div className="space-y-8 text-[11px] leading-loose text-zinc-300">
        <section>
          <h2 className="mb-3 text-sm text-yellow-400">01 // THE MISSION</h2>
          <p>
            Algo Arena turns DSA practice into a clear, repeatable routine. Instead of losing
            track of what you have solved, use topic-based zones to see your progress and choose
            your next challenge.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">02 // HOW IT WORKS</h2>
          <p>
            Explore topics, open a question, and mark completed challenges as you learn. Your
            progress is tied to your account so your training record can stay with you between
            sessions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">03 // BUILT FOR LEARNING</h2>
          <p>
            The tool is designed to support deliberate practice, not replace it. Read the
            problem, reason about a solution, write code, and use the tracker to maintain
            momentum over time.
          </p>
        </section>

        <section className="border-4 border-green-500 p-6">
          <p className="mb-3 text-[10px] text-green-400">MISSION STATUS: ACTIVE</p>
          <p className="text-white">
            PICK A ZONE. SOLVE ONE PROBLEM. RETURN STRONGER.
          </p>
        </section>
      </div>
    </article>
  );
}
