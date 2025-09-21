import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import SupplierForm from "./pages/dashboard/SupplierForm";
import SupplierList from "./pages/dashboard/SupplierList";
import SupplierEdit from "./pages/dashboard/SupplierEdit";
import ProductForm from "./pages/dashboard/ProductForm";
import ProductList from "./pages/dashboard/ProductList";
import ProductEdit from "./pages/dashboard/ProductEdit";
import CartPage from "./pages/dashboard/CartPage";
import OrderList from "./pages/dashboard/OrderList";
import AdminNavbar from "./pages/navbars/AdminNavbar";
import ManagerNavbar from "./pages/navbars/ManagerNavbar";
import StaffNavbar from "./pages/navbars/StaffNavbar";
import HomeDashboard from "./pages/dashboard/HomeDashboard";
import About from "./pages/dashboard/About";
import MyOrders from "./pages/dashboard/MyOrders";
import UserList from "./pages/dashboard/UserList";
import StaffProfile from "./pages/dashboard/StaffProfile";
import Navbar from "./pages/navbars/Navbar";
import Footer from "./pages/dashboard/Footer";
import ContactForm from "./pages/dashboard/ContactForm";
import ContactList from "./pages/dashboard/contactList";
import Loader from "./pages/dashboard/Loader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        return parsedUser?.role || null;
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
    return null;
  });

  useEffect(() => {
    // Catch synchronous errors
    window.onerror = function (message, source, lineno, colno, error) {
      console.error("Global Error Caught:", {
        message,
        source,
        lineno,
        colno,
        error,
      });
      alert("A runtime error occurred. Check console for details.");
    };

    // Catch async errors (like in promises)
    window.onunhandledrejection = function (event) {
      console.error("Unhandled Promise Rejection:", event.reason);
      alert("A promise error occurred. Check console for details.");
    };
  }, []);

  useEffect(() => {
    console.log("🟢 Current role:", role);
    console.log("🟢 Current user:", user);
  }, [role, user]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("🔎 Stored user raw:", storedUser);

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        console.log("✅ Parsed user:", parsed);
        setUser(parsed); // now works ✅
      } else {
        console.log("❌ No user found in localStorage");
        setUser(null);
      }
    } catch (err) {
      console.error("🔥 Error parsing user from localStorage:", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role) {
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role) {
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error("Error parsing user after login:", error);
      }
    }
  };

  const renderNavbar = () => {
    if (!isLoggedIn) return <Navbar />;
    if (role === "Admin") return <AdminNavbar />;
    if (role === "Manager") return <ManagerNavbar />;
    if (role === "Staff") return <StaffNavbar />;
    if (role?.toLowerCase() === "user") return <Navbar />;
    return <Navbar />;
  };

  return (
    <BrowserRouter>
      {renderNavbar()}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-supplier" element={<SupplierForm />} />
        <Route path="/all-suppliers" element={<SupplierList />} />
        <Route path="/edit-supplier/:id" element={<SupplierEdit />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/all-products" element={<ProductList />} />
        <Route path="/edit-product/:id" element={<ProductEdit />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-orders" element={<OrderList />} />
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/all-users" element={<UserList />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/contact-forms" element={<ContactList />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
