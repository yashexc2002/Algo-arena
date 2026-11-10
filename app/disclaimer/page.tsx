export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-10 pb-16">
      <header className="border-4 border-red-500 bg-black p-6 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.35)] md:p-10">
        <p className="mb-4 text-[10px] text-red-400">{"///"} NOTICE: THIRD-PARTY CONTENT</p>
        <h1 className="text-2xl leading-relaxed text-white md:text-4xl">DISCLAIMER</h1>
        <p className="mt-5 text-[10px] leading-loose text-zinc-400">PLEASE READ BEFORE TRAINING</p>
      </header>

      <div className="space-y-8 text-[11px] leading-loose text-zinc-300">
        <section>
          <h2 className="mb-3 text-sm text-red-400">01 // THIRD-PARTY QUESTIONS</h2>
          <p>
            Some questions referenced or displayed by Algo Arena originate from LeetCode. These
            questions, problem statements, examples, names, and related materials are the
            third-party property of LeetCode and their respective rights holders.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-red-400">02 // NO AFFILIATION</h2>
          <p>
            Algo Arena is an independent educational tracking tool. It is not affiliated with,
            sponsored by, or endorsed by LeetCode. LeetCode is a trademark of its respective
            owner.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-red-400">03 // EDUCATIONAL PURPOSE</h2>
          <p>
            Algo Arena is intended to help learners organize practice and monitor completion. It
            does not claim ownership of third-party content and should not be treated as an
            official source for that content.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-red-400">04 // RIGHTS AND REQUESTS</h2>
          <p>
            All third-party rights remain with their respective owners. If you believe content is
            presented in a way that requires correction, please contact the project team through
            the Contact Us page.
          </p>
        </section>
      </div>
    </article>
  );
}
