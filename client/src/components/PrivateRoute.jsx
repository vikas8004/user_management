import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContextApi';

const PrivateRoute = ({ children }) => {
  const { loggedInUser } = useUser();
  return loggedInUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
