import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PriceBreakdown from "./PriceBreakdown";
import EmiBox from "./EmiBox";
import DealerCTA from "./DealerCTA";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [city, setCity] = useState("nagpur");

  useEffect(() => {
    axios.get(`/api/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!car) {
    return <div className="text-white p-10">Loading car details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">
        {car.brand} {car.model}
      </h1>

      <p className="text-slate-400 mb-6">{car.variant}</p>

      <div className="flex gap-4 mb-6">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-slate-800 px-4 py-2 rounded"
        >
          <option value="nagpur">Nagpur</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="pune">Pune</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <PriceBreakdown car={car} city={city} />
        <EmiBox price={car.exShowroomPrice} />
      </div>

      <DealerCTA car={car} city={city} />
    </div>
  );
}
