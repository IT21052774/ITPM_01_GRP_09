const express = require("express");
const router = express.Router();

const activity = require("../models/activity_model");
const mongoose = require("mongoose");

//create
router.post("/create-activity", (req, res, next) => {
    const { name,
        image_url,
        description,
        price, } = req.body;
    const r = new activity(
        {
            name,
            image_url,
            description,
            price,
        }
    );
    return r
        .save()
        .then((activity) => res.status(200).json({ activity }))
        .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
    return activity.find()
        .then(activitys => res.status(200).json({ activity_count: activitys.length, activitys }))
        .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
    const __id = req.params.id;
    return activity.findById(__id)
        .then((activity) => {
            if (activity) return res.status(200).json(activity)
            else return res.status(404).json({ message: "activity not found" })
        })
        .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-activity/:id", (req, res, next) => {
    const __id = req.params.id;
    return activity.findById(__id)
        .then((activity) => {
            if (activity) {
                activity.set(req.body);
                return activity
                    .save()
                    .then((activity) => {
                        return res.status(200).json({ activity });
                    })
                    .catch((err) => {
                        return res.status(500).json({ err });
                    });
            } else {
                return res.status(404).send({ error: "activity not found" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ err });
        });
})

//delete
router.delete("/delete-activity/:id", (req, res, next) => {
    const __id = req.params.id;
    return activity.findByIdAndDelete(__id)
        .then(() => res.status(200).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
})

module.exports = router