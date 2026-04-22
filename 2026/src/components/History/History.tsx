import MagicBento from "../animations/MagicBento/MagicBento";
import ScrollStack, {
  ScrollStackItem,
} from "../animations/ScrollStack/ScrollStack";
import TrueFocus from "../animations/TrueFocus/TrueFocus";

function History() {
  return (
    <div className="bg-black px-20 pb-50">
      <div className="flex flex-col justify-center mb-30">
        <TrueFocus
          sentence="History , Year's of Struggle"
          separator=","
          manualMode
          blurAmount={8.5}
          borderColor="#c92035"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </div>
      {/* <div className="relative">
        <ScrollStack>
          <ScrollStackItem>
            <h2>Card 1</h2>
            <p>This is the first card in the stack</p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h2>Card 2</h2>
            <p>This is the second card in the stack</p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h2>Card 3</h2>
            <p>This is the third card in the stack</p>
          </ScrollStackItem>
        </ScrollStack>
      </div> */}
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        // enableTilt
        enableMagnetism
        clickEffect
        spotlightRadius={500}
        particleCount={20000}
        glowColor="201, 32, 255"
        disableAnimations={false}
      />
    </div>
  );
}

export default History;
