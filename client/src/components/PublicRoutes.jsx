import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContextApi';

const PublicOnlyRoute = ({ children }) => {
  const { loggedInUser } = useUser();
  return !loggedInUser ? children : <Navigate to="/" replace />;
};

export default PublicOnlyRoute;
