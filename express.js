const express=require('express');
const app=new express();
const path = require('path');

const morgan=require('morgan');
app.use(morgan('dev'));

app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views', path.join(__dirname+'/views'));

require('dotenv').config();
const port=process.env.PORT;

// Connecting the db with mainfile
require('./db/connection');

// Method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const employeeRoutes=require('./routes/employeeroutes');
app.use('/employee',employeeRoutes);

app.listen(port,()=>{
    console.log(`The Server is listening at port : ${port}`);
})