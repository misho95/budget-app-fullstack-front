import { useEffect } from "react";
import typeingSound from "../../assets/typing.mp3";
import { TiMessageTyping } from "react-icons/ti";

const TypeingComponent = () => {
  useEffect(() => {
    const audio = new Audio(typeingSound);
    audio.loop = true;

    const playSound = () => {
      audio.play().catch((error) => {
        console.error("Play error:", error);
      });
    };
    audio.addEventListener("canplaythrough", playSound);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("canplaythrough", playSound);
    };
  }, []);

  return (
    <div className="bg-neutral-300 w-fit h-fit py-[5px] px-[10px] rounded-full animate-pulse flex gap-[5px] text-neutral-800 justify-center items-center select-none font-mono scale-90">
      <TiMessageTyping className={"w-[20px] h-[20px] text-neutral-800"} />
      <p>Typing...</p>
    </div>
  );
};

export default TypeingComponent;
