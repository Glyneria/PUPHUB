// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProtectedRoute({ children, role }) {
  const session = useSession();
  const userRole = session?.user?.user_metadata?.role;

  if (!session) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to={`/${userRole}/dashboard`} />;

  return children;
}
