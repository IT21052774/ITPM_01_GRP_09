const mongoose = require("mongoose"); const Schema = mongoose.Schema;

const FoodItemSchema = new Schema(
   {
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      available: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("FoodItem", FoodItemSchema)