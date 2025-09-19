import React, { useEffect, useState } from "react";
import { postProduct } from "../../api/productApi";
import { getAllSuppliers } from "../../api/supplierApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    supplierId: "",
  });
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

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
    try {
      const result = await postProduct(formData);

      if (result && result.success === false) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error || "Something went wrong",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Product created successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        supplierId: "",
      });

      navigate("/all-products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unexpected error",
        text:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unexpected error occurred",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Add New Product
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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Add product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
