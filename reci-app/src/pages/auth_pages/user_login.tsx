import { useState } from "react";
import AuthForm from "../../components/authForm";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const UserLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("https://list-la.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid login credentials");

      const data = await res.json();
      localStorage.setItem("token", data.access_token);

      window.location.href = "/user-home";
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <HashLoader color="#16A34A" size={80} />
        </div>
      )}

      <AuthForm
        title="Welcome Back"
        subtitle="Sign in to your Recipick account"
        fields={[
          { label: "Email", type: "email", id: "email", name: "email" },
          { label: "Password", type: "password", id: "password", name: "password" },
        ]}
        buttonText={loading ? "Logging in..." : "Login"}
        onSubmit={handleLogin}
        redirectText="Don't have an account?"
        redirectHref="/register"
        redirectBtnText="Register Here"
        disabled={loading}
      />
    </>
  );
};

export default UserLogin;
