import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: UserData;
  login: (data: UserData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<UserData | null>('user', null);

  const navigate = useNavigate();

  const login = async (data: UserData) => {
    setUser(data);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
