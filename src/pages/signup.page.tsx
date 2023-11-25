import { Link } from "react-router-dom";
import samurai from "../assets/samurai.jpg";
import FormButton from "../components/form/form.button";
import FormInput from "../components/form/form.input";
import { animated, useSpring } from "@react-spring/web";

const SingUpPage = () => {
  const animateFormContainer = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 40,
      tension: 60,
    },
  });

  return (
    <div className="w-full flex justify-center">
      <animated.div
        style={{ ...animateFormContainer }}
        className="rounded-xl overflow-hidden flex flex-col lg:flex-row h-[600px] w-[700px] border-2 border-black/40 shadow-lg"
      >
        <img src={samurai} className="hidden lg:block" />
        <div className="bg-black w-full h-full flex flex-col gap-[10px] pt-[10px]">
          <h1 className="text-[30px] text-white select-none w-full text-center">
            SignUp
          </h1>
          <form className="p-[20px] w-full h-fit flex flex-col gap-[10px] items-center ">
            <FormInput
              title={"FirstName"}
              type={"text"}
              placeHolder={"FirstName"}
            />
            <FormInput
              title={"UserName"}
              type={"text"}
              placeHolder={"UserName"}
            />
            <FormInput
              title={"Email"}
              type={"email"}
              placeHolder={"example@mail.com"}
            />
            <FormInput
              title={"Password"}
              type={"password"}
              placeHolder={"********"}
            />
            <FormInput
              title={"Re-Password"}
              type={"repassword"}
              placeHolder={"********"}
            />

            <div className="text-white/50 flex gap-[10px]">
              <span>Already Have An Account?</span>
              <Link to={"/signin"} className="text-sky-500">
                SignIn
              </Link>
            </div>
            <FormButton title={"SignUp"} />
          </form>
        </div>
      </animated.div>
    </div>
  );
};

export default SingUpPage;
