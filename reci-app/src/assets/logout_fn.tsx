import axios from "axios";

export const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        "https://list-la.onrender.com/logout",
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
    localStorage.removeItem("Username");
    window.location.href = "/login";
    localStorage.removeItem("User");
  }
};
