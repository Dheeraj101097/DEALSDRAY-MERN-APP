let mongoose = require("mongoose");
let schema1 = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    designation: String,
    gender: String,
    image: String,
    course: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

let modelEmployeeRegister = mongoose.model("modelEmployeeRegister1", schema1);

module.exports = modelEmployeeRegister;
