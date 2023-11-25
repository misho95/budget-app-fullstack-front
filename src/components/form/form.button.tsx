interface PropsType {
  title: string;
}

const FormButton = ({ title }: PropsType) => {
  return (
    <button className="bg-white w-full h-[36px] rounded-lg">{title}</button>
  );
};

export default FormButton;
