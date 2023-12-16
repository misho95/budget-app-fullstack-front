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
    axiosInstance
      .get("/api/auth/session", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        if (!response.data.active) {
          axiosInstance.put("/api/auth/activate");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/signin");
      });
  }, []);

  if (!user) {
    return;
  }

  return children;
};

export default ProtectedRout;
