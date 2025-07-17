
import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <div className="text-3xl font-bold font-nunito">
                <span className="text-orange-500">Me</span>
                <span className="text-blue-500">Mo</span>
              </div>
            </div>
            <p className="text-gray-300 font-poppins leading-relaxed mb-6 max-w-md">
              Creating magical personalized stories that make every child the hero of their own adventure. 
              Building memories, one story at a time.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-nunito">Quick Links</h3>
            <ul className="space-y-2 font-poppins">
              <li><a href="#books" className="text-gray-300 hover:text-white transition-colors duration-200">Browse Books</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">How It Works</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Gift Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-nunito">Get in Touch</h3>
            <ul className="space-y-3 font-poppins">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">hello@memo-books.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">1-800-MEMO-123</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-gray-300">
                  123 Story Lane<br />
                  Imagination City, IC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 font-poppins text-sm mb-4 md:mb-0">
              © {currentYear} MeMo Books. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm font-poppins">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping Info</a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm font-poppins">
              Made with <Heart className="w-4 h-4 text-red-500 inline mx-1" /> for families who love stories
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
