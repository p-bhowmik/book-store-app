import LoadingPage from "../components/LoadingPage";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();

  useEffect(()=>{
    setLoad(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then ((response)=>{
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoad(false);

      })
      .catch((error)=>{
        setLoad(false);
        alert("An Error Occured!")
        console.log(error);
      })
    
  }, [])

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoad(true);
    axios
      .put(`http://localhost:8000/books/${id}`, data)
      .then(() => {
        setLoad(false);
        enqueueSnackbar("Books Edited Successfully", {variant: "success"});
        navigate("/");
      })
      .catch((error) => {
        setLoad(true);
        enqueueSnackbar("Error Occured", {variant: "error"});
        console.log(error);
        
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-orange-500 shadow-lg p-4 bg-white rounded-md">Edit Book Details</h1>
      {load ? <LoadingPage /> : ''}
      <div className="flex flex-col border-2 border-orange-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-orange-400">
            Edit the Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-orange-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-orange-400">
            Edit the Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-orange-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-orange-400">
            Edit the Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-orange-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-orange-400 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
