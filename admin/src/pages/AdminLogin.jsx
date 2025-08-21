import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin/addcourse'; // Redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 animate-fadeInUp">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          Admin Login
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
            placeholder="Admin Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-indigo-500 focus:border-indigo-600 transition"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-indigo-500 focus:border-indigo-600 transition"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-bold py-3 rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-900 transition duration-300"
          >
            Log In
          </button>
        </form>
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

export default AdminLogin;
