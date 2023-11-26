import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../../utils/axios";

interface PropsType {
  id: string;
  isArchived: boolean;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

const Expense = ({
  id,
  isArchived,
  type,
  category,
  amount,
  createdAt,
}: PropsType) => {
  const archiveExpense = () => {
    axiosInstance
      .put(`/api/expenses/archive/${id}?archived=${isArchived ? false : true}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };

  return (
    <div
      className={`w-full p-[10px] ${
        type === "expense" ? "bg-pink-200" : "bg-indigo-200"
      } rounded-lg shadow-sm flex justify-between items-center font-semibold font-sans`}
    >
      <span className="w-1/5 text-black/50 hover:text-black/90">
        {createdAt}
      </span>
      <span className="w-1/5 text-black/50 hover:text-black/90">{type}</span>
      <span className="w-1/5 text-black/50 hover:text-black/90">
        {category}
      </span>
      <span className="w-1/5 text-black/50 hover:text-black/90">{amount}</span>
      <span className="w-1/5 flex gap-[10px] ">
        <MdDelete
          className={
            "h-[25px] w-[25px] text-black/50 hover:text-black/80 duration-100"
          }
        />
        <FaEdit
          className={
            "h-[25px] w-[25px] text-black/50 hover:text-black/80 duration-100"
          }
        />
      </span>
      <span className={``}>
        {isArchived ? (
          <button onClick={archiveExpense}>
            <MdFavorite
              className={
                "h-[25px] w-[25px] text-black/50 hover:text-black/80 duration-100"
              }
            />
          </button>
        ) : (
          <button onClick={archiveExpense}>
            <MdFavoriteBorder
              className={
                "h-[25px] w-[25px] text-black/50 hover:text-black/80 duration-100"
              }
            />
          </button>
        )}
      </span>
    </div>
  );
};

export default Expense;
