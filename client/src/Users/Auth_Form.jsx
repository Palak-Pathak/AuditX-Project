import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before new request
    const endpoint = isSignup ? "/api/users/signup" : "/api/users/login";

    try {
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        form,
        { withCredentials: true }
      );
      
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userEmail", form.email);
      
      navigate("/dashboard");
    } 
     catch (err) {
      console.error("Auth error full:", err);
      if (err.response) {
        setError(err.response.data.error || JSON.stringify(err.response.data) || "Server error");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <section className="relative z-10 w-full min-h-screen py-28 px-6 bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-pink-500 opacity-20 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[200px] rounded-full animate-pulse delay-300" />
      </div>

      <div className="max-w-md mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 rounded bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 py-2 rounded font-semibold text-white hover:brightness-110 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/70">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-pink-400 hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </section>
  );
};

export default AuthForm;
