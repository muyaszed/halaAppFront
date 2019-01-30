import {

    ERROR_FLAG_ON,
    ERROR_FLAG_OFF,

} from './types'

const errorFlagOn = () => {
    
    return {
        type: ERROR_FLAG_ON
    }
}

const errorFlagOff = () => {
    console.log('inside error flag off');
    return {
        type: ERROR_FLAG_OFF
    }
}


export const closeErrDialog = () => {
    console.log('inside closeErrorDialog');
    return (dispatch) => {
        dispatch(errorFlagOff());
    }
}

export const openErrDialog = () => {
    return (dispatch) => {
        dispatch(errorFlagOn());
    }
}