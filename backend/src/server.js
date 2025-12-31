require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");
const emiRoutes = require("./routes/emiRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/cars", carRoutes);
app.use("/api/emi", emiRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));


app.get("/", (_, res) => {
  res.send("AutoPrice Pro API running");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server started")
);
