import { useEffect, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { createOrder } from "../../api/OrderApi";
import { getCartApi, removeFromCartApi } from "../../api/cartApi";
import Swal from "sweetalert2";
import Loader from "./Loader";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const res = await getCartApi();
      console.log("Fetched data is: ", res);
      if (res.success) {
        console.log("Cart received:", res.cart);
        setCart(res.cart.items || []);
      } else {
        Swal.fire("Error", res.error || "Failed to fetch cart", "error");
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  const removeItem = async (id) => {
    const res = await removeFromCartApi(id);
    if (res.success) {
      console.log("Cart received:", res.cart);
      setCart(res.cart.items);
    } else {
      Swal.fire("Error", res.error || "Failed to remove item", "error");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      Swal.fire("Your cart is empty!", "", "info");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Confirm Your Order",
      html: `
      <p>Your total is <b>$${total}</b></p>
      <p>Payment Method: <b>Pay after delivery (Cash in Hand)</b></p>
      <p>Do you want to place this order?</p>
    `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
      cancelButtonText: "Cancel",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await createOrder(cart);

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Order placed successfully!",
          text: "Please pay by hand after delivery.",
          showConfirmButton: true,
        });

        setCart([]);
        localStorage.removeItem("cart");
      } else {
        Swal.fire("Error", res?.error || "Failed to place order", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <ShoppingCart className="text-blue-700" /> Shopping Cart
      </h2>

      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">
                  Price:{" "}
                  <span className="font-medium">${item.product.price}</span>
                </p>
                <p className="text-gray-600">
                  Subtotal:{" "}
                  <span className="font-medium">
                    ${item.product.price * item.quantity}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-9 flex items-center justify-center text-center bg-gray-100 border rounded-lg font-medium">
                  {item.quantity}
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-3 p-2 cursor-pointer text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Total: <span className="text-blue-700">${total}</span>
            </h3>
            <button
              onClick={placeOrder}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
