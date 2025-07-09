import { Authentication } from '@features';
import { useLocalization } from '@localization/useLocalization';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteKeys, StackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const StackNavigator = () => {
  useLocalization();

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteKeys.SIGNUP} component={Authentication.SignupScreen} />
      <Stack.Screen name={RouteKeys.LOGIN} component={Authentication.LoginScreen} />
      <Stack.Screen name={RouteKeys.FORGOT_PASSWORD} component={Authentication.ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
