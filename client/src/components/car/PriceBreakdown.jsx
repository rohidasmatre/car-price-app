import cityTax from "../../data/cityTax";

export default function PriceBreakdown({ car, city }) {
  const tax = cityTax[city];
  const ex = Number(car.exShowroomPrice);

  const rto = Math.round((ex * tax.rto) / 100);
  const insurance = Math.round((ex * tax.insurance) / 100);
  const onRoad = ex + rto + insurance + 6000;

  return (
    <div className="bg-slate-800 p-6 rounded">
      <h3 className="text-xl font-semibold mb-4">On-Road Price</h3>

      <div className="space-y-2">
        <Row label="Ex-Showroom" value={ex} />
        <Row label="RTO" value={rto} />
        <Row label="Insurance" value={insurance} />
        <Row label="Registration" value={6000} />
        <hr className="border-slate-600" />
        <Row label="Total On-Road" value={onRoad} bold />
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-lg" : ""}`}>
      <span>{label}</span>
      <span>₹{value.toLocaleString()}</span>
    </div>
  );
}
