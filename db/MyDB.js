import { query } from "express";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connection_url = process.env.MONGO_URL;
//const DB_name = "books";
const MyDB = () => {
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`thi is a connection url: ${connection_url}`);
    const db = client.db("library");
    return { client, db };
  };
  //filter the query by isbn

  myDB.getBookByISBN = async ({ query = {}, MaxElements = 2 }) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    console.log("in the mongodb object .js search for");
    console.log(query);
    try {
      return await bookCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
};

export const myDB = MyDB();
