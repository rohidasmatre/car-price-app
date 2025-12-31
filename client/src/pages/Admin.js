import React, { useState } from 'react';
import api from '../services/api';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    transmission: '',
    exShowroomPrice: '',
    insurance: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'exShowroomPrice' || name === 'insurance' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await api.post('/cars/add', formData);
      setMessage('Car added successfully!');
      setFormData({
        name: '',
        brand: '',
        model: '',
        year: '',
        fuelType: '',
        transmission: '',
        exShowroomPrice: '',
        insurance: ''
      });
    } catch (error) {
      console.error('Error adding car:', error);
      setMessage('Error adding car. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel - Add New Car</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., Toyota Camry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., Camry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ex-Showroom Price (₹)</label>
              <input
                type="number"
                name="exShowroomPrice"
                value={formData.exShowroomPrice}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 2500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Insurance (₹)</label>
              <input
                type="number"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 50000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 font-medium"
          >
            {submitting ? 'Adding Car...' : 'Add Car'}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;