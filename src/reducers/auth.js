import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	ADMIN_LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
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
				loading: false,
				isAdmin: false
			}
		case ADMIN_LOGIN_SUCCESS:
			localStorage.setItem('token', payload.key);
			return {
				...state,
				...payload,
				isAdmin: true,
				loading: false
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case CLEAR_PROFILE:
		case LOGOUT:
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