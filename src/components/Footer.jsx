import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
  FaShoppingCart,
} from "react-icons/fa"; // Import icons
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-orange-600 py-10">
      <div className="container mx-auto px-4">
        {/* Logo and Address Section */}
        <div className="flex flex-wrap justify-between items-center space-y-8 lg:space-y-0">
          <div className="w-full lg:w-1/3">
            <div className="flex items-center">
              {/* Shop Art Icon */}
              <FaShoppingCart className="text-orange-600 text-4xl mr-3" />
              <div className="text-3xl font-bold">Aneja Mall</div>
            </div>
            <p className="mt-4">
              Address: Gwalior,bada, Aneja Mall
            </p>
            <p className="mt-1">Email: Anejasarees@gmail.com</p>
            <p className="mt-1">Phone: +91 9111123331</p>
          </div>

          {/* Payment Icons Section */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="space-x-6 flex items-center text-3xl">
              <FaCcVisa className="text-orange-600 hover:text-orange-800 transition duration-300" />
              <FaCcMastercard className="text-orange-600 hover:text-orange-800 transition duration-300" />
              <FaPaypal className="text-orange-600 hover:text-orange-800 transition duration-300" />
              <FaGooglePay className="text-orange-600 hover:text-orange-800 transition duration-300" />
            </div>
          </div>

          {/* Free Shipping Tag */}
          <div className="w-full lg:w-1/3 flex justify-end">
            <div className="text-lg bg-orange-600 text-white px-4 py-2 rounded-full font-semibold">
              Free Shipping Across India
            </div>
          </div>
        </div>

        <hr className="my-8 border-orange-200" />

        {/* Footer Links and Copyright */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            © {new Date().getFullYear()} Aneja Mall. All rights reserved.
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end space-x-4">
            <ul className="list-disc list-inside">
              <li>
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-orange-600 transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-orange-600 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="text-blue-600 hover:text-orange-600 transition duration-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
