import React from 'react'; // Import React
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Define the props type
interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
