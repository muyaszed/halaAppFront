import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import jwt from 'jwt-lite';
import { withNavigation } from 'react-navigation';

import PropTypes from 'prop-types';

import { unAuthUser } from '../actions/authentication';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

class AuthLoadingScreen extends Component {
  componentDidMount() {
    const { navigation, dialog, signOut } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      console.log("here first");
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken);
      if (userToken) {
        const payload  = jwt.decode(userToken);
        const { exp } = payload.claimsSet;
        console.log(Date.now()/1000 > exp);
        if ( Date.now()/1000 > exp ) {
          signOut()
          navigation.navigate('Auth');
        } else {
          navigation.navigate('App');
        }
        
        
      }else {
        navigation.navigate('Auth');
      }
      // setTimeout(() => {
      //   navigation.navigate(userToken ? 'App' : 'Auth');
      // }, 1000);
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialog,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(unAuthUser()),
  getUserInfo: (id) => dispatch(getUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);

AuthLoadingScreen.propTypes = {
  signOut: PropTypes.func.isRequired,
  dialog: PropTypes.instanceOf(Object).isRequired,
};

