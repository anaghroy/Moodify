import { useEffect } from "react";
import { Navigate } from "react-router";
import useAuthStoreLogin from "../../auth/state/auth.storelogin";

const ProtectedRoute = ({ children }) => {
  const { user, checkAuth, checkingAuth } = useAuthStoreLogin();

  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
