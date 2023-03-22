const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
    {
        name: { type: String, required: true },
        image_url: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
    }
    , {
        versionKey: false
    }
)

const Activity = mongoose.model("Activity", ActivitySchema)

module.exports = Activity