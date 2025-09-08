import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  college: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, isAdmin: boolean = false): Promise<boolean> => {
    // Admin credentials
    if (isAdmin && email === 'mmkds' && password === 'mruu') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@vastraveda.com',
        mobile: '',
        address: '',
        college: '',
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }

    // Regular user login (mock implementation)
    if (!isAdmin && email && password) {
      const mockUser: User = {
        id: 'user-1',
        name: 'Demo User',
        email,
        mobile: '9876543210',
        address: 'Sample Address',
        college: 'R C Patel (Engineering)'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }

    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...userData
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};