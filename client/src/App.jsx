import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from './api/axiosInstance';
import LoadingSpinner from './components/Loading';
import Navbar from './components/Navbar';
import { useUser } from './context/UserContextApi';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoutes';

const UserList = lazy(() => import('./pages/UserList'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const { setLoggedInUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await axiosInstance.get('/auto-login');
        if (res.status === 200) {
          setLoggedInUser(res.data.data);
          navigate(location.pathname + location.search, { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }

    autoLogin();
  }, []);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
