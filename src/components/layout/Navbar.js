import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout}) => {
	const authLinks = (
		<ul>
	        <li>
	        	<a onClick={logout} href="#!">
	        		<i className="fas fa-sign-out-alt"></i>{' '}
	        		<span className="hide-sm">Logout</span>
	        	</a>
	        </li>
	    </ul>
	);
	const guestLinks = (
		<ul>
	        
	    </ul>
	);

	return (
		<nav className="navbar bg-dark">
	      <Link to="/">
	        <img className="logo-img" src={logo} /> 
	      </Link>
	      { !loading && (
	      	<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
	      )}
	    </nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);