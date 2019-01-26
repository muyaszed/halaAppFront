import {
    AUTHENTICATING,
    AUTHENTICATION_SUCCESS,
    AUTEHTICATION_FAILURE
} from '../actions/types'

const initialState = {
    userAuhtneticated: false,
    authenticating: false,
    error: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATING:
            return {
                ...state,
                authenticating: true,
                userAuhtneticated:false,
                error: []
            }

        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                authenticating: false,
                userAuhtneticated: true,
                error: []
            }

        case AUTEHTICATION_FAILURE:
            return {
                ...state,
                authenticating: false,
                userAuhtneticated: false,
                error: action.error
            }
        
        default:
            return {
                ...state
            }
    }
}

export default authReducer;