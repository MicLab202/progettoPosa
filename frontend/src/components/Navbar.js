import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div className="navbar-links" style={styles.linkContainer}>
        <Link to="/" className="navbar-link" style={styles.link}>Home</Link>
        {user ? (
          <>
            <Link to="/posts/new" className="navbar-link" style={styles.link}>Crea Post</Link>
            <button onClick={handleLogout} className="navbar-button" style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link" style={styles.link}>Accedi</Link>
            <Link to="/register" className="navbar-link" style={styles.link}>Registrati</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#8B0000', // Rosso scuro
    padding: '12px 24px',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: '500',
    fontSize: '1.1rem',
    transition: 'color 0.3s',
  },
  button: {
    color: '#fff',
    backgroundColor: '#A52A2A', // Rosso ancora più scuro
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  }
};

export default Navbar;
