import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/home" className="text-2xl font-bold text-green-600">
            Learn<span className="text-indigo-600">X</span>
          </Link>

          <div className="flex space-x-6 items-center">
            <Link
              to="/home"
              className="text-green-600 font-medium hover:text-green-800 transition"
            >
              Home
            </Link>
            <HashLink
              smooth
              to="/home#how-to-learn"
              className="text-green-600 font-medium hover:text-green-800 transition"
            >
              How to Learn
            </HashLink>
            <HashLink
              smooth
              to="/home#courses"
              className="bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Courses
            </HashLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
