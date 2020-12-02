import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logout extends Component {
	constructor(props) {
    super(props);
    localStorage.removeItem("token")
	}
	render() {
		return(
			<div className="logout">
				<h1>You have logged Out!</h1>
				<Link to="/signin"> Login Again </Link>
			</div>
		);
	}
}