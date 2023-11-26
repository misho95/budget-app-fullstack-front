import { useEffect, useState } from "react";
import Expense from "./expenses";
import axiosInstance from "../../utils/axios";

interface ExpenseType {
  _id: string;
  isArchived: boolean;
  userId: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ExpensesContainer = () => {
  const [expenseData, setExpenseData] = useState<ExpenseType[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/expenses", {})
      .then(function (response) {
        setExpenseData(response.data);
      })
      .catch(function (error) {
        const message = error.response.data.message;
        console.log(message);
      });
  }, []);

  return (
    <div className="flex flex-col gap-[20px]">
      {expenseData.map((expense) => {
        return (
          <Expense
            key={expense._id}
            id={expense._id}
            isArchived={expense.isArchived}
            type={expense.type}
            category={expense.category}
            amount={expense.amount}
            createdAt={expense.createdAt}
          />
        );
      })}
    </div>
  );
};

export default ExpensesContainer;
