import { AsyncStorage } from 'react-native';
import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTEHTICATION_FAILURE,
    ERROR_DIALOG_CLOSED,
   
} from './types'

import Api from '../api';
import NavigationService from '../../NavigationService';
import { openErrDialog } from './dialog';

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
    try {
        const userToken = await AsyncStorage.setItem('userToken', token)
        return userToken;
    } catch(error) {
        throw Error(error);
        
    }


};


export const authUser = (credentials) => {
    return (dispatch) => {
        
        dispatch(authenticatingUser());
        Api.post.authentication(credentials)
        .then(resJson => {
            console.log('this is a res',resJson);
            storeToken(resJson.auth_token).then((res) => {
                
                dispatch(authenticationSuccess());
            
                NavigationService.navigate('AuthLoading');
            }).catch(error => {
                console.log('this is an Asyncstorage error', error);
                dispatch(authenticationFailure(error));
                NavigationService.navigate('AuthLoading');
            })
            
            
        }).catch(error => {
            console.log('this is an error', error);
            dispatch(authenticationFailure(error));
            dispatch(openErrDialog());
            NavigationService.navigate('AuthLoading');
        })
    }
}



