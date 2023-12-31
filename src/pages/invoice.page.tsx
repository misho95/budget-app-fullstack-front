import { animated, useSpring } from "@react-spring/web";

import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const InvoicePage = () => {
  const animatedPage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 120,
      tension: 100,
    },
  });

  interface AmountType {
    value: string;
    error: null | string;
  }

  const [amount, setAmount] = useState<AmountType>({
    value: "",
    error: null,
  });
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("shopping");
  const navigate = useNavigate();
  const { expenseId } = useParams();

  const submitNewExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount.value === "") {
      setAmount({ value: amount.value, error: "Empty!" });
      return;
    }

    axiosInstance
      .post("/api/expenses", {
        category,
        type,
        amount: +amount.value,
      })
      .then(function () {
        navigate("/");
      })
      .catch(function (error) {
        const message = error.response.data.message;
        console.log(message);
      });
  };

  const amountCheckIfNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(+e.target.value)) {
      setAmount({ value: e.target.value, error: null });
    }
  };

  const editExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .put(`/api/expenses/${expenseId}`, {
        category,
        type,
        amount: +amount.value,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (expenseId) {
      axiosInstance
        .get(`/api/expenses/${expenseId}`, {})
        .then((res) => {
          const { amount, category, type } = res.data;
          setAmount({ value: amount, error: null });
          setCategory(category);
          setType(type);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <animated.div style={{ ...animatedPage }} className="flex justify-center">
      <form
        onSubmit={expenseId ? editExpense : submitNewExpense}
        className="w-[500px] flex flex-col gap-[15px]"
      >
        <h1 className="text-[28px] text-indigo-500 text-center select-none font-semibold">
          {expenseId ? "Edit EXPENSE" : "ADD NEW EXPENSE"}
        </h1>
        <label className="w-full border-[3px] border-white/80 rounded-xl overflow-hidden bg-pink-500 relative">
          <div className="py-[5px] px-[10px] text-white">Amount</div>
          <input
            type={"text"}
            placeholder={"amount"}
            className="w-full p-3 focus:outline-none"
            value={amount.value}
            onChange={amountCheckIfNumber}
          />
          {amount.error && (
            <div className="absolute top-[45px] right-[12px] flex gap-[5px] items-center text-black/70">
              <MdErrorOutline />
              <span>{amount.error}</span>
            </div>
          )}
        </label>
        <label className="w-full border-[3px] border-white/80 rounded-xl overflow-hidden bg-pink-500">
          <div className="py-[5px] px-[10px] text-white">Type</div>
          <select
            className="w-full p-3 focus:outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={"expense"}>Expense</option>
            <option value={"income"}>Income</option>
          </select>
        </label>
        <label className="w-full border-[3px] border-white/80 rounded-xl overflow-hidden bg-pink-500">
          <div className="py-[5px] px-[10px] text-white">Catrgory</div>
          <select
            className="w-full p-3 focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "expense" ? (
              <>
                <option value={"shopping"}>Shopping</option>
                <option value={"family"}>Family</option>
                <option value={"gym"}>Gym</option>
              </>
            ) : (
              <>
                <option value={"invoice"}>Invoice</option>
                <option value={"other"}>Other</option>
              </>
            )}
          </select>
        </label>
        <button className="bg-indigo-500 p-3 rounded-full text-white sm:hover:scale-95 duration-200">
          {expenseId ? "Edit Expense" : "Add New Expense"}
        </button>
      </form>
    </animated.div>
  );
};

export default InvoicePage;
