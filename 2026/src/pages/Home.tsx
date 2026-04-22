import GlobeTime from "@/components/animations/GlobeTime/Globetime";
import AnimeModalScene from "@/components/animations/ModelScene/Scene";
import ScrollReveal from "@/components/animations/ScrollReveal/ScrollReveal";
import CodetoDesign from "@/components/CodetoDesign/codetodesign";
import Header from "@/components/common/Header";
import History from "@/components/History/History";
import Herozone from "@/components/HomeBanner/Herozone";
import WhatWeDo from "@/components/WhatWeDo/whatWeDo";

function Home() {
  return (
    <>
      <Header />
      <Herozone />
      <div
        id="about"
        className="min-h-screen flex justify-center items-center bg-black px-5"
      >
        <div className="max-w-2xl mx-auto text-gray-100 text-4xl leading-relaxed">
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur
            baseRotation={8}
            blurStrength={40}
          >
            Hi! My name is Deepak Gusaiwal, An UI/UX Designer and Developer from
            India. I am passionate about creating visually stunning and
            innovative websites that not only look great but also provide
            exceptional user experiences.
          </ScrollReveal>
        </div>
      </div>
      <div id="history">
        <History />
      </div>

      <div id="codetodesign">
        <CodetoDesign />
      </div>

      <div id="whatwedo">
        <WhatWeDo />
      </div>

      {/* <div className="relative h-screen overflow-hidden">
        <AnimeModalScene />
      </div> */}

      {/* <div className="h-screen relative">
        <GlobeTime />
      </div> */}
    </>
  );
}

export default Home;
