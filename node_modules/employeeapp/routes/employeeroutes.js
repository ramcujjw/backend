const express=require('express');
const router=express.Router();

const employeeModel=require('../model/employeeData');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Method Override requiring
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// GET OPERATION

router.get('/',async (req,res)=>{
    try {
        const data=await employeeModel.find();
        res.render('employee',{
            title:"Employee List",
            data
        });
    } catch (error) {
        res.status(404).send("ERROR IS RETRIEVING");
    }
})

// POST OPERATION

// GET route to render the Add Employee form
router.get('/addemployee', (req, res) => {
    res.render('addemployee', {
        title: "Add New Employee"
    });
}); 

router.post('/addemployee',async (req,res)=>{
    try {
        const newEmployee = new employeeModel({ 
        EmployeeName: req.body.EmployeeName,
        EmployeeDesignation: req.body.EmployeeDesignation,
        EmployeeLocation: req.body.EmployeeLocation,
        Salary: req.body.Salary
    })  
        await newEmployee.save();
        res.redirect('/employee');
    } catch (error) {
        res.status(404).send("POST OPERATION FAILED");
    }
})

// PUT OPERATION

router.get('/edit/:id', async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        res.render('updateemployee', { employee });  // Ensure this view exists
    } catch (error) {
        res.status(404).send("ERROR IN RETRIEVING EMPLOYEE DATA");
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await employeeModel.findByIdAndUpdate(id, req.body);
        return res.status(200).send("UPDATION DONE SUCCESSFULLY"); // Use return to exit
    } catch (error) {
        return res.status(404).send("FAILURE IN UPDATION");
    }
});

// DELETE OPERATION

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const data=await employeeModel.findByIdAndDelete(id);
        res.redirect('/employee')
    } catch (error) {
        res.status(404).send("FAILURE IN DELETION");
    }
});

module.exports=router;