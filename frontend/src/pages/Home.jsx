import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import {
  MdOutlineAddCircleOutline,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [bookData, setBookData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        setBookData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-5">
        <button
          className="bg-orange-300 hover:bg-orange-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>

        <button
          className="bg-orange-300 hover:bg-orange-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center my-8">
        <h3 className="text-4xl font-bold text-orange-500 shadow-lg p-4 bg-white rounded-md">
          Book Store
        </h3>
        <Link to="/books/create">
          <MdOutlineAddCircleOutline className="text-orange-800 text-2xl shadow-xl bg-white rounded-md" />
        </Link>
      </div>
      <div>
        {" "}
        {loader ? (
          <LoadingPage />
        ) : showType === "table" ? (
          <BooksTable bookData={bookData} />
        ) : (
          <BooksCard bookData={bookData} />
        )}
      </div>
    </div>
  );
};

export default Home;