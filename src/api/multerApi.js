const API = import.meta.env.VITE_API_URL;
import axios from "axios";

const formData = new FormData();
formData.append("avatar", file);

await axios.post(`${API}/api/images/upload-profile`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
