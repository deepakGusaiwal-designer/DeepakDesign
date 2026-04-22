import Folder from "../animations/Folder/Folder";
import GlassSurface from "../animations/GlassSurface/GlassSurface";
import TrueFocus from "../animations/TrueFocus/TrueFocus";
import { RiReactjsLine } from "react-icons/ri";
import WhatIDoSection from "./WhatIDoSection";
import useLenis from "./useLenis";
import NextGenHero from "./NextGenHero";
import HoverPreview from "./HoverPreview";

function WhatWeDo() {
  useLenis();
  return (
    <>
      <div className="bg-black px-20 pb-50">
        <div className="flex flex-col justify-center mb-30 sticky top-30 z-9">
          <TrueFocus
            sentence="What We Do, My Arsenal"
            separator=","
            manualMode
            blurAmount={8.5}
            borderColor="#c92035"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>
        <div className="relative w-full">
          <WhatIDoSection />
        </div>
      </div>
    </>
  );
}

export default WhatWeDo;
