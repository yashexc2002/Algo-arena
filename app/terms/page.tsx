export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-10 pb-16">
      <header className="border-4 border-yellow-400 bg-black p-6 shadow-[8px_8px_0px_0px_rgba(250,204,21,0.35)] md:p-10">
        <p className="mb-4 text-[10px] text-yellow-400">{"///"} SYSTEM DOCUMENT: RULES</p>
        <h1 className="text-2xl leading-relaxed text-white md:text-4xl">TERMS &amp; CONDITIONS</h1>
        <p className="mt-5 text-[10px] leading-loose text-zinc-400">LAST UPDATED: NOVEMBER 2026</p>
      </header>

      <div className="space-y-8 text-[11px] leading-loose text-zinc-300">
        <section>
          <h2 className="mb-3 text-sm text-green-400">01 // ACCEPTANCE</h2>
          <p>
            By accessing Algo Arena, you agree to use the service responsibly and to follow these
            terms. If you do not agree, please do not use the application.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-green-400">02 // USING THE TRACKER</h2>
          <p>
            Algo Arena is a learning and progress-tracking tool. You are responsible for keeping
            your sign-in details secure and for activity performed through your account. Do not
            attempt to disrupt the service, bypass access controls, or misuse another person&apos;s
            account.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-green-400">03 // CONTENT AND OWNERSHIP</h2>
          <p>
            The Algo Arena interface, branding, and original code are provided by the project
            team. Third-party problem statements and related marks remain with their respective
            owners, as described in the Disclaimer.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-green-400">04 // AVAILABILITY</h2>
          <p>
            We aim to keep the tracker available and accurate, but features may change, be
            interrupted, or contain errors. The service is provided on an &quot;as available&quot;
            basis without a promise of uninterrupted operation.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm text-green-400">05 // CHANGES</h2>
          <p>
            We may revise these terms as the project grows. Continued use of Algo Arena after
            changes are posted means you accept the revised terms.
          </p>
        </section>
      </div>
    </article>
  );
}
