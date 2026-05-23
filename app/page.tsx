export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-10">
        <section className="rounded-[32px] border border-border bg-card p-8 shadow-[0_30px_90px_-40px_rgba(31,29,26,0.16)]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-accent"></span>
              Algorithm Health — mobile-first feed design system
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Design system applied</p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-foreground font-serif">
                A calmer way to use your phone, built with the wiremock theme.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted">
                The app now uses the wiremock palette, rounded cards, and mobile-focused brand tokens across the global theme.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-card bg-background p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Theme</p>
                <h2 className="mt-3 text-2xl font-semibold font-serif text-foreground">Warm cream palette</h2>
              </div>
              <div className="rounded-3xl border border-card bg-background p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Typography</p>
                <h2 className="mt-3 text-2xl font-semibold font-serif text-foreground">Sans + serif pairing</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-[#b16549]">
                Get started
              </button>
              <button className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100">
                Explore the design system
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
