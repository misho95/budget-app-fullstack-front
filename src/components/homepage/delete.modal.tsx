interface PropsType {
  confirmDelete: () => void;
  resetModal: () => void;
}

const DeleteModal = ({ confirmDelete, resetModal }: PropsType) => {
  return (
    <div className="bg-black/50 fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div className="bg-white p-[5px] rounded-full flex gap-[5px]">
        <button
          onClick={confirmDelete}
          className="bg-green-500 h-[40px] w-fit px-[10px] py-[5px] text-white rounded-full sm:hover:scale-95 duration-200"
        >
          Delete Expense
        </button>
        <button
          onClick={resetModal}
          className="bg-red-500 h-[40px] w-fit px-[10px] py-[5px] text-white rounded-full sm:hover:scale-95 duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
