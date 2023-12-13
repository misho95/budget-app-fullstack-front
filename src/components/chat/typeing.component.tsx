import { TiMessageTyping } from "react-icons/ti";

const TypeingComponent = () => {
  return (
    <div className="bg-neutral-300 w-fit h-fit py-[5px] px-[10px] rounded-full animate-pulse flex gap-[5px] text-neutral-800 justify-center items-center select-none font-mono scale-90 italic">
      <TiMessageTyping className={"w-[20px] h-[20px] text-neutral-800"} />
      <p>Typing...</p>
    </div>
  );
};

export default TypeingComponent;
