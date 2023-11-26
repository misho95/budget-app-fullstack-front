import { useNavigate } from "react-router-dom";
import { userGlobalStore } from "../../utils/zustand.store";

interface PropsType {
  customStyle: string;
}

const SignOutButton = ({ customStyle }: PropsType) => {
  const clearUser = userGlobalStore((state) => state.clearUser);
  const navigate = useNavigate();
  const SignOut = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    navigate("/signin");
  };

  return (
    <button onClick={SignOut} className={`hover:underline ${customStyle}`}>
      SIGNOUT
    </button>
  );
};

export default SignOutButton;
