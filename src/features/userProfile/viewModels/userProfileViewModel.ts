import { getUserProfile } from '../models/userProfileModel';
import { GetUserType, UserProfile } from '../types';

export const useUserProfileViewModel = () => {
  const getUser = async (payload: GetUserType): Promise<UserProfile> => {
    try {
      return await getUserProfile(payload);
    } catch (error) {
      console.error('useUserProfileViewModel: Failed to fetch user profile:', error);
      throw error;
    }
  };
  return { getUser };
};
