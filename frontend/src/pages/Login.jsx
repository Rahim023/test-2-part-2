import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      // optional: store user
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/discussion');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={onSubmit}>
        <h2>Login</h2>
        {err && <div className="error">{err}</div>}
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} required />
        <label>Password</label>
        <input name="password" value={form.password} onChange={onChange} type="password" required />
        <button className="btn" type="submit">Login</button>
        <div className="small-links">
          <Link to="/forgot">Forgot password?</Link>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
}
