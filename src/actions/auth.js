import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_PROFILE,
	LOGOUT,
	ADMIN_LOGIN_SUCCESS
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
		console.log(err)
		// dispatch({
		// 	type: AUTH_ERROR
		// });
	}
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch(err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
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
	console.log(body);
	try {
		const res = await axios.post('/auth', body, config);
		console.log(res);
		if (res.data.role === "Member") {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		};

		if (res.data.role === "admin") {
			dispatch({
				type: ADMIN_LOGIN_SUCCESS,
				payload: res.data
			});
		}

		dispatch(loadUser());
	} catch(err) {
		const errors = err.response.data.errors;
		console.log(err)
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
}

// Logout / Clear Profile

export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};