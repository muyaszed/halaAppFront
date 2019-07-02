import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { authUser, authFbUser } from '../actions/authentication';
import { closeErrDialog } from '../actions/dialog';
import SignInForm from '../components/Signinform';
import ErrorDialog from '../components/ErrorDialog';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    alignItems: 'center',
  },
});

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  handleAuth = (credentials) => {
    const { getAuth } = this.props;
    getAuth(credentials);
  };

  fbLogin = () => {
    const { getFbAuth } = this.props;
    LoginManager.logInWithPermissions(['email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success: ', result.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log('Token', data.accessToken.toString());
            const token = {
              facebook_access_token: data.accessToken.toString(),
            };
            getFbAuth(token);
          });
        }
      },
      (error) => {
        console.log('Login error: ', error);
      },
    );
  };

  handleFbAuth = () => {
    this.fbLogin();
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  render() {
    const { auth, dialog } = this.props;
    return (
      <View testId="signinScreen" style={styles.container}>
        <View style={styles.logo}>
          <Icon name="bowl" size={80} color="#21c393" />
        </View>
        <ErrorDialog
          errMessage={dialog.error}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />

        <SignInForm onAuth={this.handleAuth} onFbAuth={this.handleFbAuth} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAuth: (credentials) => {
    dispatch(authUser(credentials));
  },
  getFbAuth: (token) => {
    dispatch(authFbUser(token));
  },
  errDialog: () => {
    dispatch(closeErrDialog());
  },
});

const mapStateToProps = state => ({
  auth: state.authentication,
  dialog: state.dialog,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);

SignInScreen.propTypes = {
  getAuth: PropsTypes.func.isRequired,
  getFbAuth: PropsTypes.func.isRequired,
  errDialog: PropsTypes.func.isRequired,
  auth: PropsTypes.instanceOf(Object).isRequired,
  dialog: PropsTypes.instanceOf(Object).isRequired,
};
