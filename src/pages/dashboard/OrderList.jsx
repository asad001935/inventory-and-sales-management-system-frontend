import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  assignOrderToStaff,
  deleteOrder,
  getAllOrders,
  UpdateStatus,
} from "../../api/OrderApi";
import { getStaffOnly } from "../../api/StaffApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "./Loader";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [staffOnly, setStaffOnly] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      if (parsedUser?.role === "Manager" || parsedUser?.role === "Admin") {
        setIsManager(true);
      }
      if (parsedUser?.role === "Admin") {
        setIsAdmin(true);
      }
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getAllOrders();
        console.log("Fetched orders are: ", data);
        setOrders(data.orders || []);
      } catch (err) {
        toast.error("Error fetching orders!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchedStaff = async () => {
      try {
        setIsLoading(true);
        const staff = await getStaffOnly();
        setStaffOnly(staff?.users || staff || []);
      } catch (err) {
        toast.error("Error fetching staff!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchedStaff();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const data = await deleteOrder(id);
          if (data && data.success !== false) {
            setOrders((prev) => prev.filter((order) => order._id !== id));
            toast.success("Order deleted successfully!");
          } else {
            toast.error(data.error || "Failed to delete order");
          }
        } catch (error) {
          toast.error("Something went wrong!");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleSetStatus = async (id, currentStatus) => {
    if (currentStatus === "delivered") {
      toast.info("This order has already been delivered.");
      return;
    }

    let nextStatus = "pending";
    if (currentStatus === "pending") nextStatus = "shipped";
    else if (currentStatus === "shipped") nextStatus = "delivered";

    try {
      setIsLoading(true);
      const updated = await UpdateStatus(id, nextStatus);

      if (updated && updated.success !== false) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: nextStatus } : o))
        );
        toast.success(`Order status updated to ${nextStatus}`);
      } else {
        toast.error(updated.error || "Failed to update status");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Order ID: <span className="text-indigo-600">{order._id}</span>
              </h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {order.userId?.username || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Total Amount:</span>{" "}
                  <span className="text-green-600 font-medium">
                    ${order.totalAmount}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-1">Products:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  {order.products?.map((p, idx) => (
                    <li key={idx}>
                      {p.productId?.name || p.productId || "Unknown"} (x
                      {p.quantity}) - ${p.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Staff:
                </label>

                {order.assignedStaffId ? (
                  <p className="text-green-600 font-semibold">
                    {order.assignedStaffId.username} (already assigned)
                  </p>
                ) : (
                  <select
                    onChange={async (e) => {
                      const staffId = e.target.value;
                      if (!staffId) return;
                      try {
                        setIsLoading(true);
                        await assignOrderToStaff(order._id, staffId);
                        toast.success("Staff assigned successfully!");
                        setOrders((prev) =>
                          prev.map((o) =>
                            o._id === order._id
                              ? {
                                  ...o,
                                  assignedStaffId: staffOnly.find(
                                    (s) => s._id === staffId
                                  ),
                                }
                              : o
                          )
                        );
                      } catch (err) {
                        toast.error("Error assigning staff: " + err.message);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select staff...</option>
                    {staffOnly.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.username}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center gap-3">
                {isManager && (
                  <button
                    onClick={() => handleSetStatus(order._id, order.status)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Change Status
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
