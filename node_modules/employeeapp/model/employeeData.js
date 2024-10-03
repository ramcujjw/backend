const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
    EmployeeName:String,
    EmployeeDesignation:String,
    EmployeeLocation:String,
    Salary:Number
})

const employeeData=mongoose.model('employee',employeeSchema);  //employee - is the collection name

module.exports=employeeData;