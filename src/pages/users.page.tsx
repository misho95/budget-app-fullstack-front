import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { UserDataType } from "../utils/data.types";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const animatedPage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 120,
      tension: 100,
    },
  });

  const [users, setUsers] = useState<UserDataType[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <animated.div style={{ ...animatedPage }} className="flex justify-center">
      <div className="w-full lg:w-[500px] bg-white shadow-sm shadow-black/10 p-[20px] rounded-xl flex flex-col gap-[15px]">
        {users.map((u) => {
          return (
            <div
              key={u._id}
              className="border-[1px] border-indigo-500/30 rounded-xl p-[10px] flex flex-col gap-[5px]"
            >
              <h3 className="text-[18px] font-semibold font-sans text-pink-500">
                {u.userName}
              </h3>
              <span className="text-indigo-500 flex flex-col gap-[2px]">
                <p>
                  <span className="font-semibold">FirstName: </span>
                  {u.firstName}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {u.email}
                </p>
                <p>
                  <span className="font-semibold">Role: </span>
                  {u.role}
                </p>
                <p>
                  <span className="font-semibold">Active: </span>
                  {u.active ? "active" : "not Active"}
                </p>
              </span>
              <Link
                to={`/profile/${u._id}`}
                className="bg-pink-500 py-[3px] rounded-lg text-white sm:hover:scale-95 duration-200 flex justify-center items-center"
              >
                Check Profile
              </Link>
            </div>
          );
        })}
      </div>
    </animated.div>
  );
};

export default UsersPage;
