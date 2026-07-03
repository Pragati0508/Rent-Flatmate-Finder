import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {

  const { user, loading } = useAuth();

  console.log("ProtectedRoute User:", user);
  console.log("ProtectedRoute Loading:", loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    console.log("No User Found");

    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length &&
    !allowedRoles.includes(user.role)
  ) {
    console.log("Role Not Allowed");

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;