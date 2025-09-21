import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user): null;
    if (parsedUser?.role === "User" || parsedUser?.role === "user") {
      setIsUser(true);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          MyCompany
        </Link>

        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            to="/all-products"
            className="text-gray-700 hover:text-indigo-600"
          >
            Products
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact
          </Link>
          {isUser && (
            <Link
              to="/cart"
              className="flex text-gray-700 hover:text-indigo-600"
            >
              <ShoppingCart size={18} /> Cart
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl shadow-md hover:opacity-90 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center text-white gap-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col space-y-4 px-6 py-6">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/all-products" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl shadow-md hover:opacity-90 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
