import { useState } from "react";
import AuthForm from "../../components/authForm";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm_password") as string;

    if (password !== confirm_password) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://list-la.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirm_password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Registration failed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Registration successful:", data);
      toast.success("Registration successful! 🎉 Redirecting...");
      window.location.href = "/user-home";
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <HashLoader color="#16A34A" size={80} />
      </div>
    );
  }

  return (
    <AuthForm
      title="Join Recipick"
      subtitle="Create your account to start cooking"
      fields={[
        { label: "Username", type: "text", id: "username", name: "username" },
        { label: "Email", type: "email", id: "email", name: "email" },
        { label: "Password", type: "password", id: "password", name: "password" },
        {
          label: "Confirm Password",
          type: "password",
          id: "confirm_password",
          name: "confirm_password",
        },
      ]}
      buttonText="Register"
      onSubmit={handleRegister}
      redirectText="Already have an account?"
      redirectHref="/login"
      redirectBtnText="Login Here"
      disabled={loading} 
    />
  );
};

export default Register;
