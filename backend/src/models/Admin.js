const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

adminSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Admin", adminSchema);
