import Prism from "@/components/animations/Prism/Prism";
import RotatingText from "../animations/RotatingText/RotatingText";
import AnimatedContent from "../animations/AnimatedContent/animateContent";
import GlassSurface from "../animations/GlassSurface/GlassSurface";

function CodetoDesign() {
  return (
    <>
      <div className="h-screen w-full relative">
        <Prism
          animationType="hover"
          timeScale={0.5}
          height={4.3}
          baseWidth={6.3}
          scale={1.2}
          hueShift={0.3}
          colorFrequency={0.5}
          noise={0}
          glow={1}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <div className="flex items-center gap-3 text-white">
              <h5 className="text-6xl font-medium">Crafting</h5>
              <GlassSurface
                width={"auto"}
                height={100}
                borderRadius={100}
                className="px-5"
              >
                <RotatingText
                  texts={["Elegant", "Immersive", "Scalable", "Memorable"]}
                  mainClassName="px-2 sm:px-2 md:px-3 text-white text-6xl font-medium overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg bg-transparent"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  splitBy="characters"
                  auto
                  loop
                />
              </GlassSurface>
              <h5 className="text-6xl font-medium">Experiences</h5>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}

export default CodetoDesign;
