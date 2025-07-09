import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserListScreen from '../screens/UserListScreen';
import PostsScreen from '../screens/PostsScreen';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
