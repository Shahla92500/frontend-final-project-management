import { useContext, type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


export default function RequireAuth({ children }: { children: JSX.Element }) {

  const auth = useContext(AuthContext);
  //new:
  const location = useLocation();
  if (!auth) return null;
  console.log("Auth: ", auth);
  

  // no token → send to /auth
  if (!auth.token) return <Navigate to="/auth" replace />;

   if (!auth?.user) {
    //  Redirect to /auth instead of showing the form on /projects
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}