import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Link } from "react-router-dom";
import { links } from "./links";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import BurgerMenu from "./burger.menu";
import SignOutButton from "./singout";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu && window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [openMenu]);

  const animatedHeader = useSpring({
    from: { y: -200 },
    to: { y: 0 },
    config: {
      mass: 5,
      friction: 20,
      tension: 30,
    },
  });

  const [animateIcon, runAnimateIcon] = useSpring(() => ({
    from: { opacity: 1 },
    config: {
      mass: 5,
      friction: 20,
      tension: 30,
    },
  }));

  const iconAnimationHandler = () => {
    runAnimateIcon.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 390 && openMenu) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openMenu]);

  return (
    <>
      {openMenu && <BurgerMenu setOpenMenu={setOpenMenu} />}
      <animated.header
        style={{ ...animatedHeader }}
        className="w-full h-[24px]  my-[36px] flex justify-between select-none"
      >
        <Link to="/" className="text-[25px] font-semibold drop-shadow-sm">
          <span className="text-pink-500">BUDGET</span>-
          <span className="text-indigo-500">APP</span>
        </Link>
        <span className="hidden sm:block">
          <div className="flex gap-[50px] text-DarkGrey">
            {links.map((l, index) => {
              return (
                <Link key={index} to={l.link} className="hover:underline">
                  {l.name.toUpperCase()}
                </Link>
              );
            })}
            <SignOutButton customStyle={""} />
          </div>
        </span>
        <span className="block sm:hidden">
          <button
            onClick={() => {
              setOpenMenu(!openMenu), iconAnimationHandler();
            }}
          >
            <animated.div style={{ ...animateIcon }}>
              {openMenu ? (
                <IoIosClose className={"w-[25px] h-[25px]"} />
              ) : (
                <IoIosMenu className={"w-[25px] h-[25px]"} />
              )}
            </animated.div>
          </button>
        </span>
      </animated.header>
    </>
  );
};

export default Header;
