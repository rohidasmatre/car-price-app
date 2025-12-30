import axios from "axios";

export default axios.create({
  baseURL: "https://car-price-backend.onrender.com/api"
});
