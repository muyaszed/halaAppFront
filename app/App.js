import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import NavigationService from '../NavigationService';
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

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render () {
    return (
      <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}