import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminProtectedRoute;