import { Link, useNavigate } from "react-router-dom";
import samurai from "../assets/samurai.jpg";
import FormButton from "../components/form/form.button";
import FormInput from "../components/form/form.input";
import { animated, useSpring } from "@react-spring/web";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { userGlobalStore } from "../utils/zustand.store";

export interface InputType {
  value: string;
  error: null | string;
}

const SingInPage = () => {
  const animateFormContainer = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 40,
      tension: 60,
    },
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState<InputType>({
    value: "",
    error: null,
  });
  const [password, setPassword] = useState<InputType>({
    value: "",
    error: null,
  });

  const submitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let value = 0;

    if (email.value === "") {
      setEmail({ value: email.value, error: "empty!" });
    } else {
      setEmail({ value: email.value, error: null });
      value += 1;
    }

    if (password.value === "") {
      setPassword({ value: password.value, error: "empty!" });
    } else {
      setPassword({ value: password.value, error: null });
      value += 1;
    }

    if (value < 2) {
      return;
    }

    axios
      .post("https://budget-app-bz54x.ondigitalocean.app/api/auth/signin", {
        email: email.value,
        password: password.value,
      })
      .then(function (response) {
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        navigate("/");
        return;
      })
      .catch(function (error) {
        const message = error.response.data.message;
        console.log(message);
      });
  };

  const user = userGlobalStore((state) => state.user);

  useLayoutEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <animated.div
        style={{ ...animateFormContainer }}
        className="rounded-xl overflow-hidden flex flex-col lg:flex-row h-[600px] w-[700px] border-2 border-black/40 shadow-lg"
      >
        <img src={samurai} className="hidden lg:block" />
        <div className="bg-black w-full h-full flex flex-col gap-[10px] pt-[10px]">
          <h1 className="text-[30px] text-white select-none w-full text-center">
            SignIn
          </h1>
          <form
            onSubmit={submitSignUpForm}
            className="p-[20px] w-full h-fit flex flex-col gap-[10px] items-center "
          >
            <FormInput
              title={"Email"}
              type={"email"}
              placeHolder={"example@mail.com"}
              input={email}
              setInput={setEmail}
            />
            <FormInput
              title={"Password"}
              type={"password"}
              placeHolder={"********"}
              input={password}
              setInput={setPassword}
            />

            <div className="text-white/50 flex gap-[10px]">
              <span>Don't Have An Account?</span>
              <Link to={"/signup"} className="text-sky-500">
                SignUp
              </Link>
            </div>
            <FormButton title={"SignIn"} />
          </form>
        </div>
      </animated.div>
    </div>
  );
};

export default SingInPage;
