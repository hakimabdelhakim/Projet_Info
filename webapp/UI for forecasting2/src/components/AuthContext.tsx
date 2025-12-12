import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'manager' | 'approvisionnement' | 'logistique';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisateurs mockés pour la démonstration
const mockUsers = [
  {
    id: '1',
    nom: 'Fatima Ziani',
    email: 'fatima.ziani@ocp.ma',
    username: 'manager',
    password: 'demo',
    role: 'manager' as UserRole,
  },
  {
    id: '2',
    nom: 'Ahmed El Amrani',
    email: 'ahmed.amrani@ocp.ma',
    username: 'appro',
    password: 'demo',
    role: 'approvisionnement' as UserRole,
  },
  {
    id: '3',
    nom: 'Sarah Benali',
    email: 'sarah.benali@ocp.ma',
    username: 'logistique',
    password: 'demo',
    role: 'logistique' as UserRole,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (usernameOrEmail: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (foundUser) {
      const { password: _, username: __, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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
