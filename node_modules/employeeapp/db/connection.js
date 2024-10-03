const mongoose=require('mongoose');

require('dotenv').config();
const connection=process.env.mongoDB_URL;

mongoose.connect(connection).then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY");
}).catch(()=>{
    console.log("DATABASE NOT CONNECTED");
})