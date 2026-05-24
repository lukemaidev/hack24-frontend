import { InfluencerListPage } from "@/components/influencer-list-page"

export default function QuickWinsPage() {
  return (
    <InfluencerListPage
      pill="Quick Wins"
      heading="Local & High Signal"
      description="Local individuals with high influence and strong signal."
      from={15}
      to={20}
    />
  )
}
