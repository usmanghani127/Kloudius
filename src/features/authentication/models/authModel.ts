// Responsible for API calls related to authentication
// This is the Model layer in MVVM architecture

import { LoginInputFieldFormKeys, SignupInputFieldFormKeys } from '../types';

export const login = async ({ email, password }: LoginInputFieldFormKeys): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('AuthModel: Logging in with:', email, password);
  if (email === 'test@example.com' && password === 'Qwerty@123') {
    return 'mocked-jwt-token';
  }
  return Promise.reject(new Error('Invalid credentials'));
};

export const signup = async (payload: SignupInputFieldFormKeys): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('AuthModel: Creating new account with: ', payload);
};

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('AuthModel: Logging out');
};
