import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/apiClient';
import { ROLES } from '../lib/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      if (useMock) {
        // Mock login
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: credentials.email,
          role: ROLES.ADMIN,
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { user: mockUser, token: mockToken };
      }

      const response = await api.auth.login(credentials);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      if (useMock) {
        // Mock registration
        const mockUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: ROLES.CUSTOMER,
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { user: mockUser, token: mockToken };
      }

      const response = await api.auth.register(userData);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
