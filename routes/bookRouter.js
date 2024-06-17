import express from "express";
import { deleteBookById, getAllBooks, getBookById, saveBook } from "../controllers/bookController.js";

const bookRouter = express.Router();
const jsonParser = express.json();

bookRouter.post('/create', jsonParser, saveBook);
bookRouter.get("/all", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.delete("/:id", deleteBookById);

export default bookRouter;
