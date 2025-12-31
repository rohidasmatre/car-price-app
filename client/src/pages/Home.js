import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Hero from '../components/Hero';

const Home = () => {
  const [cars, setCars] = useState([]);
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

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Cars Section */}
      <section id="cars" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold title-gradient mb-4">Featured Cars</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore our extensive collection of cars with transparent pricing and detailed specifications.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
              <p className="mt-4 text-slate-400">Loading cars...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car._id} className="glass p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:title-gradient transition-all">
                      {car.name}
                    </h3>
                    <p className="text-slate-400">{car.brand}</p>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl font-bold title-gradient mb-1">
                      ₹{car.exShowroomPrice?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm text-slate-400">Ex-Showroom Price</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 text-xs">
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded">
                      {car.fuelType}
                    </span>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">
                      {car.transmission}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                      {car.year}
                    </span>
                  </div>

                  <Link
                    to={`/car/${car._id}`}
                    className="btn-primary w-full text-center block group-hover:bg-indigo-500 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

          {cars.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold text-slate-300 mb-2">No Cars Available</h3>
              <p className="text-slate-400">Check back later for new car listings.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;