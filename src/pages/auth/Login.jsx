import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import axios from "axios";
import { loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(email, password);
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
      console.log(`Logged in successfully as: ${response.user.username}`);
      toast.success(`Logged in successfully as: ${response.user.username}`);
      if (onLogin) {
        onLogin();
      }
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to login. Try again.";
      console.error("Error in login:", message);
      toast.alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center justify-center">
            <LogIn className="mr-2" /> Login
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
              <Lock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
              <button
                type="button"
                name="password"
                required
                className="ml-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
          >
            <LogIn className="mr-2" /> Login
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
