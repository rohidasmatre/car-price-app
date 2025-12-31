import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarDetails from "./components/car/CarDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmiCalculator from "./components/EmiCalculator";
import OnRoadCalculator from "./components/OnRoadCalculator";
import CompareCars from "./components/CompareCars";

/* Pages (temporary placeholders) */

export default function App() {
  return (
  
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">AutoPrice Pro</h1>
          <nav className="space-x-6 text-slate-300">
            <a href="#compare" className="hover:text-white">Compare</a>
            <a href="#emi" className="hover:text-white">EMI</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Smart Car Pricing & EMI Tools
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Compare on-road prices, calculate EMI, and make confident car-buying
            decisions in India.
          </p>

          <div className="flex justify-center gap-6">
            <button className="px-8 py-4 rounded-xl bg-brand text-black font-semibold hover:scale-105 transition">
              Get Started
            </button>
            <button className="px-8 py-4 rounded-xl border border-slate-500 text-white hover:bg-slate-800 transition">
              Compare Cars
            </button>
          </div>

          <Routes>
            <Route path="/car/:id" element={<CarDetails />} />
          </Routes>
        
      
        <section id="emi" className="py-24">
         <EmiCalculator />
        </section>
        <section id="onroad" className="py-24">
         <OnRoadCalculator />
        </section>
        <section id="compare" className="py-24">
         <CompareCars />
        </section>
      
      </main>
      
    </div>
   
  );
}

