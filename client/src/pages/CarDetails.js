import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const calculatePrice = async () => {
    if (!selectedCity) return;

    setCalculating(true);
    try {
      const response = await api.get(`/cars/${id}/${selectedCity}`);
      setFinalPrice(response.data);
    } catch (error) {
      console.error('Error calculating price:', error);
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading car details...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Car not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{car.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Car Specifications</h2>
            <div className="space-y-2">
              <p><strong>Brand:</strong> {car.brand}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Fuel Type:</strong> {car.fuelType}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Ex-Showroom Price:</strong> ₹{car.exShowroomPrice?.toLocaleString()}</p>
              <p><strong>Insurance:</strong> ₹{car.insurance?.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Price Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Choose a city</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="pune">Pune</option>
                </select>
              </div>

              <button
                onClick={calculatePrice}
                disabled={!selectedCity || calculating}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {calculating ? 'Calculating...' : 'Calculate Price'}
              </button>

              {finalPrice && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <h3 className="font-semibold text-green-800">Final Price Breakdown</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Ex-Showroom: ₹{finalPrice.exShowroomPrice?.toLocaleString()}</p>
                    <p>Tax ({finalPrice.tax}%): ₹{finalPrice.taxAmount?.toLocaleString()}</p>
                    <p>Insurance: ₹{finalPrice.insurance?.toLocaleString()}</p>
                    <p className="font-bold text-lg">Total: ₹{finalPrice.totalPrice?.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;