import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname || '/friends' }} replace />;
  }

  return children;
};

export default ProtectedRoute;
