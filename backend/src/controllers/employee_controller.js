const express = require("express");
const router = express.Router();

const Employee = require("../models/employee_model");
const mongoose = require("mongoose");


//create
router.post("/create-employe", (req, res, next) => {
   const { name, age, address, salary, nic_number, role,joinedDate,mobileNumber } = req.body;
   const employee = new Employee(
      {
         _id: new mongoose.Types.ObjectId(),
         name,
         age,
         joinedDate,
         mobileNumber,
         address,
         salary,
         nic_number,
         transaction_date: Date.now(),
         role
      }
   );
   return employee
      .save()
      .then((employee) => res.status(200).json({ employee }))
      .catch(error => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Employee.find()
      .then(employees => res.status(200).json({ employee_count: employees.length, employees }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Employee.findById(__id)
      .then((employee) => {
         if (employee) return res.status(200).json(employee)
         else return res.status(404).json({ message: "employee not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-employee/:id", (req, res, next) => {
   const __id = req.params.id;
   return Employee.findById(__id)
      .then((employee) => {
         if (employee) {
            employee.set(req.body);
            return employee
               .save()
               .then((employee) => {
                  return res.status(200).json({ employee });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "employee not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-employee/:id", (req, res, next) => {
   const __id = req.params.id;
   return Employee.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router