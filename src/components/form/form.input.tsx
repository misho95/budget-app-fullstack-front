import { InputType } from "../../pages/signup.page";
import { MdErrorOutline } from "react-icons/md";

interface PropsType {
  title: string;
  type: string;
  placeHolder: string;
  input: InputType;
  setInput: (arg: InputType) => void;
}

const FormInput = ({
  title,
  type,
  placeHolder,
  input,
  setInput,
}: PropsType) => {
  return (
    <label className="flex flex-col gap-[5px] w-full relative">
      <div className="text-white/70 ml-2">{title}</div>
      <input
        value={input.value}
        onChange={(e) => setInput({ value: e.target.value, error: null })}
        type={type}
        placeholder={placeHolder}
        className="w-full h-[40px] border-[1px] border-transparent p-2 bg-red-800/80 focus:bg-red-800 focus:border-white/30 text-red-200 placeholder:text-red-300 focus:outline-none rounded-lg duration-200"
        autoComplete={"on"}
      />
      <div className=" text-red-400 absolute right-[10px] bottom-[8px] flex gap-1 items-center justify-center">
        {input.error && (
          <>
            <MdErrorOutline />
            <span className="italic">{input.error}</span>
          </>
        )}
      </div>
    </label>
  );
};
export default FormInput;
