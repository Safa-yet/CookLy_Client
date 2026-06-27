
import BlogSection from "@/component/landingPage/BlogSection";
import FeaturedSec from "@/component/landingPage/FeaturedSec";
import HeroBanner from "@/component/landingPage/HeroBanner";
import MostPopular from "@/component/landingPage/MostPopular";
import Newsletter from "@/component/landingPage/Newsletter";
import PromoBanner from "@/component/landingPage/PromoBanner";
import SubscriptionAdvertise from "@/component/landingPage/SubscriptionAdvertise";
import Testimonials from "@/component/landingPage/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <HeroBanner></HeroBanner>
     <FeaturedSec></FeaturedSec>
     <MostPopular></MostPopular>
     <PromoBanner></PromoBanner>
     <Testimonials></Testimonials>
      <SubscriptionAdvertise></SubscriptionAdvertise>
     <BlogSection></BlogSection>
     <Newsletter></Newsletter>
    </div>
  );
}
