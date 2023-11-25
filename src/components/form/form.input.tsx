interface PropsType {
  title: string;
  type: string;
  placeHolder: string;
}

const FormInput = ({ title, type, placeHolder }: PropsType) => {
  return (
    <label className="flex flex-col gap-[5px] w-full">
      <div className="text-white/70 ml-2">{title}</div>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-[40px] border-[1px] border-transparent p-2 bg-red-800/80 focus:bg-red-800 focus:border-white/30 text-red-200 placeholder:text-red-300 focus:outline-none rounded-lg duration-200"
        autoComplete={"on"}
      />
    </label>
  );
};
export default FormInput;
