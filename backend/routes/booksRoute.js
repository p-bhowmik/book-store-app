import express from "express";
const router = express.Router();
import { Book } from "../model/bookmodel.js";


//to save books we need HTTP POST method

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all the fields for book-name, author, publish year",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);

    res.status(500).send({ message: error.message });
  }
});

//to get the books data

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//to get book details by id
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//to UPDATE a book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please give the required fields..title, author, year",
      });
    }

    const bookId = req.params.id;
    const result = await Book.findByIdAndUpdate(bookId, req.body);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book details Updated..." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});
//to delete a book data..
router.delete("/:id", async (req, res) => {
  try {
    const bookID = req.params.id;
    const result = await Book.findByIdAndDelete(bookID);
    if (!result) {
      return res.status(404).send({ message: "Book Not Found!" });
    }
    return res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
