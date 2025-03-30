import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

const RestrictedRoute = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
