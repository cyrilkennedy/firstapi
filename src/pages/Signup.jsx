import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return false;
    }

    // Basic email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address!");
      return false;
    }

    // Basic phone format check (digits only, adjust to your backend rules)
    const phoneRegex = /^[\d+]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password
      };

      const response = await axios.post(
        "https://task-79s6.onrender.com/api/register",
        signupData
      );

      const result = response.data;

      if (result?.status || result?.success) {
        toast.success(result?.message || "Registration successful!");
        navigate("/login"); // go to login after signup
      } else {
        toast.error(result?.message || "Registration failed.");
      }

    } catch (error) {
      console.error(error);
      let message = "An error occurred during registration.";
      if (error.response?.data?.message) {
        // if backend sends array of errors
        message = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(". ")
          : error.response.data.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          // placeholder="+2348012345678"
        />

        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="toggle-password-btn"
        >
          {showPassword ? "Hide" : "Show"}
        </button>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
