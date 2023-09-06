import FeatureWay from "@/components/home/feature-way";
import HomeIntro from "@/components/home/home-intro";
import MostFavoriteTeam from "@/components/home/most-favorite-team";
import OccuringTournaments from "@/components/home/occuring-tournaments";

export default function Home() {
  return (
    <div className="mx-[5%] flex flex-col gap-8">
      <HomeIntro />
      <FeatureWay />
      <OccuringTournaments />
      <MostFavoriteTeam />
    </div>
  );
}
