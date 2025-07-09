import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { LoginInputFieldFormKeys, SignupInputFieldFormKeys } from '../types';
import { useAuthViewModel } from '../viewModels/authViewModel';

type AuthContextType = {
  authToken: string | null;
  authError: string | null;
  clearAuthError: () => void;
  authSuccess: string | null;
  clearAuthSuccess: () => void;
  authLoading: boolean;
  authInitialed: boolean;
  login: (payload: LoginInputFieldFormKeys) => Promise<void>;
  logout: () => void;
  signup: (payload: SignupInputFieldFormKeys) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { login, logout, signup } = useAuthViewModel();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authInitialed, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    Keychain.getGenericPassword()
      .then((credentials) => {
        if (credentials) {
          console.log('Credentials loaded from Keychain');
          setAuthToken(credentials.password);
        }
      })
      .catch((error) => {
        console.error('Failed to load credentials from Keychain:', error);
      })
      .finally(() => {
        setAuthInitialized(true);
      });
  }, []);

  const signIn = async ({ email, password }: LoginInputFieldFormKeys) => {
    try {
      setAuthLoading(true);
      const token = await login({ email, password });
      setAuthToken(token);
      await Keychain.setGenericPassword(email, password);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setAuthLoading(true);
      await logout();
      setAuthToken(null);
      await Keychain.resetGenericPassword();
    } catch (error) {
      setAuthError('Logout failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const signUp = async (payload: SignupInputFieldFormKeys) => {
    try {
      setAuthLoading(true);
      await signup(payload);
      setAuthSuccess('Account created successfully. Please log in.');
    } catch (error) {
      setAuthError('Error creating account. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const clearAuthSuccess = () => {
    setAuthSuccess(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authInitialed,
        authSuccess,
        clearAuthSuccess,
        authLoading,
        authToken,
        login: signIn,
        logout: signOut,
        signup: signUp,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
