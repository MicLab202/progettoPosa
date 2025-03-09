// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Stato per simulare se l'utente è loggato
  const [user, setUser] = useState(false);

  const handleLogin = () => {
    // Logica di login (per esempio, aggiorna lo stato)
    setUser(true);
  };

  const handleLogout = () => {
    // Logica di logout (per esempio, aggiorna lo stato)
    setUser(false);
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
            <Link to="/login" className='navbar-link' style={styles.link}>Accedi</Link>
            <Link to="/register" className="navbar-link" style={styles.link}>Registrati</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
  },
  button: {
    color: 'white',
    backgroundColor: '#444',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    marginLeft: '10px',
  }
};

export default Navbar;
