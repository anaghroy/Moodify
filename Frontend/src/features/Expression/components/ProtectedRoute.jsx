import { Navigate } from "react-router";
import useAuthStoreLogin from "../../auth/state/auth.storelogin";


const ProtectedRoute = ({ children }) => {
  const { user, checkingAuth } = useAuthStoreLogin();

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
