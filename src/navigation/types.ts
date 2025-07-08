import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
  Landing: undefined;
  Login: undefined;
};

export enum RouteKeys {
  LANDING = 'Landing',
  LOGIN = 'Login',
}

export type StackScreenProps<RouteKey extends keyof StackNavigatorParamList> = NativeStackScreenProps<
  StackNavigatorParamList,
  RouteKey
>;
