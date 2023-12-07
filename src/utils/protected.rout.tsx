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
      .get("/api/auth/session", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        setUser(response.data);
        if (!response.data.active) {
          axiosInstance.put("/api/auth/activate");
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  if (!user) {
    return;
  }

  return children;
};

export default ProtectedRout;
