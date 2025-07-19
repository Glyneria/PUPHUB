import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ isAuthenticated, userRole, onLogout }) {
  // Fallback display if role is missing or invalid
  const safeRole = ['user', 'org'].includes(userRole) ? userRole : null;

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>

      {isAuthenticated && safeRole === 'user' && (
        <Link to="/dashboard" style={styles.link}>User Dashboard</Link>
      )}

      {isAuthenticated && safeRole === 'org' && (
        <Link to="/org" style={styles.link}>Org Dashboard</Link>
      )}

      {!isAuthenticated && (
        <Link to="/login" style={styles.link}>Login</Link>
      )}

      {isAuthenticated && (
        <button onClick={onLogout} style={styles.button}>Logout</button>
      )}
    </nav>
  );
}

// Optional: prop type validation
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string, // 'user', 'org', or null
  onLogout: PropTypes.func.isRequired,
};

// Optional: default styles
const styles = {
  nav: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
  },
  link: {
    textDecoration: 'none',
    color: '#0077cc',
  },
  button: {
    backgroundColor: 'transparent',
    border: '1px solid #0077cc',
    color: '#0077cc',
    cursor: 'pointer',
  },
};
