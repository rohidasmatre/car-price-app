const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Car = require("../models/Car");
const auth = require("../middleware/auth");

const router = express.Router();

/* Login */
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const ok = await bcrypt.compare(req.body.password, admin.password);
  if (!ok) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

/* Add Car */
router.post("/car", auth, async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

/* Delete Car */
router.delete("/car/:id", auth, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
