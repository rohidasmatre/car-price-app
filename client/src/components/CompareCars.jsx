import { useEffect, useState } from "react";
import axios from "axios";

/**
 * CompareCars
 * - Fetches cars from /api/cars
 * - Lets user pick up to 3 cars to compare
 * - Shows side-by-side comparison of key fields and specs
 * - Optionally asks city for on-road price (uses backend compare endpoint if present)
 */

export default function CompareCars() {
  const [cars, setCars] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [city, setCity] = useState("nagpur");
  const [compareResult, setCompareResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/cars")
      .then(res => setCars(res.data))
      .catch(err => {
        console.error("fetch cars:", err);
        // fallback: sample placeholder if API down
        setCars([]);
      });
  }, []);

  function toggleSelect(id) {
    setCompareResult(null);
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }

  async function handleCompare() {
    if (selectedIds.length < 2) {
      alert("Select at least 2 cars to compare.");
      return;
    }
    setLoading(true);
    try {
      // Try backend compare endpoint first
      const res = await axios.post("/api/cars/compare", { carIds: selectedIds, city });
      setCompareResult(res.data);
    } catch (err) {
      // Fallback: compute client-side if backend not available
      console.warn("backend compare failed, falling back client-side", err);
      const selected = cars.filter(c => selectedIds.includes(c._id));
      const res = selected.map(buildClientCompare);
      setCompareResult({ cars: res });
    } finally {
      setLoading(false);
    }
  }

  // Client-side onroad calculation fallback (basic)
  function buildClientCompare(c) {
    const ex = Number(c.exShowroomPrice ?? c.price ?? 0);
    // rough defaults (use same cityTax values as client side)
    const taxMap = { nagpur: { rto: 9, insurance: 1.1 } };
    const t = taxMap[city] || taxMap.nagpur;
    const rto = Math.round((ex * t.rto) / 100);
    const insurance = Math.round((ex * t.insurance) / 100);
    const onRoad = ex + rto + insurance + (c.registrationCharges ?? 6000);
    return { ...c, rto, insurance, onRoad };
  }

  // list of features to show (extendable)
  const features = [
    { key: "brand", title: "Brand" },
    { key: "model", title: "Model" },
    { key: "variant", title: "Variant" },
    { key: "fuelType", title: "Fuel" },
    { key: "engine", title: "Engine" },
    { key: "mileage", title: "Mileage" },
    { key: "seating", title: "Seating" },
    { key: "exShowroomPrice", title: "Ex-Showroom" },
    { key: "rto", title: "RTO" },
    { key: "insurance", title: "Insurance" },
    { key: "onRoad", title: "On-Road Price" }
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Compare Cars</h3>
        <div className="flex items-center gap-3">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 text-white"
          >
            <option value="nagpur">Nagpur</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="pune">Pune</option>
          </select>

          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-4 py-2 rounded bg-brand text-black font-semibold disabled:opacity-60"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cars.map(car => (
          <label key={car._id} className="p-4 bg-slate-800 rounded flex items-start gap-3">
            <input
              type="checkbox"
              checked={selectedIds.includes(car._id)}
              onChange={() => toggleSelect(car._id)}
              className="mt-1"
            />
            <div>
              <div className="text-white font-semibold">{car.brand} {car.model}</div>
              <div className="text-slate-400 text-sm">{car.variant}</div>
              <div className="text-slate-300 mt-2">₹{car.exShowroomPrice?.toLocaleString()}</div>
            </div>
          </label>
        ))}
      </div>

      {compareResult ? (
        <div className="overflow-x-auto bg-slate-900 p-4 rounded">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 text-slate-300">Feature</th>
                {compareResult.cars.map((c, i) => (
                  <th key={i} className="p-3 text-left">{c.brand} {c.model}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(f => (
                <tr key={f.key} className="border-t border-slate-700">
                  <td className="p-3 text-slate-300">{f.title}</td>
                  {compareResult.cars.map((c, i) => (
                    <td key={i} className="p-3 align-top">
                      {renderFeatureValue(c, f.key)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-slate-700">
                <td className="p-3 text-slate-300">Actions</td>
                {compareResult.cars.map((c, i) => (
                  <td key={i} className="p-3">
                    <a
                      href={`/car/${c._id}`}
                      className="block mb-2 px-3 py-2 rounded bg-slate-700 text-white text-center"
                    >
                      View Details
                    </a>
                    <a
                      href={`/onroad?carId=${c._id}&city=${city}`}
                      className="block px-3 py-2 rounded bg-brand text-black text-center"
                    >
                      Calculate On-Road
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-400">Select 2–3 cars and click Compare.</p>
      )}
    </section>
  );
}

function renderFeatureValue(car, key) {
  if (key === "exShowroomPrice") {
    return car.exShowroomPrice ? `₹${Number(car.exShowroomPrice).toLocaleString()}` : "-";
  }
  if (key === "onRoad" || key === "rto" || key === "insurance") {
    return car[key] ? `₹${Number(car[key]).toLocaleString()}` : "-";
  }
  return car[key] ?? "-";
}
