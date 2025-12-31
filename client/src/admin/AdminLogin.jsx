import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await axios.post("/api/admin/login", { email, password });
    localStorage.setItem("adminToken", res.data.token);
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-800 p-8 rounded w-96">
        <h2 className="text-2xl text-white mb-6">Admin Login</h2>

        <input
          className="w-full mb-3 p-3 rounded bg-slate-700 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-6 p-3 rounded bg-slate-700 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-brand py-3 rounded font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
