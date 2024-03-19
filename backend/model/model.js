import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String},


});


const BorrowingRequestSchema = new mongoose.Schema({
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book' ,
         required: true
     },
    studentID: { type: String, required: true },
    studentMobile: { type: String, required: true },
    studentEmail: { type: String, required: true },
    
    
})