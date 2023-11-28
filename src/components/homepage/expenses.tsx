import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../utils/axios";
import { useState } from "react";

interface PropsType {
  id: string;
  isArchived: boolean;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
  deleteExpense: (id: string) => void;
}

const Expense = ({
  id,
  isArchived: initialIsArchived,
  type,
  category,
  amount,
  createdAt,
  deleteExpense,
}: PropsType) => {
  const [isArchived, setIsArchived] = useState(initialIsArchived);

  const archiveExpense = () => {
    axiosInstance
      .put(`/api/expenses/archive/${id}?archived=${isArchived ? false : true}`)
      .then(() => {
        setIsArchived(!isArchived);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div
      className={`w-full p-[10px] ${
        type === "expense" ? "bg-pink-200" : "bg-indigo-200"
      } rounded-lg shadow-sm flex justify-between items-center font-semibold font-sans opacity-60 hover:opacity-100 duration-150`}
    >
      <span className="w-1/5 ">{createdAt}</span>
      <span className="w-1/5 ">{type}</span>
      <span className="w-1/5 ">{category}</span>
      <span className="w-1/5 ">{amount}</span>
      <span className="w-1/5 flex gap-[10px] ">
        <MdDelete
          className={"h-[25px] w-[25px] hover:scale-125 cursor-pointer"}
          onClick={() => deleteExpense(id)}
        />
        <FaEdit
          className={"h-[25px] w-[25px] hover:scale-125 cursor-pointer"}
        />
      </span>
      <span className={``}>
        {isArchived ? (
          <MdFavorite
            onClick={archiveExpense}
            className={"h-[25px] w-[25px] hover:scale-125 cursor-pointer"}
          />
        ) : (
          <MdFavoriteBorder
            onClick={archiveExpense}
            className={"h-[25px] w-[25px] hover:scale-125 cursor-pointer"}
          />
        )}
      </span>
    </div>
  );
};

export default Expense;
