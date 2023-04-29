const express = require("express");
const router = express.Router();

const safari_Item = require("../models/safari_model");
const mongoose = require("mongoose");


//create
router.post("/create-safari-item", (req, res, next) => {
   const { type,name, price, image, description } = req.body;
   const r = new safari_Item(
      {
         type,
         description,
         name,
         price,
         image,
      }
   );
   return r
      .save()
      .then((safari_Item) => res.status(200).json({ safari_Item }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return safari_Item.find()
      .then(safari_Items => res.status(200).json({ safari_Item_count: safari_Items.length, safari_Items }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return safari_Item.findById(__id)
      .then((safari_Item) => {
         if (safari_Item) return res.status(200).json(safari_Item)
         else return res.status(404).json({ message: "safari_Item not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-safari-item/:id", (req, res, next) => {
   const __id = req.params.id;
   return safari_Item.findById(__id)
      .then((safari_Item) => {
         if (safari_Item) {
            safari_Item.set(req.body);
            return safari_Item
               .save()
               .then((safari_Item) => {
                  return res.status(200).json({ safari_Item });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "safari_Item not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-safari-item/:id", (req, res, next) => {
   const __id = req.params.id;
   return safari_Item.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router