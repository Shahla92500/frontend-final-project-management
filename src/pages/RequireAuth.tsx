import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  // no token → send to /auth
  if (!auth.token) return <Navigate to="/auth" replace />;

  return children;
}