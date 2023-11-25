import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  customStyle: string;
}

const ResponsContainer = ({ children, customStyle }: PropsType) => {
  const [width, setWith] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWith(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div
      className={`${
        width < 327 ? "w-11/12" : width + 60 > 327 ? "w-11/12" : "w-[327px]"
      }  ${width < 689 ? "sm:w-11/12" : "sm:w-[689px]"} ${
        width === 1024 ? "lg:w-11/12" : "lg:w-[1111px]"
      } font-jost ${customStyle}`}
    >
      {children}
    </div>
  );
};

export default ResponsContainer;
