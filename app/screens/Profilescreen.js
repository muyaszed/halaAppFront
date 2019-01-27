import React, { Component } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';

export default class ProfileScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'profileTab'
    };

    handlePress = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    }

    render() {
      return (
        <View testID="profileScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Your profile!</Text>
          <Button title="Logout" onPress={this.handlePress} />
        </View>
      );
    }
  }