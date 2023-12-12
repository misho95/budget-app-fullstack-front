import { useEffect, useState } from "react";
import Expense from "./expenses";
import axiosInstance from "../../utils/axios";
import SearchExpense from "./search.expense";
import { Link } from "react-router-dom";
import DeleteModal from "./delete.modal";

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
  const [search, setSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<null | string>(null);

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
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axiosInstance
      .delete(`/api/expenses/${deleteId}`)
      .then(() => {
        setExpenseData(
          expenseData.filter((e) => {
            if (e._id !== deleteId) return e;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <>
      {showModal && (
        <DeleteModal confirmDelete={confirmDelete} resetModal={resetModal} />
      )}

      <div className="flex flex-col gap-[20px]">
        <SearchExpense
          searchExpensesHandler={searchExpensesHandler}
          resetSearch={resetSearch}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSearch(true)}
            className="bg-indigo-500 h-[50px] w-[120px] p-[10px] rounded-lg text-white lg:hidden"
          >
            Search
          </button>
          <label>
            <div className="pl-[10px]">Sort</div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-[1px] rounded-xl p-[6px] border-black/30"
            >
              <option value={"default"}>Any</option>
              <option value={"date"}>Date</option>
              <option value={"archived"}>Favorited</option>
              <option value={"notarchived"}>Not Favorited</option>
            </select>
          </label>
        </div>
        {expenseData.length === 0 && (
          <div className="flex flex-col gap-[10px] justify-center items-center">
            <h3 className="text-[18px] text-center text-indigo-500 font-semibold">
              no Expense data found...
            </h3>
            <Link
              to={"/invoice"}
              className="flex justify-center items-center bg-pink-500 h-[40px] w-fit px-[10px] py-[5px] text-white rounded-full sm:hover:scale-95 duration-200"
            >
              Add New Expense
            </Link>
          </div>
        )}
        {expenseData.length > 0 &&
          expenseData.map((expense) => {
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
    </>
  );
};

export default ExpensesContainer;
