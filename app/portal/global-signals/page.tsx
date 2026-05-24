import { InfluencerListPage } from "@/components/influencer-list-page"

export default function GlobalSignalsPage() {
  return (
    <InfluencerListPage
      pill="Global Signals"
      heading="Platforms & Signals"
      description="Global platforms and communities worth watching."
      from={5}
      to={10}
    />
  )
}
