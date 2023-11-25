import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  customStyle: string;
}

const ContentContainer = ({ children, customStyle }: PropsType) => {
  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center gap-[20px] ${customStyle}`}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
