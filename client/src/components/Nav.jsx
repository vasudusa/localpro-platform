import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>{' '}
      {user ? (
        <>
          | <Link to="/dashboard">Dashboard</Link> | <Link to="/offerings">Offerings</Link> | <Link to="/book">Book</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>| <Link to="/login">Login</Link></>
      )}
    </nav>
  );
}