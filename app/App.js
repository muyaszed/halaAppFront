import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/Homescreen';
import AddScreen from './screens/Addscreen';
import ProfileScreen from './screens/Profilescreen'; 

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Add: AddScreen,
  Profile: ProfileScreen 
});

export default createAppContainer(TabNavigator);