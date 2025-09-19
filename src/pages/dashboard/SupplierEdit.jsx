import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { editSupplier } from "../../api/supplierApi";
import { toast } from "react-toastify";

function SupplierEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const supplier = location.state?.supplier;

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    contact: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        companyName: supplier.companyName || "",
        contact: supplier.contact || "",
        email: supplier.email || "",
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await editSupplier(id, formData);
    if (data && data.success !== false) {
      toast.success("Supplier updated successfully!");
      navigate("/all-suppliers");
    } else {
      toast.error(data.error || "Failed to update supplier");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
        Edit Supplier
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

export default SupplierEdit;
