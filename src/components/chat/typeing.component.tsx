import { useEffect } from "react";
import typeingSound from "../../assets/typing.mp3";

const TypeingComponent = () => {
  useEffect(() => {
    const audio = new Audio(typeingSound);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return <div>Typeing...</div>;
};

export default TypeingComponent;
