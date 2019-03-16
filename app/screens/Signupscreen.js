import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';

import { signUpUser } from '../actions/authentication';
import { closeErrDialog } from '../actions/dialog';
import SignUpForm from '../components/Signupform';
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
  }
})

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
      <View testId="signinScreen" style={styles.container}>
        <View style={styles.logo}>
          <Icon name="bowl" size={80} color="#21c393" />
        </View>
        <ErrorDialog
          errMessage={dialog.error}
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
  dialog: PropsTypes.instanceOf(Object).isRequired,
};
