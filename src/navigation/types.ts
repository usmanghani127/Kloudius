import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

export enum RouteKeys {
  LOGIN = 'Login',
  SIGNUP = 'Signup',
  FORGOT_PASSWORD = 'ForgotPassword',
  HOME = 'Home',
}

export type StackScreenProps<RouteKey extends keyof StackNavigatorParamList> = NativeStackNavigationProp<
  StackNavigatorParamList,
  RouteKey
>;
