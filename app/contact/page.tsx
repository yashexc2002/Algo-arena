export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-10 pb-16">
      <header className="border-4 border-blue-500 bg-black p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,0.35)] md:p-10">
        <p className="mb-4 text-[10px] text-blue-400">{"///"} TRANSMISSION CHANNEL: OPEN</p>
        <h1 className="text-2xl leading-relaxed text-white md:text-4xl">CONTACT US</h1>
        <p className="mt-5 text-[10px] leading-loose text-zinc-400">
          HAVE FEEDBACK, A BUG REPORT, OR A QUESTION? SEND A MESSAGE TO THE ARENA TEAM.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="border-4 border-white bg-black p-6">
          <p className="mb-3 text-[10px] text-blue-400">CHANNEL 01</p>
          <h2 className="mb-4 text-sm text-white">GENERAL SUPPORT</h2>
          <p className="mb-5 text-[11px] leading-loose text-zinc-400">
            Share questions about your account, saved progress, or using the tracker.
          </p>
          <a
            href="mailto:support@algoarena.example"
            className="text-[10px] text-green-400 underline decoration-dashed underline-offset-4 hover:text-yellow-400"
          >
            SUPPORT@ALGOARENA.EXAMPLE
          </a>
        </section>

        <section className="border-4 border-white bg-black p-6">
          <p className="mb-3 text-[10px] text-blue-400">CHANNEL 02</p>
          <h2 className="mb-4 text-sm text-white">FEEDBACK &amp; BUGS</h2>
          <p className="mb-5 text-[11px] leading-loose text-zinc-400">
            Include the page, steps to reproduce, and any useful context so we can investigate.
          </p>
          <a
            href="mailto:hello@algoarena.example"
            className="text-[10px] text-green-400 underline decoration-dashed underline-offset-4 hover:text-yellow-400"
          >
            HELLO@ALGOARENA.EXAMPLE
          </a>
        </section>
      </div>

      <p className="border-l-4 border-yellow-400 pl-4 text-[10px] leading-loose text-zinc-500">
        PLEASE DO NOT SEND PASSWORDS, API KEYS, OR OTHER SENSITIVE INFORMATION BY EMAIL.
      </p>
    </article>
  );
}
