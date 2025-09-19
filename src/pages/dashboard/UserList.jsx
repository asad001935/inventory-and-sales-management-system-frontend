import React, { useEffect, useState } from "react";
import { allUsersApi, updateStatusAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { UserRoundSearch, X } from "lucide-react";
import Loader from "./Loader";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      // isLoading(true);
      const data = await allUsersApi();
      const usersArray = Array.isArray(data) ? data : data.users;
      setUsers(usersArray || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const data = await updateStatusAPI(userId, newRole);
      toast.success(data.message);

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Failed to update role");
    }
  };

  if (isLoading) return <Loader/>

  const handleSearch = () => {
    if (searchedName.trim() === "") {
      setFilteredUsers([]);
      return;
    }
    const result = users.filter(
      (d) =>
        d.username.toLowerCase().includes(searchedName.toLowerCase()) ||
        d.email.toLowerCase().includes(searchedName.toLowerCase()) ||
        d.role.toLowerCase().includes(searchedName.toLowerCase())
    );
    setFilteredUsers(result);
  };

  const handleClearSearch = () => {
    setFilteredUsers([]);
    setSearchedName("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Users & Roles
        </h2>

        <div className="relative flex w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, email, role, or address..."
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <UserRoundSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <X
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
            onClick={handleClearSearch}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 ms-4 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
            <tr
              key={user._id}
              className="text-sm text-gray-800 hover:bg-gray-50"
            >
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border font-medium">{user.role}</td>
              <td className="px-4 py-2 border">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="User">User</option>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
