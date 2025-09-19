const API = import.meta.env.VITE_API_URL;
import axios from "axios";
const token = localStorage.getItem("token");


const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    (typeof error.response?.data === "string" ? error.response.data : null) ||
    error.message ||
    "Unexpected error occurred! Try again later."
  );
};


export const postSupplier = async ({
  name,
  companyName,
  contact,
  email,
  address,
}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API}/api/suppliers/createSupplier`,
      {
        name,
        companyName,
        contact,
        email,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting supplier:", error);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const getAllSuppliers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/api/suppliers/all-suppliers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all suppliers:", error);
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${API}/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
  }
};

export const editSupplier = async (
  id,
  { name, companyName, contact, email, address }
) => {
  try {
    const response = await axios.put(
      `${API}/api/suppliers/${id}`,
      {
        name,
        companyName,
        contact,
        email,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing supplier:", error);
  }
};

export const getAllSuppliersByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${API}/api/suppliers/supplierByUserId/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers by user ID:", error);
  }
};
