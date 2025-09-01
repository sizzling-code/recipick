import AuthForm from "../../components/authForm";


const Register = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void>=> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm_password") as string;

    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Registration failed:", errorData);
        alert("Registration failed. Check console for details.");
        return;
      }

      const data = await res.json();
      console.log("Registration successful:", data);

      window.location.href = "/user-home";
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Try again later.");
    }
  };

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
    />
  );
};

export default Register;
