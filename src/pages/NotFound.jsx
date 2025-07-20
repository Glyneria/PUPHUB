import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

/**
 * Protects routes from unauthorized access.
 * Optionally restricts access by role (e.g., 'user', 'org').
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return <Outlet />;
}
