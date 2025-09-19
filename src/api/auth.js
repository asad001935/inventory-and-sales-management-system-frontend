import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    (typeof error.response?.data === "string" ? error.response.data : null) ||
    error.message ||
    "Unexpected error occurred! Try again later."
  );
};

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const msg = getErrorMessage(error);
    toast.error(msg);
    console.error("Login API error:", error.response?.data || msg);
    throw error;
  }
};

export const RegisterAPI = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API}/api/auth/register`, {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    const msg = getErrorMessage(error);
    toast.error(msg);
    console.error("Register API error:", error.response?.data || msg);
    throw error;
  }
};

export const updateStatusAPI = async (id, role) => {
  try {
    const response = await axios.put(`${API}/api/users/${id}/role`, { role });
    return response.data;
  } catch (error) {
    const msg = getErrorMessage(error);
    toast.error(msg);
    console.error("Update status API error:", error.response?.data || msg);
    throw error;
  }
};

export const allUsersApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/api/users/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const msg = getErrorMessage(error);
    toast.error(msg);
    console.error("Fetch users API error:", error.response?.data || msg);
    throw error;
  }
};

export const getUserByIdAPI = async (userId) => {
  try {
    const response = await axios.get(`${API}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    const msg = getErrorMessage(error);
    toast.error(msg);
    console.error("Get user by ID API error:", error.response?.data || msg);
    throw error;
  }
};
