const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
   {
      type: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, default: null, required: true },
      image_url: { type: String, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Rooms", RoomSchema)
