import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/discussion');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        {err && <div className="error">{err}</div>}
        <label>Name (optional)</label>
        <input name="name" value={form.name} onChange={onChange} />
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} required />
        <label>Password</label>
        <input name="password" value={form.password} onChange={onChange} type="password" required />
        <button className="btn" type="submit">Create Account</button>
        <div className="small-links">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
