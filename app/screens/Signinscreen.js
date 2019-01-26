import React, { Component } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { authUser } from '../actions/authentication';
import SignInForm from '../components/Signinform'


class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in'
    }

    handleAuth = (credentials) => {
        this.props.auth(credentials); 
        
      }

    render() {
        return (
            <View testId="signinScreen" style={{ flex: 1, justifyContent: 'center'}}>
                <SignInForm onAuth={this.handleAuth}/>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      auth: (credentials) => {
        dispatch(authUser(credentials))
      }
    }
  }

export default connect(undefined, mapDispatchToProps)(SignInScreen);