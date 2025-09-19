const API = import.meta.env.VITE_API_URL;
import axios from "axios";

export const createContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `${API}/api/contact/createForm`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error posting contact:", error);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const fetchAllContacts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/api/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const readApi = async (id) => {
  try {
    const response = await axios.put(`${API}/api/contact/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const unreadApi = async () => {
  try {
    const response = await axios.get(`${API}/api/contact/unread-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};
