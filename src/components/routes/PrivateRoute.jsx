import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
