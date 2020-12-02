import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'

export default class Admin extends Component {
	constructor(props) {
    super(props);
    const token = localStorage.getItem("token")

    let loggedIn = true 
	    if( token == null){
	    	loggedIn = false
	    }

	    this.state={
	    	loggedIn
	    }
    }
	render() {
		if(this.state.loggedIn === false){
			return <Redirect to="/signin" />
		}
		return(
			<div className="admin">
				<h1>This is Admin Page only Auth people can see</h1>
				<Link to="/logout"> Logout </Link>
			</div>
		);
	}
}