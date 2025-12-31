const express = require("express");
const Car = require("../models/Car");
const cityTax = require("../data/cityTaxServer");
const calculatePrice = require("../utils/priceCalculator");
const calculateEMI = require("../utils/emiCalculator");

const router = express.Router();

/* ADD CAR (ADMIN) */
router.post("/add", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json({ message: "Car added" });
});

/* GET ALL CARS */
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

/* PRICE BY CITY */
router.get("/:id/:city", async (req, res) => {
  const car = await Car.findById(req.params.id);
  const tax = cityTax[req.params.city] || 10;

  const price = calculatePrice(
    car.exShowroomPrice,
    tax,
    car.insurance
  );

  res.json({ car, city: req.params.city, ...price });
});

/* EMI */
router.get("/emi/:price/:rate/:years", (req, res) => {
  const emi = calculateEMI(
    req.params.price,
    req.params.rate,
    req.params.years
  );
  res.json({ emi });
});

module.exports = router;
// COMPARE CARS (2 or 3)
router.post("/compare", async (req, res) => {
  const { carIds, city } = req.body;
  const tax = cityTax[city] || 10;

  const cars = await Car.find({ _id: { $in: carIds } });

  const result = cars.map(car => {
    const price = calculatePrice(
      car.exShowroomPrice,
      tax,
      car.insurance
    );
    return { car, ...price };
  });

  res.json(result);
});
// POST /api/cars/compare
router.post("/compare", async (req, res) => {
  try {
    const { carIds = [], city = "nagpur" } = req.body;
    const cars = await Car.find({ _id: { $in: carIds } }).lean();
    const tax = cityTax[city] || cityTax["nagpur"];

    const result = cars.map(c => {
      const price = Number(c.exShowroomPrice || c.price || 0);
      const rto = Math.round((price * (tax.rto ?? 10)) / 100);
      const insurance = Math.round((price * (tax.insurance ?? 1.2)) / 100);
      const onRoad = price + rto + insurance + (c.registrationCharges ?? 6000);
      return { ...c, rto, insurance, onRoad };
    });
    return res.json({ cars: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;