const express = require("express");
const router = express.Router();

const Room = require("../models/room_model");
const mongoose = require("mongoose");

//create
router.post("/create-room", (req, res, next) => {
   const { type,
      description,
      price,
      image_url } = req.body;
   const r = new Room(
      {
         type,
         description,
         price,
         image_url
      }
   );
   return r
      .save()
      .then((Room) => res.status(200).json({ Room }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Room.find()
      .then(Rooms => res.status(200).json({ Room_count: Rooms.length, Rooms }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Room.findById(__id)
      .then((Room) => {
         if (Room) return res.status(200).json(Room)
         else return res.status(404).json({ message: "Room not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-room/:id", (req, res, next) => {
   const __id = req.params.id;
   console.log(`const id is ${__id}`);
   return Room.findById(__id)
      .then((Room) => {
         if (Room) {
            Room.set(req.body);
            return Room
               .save()
               .then((Room) => {
                  return res.status(200).json({ Room });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Room not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-room/:id", (req, res, next) => {
   const __id = req.params.id;
   return Room.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router;