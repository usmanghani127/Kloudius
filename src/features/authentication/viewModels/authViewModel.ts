import { RouteKeys, StackScreenProps } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import * as authModel from '../models/authModel';
import { LoginInputFieldFormKeys, SignupInputFieldFormKeys } from '../types';

// Calls functions exported by models/authModel.ts
// Returns response to contexts/authContext.tsx
// Handles side effects like navigation, and logging
// This is the ViewModel layer in MVVM architecture

export const useAuthViewModel = () => {
  const { reset, goBack } = useNavigation<StackScreenProps<RouteKeys.LOGIN>>();

  const login = async (payload: LoginInputFieldFormKeys): Promise<string> => {
    try {
      const authToken = await authModel.login(payload);
      reset({ index: 0, routes: [{ name: RouteKeys.HOME }] });
      return authToken;
    } catch (error: unknown) {
      console.error('useAuthViewModel: Login failed:', error);
      throw error;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await authModel.logout();
      reset({ index: 0, routes: [{ name: RouteKeys.LOGIN }] });
      return true;
    } catch (error) {
      console.error('useAuthViewModel: Logout failed:', error);
      throw error;
    }
  };

  const signup = async (payload: SignupInputFieldFormKeys): Promise<void> => {
    try {
      await authModel.signup(payload);
      goBack();
    } catch (error) {
      console.error('useAuthViewModel: Signup failed:', error);
      throw error;
    }
  };

  return {
    login,
    logout,
    signup,
  };
};
