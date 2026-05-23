import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <main className="mx-auto flex min-h-screen w-full max-w-sm items-center justify-center px-4">
        <Card className="w-full rounded-[32px] border border-card bg-card p-7 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <CardContent className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.28em] text-muted">A/H</span>
              <CardTitle className="text-4xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
                A calmer way to use your phone.
              </CardTitle>
              <CardDescription className="mt-1 text-base leading-7 text-muted">
                Algorithm Health helps you reshape your feed so it matches who you want to become.
              </CardDescription>
            </div>

            <div className="space-y-3">
              <Button className="w-full rounded-full py-3 text-sm font-semibold">
                Create account
              </Button>
              <Button variant="outline" className="w-full rounded-full py-3 text-sm font-semibold">
                I already have an account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
