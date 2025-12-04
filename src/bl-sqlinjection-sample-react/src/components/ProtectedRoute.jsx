
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated }= useAuth();

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;