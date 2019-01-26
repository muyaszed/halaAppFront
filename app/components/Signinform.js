import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            email: '',
            password: '',
              
        };
    }

    handlePress = () => {
        const { email, password } = this.state;
        const { onAuth } = this.props;
        const credentials = {
            email: email,
            password: password,
        }
        console.log(credentials);
        onAuth(credentials);
        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TextInput
                    mode="outlined"
                    
                    testID="emailInput"
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({
                        email
                    })}
                    
                />
                <TextInput
                    mode="outlined"
                    
                    testID="passwordInput"
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    
                />

                <Button testID='signinButton' mode="outlined" onPress={this.handlePress}>
                    Sign in
                </Button>
            </View>
        )
    }
}