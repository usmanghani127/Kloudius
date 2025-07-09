export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserProfileContextType = {
  user: UserProfile | null;
  getUser: () => Promise<void>;
  userLoading: boolean;
  userError: string | null;
};

export type GetUserType = {
  authToken: string;
};
