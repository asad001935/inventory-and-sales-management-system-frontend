import React, { useEffect, useState } from "react";
import { getMyOrders, requestOrderUpdate } from "../../api/OrderApi";
import { toast } from "react-toastify";
import Loader from "./Loader";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleRequest = async (orderId, request) => {
    try {
      await requestOrderUpdate(orderId, request);
      toast.success("Request sent to admin successfully.");
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, staffRequest: request } : o
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request ");
    }
  };

  if (loading) return <Loader/>

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">No orders assigned to you yet.</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Products</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Staff Request</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border hover:bg-gray-50 transition"
              >
                <td className="p-3 border font-mono">{order._id}</td>
                <td className="p-3 border">
                  <span className="font-semibold">
                    {order.userId?.username}
                  </span>
                  <br />
                  <span className="text-gray-500 text-sm">
                    {order.userId?.email}
                  </span>
                </td>
                <td className="p-3 border">
                  {order.products.map((p, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-2 rounded mb-1 text-sm"
                    >
                      {p.productId?.name} - ${p.productId?.price} × {p.quantity}
                    </div>
                  ))}
                </td>
                <td
                  className={`p-3 border font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status || "Pending"}
                </td>
                <td className="p-3 border">
                  {order.staffRequest ? (
                    <span className="text-blue-600 font-medium">
                      {order.staffRequest}
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRequest(order._id, "Mark as Done")}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Mark as Done
                      </button>
                      <button
                        onClick={() => handleRequest(order._id, "Delivered")}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Delivered
                      </button>
                      <button
                        onClick={() => handleRequest(order._id, "Shipped")}
                        className="px-3 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600"
                      >
                        Shipped
                      </button>
                      <button
                        onClick={() => handleRequest(order._id, "Cancelled")}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
