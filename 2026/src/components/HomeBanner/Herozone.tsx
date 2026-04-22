import FloatingLines from "@/components/animations/FloatingLines";
import ProfileCard from "@/components/animations/ProfileCard/ProfileCard";

import deepak from "@/assets/img/deepak.webp";
import grain from "@/assets/img/grain.webp";
import pattern from "@/assets/img/profilepattern.png";

function Herozone() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 size-full">
        <FloatingLines
          enabledWaves={["middle"]}
          lineCount={4}
          lineDistance={20}
          bendRadius={19}
          bendStrength={-1}
          interactive={true}
          parallax={false}
        />
        {/* <div className="h-20 w-full bg-gradient-to-t from-black from-0% to-transparent to-100% absolute bottom-0" /> */}
      </div>
      <div className="flex items-center justify-center relative">
        <ProfileCard
          name="Deepak G"
          title="Precision-Driven Designer"
          handle="deepakg"
          status="Online"
          contactText="Contact Me"
          avatarUrl={deepak}
          grainUrl={grain}
          iconUrl={pattern}
          showUserInfo
          enableTilt={true}
          enableMobileTilt
          onContactClick={() => console.log("Contact clicked")}
          behindGlowColor="hsla(183, 100%, 70%, 0.6)"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,hsla(183, 40%, 45%, 0.55) 0%,hsla(343, 60%, 70%, 0.27) 100%)"
        />
      </div>
    </div>
  );
}

export default Herozone;
