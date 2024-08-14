import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-orange-500 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-white text-xl font-bold">
          DSG Intro
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <a href="/login" className="text-white hover:text-gray-300">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-white hover:text-gray-300">
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
