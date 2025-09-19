const API = import.meta.env.VITE_API_URL;
import axios from "axios";


const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    (typeof error.response?.data === "string" ? error.response.data : null) ||
    error.message ||
    "Unexpected error occurred! Try again later."
  );
};


export const getStaffOnly = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API}/api/users/allStaff`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    const users = response.data.users || response.data;

    const staffUsers = users.filter(
      user => user.role?.toLowerCase() === "staff" 
    );
    return staffUsers;
  } catch (error) {
    console.error("Error fetching all Staff users:", error);
    return [];
  }
};

