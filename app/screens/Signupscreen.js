import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import { signUpUser } from '../actions/authentication';
import { closeErrDialog } from '../actions/dialog';
import SignUpForm from '../components/Signupform';
import ErrorDialog from '../components/ErrorDialog';

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign up',
  };

  handleSignUp = (credentials) => {
    const { postSignUp } = this.props;
    postSignUp(credentials);
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
        <SignUpForm onSignUp={this.handleSignUp} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postSignUp: (credentials) => {
    dispatch(signUpUser(credentials));
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
  postSignUp: PropsTypes.func.isRequired,
  errDialog: PropsTypes.func.isRequired,
  auth: PropsTypes.instanceOf(Object).isRequired,
  dialog: PropsTypes.objectOf(PropsTypes.bool).isRequired,
};
