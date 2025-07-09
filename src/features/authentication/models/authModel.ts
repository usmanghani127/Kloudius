// Responsible for API calls related to authentication
// This is the Model layer in MVVM architecture

export const login = async (email: string, password: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('AuthModel: Logging in with:', email, password);
  if (email === 'test@example.com' && password === 'Qwerty@123') {
    return 'mocked-jwt-token';
  }
  return Promise.reject(new Error('Invalid credentials'));
};

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('AuthModel: Logging out');
};
