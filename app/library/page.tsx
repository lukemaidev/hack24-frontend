import BottomNav from "@/components/bottom-nav"

const libraryTabs = [
  { label: "Mentors", active: true },
  { label: "Crash courses", active: false },
  { label: "Saved", active: false },
]

const mentorItems = [
  { title: "Sahil Gupta", subtitle: "Weekly thinking on product and focus" },
  { title: "Amelia Park", subtitle: "Creative systems for consistent work" },
  { title: "Theo Kim", subtitle: "Strategy notes for founder momentum" },
]

const courseItems = [
  { title: "Crash Course: 5 essentials from Priestley", progress: "1/5 complete" },
  { title: "Daily clarity sessions", progress: "2/8 complete" },
]

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background px-1 py-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Library</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">Saved & learning resources</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Manage your mentors, courses, and saved content in one place.
          </p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-card bg-card p-4 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="flex gap-2 rounded-3xl border border-border bg-background p-2">
            {libraryTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={`flex-1 rounded-3xl px-3 py-3 text-sm font-medium transition ${
                  tab.active
                    ? "bg-card text-foreground border border-border"
                    : "bg-transparent text-muted hover:bg-primary/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {mentorItems.map((mentor) => (
              <div key={mentor.title} className="rounded-3xl border border-border bg-white p-4">
                <div className="font-semibold text-foreground">{mentor.title}</div>
                <p className="mt-2 text-sm text-muted">{mentor.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-3xl border border-border bg-white p-4">
            <div className="font-semibold text-foreground">Crash courses in progress</div>
            <div className="mt-3 space-y-3">
              {courseItems.map((course) => (
                <div key={course.title} className="rounded-3xl border border-border bg-background p-3">
                  <div className="font-medium text-foreground">{course.title}</div>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted">{course.progress}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
