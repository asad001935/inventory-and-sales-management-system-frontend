import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, LogIn } from "lucide-react";
import axios from "axios";
import { RegisterAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.alert("Passwords do not match!");
    }
    try {
      const response = await RegisterAPI(username, email, password, role);
      console.log("Backend full response ->", response);
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to register. Try again.";
      console.error("Error in registration:", message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 flex items-center justify-center">
          <User className="mr-2" /> Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                minLength={6}
                className="w-full focus:outline-none"
              />
              <button
                type="button"
                className="ml-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full focus:outline-none"
              />
              <button
                type="button"
                className="ml-2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Register As
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="User">👤 User</option>
                <option value="Admin">🛡️ Admin</option>
                <option value="Manager">👨‍💼 Manager</option>
                <option value="Staff">👨‍🔧 Staff</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 011.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center">
            <LogIn className="mr-2" /> Register
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            By registering, you agree to our{" "}
            <a className="underline text-blue-600" href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className="underline text-blue-600" href="#">
              Privacy Policy
            </a>
          </p>
        </form>

        <div className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
