import LoadingPage from "../components/LoadingPage";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar}=useSnackbar();
  const handleDeleteBook = () => {
    setLoad(true);
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setLoad(false);
        enqueueSnackbar("Books Deleted Successfully", {variant: "success"});
        navigate("/");
      })
      .catch((error) => {
        setLoad(true);

        enqueueSnackbar("Error Occured", {variant: "error"});
        console.log(error);
      });
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-orange-500 shadow-lg p-4 bg-white rounded-md">Delete Book!</h1>
      {load ? <LoadingPage /> : ""}
      <div className="flex flex-col items-center border-2 border-orange-300 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-ful"
          onClick={handleDeleteBook}
        >
          Yes, Delete.
        </button>

        <button
          className="p-4 bg-gray-600 text-white m-8 w-ful"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
