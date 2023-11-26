import axios from "axios";
import { useLayoutEffect } from "react";
import { userGlobalStore } from "./zustand.store";
import { useNavigate } from "react-router-dom";

const ProtectedRout = ({ children }) => {
  const navigate = useNavigate();
  const user = userGlobalStore((state) => state.user);
  const setUser = userGlobalStore((state) => state.setUser);

  useLayoutEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/signin");
      return;
    }

    axios
      .get("https://budget-app-bz54x.ondigitalocean.app/api/auth/session", {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!user) {
    return;
  }

  return children;
};

export default ProtectedRout;
