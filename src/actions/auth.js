import axios from 'axios';
import { setAlert } from './alert';
import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_PROFILE,
	LOGOUT,
	ADMIN_LOGIN_SUCCESS,
	RESET_PASSWORD,
	RESET_PASSWORD_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		//console.log(err)
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Login User
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/auth', body, config);
		//console.log(res.data.role)
		if(res.data.role == "admin"){
			
			dispatch({
			type: ADMIN_LOGIN_SUCCESS,
			payload: res.data
			});
			
		}else{
			//console.log(res.data.role)
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		}
	dispatch(loadUser());
		
		
	} catch(err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Reset password 
export const resetpassword = (email, token, password) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const body = JSON.stringify({ email, token, password});
		
		const res = await axios.post('/users/resetPassword', body, config);
		//console.log(res)
		dispatch({
			type: RESET_PASSWORD,
			payload: res.data
		});
		
		//dispatch(setAlert('Your Password has been changed successfully'));
		return true;

	} catch (err) {
		//console.log("data =")
		
		//console.log(err.response)
		
		dispatch(setAlert(err.response.data.message, 'danger'));
		
		dispatch({
			type: RESET_PASSWORD_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Logout / Clear Profile

export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};