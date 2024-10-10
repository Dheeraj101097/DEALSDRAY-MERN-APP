let mongoose = require("mongoose");
let schema1 = new mongoose.Schema(
  {
    name: String,
    email: String,
    cnfPassword: String,
  },
  { timestamps: true }
);

let registeredUsers = mongoose.model("registeredUsers1", schema1);

module.exports = registeredUsers;
