import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

type UserRole = 'ADMIN' | 'FUNCIONARIO' | 'MANUTENCAO';

interface User {
  id: string;
  nome: string;
  email: string;
  papel: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  isMaintenance: () => boolean;
  userType: string | null;
  getHomePage: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await authService.login(email, password);
      const user: User = {
        id: response.user.id,
        nome: response.user.name,
        email: response.user.email,
        papel: response.user.role
      };
      setUser(user);
      return user;
    } catch (error: any) {
      console.error('Erro no login:', error);
      // Captura a mensagem de erro do backend se disponível
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error ||
                         error.message ||
                         'Falha na autenticação';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = () => user?.papel === 'ADMIN';
  const isEmployee = () => user?.papel === 'FUNCIONARIO';
  const isMaintenance = () => user?.papel === 'MANUTENCAO';

  const getHomePage = () => {
    if (!user) return '/login';
    
    switch (user.papel) {
      case 'ADMIN':
        return '/admin-home';
      case 'MANUTENCAO':
        return '/maintenance-home';
      case 'FUNCIONARIO':
        return '/employee-home';
      default:
        return '/login';
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        logout,
        isAdmin,
        isEmployee,
        isMaintenance,
        userType: user?.papel || null,
        getHomePage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 