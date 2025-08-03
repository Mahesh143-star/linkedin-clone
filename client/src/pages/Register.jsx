import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // shared CSS for Login & Register

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
          <textarea
            className="textarea"
            placeholder="Bio (optional)"
            rows={3}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
