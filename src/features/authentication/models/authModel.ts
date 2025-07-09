// Responsible for API calls related to authentication
// This is the Model layer in MVVM architecture

export const login = async (email: string, password: string): Promise<string> => {
  console.log('AuthModel: Logging in with:', email, password);
  if (email === 'test@example.com' && password === 'Qwerty@123') {
    return 'mocked-jwt-token';
  }
  return Promise.reject(new Error('Invalid credentials'));
};

export const logout = async (): Promise<void> => {
  console.log('AuthModel: Logging out');
};
