import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function DiscussionBoard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        // not authorized
        navigate('/');
      }
    }
    load();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="page">
      <div className="topbar">
        <div>Discussion Board</div>
        <div>
          {user && <span>Welcome, {user.name || user.email}</span>}
          <button className="btn small" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="content">
        <p>This is your Discussion Board page. You will implement discussion features here later.</p>
      </div>
    </div>
  );
}
