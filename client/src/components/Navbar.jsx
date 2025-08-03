import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">MiniLinkedIn</Link>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {!user ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Feed</Link>
            <Link to={`/profile/${user.id}`} onClick={() => setMenuOpen(false)}>Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
