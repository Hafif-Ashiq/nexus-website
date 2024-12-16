import NavBar from "./(landing)/NavBar";
import HeroSection from "./(landing)/HeroSection";
import StatsShow from "./(landing)/StatsShow";
import WhatWeOffer from "./(landing)/WhatWeOffer";
import PersonalizedExperience from "./(landing)/PersonalizedExperience";
import PerfectLearningTool from "./(landing)/PerfectLearningTool";
import Testimonials from "./(landing)/Testimonials";
import FAQs from "./(landing)/FAQs";
import ManageLearning from "./(landing)/ManageLearning";
import Footer from "./(landing)/Footer";

export default function Home() {
  return (
    <main className="relative flex bg-[#1A1E1C] min-h-screen flex-col items-center justify-between gap-[128px] overflow-hidden">
      <div className="max-w-[1440px] w-full mx-auto my-[24px] flex flex-col gap-[128px] relative z-[2]">
        <NavBar />
        <HeroSection />
        <StatsShow />
        <WhatWeOffer />
        <PersonalizedExperience />
        <PerfectLearningTool />
        <Testimonials />
        <FAQs />
        <ManageLearning />
      </div>
      <Footer />
      <div className="absolute inset-0 w-[110%] h-[105%] overflow-hidden z-[1]">
        <img src="/landingPage/dora-bg-main-vector.svg" alt="" className="w-full h-full" />
      </div>
      <div className="absolute inset-0 w-[100%] h-[143%] overflow-hidden z-[1] top-[-20%]">
        <img src="/landingPage/bg-svg.svg" alt="" className="w-full h-full object-cover" />
      </div>
    </main>
  );
}
