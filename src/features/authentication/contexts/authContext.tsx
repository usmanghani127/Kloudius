import { ReactNode, createContext, useContext, useState } from 'react';
import { useAuthViewModel } from '../viewModels/authViewModel';

type AuthContextType = {
  authToken: string | null;
  authError: string | null;
  clearAuthError: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { login, logout } = useAuthViewModel();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const token = await login(email, password);
      setAuthToken(token);
    } catch (error) {
      setAuthError('Login failed. Please check your credentials.');
    }
  };

  const signOut = () => {
    logout();
    setAuthToken(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login: signIn, logout: signOut, authError, clearAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
