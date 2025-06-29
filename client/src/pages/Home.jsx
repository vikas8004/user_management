// src/pages/Home.jsx
import { useUser } from '../context/UserContextApi';
import { Link } from 'react-router-dom';
import { UserPlus, Users, LogIn } from 'lucide-react';

const Home = () => {
  const { loggedInUser } = useUser();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Welcome to UserManager</h1>
        <p className="text-base-content mb-6 text-lg">
          A simple yet powerful User management system built with React, Node.js, and MongoDB.
        </p>

        {loggedInUser ? (
          <>
            <p className="text-md font-semibold mb-6">
              Hello, <span className="text-primary">{loggedInUser.name || loggedInUser.email}</span>{' '}
              👋
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/user-list" className="btn btn-outline btn-primary">
                <Users size={18} className="mr-2" />
                View Users
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              Please login to manage Users or register to get started.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login" className="btn btn-primary">
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
