import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) navigate('/profile');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Email and Password are required');
      return;
    }

    setIsLoading(true);
    try {
      const signinData = { identifier: formData.email, password: formData.password };
      const response = await axios.post('https://task-79s6.onrender.com/api/login', signinData);
      const result = response.data;

      if (result?.status === true || result?.success) {
        const user = result.data.user;
        const accessToken = result.data.accessToken;

        if (user && accessToken) {
          // Save user and token in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);

          // Dispatch event to notify Navbar to refresh
          window.dispatchEvent(new Event('userLoggedIn'));

          toast.success(result.message || 'Login successful!');
          navigate('/profile');
        } else {
          toast.error('Login failed. Check credentials.');
        }
      } else {
        toast.error('Login failed. Check credentials.');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
