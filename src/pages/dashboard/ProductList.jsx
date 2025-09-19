import React, { useState, useEffect } from "react";
import { Pencil, ShoppingCart, Trash2, Plus, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../api/productApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { addToCartApi } from "../../api/cartApi";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchedName, setSearchedName] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || []);
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchedProducts();
  }, []);

  const handleDelete = async (id) => {
    const productName =
      products.find((s) => s._id === id)?.name || "this product";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${productName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await deleteProduct(id);

      if (data && data.success !== false) {
        setProducts((prev) => prev.filter((s) => s._id !== id));
        toast.success("Product deleted successfully!");
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Unexpected error occurred while deleting product");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedOut(true);
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser?.role === "Admin") setIsAdmin(true);
      if (parsedUser?.role === "Manager" )
        setIsManager(true);
      if (parsedUser?.role.toLowerCase() === "staff") setIsStaff(true);
      if (parsedUser?.role.toLowerCase() === "manager") setIsManager(true);
      if (parsedUser?.role.toLowerCase() === "user") setUser(true);
    }
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to log in to add products to your cart.",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    try {
      const res = await addToCartApi(product._id, 1);

      if (res.success) {
        toast.success(`Product added to cart: ${product.name}`);
        setCart(res.cart.items);
        localStorage.setItem("cart", JSON.stringify(res.cart.items)); 
      } else {
        toast.error(res.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong while adding to cart");
    }
  };

  const handleSearch = () => {
    if (searchedName.trim === "") {
      setFilteredItem([]);
    }
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(searchedName.toLowerCase())
    );
    setFilteredItem(result);
  };
  const handleClearSearch = () => {
    setSearchedName("");
    setFilteredItem("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center mt-10 w-full md:w-1/2 relative">
          <input
            type="text"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
            placeholder="Search products..."
            className="peer w-full px-5 py-3 pl-12 pr-24 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 shadow-sm transition"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          {searchedName && (
            <X
              className="absolute right-25 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-red-500 transition"
              onClick={handleClearSearch}
            />
          )}

          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-5 bg-indigo-600 text-white font-semibold rounded-r-2xl hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        {isManager || isAdmin && (
          <button
            onClick={() => navigate("/add-product")}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Add Product
          </button>
        )}
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Products</h1>

      <div>
        {(filteredItem.length > 0 ? filteredItem : products).length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            No products available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(filteredItem.length > 0 ? filteredItem : products).map(
              (product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:scale-[1.02] transition transform duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold">Price:</span> $
                      {product.price}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {product.quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Supplier:</span>{" "}
                      {product.supplierId?.name || "N/A"}
                    </p>
                  </div>

                  {isAdmin && (
                    <div className="mt-4 flex justify-between items-center gap-2">
                      <Link
                        to={`/edit-product/${product._id}`}
                        state={{ product }}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
                      >
                        <Pencil size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}

                  {(user || isLoggedOut) && (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center w-full gap-2 mt-4 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-full shadow-md hover:from-indigo-500 hover:to-indigo-700 transition"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
