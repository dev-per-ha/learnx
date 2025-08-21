import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Course from './Course.jsx';
import Footer from '../components/Footer.jsx';
import Discriptions from '../components/Discriptions.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import About from '../components/About.jsx';
import { FaGraduationCap } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const benefits = [
    "Different video lessons with expert instructors",
    "Downloadable PDFs for each module",
    "Hands-on real-world projects",
    "Quizzes to test your understanding",
    "Certificate of completion",
  ];

  const [error, setError] = useState(null);


  return (
    <div className="font-sans">

      {/* Hero Section */}
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 text-white px-4 text-center font-[Poppins]">
      
      {/* Icon */}
      <FaGraduationCap 
        className="text-white text-6xl mb-4 opacity-0 animate-[fadeIn_1s_ease-in-out_0.2s_forwards]" 
      />

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide opacity-0 animate-[fadeIn_1s_ease-in-out_0.6s_forwards]">
        Welcome to <span className="text-green-200 font-[Playfair_Display]">Learn</span><span className="text-blue-200 font-[Playfair_Display]">X</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-2xl max-w-2xl leading-relaxed mb-6 opacity-0 animate-[fadeIn_1s_ease-in-out_1s_forwards] text-white/90 font-light">
        <span className="text-green-100">A modern learning platform</span> for students and teachers — 
        <span className="text-blue-100"> empowering education</span> anywhere, anytime.
      </p>

      {/* Start Learning */}
      <p className="text-xl font-semibold opacity-0 animate-[fadeIn_1s_ease-in-out_1.4s_forwards] animate-pulse text-green-100 drop-shadow-lg">
        🚀 <span className="text-white">Start</span> <span className="text-blue-100">Learning</span> Today
      </p>

      {/* Custom Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Playfair+Display:wght@700&display=swap');
        `}
      </style>
    </div>

      {/* About Section */}
      <About/>
      {/* Benefits Section */}
      <section className="py-20 bg-blue-50 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-10 drop-shadow-md transition duration-700 ease-in-out transform hover:scale-105">
            What You Will Get from Joining Us
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 text-left">
            {benefits.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-800 bg-white shadow-lg rounded-xl px-5 py-4 hover:scale-[1.02] hover:shadow-xl transition">
                <CheckCircle2 className="text-green-500 mt-1 w-6 h-6 flex-shrink-0" />
                <span className="text-base md:text-lg font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Courses Section */}
         <Course/>
      {/* Discriptions Section */}
         <Discriptions/>
       {/* How it Works */}
         <HowItWorks/>
      {/* Testimonials */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">What Our Learners Say</h2>
          <p className="text-gray-700 text-lg">Join thousands of happy learners building their future with us.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah M.",
              feedback: "This platform transformed my career. I landed a remote frontend developer job after completing the web dev course!",
              image: "https://randomuser.me/api/portraits/women/79.jpg"
            },
            {
              name: "Daniel K.",
              feedback: "Clear explanations, real projects, and quizzes made learning fun and effective. Highly recommend!",
              image: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              name: "Amina H.",
              feedback: "The UI/UX course was amazing! I now design apps that people love. The instructors are top-notch.",
              image: "https://randomuser.me/api/portraits/women/68.jpg"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-blue-500" />
              <h4 className="text-blue-700 font-semibold text-lg">{testimonial.name}</h4>
              <p className="text-gray-600 mt-3 text-sm">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="bg-blue-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I enroll in a course?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Simply click the "Start Learning" button on the course card. You’ll be prompted to create a free account if you don’t have one.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is everything really free?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Yes! Our mission is to provide 100% free education. No hidden costs, no credit card required.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do I get a certificate?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Currently, there is no certificate of completion available, but we are preparing this feature for the future.              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
