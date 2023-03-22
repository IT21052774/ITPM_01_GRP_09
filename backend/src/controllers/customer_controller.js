const express = require("express");
const router = express.Router();

const Customer = require("../models/customer_model");
const mongoose = require("mongoose");

//create
router.post("/create-customer", (req, res, next) => {
   const { name, address, nic_number } = req.body;
   const r = new Customer(
      {
 
         name,
         address,
         nic_number,
      }
   );
   return r
      .save()
      .then((Customer) => res.status(200).json({ Customer }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Customer.find()
      .then(Customers => res.status(200).json({ Customer_count: Customers.length, Customers }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Customer.findById(__id)
      .then((Customer) => {
         if (Customer) return res.status(200).json(Customer)
         else return res.status(404).json({ message: "Customer not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-customer/:id", (req, res, next) => {
   const __id = req.params.id;
   return Customer.findById(__id)
      .then((Customer) => {
         if (Customer) {
            Customer.set(req.body);
            return Customer
               .save()
               .then((Customer) => {
                  return res.status(200).json({ Customer });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Customer not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-customer/:id", (req, res, next) => {
   const __id = req.params.id;
   return Customer.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router