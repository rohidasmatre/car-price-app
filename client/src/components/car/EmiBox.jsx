import { useState } from "react";

export default function EmiBox({ price }) {
  const [years, setYears] = useState(5);
  const [rate] = useState(9.5);

  const months = years * 12;
  const r = rate / 12 / 100;
  const emi = Math.round(
    (price * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1)
  );

  return (
    <div className="bg-slate-800 p-6 rounded">
      <h3 className="text-xl font-semibold mb-4">EMI Calculator</h3>

      <label className="block mb-2">Loan Tenure: {years} years</label>
      <input
        type="range"
        min="1"
        max="7"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        className="w-full"
      />

      <div className="mt-6 text-2xl font-bold">
        EMI: ₹{emi.toLocaleString()}/month
      </div>
    </div>
  );
}
