import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AddCourse from "./pages/AddCourse";
import AddCourseModules from "./pages/AddCourseModules";

// Protect private routes by checking token
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route sends user to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected admin pages */}
        <Route
          path="/admin/addcourse"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/coursemodules/:courseId"
          element={
            <ProtectedRoute>
              <AddCourseModules />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login or admin addcourse depending on auth */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/admin/addcourse" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
