import { ReactNode, useEffect } from "react";
import { userGlobalStore } from "./zustand.store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";

interface PropsType {
  children: ReactNode;
}

const ProtectedRout = ({ children }: PropsType) => {
  const navigate = useNavigate();
  const user = userGlobalStore((state) => state.user);
  const setUser = userGlobalStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/signin");
      return;
    }

    axiosInstance
      .get("/api/auth/session")
      .then(() => {
        axiosInstance.defaults.headers.common["Authorization"] = token;
      })
      .catch(() => {
        navigate("/signin");
      });

    axiosInstance
      .get("/api/auth/session", {})
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
