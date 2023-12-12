import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

interface PropsType {
  searchExpensesHandler: (
    dateFrom: string | null,
    dateTo: string | null,
    type: string,
    category: string,
    minAmount: string,
    maxAmount: string
  ) => void;
  resetSearch: () => void;
  search: boolean;
  setSearch: (arg: boolean) => void;
}

const SearchExpense = ({
  searchExpensesHandler,
  resetSearch,
  search,
  setSearch,
}: PropsType) => {
  const [dateFrom, setDateFrom] = useState<string | null>("");
  const [dateTo, setDateTo] = useState<string | null>("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const submitSearch = () => {
    searchExpensesHandler(
      dateFrom,
      dateTo,
      type,
      category,
      minAmount,
      maxAmount
    );
    setSearch(search && false);
  };

  const amountCheckIfNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (arg: string) => void
  ) => {
    if (Number.isInteger(+e.target.value)) {
      set(e.target.value);
    }
  };

  const submitSearchReset = () => {
    setDateFrom("");
    setDateTo("");
    setType("");
    setCategory("");
    setMinAmount("");
    setMaxAmount("");
    resetSearch();
    setSearch(search && false);
  };

  return (
    <div
      className={`${
        search
          ? "bg-black/50 fixed flex justify-center items-center top-0 left-0 w-full h-screen z-50 lg:bg-transparent lg:relative lg:h-fit"
          : "hidden lg:block"
      }`}
    >
      <button
        onClick={() => setSearch(false)}
        className="absolute top-[15px] right-[15px] text-black bg-white rounded-full p-[5px] text-xl w-[40px] h-[40px] lg:hidden"
      >
        X
      </button>
      <div
        className={`flex flex-col w-11/12 lg:w-full bg-white lg:bg-transparent lg:flex-row justify-between items-center gap-[20px] p-[20px] lg:p-0 rounded-lg lg:rounded-none`}
      >
        <label className="flex flex-col gap-[5px]">
          <div>Date From:</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
            />
          </LocalizationProvider>
        </label>
        <label className="flex flex-col gap-[5px]">
          <div>Date To:</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
            />
          </LocalizationProvider>
        </label>
        <label className="flex flex-col gap-[5px]">
          <div>Type:</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-[50px] border-[1px] border-black/20 hover:border-black/50 bg-transparent p-[10px] rounded-xl w-[110px]"
          >
            <option value={""}>Any</option>
            <option value={"expense"}>Expense</option>
            <option value={"income"}>Income</option>
          </select>
        </label>
        <label className="flex flex-col gap-[5px]">
          <div>Category:</div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-[50px] border-[1px] border-black/20 hover:border-black/50 bg-transparent p-[10px] rounded-xl w-[110px]"
          >
            <option value={""}>Any</option>
            {type === "expense" ? (
              <>
                <option value={"shopping"}>Shopping</option>
                <option value={"family"}>Family</option>
                <option value={"gym"}>Gym</option>
              </>
            ) : type === "income" ? (
              <>
                <option value={"invoice"}>Invoice</option>
                <option value={"other"}>Other</option>
              </>
            ) : null}
          </select>
        </label>
        <label className="flex flex-col gap-[5px]">
          <div>Amount-Min</div>
          <input
            value={minAmount}
            onChange={(e) => amountCheckIfNumber(e, setMinAmount)}
            type="text"
            className="h-[50px] border-[1px] border-black/20 hover:border-black/50 bg-transparent p-[10px] rounded-xl w-[110px]"
          />
        </label>
        <label className="flex flex-col gap-[5px]">
          <div>Amount-Max</div>
          <input
            value={maxAmount}
            onChange={(e) => amountCheckIfNumber(e, setMaxAmount)}
            type="text"
            className="h-[50px] border-[1px] border-black/20 hover:border-black/50 bg-transparent p-[10px] rounded-xl w-[110px]"
          />
        </label>
        <div className="pt-[25px] flex gap-[5px]">
          <button
            onClick={submitSearchReset}
            className="bg-pink-500 h-[40px] w-[70px] text-white rounded-full sm:hover:scale-95 duration-200"
          >
            Reset
          </button>
          <button
            onClick={submitSearch}
            className="bg-indigo-500 h-[40px] w-[70px] text-white rounded-full sm:hover:scale-95 duration-200"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchExpense;
