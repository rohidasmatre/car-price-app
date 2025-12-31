const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  variant: String,
  fuelType: String,
  engine: String,
  mileage: String,
  seating: Number,
  exShowroomPrice: Number,
  insurance: Number
});

module.exports = mongoose.model("Car", carSchema);
