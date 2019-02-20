import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { unAuthUser } from '../actions/authentication';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarTestID: 'profileTab',
  };

  handlePress = async () => {
    const { unAuth } = this.props;
    unAuth();
  };

  render() {
    return (
      <View
        testID="profileScreen"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Your profile!</Text>
        <Button
          testID="logoutButton"
          title="Logout"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  unAuth: () => {
    dispatch(unAuthUser());
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ProfileScreen);

ProfileScreen.propTypes = {
  unAuth: PropTypes.func.isRequired,
};
