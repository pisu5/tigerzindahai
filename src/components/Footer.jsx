import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/anejamalllogo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      {" "}
      {/* Adjusted padding for footer height */}
      <div className="container mx-auto px-4">
        {/* Top Section: Logo, Payment, Free Shipping, and Shop Address */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Address */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Aneja Mall Logo"
                className="mr-2 w-16 h-auto lg:w-24" // Adjusted logo size for responsiveness
              />
              <div className="text-3xl font-bold text-gray-900">Aneja Mall</div>
            </div>
            <p>Address: Gwalior, Bada, Aneja Mall</p>
            <p>Email: Anejasarees@gmail.com</p>
            <p>Phone: +91 9111123331</p>
          </div>

          {/* Payment Methods */}
          <div className="flex justify-center lg:justify-start items-center">
            <div className="space-x-4 flex items-center text-3xl">
              <FaCcVisa className="text-blue-500 hover:text-blue-600 transition duration-300" />
              <FaCcMastercard className="text-red-500 hover:text-red-600 transition duration-300" />
              <FaPaypal className="text-blue-700 hover:text-blue-800 transition duration-300" />
              <FaGooglePay className="text-green-500 hover:text-green-600 transition duration-300" />
            </div>
          </div>

        {/* Free Shipping Tag */}
<div className="flex justify-center lg:justify-start">
  <button 
    className="bg-orange-500 text-white px-5 py-3 lg:px-4 lg:py-1 rounded-md shadow-md transition duration-300 transform hover:bg-orange-600 hover:shadow-lg hover:scale-105 text-sm lg:text-base"
  >
    Free Shipping Across India
  </button>
</div>



          {/* Shop Address */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Visit Our Shop
            </h3>
            <p>Bada Market, Gwalior</p>
            <p>Mon-Sat: 10am - 8pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <hr className="border-gray-300 mb-8" />

        {/* Middle Section: Newsletter Signup and Social Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Updated Newsletter Signup */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Get updates about our latest offers and discounts directly to your
              inbox.
            </p>
            <form className="flex justify-center lg:justify-start items-center">
              <input
                type="email"
                className="w-full lg:w-2/3 p-3 rounded-l-full bg-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-orange-600 transition duration-300 placeholder-gray-500"
                placeholder="Enter your email"
              />
              <button className="bg-gradient-to-r from-orange-400 to-orange-500 p-3 rounded-r-full text-white font-semibold hover:from-orange-500 hover:to-orange-600 transition duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-end space-x-6 text-2xl">
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-800 transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <hr className="border-gray-300 mb-8" />

        {/* Bottom Section: Useful Links and Copyright */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          {/* Useful Links */}
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row justify-center lg:justify-start space-x-0 sm:space-x-6 space-y-2 sm:space-y-0 mb-4 lg:mb-0">
            <Link
              to="/about"
              className="hover:text-orange-600 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="hover:text-orange-600 transition duration-300"
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-600 transition duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/terms"
              className="hover:text-orange-600 transition duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="hover:text-orange-600 transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/refund"
              className="hover:text-orange-600 transition duration-300"
            >
              Refund Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="w-full lg:w-1/3 text-center lg:text-right">
            © {new Date().getFullYear()} Aneja Mall. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
