import FeatureWay from "@/app/_components/feature-way"
import HomeIntro from "@/app/_components/home-intro"
import MostFavoriteTeam from "@/app/_components/most-favorite-team"
import OccuringTournaments from "@/app/_components/occuring-tournaments"
import Onboard from "@/app/_components/onboard"
import WhyChooseUs from "@/app/_components/why-choose-us"

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
