import React, { Component } from "react";
import { View } from 'react-native';

import SignInForm from '../components/Signinform'

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in'
    }

    render() {
        return (
            <View testId="signinScreen" style={{ flex: 1, justifyContent: 'center'}}>
                <SignInForm onAuth={this.handleAuth}/>
            </View>
        )
    }
}