import ModelScene from "@/components/animations/ModelScene/ModelScene";
import useLenis from "@/components/animations/ModelScene/useLenis";

export default function AnimeModalScene() {
  useLenis();

  return (
    <div className="realtive h-screen">
      <ModelScene />
    </div>
  );
}
