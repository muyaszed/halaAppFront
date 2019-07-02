/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handlePress = (e, status) => {
    const { email, password } = this.state;
    const { onAuth, onFbAuth } = this.props;

    if (status === 'facebook') {
      onFbAuth();
    } else {
      const credentials = {
        email,
        password,
      };
      console.log(credentials);
      onAuth(credentials);
      this.setState({
        email: '',
        password: '',
      });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          mode="outlined"
          keyboardType="email-address"
          testID="emailInput"
          label="Email"
          value={email}
          onChangeText={emailInput => this.setState({
            email: emailInput,
          })
          }
        />
        <TextInput
          mode="outlined"
          testID="passwordInput"
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={passwordInput => this.setState({ password: passwordInput })}
        />

        <Button
          testID="signinButton"
          mode="contained"
          onPress={e => this.handlePress(e, 'normal')}
          style={styles.button}
        >
          Sign in
        </Button>
        <Button
          testID="fbSigninButton"
          mode="contained"
          onPress={e => this.handlePress(e, 'facebook')}
          style={styles.button}
        >
          Sign in with Facebook
        </Button>

        {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {

              }else if (result.isCancelled) {

              }else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString());
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout")}
        /> */}
      </View>
    );
  }
}

SignInForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  onFbAuth: PropTypes.func.isRequired,
};
