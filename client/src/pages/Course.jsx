import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://learnxbackend.onrender.com/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
<div id="courses" className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-green-100 via-blue-100 to-white min-h-screen">
  <h1 className="text-4xl font-extrabold mb-10 text-center text-gradient bg-clip-text text-transparent bg-blue-600">
    Courses
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {courses.map((course, index) => (
      <div
        key={course._id}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        style={{ animationDelay: `${index * 150}ms` }}
        id="animate-fadeInUp"
      >
        <img
          src={`https://learnxbackend.onrender.com${course.imageUrl}`}
          alt={course.title}
          className="h-48 object-cover w-full"
        />
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-semibold text-blue-700">{course.title}</h2>
          <p className="text-gray-700 mt-3 flex-grow">{course.description}</p>
          <button
            onClick={() => navigate(`/course/${course._id}`)}
            className="mt-6 bg-gradient-to-r from-green-400 via-blue-500 to-blue-700 text-white font-semibold rounded-lg py-3 hover:from-blue-700 hover:via-green-500 hover:to-green-700 transition-colors duration-300 shadow-md"
          >
            Learn Now
          </button>
        </div>
      </div>
    ))}
  </div>

  <style>
    {`
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      #animate-fadeInUp {
        animation-name: fadeInUp;
        animation-fill-mode: both;
        animation-duration: 600ms;
        animation-timing-function: ease-out;
      }
    `}
  </style>
</div>




  );
};

export default Course;
