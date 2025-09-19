import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getCartApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error("Get Cart API Error:", err.message);
    return { success: false, error: err.message };
  }
};

export const addToCartApi = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${API}/api/cart/add`,
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (err) {
    console.error("Add to Cart API Error:", err.message);
    return { success: false, error: err.message };
  }
};

export const removeFromCartApi = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/api/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Remove Cart API Error:", err.message);
    return { success: false, error: err.message };
  }
};

