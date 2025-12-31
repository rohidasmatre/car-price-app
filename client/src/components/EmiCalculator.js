import { useState } from "react";
import { calculateEMI } from "../utils/emi";

export default function EmiCalculator() {
  const [amount, setAmount] = useState(800000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(5);

  const result = calculateEMI(amount, rate, years);

  return (
    <section className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur p-8 rounded-2xl shadow-xl">
      <h3 className="text-3xl font-bold mb-6 text-white">
        EMI Calculator
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <Input label="Loan Amount (₹)" value={amount} set={setAmount} />
        <Input label="Interest Rate (%)" value={rate} set={setRate} />
        <Input label="Tenure (Years)" value={years} set={setYears} />
      </div>

      {result && (
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
          <ResultCard title="Monthly EMI" value={`₹${result.emi}`} />
          <ResultCard title="Total Interest" value={`₹${result.totalInterest}`} />
          <ResultCard title="Total Payment" value={`₹${result.totalPayment}`} />
        </div>
      )}
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
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand outline-none"
      />
    </div>
  );
}

function ResultCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <p className="text-slate-400 mb-2">{title}</p>
      <p className="text-2xl font-bold text-brand">{value}</p>
    </div>
  );
}
