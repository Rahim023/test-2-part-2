import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await API.post('/auth/forgot-password', { email });
      setMsg(res.data.message || 'If that email exists, a reset link was sent.');
    } catch (error) {
      setMsg('Request failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={onSubmit}>
        <h2>Forgot Password</h2>
        {msg && <div className="info">{msg}</div>}
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
        <button className="btn" type="submit">Send Reset Link</button>
        <div className="small-links">
          <Link to="/">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
