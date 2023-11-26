import { animated, useSpring } from "@react-spring/web";
import ExpensesContainer from "../components/homepage/expenses.container";

const HomePage = () => {
  const animatedPage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 120,
      tension: 100,
    },
  });

  return (
    <animated.div style={{ ...animatedPage }}>
      <ExpensesContainer />
    </animated.div>
  );
};

export default HomePage;
