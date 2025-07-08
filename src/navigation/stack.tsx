import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigatorParamList } from './types';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const LandingScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, 'Landing'>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Landing Screen</Text>
      <Button icon="coffee-outline" mode="contained" onPress={() => navigate('Home')}>
        Navigate to Home Screen
      </Button>
    </View>
  );
};

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
