import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Compare = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarSelect = (index, carId) => {
    const newSelected = [...selectedCars];
    newSelected[index] = cars.find(car => car._id === carId) || null;
    setSelectedCars(newSelected);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cars...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Compare Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Select Car {index + 1}</h2>
            <select
              value={selectedCars[index]?._id || ''}
              onChange={(e) => handleCarSelect(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose a car</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.name} - ₹{car.exShowroomPrice?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {selectedCars[0] && selectedCars[1] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-center">{selectedCars[0].name}</th>
                  <th className="border border-gray-300 p-3 text-center">{selectedCars[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Brand</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[0].brand}</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[1].brand}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">Model</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[0].model}</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[1].model}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Year</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[0].year}</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[1].year}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">Fuel Type</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[0].fuelType}</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[1].fuelType}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Transmission</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[0].transmission}</td>
                  <td className="border border-gray-300 p-3 text-center">{selectedCars[1].transmission}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">Ex-Showroom Price</td>
                  <td className="border border-gray-300 p-3 text-center font-bold text-blue-600">
                    ₹{selectedCars[0].exShowroomPrice?.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-3 text-center font-bold text-blue-600">
                    ₹{selectedCars[1].exShowroomPrice?.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">Insurance</td>
                  <td className="border border-gray-300 p-3 text-center">
                    ₹{selectedCars[0].insurance?.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    ₹{selectedCars[1].insurance?.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;