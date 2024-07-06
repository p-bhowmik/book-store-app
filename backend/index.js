import express from "express";
const app = express();
app.use(express.json()); //MW to parse req body
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookmodel.js";
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';
app.use(cors());

app.use('/books', bookRoute); //middleware for books route


app.get("/", (req, res) => {
  //console.log(req);
  res.status(234).send("Hello World from server");
});


///to connect to database and server
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App is connected to database...");
    // app will listen only when it is connected to database, so move the beloe code here..

    app.listen(PORT, () => {
      console.log(`server is working in port :${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
