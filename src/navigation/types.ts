import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export enum RouteKeys {
  LANDING = 'Landing',
  LOGIN = 'Login',
  SIGNUP = 'Signup',
  FORGOT_PASSWORD = 'ForgotPassword',
}

export type StackScreenProps<RouteKey extends keyof StackNavigatorParamList> = NativeStackNavigationProp<
  StackNavigatorParamList,
  RouteKey
>;
