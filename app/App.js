import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import NavigationService from '../NavigationService';
import HomeScreen from './screens/Homescreen';
import AddScreen from './screens/Addscreen';
import ProfileScreen from './screens/Profilescreen'; 
import SignInScreen from './screens/Signinscreen';
import AuthLoadingScreen from './screens/Authloadingscreen'

const TabNavigator = createMaterialBottomTabNavigator({
  Home: HomeScreen,
  Add: AddScreen,
  Profile: ProfileScreen 
}, {
  initialRouteName: 'Home',
  activeTintColor: '#FFFFFF',
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});

const SwitchNav = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: TabNavigator,
  Auth: AuthStack
}, 
{
  initialRouteName: 'AuthLoading'
});

const AppContainer = createAppContainer(SwitchNav);

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