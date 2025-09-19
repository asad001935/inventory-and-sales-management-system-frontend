import React from "react";
import { Pencil, Plus, Trash2, UserRoundSearch, X } from "lucide-react";
import { useState, useEffect } from "react";
import { deleteSupplier, getAllSuppliers } from "../../api/supplierApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "./Loader";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role === "Manager" || parsedUser.role === "Admin") {
        setIsManager(true);
      }
      if (parsedUser.role === "Admin") {
        setIsAdmin(true);
      }
    }
    const fetchedSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data.suppliers || []);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchedSuppliers();
  }, []);

  const handleDelete = async (id) => {
    const supplierName =
      suppliers.find((s) => s._id === id)?.name || "this supplier";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete supplier: ${supplierName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const data = await deleteSupplier(id);

      if (data && data.success !== false) {
        setSuppliers((prev) => prev.filter((s) => s._id !== id));
        toast.success("Supplier deleted successfully!");
      } else {
        toast.error(data.error || "Failed to delete supplier");
      }
    } catch (error) {
      toast.error("Unexpected error occurred while deleting supplier");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-supplier/${id}`);
  };

  const handleSearch = () => {
    if (searchedName.trim() === "") {
      setFilteredUser([]);
      return;
    }
    const result = suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(searchedName.toLowerCase()) ||
        s.companyName.toLowerCase().includes(searchedName.toLowerCase()) ||
        s.email.toLowerCase().includes(searchedName.toLowerCase()) ||
        s.address.toLowerCase().includes(searchedName.toLowerCase())
    );
    setFilteredUser(result);
  };

  const handleClearSearch = () => {
    setSearchedName("");
    setFilteredUser([]);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Suppliers</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, company, email, or address..."
              value={searchedName}
              onChange={(e) => setSearchedName(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <UserRoundSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchedName && (
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                onClick={handleClearSearch}
              />
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition shadow-md"
          >
            Search
          </button>
          {isManager && (
            <button
              onClick={() => navigate("/add-supplier")}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow hover:opacity-90 transition"
            >
              <Plus size={18} /> Add Supplier
            </button>
          )}
        </div>
      </div>

      {suppliers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-10">
          No suppliers yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200 bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Address
                </th>
                {isAdmin && (
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {(filteredUser.length > 0 ? filteredUser : suppliers).map(
                (supplier) => (
                  <tr
                    key={supplier._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{supplier.name}</td>
                    <td className="px-4 py-3">{supplier.companyName}</td>
                    <td className="px-4 py-3">{supplier.contact}</td>
                    <td className="px-4 py-3">{supplier.email}</td>
                    <td className="px-4 py-3">{supplier.address}</td>
                    {isAdmin && (
                      <td className="px-4 py-3 flex justify-center gap-3">
                        <Link
                          to={`/edit-supplier/${supplier._id}`}
                          state={{ supplier }}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
                        >
                          <Pencil size={16} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(supplier._id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupplierList;
