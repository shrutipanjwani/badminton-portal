import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.png';

const Navbar = ({ auth: { isAuthenticated, loading, isAdmin }, logout}) => {
	const authLinks = (
		<ul>
	        <li>
	        	<Link onClick={logout} to="/">
	        		<i className="fas fa-sign-out-alt"></i>{' '}
	        		{/* <span className="hide-sm">Logout</span> */}
	        	</Link>
	        </li>
	    </ul>
	);
	const adminLinks = (
		<ul>
	        <li>
	        	<Link onClick={logout} to="/">
	        		<i className="fas fa-sign-out-alt"></i>{' '}
	        		{/* <span className="hide-sm">Logout</span> */}
	        	</Link>
	        </li>
	    </ul>
	);
	const guestLinks = (
		<ul>
	       <li>
	        	
	        </li>
	    </ul>
	);

	return (
		<nav className="navbar bg-dark">
	      <h1>
	        <Link to="/">
	        	<img className="logo-img" src={logo} alt=""/> 
	        </Link>
	      </h1>
	      {!loading && (
	      	<Fragment>
	      		{ isAuthenticated ? authLinks : guestLinks }
	      		{ isAdmin ? adminLinks : guestLinks }
	      	</Fragment>
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