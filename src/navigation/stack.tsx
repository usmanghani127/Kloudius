import { Authentication, UserProfile } from '@features';
import { useLocalization } from '@localization/useLocalization';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from 'features/authentication/contexts/authContext';
import React from 'react';
import { RouteKeys, StackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const StackNavigator = () => {
  useLocalization();
  const { authToken, authInitialed } = useAuth();

  return authInitialed ? (
    <Stack.Navigator
      initialRouteName={authToken ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteKeys.SIGNUP} component={Authentication.SignupScreen} />
      <Stack.Screen name={RouteKeys.LOGIN} component={Authentication.LoginScreen} />
      <Stack.Screen name={RouteKeys.FORGOT_PASSWORD} component={Authentication.ForgotPasswordScreen} />
      <Stack.Screen name={RouteKeys.HOME} component={UserProfile.HomeScreen} />
    </Stack.Navigator>
  ) : (
    <></>
  );
};
