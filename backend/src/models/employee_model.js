const mongoose = require("mongoose"); const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
   {
      name: { type: String, required: true },
      age: { type: String, required: true },
      address: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      joinedDate: { type: Date, required: true },
      salary: { type: Number, required: true },
      nic_number: { type: String, required: true },
      transaction_date: { type: Date, default: null, required: true },
      role: { type: String, required: true }
   }
   , {
      versionKey: false
   }
)

module.exports =  mongoose.model("Employee", EmployeeSchema)