
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nexora</h3>
            <p className="text-sm text-gray-300">Your one-stop shop for everything modern and cool. Discover the future of online shopping.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Shop</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nexora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
