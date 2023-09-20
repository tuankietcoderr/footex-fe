import FeatureWay from "@/components/home/feature-way"
import HomeIntro from "@/components/home/home-intro"
import MostFavoriteTeam from "@/components/home/most-favorite-team"
import OccuringTournaments from "@/components/home/occuring-tournaments"
import Onboard from "@/components/home/onboard"
import WhyChooseUs from "@/components/home/why-choose-us"

export default function Home() {
  return (
    <div>
      <Onboard />
      <div className="mx-[5%] flex flex-col gap-8">
        {/* <HomeIntro /> */}
        <WhyChooseUs />
        <OccuringTournaments />
        <FeatureWay />
        <MostFavoriteTeam />
      </div>
    </div>
  )
}
