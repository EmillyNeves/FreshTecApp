import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@shared/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  loginAsGuest: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('freshtec_user');
    const savedGuest = localStorage.getItem('freshtec_guest');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsGuest(savedGuest === 'true');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Criar usuário simulado baseado no role
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: getNameByRole(role),
        email,
        role,
        company: role !== 'consumer' ? getCompanyByRole(role) : undefined,
        createdAt: new Date(),
      };

      setUser(mockUser);
      setIsGuest(false);
      localStorage.setItem('freshtec_user', JSON.stringify(mockUser));
      localStorage.setItem('freshtec_guest', 'false');
    } catch (error) {
      throw new Error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = (role: UserRole) => {
    const guestUser: User = {
      id: 'guest',
      name: `${getNameByRole(role)} (Convidado)`,
      email: 'convidado@freshtec.com',
      role,
      company: role !== 'consumer' ? getCompanyByRole(role) : undefined,
      createdAt: new Date(),
    };

    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem('freshtec_user', JSON.stringify(guestUser));
    localStorage.setItem('freshtec_guest', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('freshtec_user');
    localStorage.removeItem('freshtec_guest');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout, isLoading, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

function getNameByRole(role: UserRole): string {
  switch (role) {
    case 'producer': return 'João Silva';
    case 'transporter': return 'Maria Santos';
    case 'retailer': return 'Carlos Oliveira';
    case 'consumer': return 'Ana Costa';
    default: return 'Usuário';
  }
}

function getCompanyByRole(role: UserRole): string {
  switch (role) {
    case 'producer': return 'Fazenda Verde Ltda';
    case 'transporter': return 'TransFresh Logística';
    case 'retailer': return 'Supermercado Fresco';
    default: return '';
  }
}