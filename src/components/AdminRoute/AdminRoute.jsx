import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
