import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class AddScreen extends Component {
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