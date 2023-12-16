import { Link, useNavigate } from "react-router-dom";
import samurai from "../assets/samurai.jpg";
import FormButton from "../components/form/form.button";
import FormInput from "../components/form/form.input";
import { animated, useSpring } from "@react-spring/web";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { userGlobalStore } from "../utils/zustand.store";
import axiosInstance from "../utils/axios";

export interface InputType {
  value: string;
  error: null | string;
}

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

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<InputType>({
    value: "",
    error: null,
  });
  const [userName, setUserName] = useState<InputType>({
    value: "",
    error: null,
  });
  const [email, setEmail] = useState<InputType>({
    value: "",
    error: null,
  });
  const [password, setPassword] = useState<InputType>({
    value: "",
    error: null,
  });
  const [rePassword, setRePassword] = useState<InputType>({
    value: "",
    error: null,
  });

  const submitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let value = 0;

    if (firstName.value === "") {
      setFirstName({ value: firstName.value, error: "empty!" });
    } else {
      setFirstName({ value: firstName.value, error: null });
      value += 1;
    }

    if (userName.value === "") {
      setUserName({ value: userName.value, error: "empty!" });
    } else {
      setUserName({ value: userName.value, error: null });
      value += 1;
    }

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

    if (rePassword.value === "") {
      setRePassword({ value: rePassword.value, error: "empty!" });
    } else {
      setRePassword({ value: rePassword.value, error: null });
      value += 1;
    }

    if (value < 5) {
      return;
    }

    if (password.value !== rePassword.value) {
      setRePassword({ value: rePassword.value, error: "Not Match!" });
      return;
    } else {
      setRePassword({ value: rePassword.value, error: null });
    }

    axiosInstance
      .post("/api/auth/signup", {
        firstName: firstName.value,
        username: userName.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        navigate("/");
        return;
      })
      .catch(function (error) {
        console.log(error);

        // const message = error.response.data.message;
        // if (message === "email taken!") {
        //   setEmail({ value: email.value, error: "Email Taken!" });
        // } else {
        //   setEmail({ value: email.value, error: null });
        // }
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
            SignUp
          </h1>
          <form
            onSubmit={submitSignUpForm}
            className="p-[20px] w-full h-fit flex flex-col gap-[10px] items-center "
          >
            <FormInput
              title={"FirstName"}
              type={"text"}
              placeHolder={"FirstName"}
              input={firstName}
              setInput={setFirstName}
            />
            <FormInput
              title={"UserName"}
              type={"text"}
              placeHolder={"UserName"}
              input={userName}
              setInput={setUserName}
            />
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
            <FormInput
              title={"Re-Password"}
              type={"password"}
              placeHolder={"********"}
              input={rePassword}
              setInput={setRePassword}
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
