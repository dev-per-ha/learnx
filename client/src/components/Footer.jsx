import React from 'react'
import { FaTelegramPlane, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
     <footer className="bg-gradient-to-br from-green-600 via-blue-600 to-green-700 text-white pt-16 pb-10 px-6 shadow-inner relative z-10">
  <div className="max-w-7xl mx-auto">
    {/* Title */}
    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-wide drop-shadow-md">
      Join Our Community
    </h2>

    {/* Footer Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      
      {/* About */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-green-100">OnlineLearn</h4>
        <p className="text-sm text-blue-100 leading-relaxed">
          Empowering learners worldwide through{" "}
          <span className="font-medium text-white">free, accessible</span>, and
          high-quality education. Learn anywhere, anytime.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-green-100">Quick Links</h4>
        <ul className="space-y-2 text-sm text-blue-100">
          <li>
            <a
              href="#courses"
              className="hover:text-white hover:pl-1 transition-all duration-300"
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-white hover:pl-1 transition-all duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="hover:text-white hover:pl-1 transition-all duration-300"
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-green-100">Join Now</h4>
        <div className="flex space-x-5 text-2xl">
          <a
            href="https://t.me/Devper17"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://linkedin.com/in/dev-per-185342372"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://facebook.com/deva.afewerk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Line */}
    <div className="border-t border-green-400 mt-10 pt-6 text-center">
      <p className="text-sm text-blue-100 tracking-wide">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-medium text-white">OnlineLearn</span>. All rights reserved.
      </p>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer
