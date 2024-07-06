import { Link } from "react-router-dom";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { BsInfoCircle } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import SingleBookCard from "./SingleBookCard";

const BooksCard = ({ bookData }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookData.map((item) => (
        <SingleBookCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;
