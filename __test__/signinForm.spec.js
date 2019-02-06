import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import SignInForm from '../app/components/Signinform';

describe('<SignInForm />', () => {
    jest.useFakeTimers();
    const handleAuth = jest.fn();
    const credentials = {
        email: 'test@email.com',
        password: '123456'
    }

    const { getByTestId } = render(<SignInForm onAuth={handleAuth}/>)
    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const signinButton = getByTestId('signinButton');

    fireEvent.changeText(emailInput, credentials.email);
    fireEvent.changeText(passwordInput, credentials.password);
    fireEvent.press(signinButton);

    it('calls the onAuth handler with the entered data', () => {
        expect(handleAuth).toHaveBeenCalledWith(credentials);
        
    })

    it('clears the input text when data is submited', () => {
        expect(emailInput.props.value).toEqual('');
        expect(passwordInput.props.value).toEqual('');
        
    })
})