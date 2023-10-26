import { MongoClient } from "mongodb";
import { query } from "express";

import dotenv from "dotenv";
dotenv.config();

const connection_url = process.env.MONGO_URL;

const MyDB = () => {
  const myDb = {};

  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`thi is a connection url: ${connection_url}`);
    const db = client.db("library");
    return { client, db };
  };

  myDb.getBookByIsbn = async ({ query = {}, MaxElements = 2 }) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    console.log(bookCollection);
    try {
      return await bookCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing the connection");
      client.close();
    }
  };
  return myDb;
};
export const myDb = MyDB();
