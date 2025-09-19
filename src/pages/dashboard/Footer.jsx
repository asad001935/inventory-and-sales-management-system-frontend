import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold">MyCompany</h2>
          <p className="mt-4 text-gray-200 leading-relaxed">
            A modern inventory & order management system. 
            Streamline suppliers, products, and orders — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-yellow-300 transition">Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/faq" className="hover:text-yellow-300 transition">FAQ</Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-yellow-300 transition">Help Center</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-yellow-300 transition">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <p className="text-gray-200">📍 Lahore, Pakistan</p>
          <p className="text-gray-200">📧 support@mycompany.com</p>
          <p className="text-gray-200">📞 +92 300 1234567</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-yellow-300 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-400 mt-10 pt-6 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
