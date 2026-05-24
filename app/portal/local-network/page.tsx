import { InfluencerListPage } from "@/components/influencer-list-page"

export default function LocalNetworkPage() {
  return (
    <InfluencerListPage
      pill="Local Network"
      heading="Community & Ecosystem"
      description="Local communities and networks driving the ecosystem."
      from={10}
      to={15}
    />
  )
}
