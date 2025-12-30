const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/cars", carRoutes);
require("dotenv").config();


app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
