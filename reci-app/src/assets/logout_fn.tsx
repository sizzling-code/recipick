import axios from "axios";

export const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};
