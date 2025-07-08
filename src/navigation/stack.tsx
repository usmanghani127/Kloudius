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
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteKeys.LOGIN} component={Authentication.LoginScreen} />
    </Stack.Navigator>
  );
};
