import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axiosInstance from "../../utils/axios";
import { useLocation } from "react-router-dom";

interface StatsType {
  expense: number;
  income: number;
}

interface CategoryStatsType {
  shopping: number;
  family: number;
  gym: number;
  invoice: number;
  other: number;
}

const StatsTitle = () => {
  const [stats, setStats] = useState<StatsType>({
    expense: 0,
    income: 0,
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStatsType>({
    shopping: 0,
    family: 0,
    gym: 0,
    invoice: 0,
    other: 0,
  });
  const animatedTitle = useSpring({
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const location = useLocation();

  const updateWithPrevData = (prev: any, key: string, data: number) => {
    return { ...prev, [key]: data };
  };

  useEffect(() => {
    Object.keys(stats).map((k) => {
      axiosInstance
        .get(`/api/expenses/count?type=type&&value=${k}`)
        .then((res) => {
          console.log(res.data);
          setStats((p) => updateWithPrevData(p, k, res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });

    Object.keys(categoryStats).map((k) => {
      axiosInstance
        .get(`/api/expenses/count?type=category&&value=${k}`)
        .then((res) => {
          setCategoryStats((p) => updateWithPrevData(p, k, res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [location.pathname]);

  return (
    <animated.div style={{ ...animatedTitle }} className={"pt-[10px]"}>
      <Marquee>
        <div className="flex gap-3 text-black/70">
          {Object.keys(stats).map((k: any) => {
            return (
              <span key={k} className="flex gap-2">
                <p>{k.toUpperCase()}:</p>
                <p>{stats[k as keyof StatsType]}</p>
              </span>
            );
          })}
          {Object.keys(categoryStats).map((k: any) => {
            return (
              <span key={k} className="flex gap-2">
                <p>{k.toUpperCase()}:</p>
                <p>{categoryStats[k as keyof CategoryStatsType]}</p>
              </span>
            );
          })}
        </div>
      </Marquee>
    </animated.div>
  );
};

export default StatsTitle;
