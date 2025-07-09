import { useAuth } from 'features/authentication/contexts/authContext';
import { ReactNode, createContext, useContext, useState } from 'react';
import { UserProfile, UserProfileContextType } from '../types';
import { useUserProfileViewModel } from '../viewModels/userProfileViewModel';

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const { authToken } = useAuth();
  const { getUser: fetchUser } = useUserProfileViewModel();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const data = await fetchUser({ authToken: authToken || '' });
      setUser(data);
    } catch (e) {
      setError('userProfileContext: Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider value={{ user, getUser, userLoading: loading, userError: error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error('useUserProfile must be used within UserProfileProvider');
  return context;
};
