export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-10 pb-16">
      <header className="border-4 border-green-500 bg-black p-6 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.35)] md:p-10">
        <p className="mb-4 text-[10px] text-green-400">{"///"} SYSTEM DOCUMENT: PRIVACY</p>
        <h1 className="text-2xl leading-relaxed text-white md:text-4xl">PRIVACY POLICY</h1>
        <p className="mt-5 text-[10px] leading-loose text-zinc-400">LAST UPDATED: NOVEMBER 2026</p>
      </header>

      <div className="space-y-8 text-[11px] leading-loose text-zinc-300">
        <section>
          <h2 className="mb-3 text-sm text-yellow-400">01 // INFORMATION WE COLLECT</h2>
          <p>
            Algo Arena collects the information needed to provide a personal DSA tracking
            experience. This may include your name, email address, profile image, and account
            identifier when you sign in. We also store the questions you mark as complete and
            related progress data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">02 // HOW WE USE INFORMATION</h2>
          <p>
            Your information is used to authenticate your account, save your learning progress,
            display your profile, and improve the reliability of the tracker. We do not sell your
            personal information or use it for unrelated advertising.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">03 // DATA STORAGE AND SECURITY</h2>
          <p>
            Account and progress data are stored using third-party infrastructure configured for
            the application. We take reasonable steps to protect this data, but no online service
            can guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">04 // YOUR CHOICES</h2>
          <p>
            You may stop using Algo Arena at any time. To ask about accessing, correcting, or
            deleting account information, contact the project team using the details on the
            Contact Us page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-yellow-400">05 // POLICY UPDATES</h2>
          <p>
            This policy may be updated as Algo Arena evolves. Material changes will be reflected
            on this page with an updated revision date.
          </p>
        </section>
      </div>
    </article>
  );
}
