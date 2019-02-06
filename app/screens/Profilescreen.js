import React, { Component } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';
import { connect } from 'react-redux';

import { unAuthUser } from '../actions/authentication';

class ProfileScreen extends Component {
    static navigationOptions = {
      tabBarTestID: 'profileTab'
    };

    handlePress = async () => {
      this.props.unAuthUser();
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

  const mapDispatchToProps = (dispatch) => {
    return {
      unAuthUser: () => {
        dispatch(unAuthUser());
      }
    }
  }

  export default connect(undefined, mapDispatchToProps)(ProfileScreen);