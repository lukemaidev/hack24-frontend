import { InfluencerListPage } from "@/components/influencer-list-page"

export default function BigNamesPage() {
  return (
    <InfluencerListPage
      pill="Big Names"
      heading="Global & Authority"
      description="Global individuals with broad reach and authority."
      from={0}
      to={5}
    />
  )
}
