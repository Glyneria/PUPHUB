import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, role: requiredRole }) {
  const { user, session, role: userRole } = useAuth();

  if (session === undefined) return <div>Loading session...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
