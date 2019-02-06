import { AsyncStorage } from 'react-native';
import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    UNAUTHENTICATION,
   
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
        type: AUTHENTICATION_FAILURE,
        error
    }
}

const unauthenticationUser = () => {
    return {
        type: UNAUTHENTICATION
    }
}

const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token)
    } catch(error) {
        throw Error(error);
        
    }


};

const removeUserToken = async () => {
    await AsyncStorage.removeItem('userToken');
}


export const authUser = (credentials) => {
    return (dispatch) => {
        
        dispatch(authenticatingUser());
        Api.post.authentication(credentials)
        .then(async(resJson) => {
            console.log('this is a res',resJson);
            await storeToken(resJson.auth_token)
            dispatch(authenticationSuccess());
            NavigationService.navigate('AuthLoading');
            
            
            
        }).catch(error => {
            console.log('this is an error', error);
            dispatch(authenticationFailure(error));
            dispatch(openErrDialog());
            NavigationService.navigate('AuthLoading');
        })
    }
}

export const unAuthUser = () => {
    return async (dispatch) => {
        await removeUserToken();
        dispatch(unauthenticationUser());
        NavigationService.navigate('AuthLoading');
    }
}



