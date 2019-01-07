import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'homeTab'
  };

  render() {
    return (
      <View testID="homeScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class AddScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'addTab'
  };

  render() {
    return (
      <View testID="addScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Add place!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'profileTab'
  };
  render() {
    return (
      <View testID="profileScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your profile!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Add: AddScreen,
  Profile: ProfileScreen 
});

export default createAppContainer(TabNavigator);