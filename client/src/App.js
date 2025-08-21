import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import Home from './pages/Home.jsx';
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

// Protect private routes by checking token
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Default route sends user to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Protected Home page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Course pages */}
        <Route path="/course" element={<Course />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />

        {/* Catch all - redirect to home or login depending on auth */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
