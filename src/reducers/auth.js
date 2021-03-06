import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	ADMIN_LOGIN_SUCCESS,
	USER_LOADED_ADMIN,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	RESET_PASSWORD,
	RESET_PASSWORD_ERROR 
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	isAdmin : null
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case USER_LOADED_ADMIN: 
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
				isAdmin: true
			}
		case USER_LOADED: 
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.key);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case ADMIN_LOGIN_SUCCESS:
			localStorage.setItem('token', payload.key);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				isAdmin: true,
				loading: false
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case CLEAR_PROFILE:
		case LOGOUT:
		case RESET_PASSWORD:
		case RESET_PASSWORD_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: null,
				loading: false,
				user: null,
				isAdmin: false,
				key : false,
				role: false
			};
		default: 
			return state;	
	}
}