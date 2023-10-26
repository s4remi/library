import { myDb } from "../db/My.Db.js";
import bodyParser from "body-parser";
import express from "express";

export const router = express.Router();

router.post("/searchByIsbn", bodyParser.json(), async (req, res) => {
  const isbn = req.body.isbn;
  const query = { ISBN: parseInt(isbn, 10) };
  console.log(query);

  const bookInfo = await myDb.getBookByIsbn({ query });
  console.log("inside the searchByIsbn");
  console.log("the book info from getBookBYIsbn ", bookInfo);
  if (bookInfo) {
    return res
      .status(200)
      .json({ data: bookInfo, message: "Successfully found" });
  } else {
    return res.status(401).json({ message: "Didn't find anything" });
  }
});

export default router;
