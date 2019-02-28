import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import { authUser } from '../actions/authentication';
import { closeErrDialog } from '../actions/dialog';
import SignInForm from '../components/Signinform';
import ErrorDialog from '../components/ErrorDialog';

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  handleAuth = (credentials) => {
    const { getAuth } = this.props;
    getAuth(credentials);
  };

  handleClose = () => {
    const { errDialog } = this.props;
    errDialog();
  };

  render() {
    const { auth, dialog } = this.props;
    return (
      <View testId="signinScreen" style={{ flex: 1, justifyContent: 'center' }}>
        <ErrorDialog
          errMessage={auth.errors}
          errFlag={dialog.errorFlag}
          onClose={this.handleClose}
        />
        <SignInForm onAuth={this.handleAuth} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAuth: (credentials) => {
    dispatch(authUser(credentials));
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
  errDialog: PropsTypes.func.isRequired,
  auth: PropsTypes.instanceOf(Object).isRequired,
  dialog: PropsTypes.objectOf(PropsTypes.bool).isRequired,
};
