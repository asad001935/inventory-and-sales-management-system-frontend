import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { getUserByIdAPI } from "../../api/auth";

const API = import.meta.env.VITE_API_URL;

const StaffProfile = () => {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=128"
  );

  useEffect(() => {
    const savedAvatar = localStorage.getItem("staffAvatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser?.id || parsedUser?._id;
        if (!userId) return;

        const data = await getUserByIdAPI(userId);

        if (data?.user) {
          setUser(data.user);

          if (data.user.avatar) {
            const fullPath = data.user.avatar.startsWith("http")
              ? data.user.avatar
              : `${API}${data.user.avatar}`;

            setAvatar(fullPath);
            localStorage.setItem("staffAvatar", fullPath);
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);

      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/images/upload-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (res.data?.filePath) {
        const uploadedUrl = res.data.filePath.startsWith("http")
          ? res.data.filePath
          : `${API}${res.data.filePath}`;

        setAvatar(uploadedUrl);
        localStorage.setItem("staffAvatar", uploadedUrl);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex justify-center mb-6">
        <img
          src={avatar}
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-md border-4 border-blue-200 cursor-pointer hover:opacity-80"
          onClick={handleImageClick}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.username || "N/A"}
        </h2>
        <p className="text-gray-600">{user?.email || "No Email"}</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            user?.role?.toLowerCase() === "admin"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {user?.role || "User"}
        </span>
      </div>

      <div className="mt-6 border-t pt-4 text-gray-700">
        <p>
          <span className="font-semibold">User ID:</span> {user?._id || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default StaffProfile;
