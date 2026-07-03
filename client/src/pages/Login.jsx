import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      console.log("Sending Login Data:", formData);

      const res = await login(formData);

      console.log("Login Response:", res.data);

      toast.success("Login Successful 🎉");

      const role = res.data.user.role;

      console.log("Logged In Role:", role);

      if (role === "owner") {
        console.log("Redirecting to Owner Dashboard...");
        navigate("/owner");
      } else if (role === "tenant") {
        console.log("Redirecting to Tenant Dashboard...");
        navigate("/tenant");
      } else if (role === "admin") {
        console.log("Redirecting to Admin Dashboard...");
        navigate("/admin");
      } else {
        console.log("Unknown Role:", role);
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        toast.error(error.response.data.message || "Login Failed");
      } else {
        toast.error("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;