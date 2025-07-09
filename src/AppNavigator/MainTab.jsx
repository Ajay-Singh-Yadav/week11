import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListScreen from '../screens/UserListScreen';
import AllUsers from '../screens/AllUsers';
import UserMange from '../screens/UserMange';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Peoples') {
            return <Entypo name="users" size={22} color={color} />;
          } else if (route.name === 'UserList') {
            return <Ionicons name="list" size={23} color={color} />;
          } else if (route.name === 'UserManage') {
            return (
              <MaterialIcons name="manage-accounts" size={25} color={color} />
            );
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Peoples" component={AllUsers} />
      <Tab.Screen name="UserList" component={UserListScreen} />
      <Tab.Screen name="UserManage" component={UserMange} />
    </Tab.Navigator>
  );
};

export default MainTab;
