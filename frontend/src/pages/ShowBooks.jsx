import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";

const ShowBooks = () => {
  const [books, setBooks] = useState({});
  const [load, setLoad] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoad(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Book Information</h1>
      {load ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col border-2 border-orange-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Id</span>
            <span>{books._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Title</span>
            <span>{books.title}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Author</span>
            <span>{books.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Year of Publish</span>
            <span>{books.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Time of Creation</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-orange-500">Last Update</span>
            <span>{new Date(books.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
