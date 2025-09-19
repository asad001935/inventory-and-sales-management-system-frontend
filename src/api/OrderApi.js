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

export const createOrder = async (cartItems) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API}/api/orders/create`,
      {
        products: cartItems.map((item) => ({
          productId: item.product._id,
          price: item.product.price, // ✅ include price
          quantity: item.quantity,
        })),
        status: "pending",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error placing order:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/api/orders/allOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const UpdateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API}/api/orders/update/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const deleteOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const assignOrderToStaff = async (orderId, assignedStaffId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API}/api/orders/${orderId}/assign`,
      { assignedStaffId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning order:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getMyOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/api/orders/myOrders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    console.error(
      "Error fetching my orders:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getOrderForStaff = async (req, res) => {
  try {
    const response = await axios.get(`${API}/api/orders/staff-orders`);
    return response.data.orders;
  } catch (error) {
    console.log(`Error in get orders for staff API ${error.message}`);
  }
};

export const requestOrderUpdate = async (orderId, request) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${API}/api/orders/${orderId}/staff-request`,
    { request },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
