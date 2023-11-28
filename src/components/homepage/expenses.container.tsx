import { useEffect, useState } from "react";
import Expense from "./expenses";
import axiosInstance from "../../utils/axios";
import SearchExpense from "./search.expense";
import { error } from "console";

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
  const [sort, setSort] = useState("default");

  const searchExpensesHandler = (
    dateFrom: string | null,
    dateTo: string | null,
    type: string,
    category: string,
    minAmount: string,
    maxAmount: string
  ) => {
    const link = `/api/expenses/search?${type ? `type=${type}` : ``}${
      category ? `&category=${category}` : ``
    }${dateFrom ? `&date_from=${dateFrom}` : ""}${
      dateTo ? `&date_to=${dateTo}?` : ""
    }${minAmount ? `&min_amount=${minAmount}` : ""}${
      maxAmount ? `&max_amount=${maxAmount}` : ""
    }`;
    console.log(link);
    axiosInstance
      .get(link)
      .then(function (response) {
        setSort("search");
        setExpenseData(response.data);
      })
      .catch(function (error) {
        const message = error.response.data.message;
        console.log(message);
      });
  };

  const resetSearch = () => {
    setSort("default");
  };

  useEffect(() => {
    switch (sort) {
      case "default":
        axiosInstance
          .get("/api/expenses")
          .then(function (response) {
            setExpenseData(response.data);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            console.log(message);
          });
        break;
      case "date":
        axiosInstance
          .get("/api/expenses/sorted")
          .then(function (response) {
            setExpenseData(response.data);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            console.log(message);
          });
        break;
      case "archived":
        axiosInstance
          .get("/api/expenses/archive/filter?isarchived=true")
          .then(function (response) {
            setExpenseData(response.data);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            console.log(message);
          });
        break;
      case "notarchived":
        axiosInstance
          .get("/api/expenses/archive/filter?isarchived=false")
          .then(function (response) {
            setExpenseData(response.data);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            console.log(message);
          });
        break;
      case "search":
        break;
      default:
        throw new Error("Somthing Wrong!");
    }
  }, [sort]);

  const deleteExpense = (id: string) => {
    axiosInstance
      .delete(`/api/expenses/${id}`)
      .then(() => {
        setExpenseData(
          expenseData.filter((e) => {
            if (e._id !== id) return e;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <SearchExpense
        searchExpensesHandler={searchExpensesHandler}
        resetSearch={resetSearch}
      />
      <div>
        <label>
          <div className="pl-[10px]">Sort</div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-[1px] rounded-xl p-[6px] border-black/30"
          >
            <option value={"default"}></option>
            <option value={"date"}>Date</option>
            <option value={"archived"}>Archived</option>
            <option value={"notarchived"}>Not Archived</option>
          </select>
        </label>
      </div>
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
            deleteExpense={deleteExpense}
          />
        );
      })}
    </div>
  );
};

export default ExpensesContainer;
