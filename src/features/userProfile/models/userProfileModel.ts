import { GetUserType, UserProfile } from '../types';

export const dummyUserProfile: UserProfile = {
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
};

export const getUserProfile = async (payload: GetUserType): Promise<UserProfile> => {
  console.log('UserProfileModel: Getting user', payload.authToken);

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyUserProfile), 2000);
  });
};
