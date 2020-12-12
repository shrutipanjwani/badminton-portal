import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	ADMIN_LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	isAdmin: null
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case USER_LOADED: 
		return {
			...state,
			isAuthenticated: true,
			loading: false,
			user: payload,
			isAdmin: null
		}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.key);
			console.log(localStorage.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
				isAdmin: null
			}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				isAdmin: null
			};
		case ADMIN_LOGIN_SUCCESS: 
			localStorage.setItem('token', payload.key);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
				isAdmin: true
			};
		default: 
			return state;	
	}
}