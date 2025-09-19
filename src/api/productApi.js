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

export const postProduct = async ({
  name,
  description,
  price,
  quantity,
  supplierId,
}) => {
  try {
    const response = await axios.post(
      `${API}/api/products`,
      {
        name,
        description,
        price,
        quantity,
        supplierId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting product:", error);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};

export const editProduct = async (
  id,
  { name, description, price, quantity }
) => {
  try {
    const response = await axios.put(
      `${API}/api/products/${id}`,
      {
        name,
        description,
        price,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
      status: error.response?.status || 500,
    };
  }
};
