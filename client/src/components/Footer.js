import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm text-slate-400">
        
        <div>
          <h3 className="text-white font-semibold mb-2">AutoPrice Pro</h3>
          <p>
            Smart car price, EMI & comparison platform for Indian buyers.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Tools</h3>
          <ul className="space-y-2">
            <li>Car Price Calculator</li>
            <li>EMI Calculator</li>
            <li>Car Comparison</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
        © {new Date().getFullYear()} AutoPrice Pro. All rights reserved.
      </div>
    </footer>
  );
}
