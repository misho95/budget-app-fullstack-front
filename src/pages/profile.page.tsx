import { animated, useSpring } from "@react-spring/web";
import { userGlobalStore } from "../utils/zustand.store";
import axiosInstance from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDataType } from "../utils/data.types";

const ProfilePage = () => {
  const animatedPage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 120,
      tension: 100,
    },
  });

  let { userId } = useParams();
  const userData = userGlobalStore((state) => state.user);
  const clearUser = userGlobalStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [userToRender, setUserToRender] = useState<UserDataType | null>();
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    if (!userId) {
      setUserToRender(userData);
      axiosInstance
        .get("api/expenses")
        .then((res) => {
          setTotalExpense(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance
        .get(`/api/auth/profile/${userId}`)
        .then((res) => {
          setUserToRender(res.data);
        })
        .catch(() => {
          alert("somthings wrong!");
        });
    }
  }, []);

  const deactiveUser = () => {
    axiosInstance
      .put("/api/auth/deactivate")
      .then(() => {
        localStorage.removeItem("accessToken");
        clearUser();
        navigate("/signin");
      })
      .catch(() => {
        alert("somthings wrong!");
      });
  };

  const deleteUserProfile = () => {
    const userId = userToRender?._id;
    axiosInstance
      .delete(`/api/expenses/clear/${userId}`)
      .then(() => {
        axiosInstance
          .delete(`/api/auth/${userId}`)
          .then(() => {
            localStorage.removeItem("accessToken");
            clearUser();
            navigate("/signin");
          })
          .catch(() => {
            alert("NoT Allowed!");
          });
      })
      .catch(() => {
        alert("NoT Allowed!");
      });
  };

  return (
    <animated.div style={{ ...animatedPage }} className="flex justify-center">
      <div className="w-11/12 lg:w-[500px] bg-white shadow-sm shadow-black/10 p-[20px] rounded-xl flex flex-col gap-[15px]">
        <div className={"flex flex-col gap-[5px]"}>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">UserName: </span>
            <p className="font-semibold text-indigo-500">
              {userToRender?.userName}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">FirstName: </span>
            <p className="font-semibold text-indigo-500">
              {userToRender?.firstName}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">Email: </span>
            <p className="font-semibold text-indigo-500">
              {userToRender?.email}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">CreatedAt: </span>
            <p className="font-semibold text-indigo-500">
              {userToRender && new Date(userToRender?.createdAt).toDateString()}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">UserRole: </span>
            <p className="font-semibold text-indigo-500">
              {userToRender?.role}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">
              User Is Active:{" "}
            </span>
            <p className="font-semibold text-indigo-500">
              {userToRender?.active ? "Active" : "Not Active"}
            </p>
          </div>
          <div className="flex gap-[10px] font-mono">
            <span className="font-semibold text-pink-500">
              Total Expenses:{" "}
            </span>
            <p className="font-semibold text-indigo-500">{totalExpense}</p>
          </div>
        </div>
        <div className="flex justify-center gap-[10px]">
          {!userId || userId === userData?._id ? (
            <button
              onClick={deactiveUser}
              className="bg-indigo-500 text-white py-[5px] px-[10px] rounded-3xl sm:hover:scale-95 duration-200"
            >
              DeActive User Profile
            </button>
          ) : null}
          {userData?.role === "admin" && (
            <button
              onClick={deleteUserProfile}
              className="bg-pink-500 text-white py-[5px] px-[10px] rounded-3xl sm:hover:scale-95 duration-200"
            >
              Remove User Profile
            </button>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default ProfilePage;
