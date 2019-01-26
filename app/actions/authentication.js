import { AsyncStorage } from 'react-native';
import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTEHTICATION_FAILURE
} from './types'

import Api from '../api';

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

export const authUSer = (credentials) => {
    return (dispatch) => {
        dispatch(authenticatingUser());
        Api.post.authentication(credentials)
        .then(resJson => {
            _storeData = async () => {
                try {
                    await AsyncStorage.setItem('userToken', resJson.auth-token)
                    dispatch(authenticationSuccess());
                } catch (error) {
                    dispatch(authenticationFailure(error));
                }
            }
            dispatch(authenticationSuccess(resJson));
        }).catch(error => {
            dispatch(authenticationFailure(error));
        }) 
    }
}