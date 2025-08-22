import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/home'; // Redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('https://learnxbackend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.message || 'Login failed' });
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);

    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 animate-fadeInUp">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
          Welcome Back
        </h2>

        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded text-center text-sm font-semibold transition-colors duration-500 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-500 transition"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-500 transition"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 font-medium">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:text-green-700 underline transition"
          >
            Register here
          </Link>
        </p>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
