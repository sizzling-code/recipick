import AuthForm from "../../components/authForm";

const Register = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <AuthForm
      title="Join Recipick"
      subtitle="Create your account to start cooking"
      fields={[
        { label: "Username", type: "text", id: "username", name: "username" },
        { label: "Email", type: "email", id: "email", name: "email" },
        { label: "Password", type: "password", id: "password", name: "password" },
        { label: "Confirm Password", type: "password", id: "confirm_password", name: "confirm_password" },
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
