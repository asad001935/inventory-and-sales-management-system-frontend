import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart2,
  LogOut,
  Menu,
  X,
  Inbox,
} from "lucide-react";
import { toast } from "react-toastify";
import { unreadApi } from "../../api/contactApi";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [unReadCount, setUnReadCount] = useState(0);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const fetchedUnread = async () => {
      const res = await unreadApi();
      if (res) {
        setUnReadCount(res);
      }
    };
    fetchedUnread();
  });

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-yellow-400" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/all-users"
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              <Users size={18} /> Users
            </Link>
            <Link
              to="/all-suppliers"
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              <Truck size={18} /> Suppliers
            </Link>
            <Link
              to="/all-products"
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              <Package size={18} /> Products
            </Link>
            <Link
              to="/all-orders"
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              <ShoppingCart size={18} /> Orders
            </Link>
            <Link
              to="/contact-forms"
              className="flex items-center gap-1 hover:text-yellow-400 transition cursor-pointer relative"
            >
              <Inbox size={20} />
              <span>Mails</span>
              {unReadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                  {unReadCount}
                </span>
              )}
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
        <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/all-users"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/all-suppliers"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Suppliers
          </Link>
          <Link
            to="/all-products"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/all-orders"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/contact-forms"
            className="block py-2 border-b border-gray-600 hover:text-yellow-400 relative"
            onClick={() => setIsOpen(false)}
          >
            Mails
            {unReadCount > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {unReadCount}
              </span>
            )}
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

export default AdminNavbar;
