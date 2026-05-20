import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  const role = user?.user?.role;

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
