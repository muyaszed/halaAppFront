import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ProfileScreen extends Component {
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