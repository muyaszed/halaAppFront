import React, { Component } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';

class ProfileScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'profileTab'
    };

    handlePress = async () => {
      const { navigation } = this.props;
      await AsyncStorage.clear().then(() => {
        navigation.navigate('AuthLoading');
      })
      
    }

    render() {
      return (
        <View testID="profileScreen" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Your profile!</Text>
          <Button testID="logoutButton" title="Logout" onPress={this.handlePress} />
        </View>
      );
    }
  }

  

  export default ProfileScreen;