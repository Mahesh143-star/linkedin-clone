import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Auth.css'; // shared CSS for auth pages

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
