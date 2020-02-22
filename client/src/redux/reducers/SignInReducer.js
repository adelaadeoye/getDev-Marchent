
import {
    LOGIN_USER_LOADING,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS
    } from "../actions/SignInActions"
export const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER_LOADING:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: null,
                data:action.payload.data.message
            }
        default:
            return state;
    }
}

const initialState = {
    error:null,
    isFetching:false,
    data:""
};