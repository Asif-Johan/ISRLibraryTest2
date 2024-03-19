import express from "express";
import mongoose from "mongoose";

import { Book } from "../model/model";

const router = express.Router();

//routes for books (get post delete)

// Save a book/create a book (admin)
router.post("/", async (req, res) => {
  try {
    // check if book is worth saving
    if (!req.body.title || !req.body.author) {
      console.log(
        "Title or/and Author not provided, Create book(router.post) failed"
      );

      return res
        .status(400)
        .send({ message: "Please provide title and author" });
    }

    //creating a book Object
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    };
    //save in database db
    const book = await Book.create(newBook);

    //return the book in response
    return res.status(200).send(book);
  } catch (err) {
    console.log(
      "Error in routes.js creating new book, view router.post in routes.js -> the error is: " +
        err + err.message
    );
    return res
      .status(500)
      .send({
        message:
          "Internal server Error -> Error in routes.js creating new book",
      });
  }
});


//update a book (admin)
router.put("/:id", async(req,res)=>{
    try {
        
        //check if book has required fields
        if (!req.body.title || !req.body.author) {
            console.log("Title or/and Author not Available, Update book(router.put) failed check routes.js router.put");
            return res.status(400).send({message: "Title or/and Author not Available, Update book(router.put) failed"});
        }

        //get book id from req.params (request parameters)
        const { id } = req.params;

        //update the book in database using id
        const resultBook = await Book.findByIdAndUpdate(id, req.body);

        //check if the book was found and updated
        if(!resultBook){
            console.log("Book not found, Update book(router.put) failed check routes.js router.put");
            return res.status(404).send({message: "Book not found, Update book(router.put) failed"});
        }else{
            console.log(" Book updated successfully-> update(router.put) worked");
            return res.status(200).send({message: "Book updated successfully-> update(router.put) worked"});
        }

//catch the error if any auzubillah
    } catch (error) {
        console.log(" Error in updating a book, view router.put in routes.js router.put -> the error is: "+ error + error.message);
        return res.status(500).send({message: "Internal server Error -> Error in updating a book check routes.js router.put"+ error.message});
    }
});


//delete a book from the database (admin)
router.delete("/:id", async(req,res)=>{
    try {

        //get book id from req.params (request parameters)
        const { id } = req.params;

        //delete the book in database using id
        const resultBook = await Book.findByIdAndDelete(id);

        //check if the book was found and deleted
        if(!resultBook){
            console.log("Book not found, Delete book(router.delete) failed check routes.js router.delete");
            return res.status(404).send({message: "Book not found, Delete book(router.delete) failed"});
        }else{
            console.log(" Book deleted successfully-> delete(router.delete) worked");
            return res.status(200).send({message: "Book deleted successfully-> delete(router.delete) worked"});
        }

//catch the error if any auzubillah
        
    } catch (error) {
        console.log(" Error in deleting a book, view router.delete in routes.js router.delete -> the error is: "+ error+ error.message);
        return res.status(500).send({message: "Internal server Error -> Error in deleting a book check routes.js router.delete"+ error.message});
    }
});

//Show all books from the databse
router.get("/", async(req,res)=>{

    try {
        //find all books in database
        const books = await Book.find({});

        //return the list of books in response
        return res.status(200).json({
            count: books.length,
            data: books,
        });
        
    } catch (error) {
        console.log(" Error in getting all books, view router.get in routes.js router.get -> the error is: "+ error+ error.message);
        return res.status(500).send({message: "Internal server Error -> Error in getting all books check routes.js router.get"+ error.message});
    }


});

//Show one book from the database using Id
router.get("/:id", async(req,res)=>{

    try {
        
    } catch (error) {
        console.log(" Error in getting a book, view router.get in routes.js router.get -> the error is: "+ error + error.message);
        return res.status(500).send({message: "Internal server Error -> Error in getting a book check routes.js router.get"+ error.message});
    }
});
