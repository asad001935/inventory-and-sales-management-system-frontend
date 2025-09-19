import React, { useState } from "react";
import { postSupplier } from "../../api/supplierApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SupplierForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    contact: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postSupplier(formData);

      if (result && result.success === false) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      console.log(" Supplier created:", result);
      toast.success("Supplier created successfully!");
      setFormData({
        name: "",
        companyName: "",
        contact: "",
        email: "",
        address: "",
      });
      navigate("/all-suppliers");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unexpected error occurred"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Add New Supplier
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
}

export default SupplierForm;
