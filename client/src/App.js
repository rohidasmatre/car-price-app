import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [interest, setInterest] = useState(9);
  const [years, setYears] = useState(5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
axios.get("http://localhost:5000/api/cars")


      .then(res => setCars(res.data));
  }, []);

  const calculateEMI = (price) => {
    const P = price;
    const R = interest / 12 / 100;
    const N = years * 12;

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    setEmi(Math.round(emiValue));
  };

  const selectCar = (car) => {
    setSelectedCar(car);
    calculateEMI(car.exShowroomPrice);
  };

  useEffect(() => {
    if (selectedCar) {
      calculateEMI(selectedCar.exShowroomPrice);
    }
  }, [,interest, years]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Phase 13 – EMI Calculator</h1>

      <h3>Select Car</h3>
      <select onChange={e => selectCar(cars.find(c => c._id === e.target.value))}>
        <option value="">Select</option>
        {cars.map(car => (
          <option key={car._id} value={car._id}>
            {car.brand} {car.model}
          </option>
        ))}
      </select>

      {selectedCar && (
        <>
          <hr />
          <h3>{selectedCar.brand} {selectedCar.model}</h3>
          <p>Ex-Showroom Price: ₹{selectedCar.exShowroomPrice}</p>

          <label>Interest Rate: {interest}%</label><br />
          <input
            type="range"
            min="6"
            max="15"
            value={interest}
            onChange={e => setInterest(e.target.value)}
          />

          <br /><br />

          <label>Loan Tenure: {years} years</label><br />
          <input
            type="range"
            min="1"
            max="7"
            value={years}
            onChange={e => setYears(e.target.value)}
          />

          <hr />
          <h2>Monthly EMI: ₹{emi}</h2>
        </>
      )}
    </div>
  );
}

export default App;
