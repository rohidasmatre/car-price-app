let selectedCar = "";

fetch("/api/cars")
  .then(res => res.json())
  .then(cars => {
    const select = document.getElementById("car");
    cars.forEach(car => {
      const opt = document.createElement("option");
      opt.value = car._id;
      opt.text = `${car.brand} ${car.model}`;
      select.appendChild(opt);
    });
    selectedCar = select.value;
    select.onchange = e => selectedCar = e.target.value;
  });

function getPrice() {
  const city = document.getElementById("city").value;
  fetch(`/api/cars/${selectedCar}/${city}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerHTML = `
        <h3>On Road Price: ₹${data.onRoadPrice}</h3>
        <p>Road Tax: ₹${data.roadTax}</p>
        <p>Insurance: ₹${data.car.insurance}</p>
      `;
    });
}

function getEMI() {
  const rate = document.getElementById("rate").value;
  const years = document.getElementById("years").value;
  const price = document.querySelector("h3")
    ?.innerText.replace(/\D/g, "");

  fetch(`/api/cars/emi/${price}/${rate}/${years}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("emi").innerText =
        "Monthly EMI: ₹" + data.emi;
    });
}
