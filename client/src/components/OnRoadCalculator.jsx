import { useState } from "react";
import cityTax from "../data/cityTax";

export default function OnRoadCalculator() {
  const [price, setPrice] = useState(800000);
  const [city, setCity] = useState("nagpur");

  const tax = cityTax[city];
  const rtoAmount = Math.round((price * tax.rto) / 100);
  const insuranceAmount = Math.round((price * tax.insurance) / 100);
  const onRoad = price + rtoAmount + insuranceAmount + 6000;

  return (
    <section className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur p-8 rounded-2xl shadow-xl">
      <h3 className="text-3xl font-bold mb-6 text-white">
        On-Road Price Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Ex-Showroom Price (₹)"
          value={price}
          set={setPrice}
        />

        <div>
          <label className="block mb-2 text-slate-300">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            {Object.keys(cityTax).map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-4 text-center">
        <Card title="Ex-Showroom" value={`₹${price}`} />
        <Card title="RTO Tax" value={`₹${rtoAmount}`} />
        <Card title="Insurance" value={`₹${insuranceAmount}`} />
        <Card title="On-Road Price" value={`₹${onRoad}`} highlight />
      </div>
    </section>
  );
}

function Input({ label, value, set }) {
  return (
    <div>
      <label className="block mb-2 text-slate-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => set(+e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
      />
    </div>
  );
}

function Card({ title, value, highlight }) {
  return (
    <div className={`p-5 rounded-xl ${highlight ? "bg-brand text-black" : "bg-slate-800 text-white"}`}>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
