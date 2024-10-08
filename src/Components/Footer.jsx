import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">GiyanUdaye</h2>
          <p className="text-sm">Illuminating minds with Islamic knowledge</p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: gganudhay@gmail.com</p>
          <p className="text-sm">Phone: +880 1876697546</p>
        </div>
        <div className="w-full md:w-1/3 text-center md:text-right">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="mailto:gganudhay@gmail.com"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
        <p className="text-sm">&copy; 2024 GiyanUdaye. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
