import AuthForm from "../../components/authForm";

const UserLogin = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/user-home";
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
