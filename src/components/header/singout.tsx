import { useNavigate } from "react-router-dom";
import { userGlobalStore } from "../../utils/zustand.store";
import axiosInstance from "../../utils/axios";

interface PropsType {
  customStyle: string;
}

const SignOutButton = ({ customStyle }: PropsType) => {
  const clearUser = userGlobalStore((state) => state.clearUser);
  const navigate = useNavigate();
  const SignOut = () => {
    axiosInstance
      .post("api/auth/signout")
      .then(() => {
        clearUser();
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button onClick={SignOut} className={`hover:underline ${customStyle}`}>
      SIGNOUT
    </button>
  );
};

export default SignOutButton;
