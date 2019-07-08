/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRepeat: '',
      comparePassword: false,
    };
  }

  handlePress = () => {
    const { email, password } = this.state;
    const { onSignUp } = this.props;
    const credentials = {
      email,
      password,
    };
    
    onSignUp(credentials);
    this.setState({
      email: '',
      password: '',
      passwordRepeat: '',
    });
  };

  render() {
    const {
      email, password, passwordRepeat, comparePassword,
    } = this.state;
    
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          mode="outlined"
          testID="emailInput"
          keyboardType="email-address"
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
        <TextInput
          mode="outlined"
          testID="passwordRepeatInput"
          label="Confirm Password"
          secureTextEntry={true}
          value={passwordRepeat}
          onChangeText={passwordInput => this.setState({
            passwordRepeat: passwordInput,
            comparePassword: !(password === passwordInput),
          })
          }
        />

        <HelperText type="error" visible={comparePassword}>
          Password is not equal. Please type in again.
        </HelperText>

        <Button testID="signupButton" mode="contained" onPress={this.handlePress}>
          Sign up
        </Button>
      </View>
    );
  }
}

SignInForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};
