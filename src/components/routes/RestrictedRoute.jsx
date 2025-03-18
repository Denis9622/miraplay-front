import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

const RestrictedRoute = ({ component, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return !isAuthenticated ? component : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;
