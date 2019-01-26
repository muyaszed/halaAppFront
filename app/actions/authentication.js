import { AsyncStorage } from 'react-native';
import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTEHTICATION_FAILURE
} from './types'

import Api from '../api';
import NavigationService from '../../NavigationService';

const authenticatingUser = () => {
    return {
        type: AUTHENTICATING
    }
}

const authenticationSuccess = () => {
    return {
        type: AUTHENTICATION_SUCCESS
    }
}

const authenticationFailure = (error) => {
    return {
        type: AUTEHTICATION_FAILURE,
        error
    }
}

const storeToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
};


export const authUser = (credentials) => {
    return (dispatch) => {
        console.log('in action', credentials)
        dispatch(authenticatingUser());
        Api.post.authentication(credentials)
        .then(resJson => {
            console.log('token response', resJson)
            storeToken(resJson.auth_token);
            console.log('after store token');
            dispatch(authenticationSuccess());
            console.log('after dispatch')
            NavigationService.navigate('App');
        }).catch(error => {
            console.log('error login', error)
            dispatch(authenticationFailure(error));
            NavigationService.navigate('Auth');
        }) 
    }
}