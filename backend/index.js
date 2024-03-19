// const express = require('express');
// const mongoose = require('mongoose');
// const { PORT, MongoURL } = require('./config');
import express from 'express';
import mongoose from 'mongoose';



import { PORT, MongoURL } from './config.js';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(MongoURL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
console.log(`App listnening on port ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
    process.exit(1);
});


