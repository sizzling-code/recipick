import AuthForm from "../../components/authForm";

const UserLogin = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
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
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your Recipick account"
      fields={[
        { label: "Email", type: "email", id: "email", name: "email" },
        { label: "Password", type: "password", id: "password", name: "password" },
      ]}
      buttonText="Login"
      onSubmit={handleLogin}
      redirectText="Don't have an account?"
      redirectHref="/register"
      redirectBtnText="Register Here"
    />
  );
};

export default UserLogin;
