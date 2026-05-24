import BottomNav from "@/components/bottom-nav"

const metricCards = [
  { label: "SCORE", value: "31" },
  { label: "ALIGNMENT", value: "6%" },
  { label: "ON GOAL", value: "15m" },
]

const summaryItems = [
  { title: "Radar comparison", subtitle: "See how your current feed compares to your ideal version." },
  { title: "Category breakdown", subtitle: "Understand which content types are dominating your feed." },
  { title: "Identity drift card", subtitle: "Explore the gap between your stated goal and your actual algorithm signals." },
]

export default function ScorePage() {
  return (
    <div className="min-h-screen bg-background px-1 pt-4 pb-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Score</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">Algorithm trajectory</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Your feed score and alignment progress live here.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {metricCards.map((item) => (
            <div key={item.label} className="rounded-3xl border border-border bg-card p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold text-foreground">{item.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.28em] text-muted">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="rounded-3xl border border-border bg-white p-4">
            <div className="text-sm uppercase tracking-[0.3em] text-muted">Historical Score Trend</div>
            <div className="mt-4 overflow-hidden rounded-3xl bg-secondary p-4">
              <svg viewBox="0 0 200 80" className="h-28 w-full">
                <line x1="0" y1="65" x2="200" y2="65" stroke="#F3E9DD" strokeDasharray="2 2" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#F3E9DD" strokeDasharray="2 2" />
                <path d="M 10 65 Q 60 60 110 50 T 190 35" fill="none" stroke="#FF6A00" strokeWidth="1.5" />
                <circle cx="10" cy="65" r="3" fill="#E04900" />
                <circle cx="70" cy="60" r="3" fill="#E04900" />
                <circle cx="130" cy="50" r="3" fill="#FF6A00" />
                <circle cx="190" cy="35" r="3" fill="#FF6A00" />
              </svg>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {summaryItems.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-white p-4">
                <div className="font-semibold text-foreground">{item.title}</div>
                <p className="mt-2 text-sm text-muted">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-3xl border border-border bg-white p-4 text-sm font-serif text-foreground">
            <h2 className="font-semibold">What changed this week</h2>
            <p className="mt-2 text-sm text-muted">
              Your feed is starting to shift toward what you said you wanted. We followed 2 new aligned creators, bringing your total score growth rate to a positive trajectory.
            </p>
          </div>
        </div>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
