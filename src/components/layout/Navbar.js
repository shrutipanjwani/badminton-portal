import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../../img/logo.png';

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
	      <Link to="/">
	        <img className="logo-img" src={logo} alt=""/> 
	      </Link>
	    </nav>
	);
};



export default (Navbar);