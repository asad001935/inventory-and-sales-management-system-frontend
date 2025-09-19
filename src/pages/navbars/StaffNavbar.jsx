import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

const StaffNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-yellow-300" />
            <span className="font-bold text-lg">Staff Panel</span>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/my-orders"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <ShoppingCart size={18} /> Orders
            </Link>
            <Link
              to="/all-products"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <Package size={18} /> Products
            </Link>
            <Link
              to="cart"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <Package size={18} /> Cart
            </Link>
            <Link
              to="staff-profile"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <User size={18} /> Profile
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-600 px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block py-2 border-b border-green-500 hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/my-orders"
            className="block py-2 border-b border-green-500 hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/all-products"
            className="block py-2 border-b border-green-500 hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="cart"
            className="flex items-center gap-1 hover:text-yellow-300 transition"
          >
            <Package size={18} /> Cart
          </Link>
          <Link
            to="staff-profile"
            className="block py-2 border-b border-green-500 hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default StaffNavbar;
