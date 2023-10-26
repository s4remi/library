import express, { query } from "express";
import { myDB } from "../db/MyDB.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
export const router = express.Router();

router.post("/searchByIsbn", bodyParser.json(), async (req, res) => {
  const isbn = req.body.isbn;
  const query = { ISBN: parseInt(isbn, 10) };
  console.log(query);

  const bookInfo = await myDB.getBookByISBN({ query });
  console.log("inside of the searchByIsbn");
  //console.log("the bookInfo from getBookByISBN ", bookInfo);
  if (bookInfo) {
    return res
      .status(200)
      .json({ data: bookInfo, message: "Successfully found" });
  } else {
    return res.status(401).json({ message: "Didn't find anything" });
  }
});
export default router;
