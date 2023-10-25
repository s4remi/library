import express from "express";
//the gos is to get a number as int or str from the html
//side and use it to search for the match in db
import bodyParser from "body-parser";
export const router = express.Router();

router.post("", (req, res) => {
  const isbn = req.body.isbn;
  const query = { ISBN: parseInt(isbn, 10) };
  console.log(query);

  //const bookinfo= //
});
