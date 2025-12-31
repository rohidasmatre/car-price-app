import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          AutoPrice Pro
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link className="hover:text-indigo-400 transition" to="/compare">Compare</Link>
          <Link className="hover:text-indigo-400 transition" to="/emi">EMI</Link>
          <Link className="hover:text-indigo-400 transition" to="/pricing">Pricing</Link>
          <Link className="hover:text-indigo-400 transition" to="/about">About</Link>
        </div>

        {/* CTA */}
        <Link
          to="/compare"
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm font-semibold"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}

