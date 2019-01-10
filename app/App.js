import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from './screens/Homescreen';
import AddScreen from './screens/Addscreen';
import ProfileScreen from './screens/Profilescreen'; 

const TabNavigator = createMaterialBottomTabNavigator({
  Home: HomeScreen,
  Add: AddScreen,
  Profile: ProfileScreen 
}, {
  initialRouteName: 'Home',
  activeTintColor: '#FFFFFF',
});

export default createAppContainer(TabNavigator);