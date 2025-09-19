import React, { useEffect, useState } from "react";
import { editProduct } from "../../api/productApi";
import { getAllSuppliers } from "../../api/supplierApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    supplierId: "",
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        supplierId: product.supplierId?.name || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchedSuppliers = async () => {
      const response = await getAllSuppliers();
      setSuppliers(response.suppliers || []);
    };
    fetchedSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await editProduct(id, formData);
    if (data && data.success !== false) {
      toast.success("Product updated successfully!");
      navigate("/all-products");
    } else {
      toast.error(data.error || "Failed to update product.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Edit Product
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <select
          name="supplierId"
          value={formData.supplierId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} - {s.companyName}
            </option>
          ))}
        </select>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-lg font-semibold"
          >
            Update Supplier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
