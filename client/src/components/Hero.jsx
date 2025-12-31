import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          India’s Smartest <br />
          <span className="title-gradient">Car Price & EMI Platform</span>
        </h1>

        <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
          Compare car prices, calculate EMI, check on-road cost,
          and get the best car deals — all in one premium platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="btn-primary">
            Calculate EMI
          </button>
          <button className="btn-outline">
            Compare Cars
          </button>
        </div>
      </div>
    </section>
    
  );
}
