const mongoose = require("mongoose"); const Schema = mongoose.Schema;
const OrderSchema = new Schema(
   {
      customer_name: { type: String, required: true },
      type: { type: String, required: true },
      address: { type: String, required: true },
      customer_id: { type: String, required: true },
      price: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Order", OrderSchema)