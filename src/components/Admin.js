import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import CalendarPage from './Calendar/Calendar'

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
				<CalendarPage />
			</div>
		);
	}
}