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
	RESET_PASSWORD_ERROR,
	USER_LOADED_ADMIN
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/auth');
		if(res.data.role === "admin"){
			await dispatch({
				type: USER_LOADED_ADMIN,
				payload: res.data
			});
		}else{	
			await dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		}
	} catch (err) {
		console.log(err)
		await dispatch({
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
	email =email.toLowerCase();
	const body = JSON.stringify({ email, password });




	try {
		const res = await axios.post('/auth', body, config);
		//console.log(res.data.role)
		
		var data={
			"loginstatus":1,
			"role":res.data.role
		}

		localStorage.setItem("USER",JSON.stringify(data));
		console.log("data set ",JSON.parse(localStorage.getItem("USER")));
		if(res.data.role === "admin"){
			
			await dispatch({
			type: ADMIN_LOGIN_SUCCESS,
			payload: res.data
			});
			
		}else{
			await dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		}
		await dispatch(loadUser());

		
		
	} catch(err) {
		const errors = err.response.data.errors;
		
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}else{
			dispatch(setAlert(err.response.statusText, 'danger'))
		}

		await dispatch({
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
		email = email.toLowerCase()
		const body = JSON.stringify({ email, token, password});
		
		const res = await axios.post('/users/resetPassword', body, config);
		//console.log(res)
		await dispatch({
			type: RESET_PASSWORD,
			payload: res.data
		});
		
		//dispatch(setAlert('Your Password has been changed successfully'));
		return true;

	} catch (err) {
		//console.log("data =")
		
		//console.log(err.response)
		
		await dispatch(setAlert(err.response.data.message, 'danger'));
		
		await dispatch({
			type: RESET_PASSWORD_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Logout / Clear Profile

export const logout = () => async dispatch => {
	await dispatch({ type: CLEAR_PROFILE });
	await dispatch({ type: LOGOUT });
};