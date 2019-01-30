import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTEHTICATION_FAILURE,
    
} from '../actions/types'

const initialState = {
    userAuthenticated: false,
    authenticating: false,
    errors: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATING:
            return {
                ...state,
                authenticating: true,
                userAuthenticated:false,
                errors: {}
            }

        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                authenticating: false,
                userAuthenticated: true,
                errors: {}
            }

        case AUTEHTICATION_FAILURE:
            return {
                ...state,
                authenticating: false,
                userAuthenticated: false,
                errors: action.error
            }
        
        default:
            return {
                ...state
            }
    }
}

export default authReducer;