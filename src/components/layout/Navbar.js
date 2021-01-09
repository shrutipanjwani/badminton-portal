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
	        	<Link to="/calendar" replace >
	        		<i className="fas fa-th-large"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Dashboard</span>
	        	</Link>
	        </li>
			<li>
	        	<Link to="/newbooking" replace >
	        		<i className="fas fa-book"></i>{' '}
	        		<span className="hide-sm"> &nbsp;New Booking</span>
	        	</Link>
	        </li>
			<li>
	        	<Link to="/wallet" replace >
	        		<i className="fas fa-user"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Wallet</span>
	        	</Link>
	        </li>
	        <li>
	        	<Link onClick={logout} to="/" replace >
	        		<i className="fas fa-sign-out-alt"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Logout</span>
	        	</Link>
	        </li>
	    </ul>
	);
	const adminLinks = (
		<ul>
			<li>
	        	<Link to="/permission" replace>
	        		<i className="fas fa-check"></i>{' '}
	        		<span className="hide-sm"> &nbsp;User Approval</span>
	        	</Link>
	        </li>
			<li>
	        	<Link to="/admincalendar" replace >
	        		<i className="fas fa-calendar"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Calendar</span>
	        	</Link>
	        </li>
			<li>
	        	<Link to="/adminbooking" replace>
	        		<i className="fas fa-book"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Booking</span>
	        	</Link>
	        </li>
			<li>
	        	<Link to="/court" replace>
	        		<i className="fas fa-layer-group"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Court</span>
	        	</Link>
	        </li>
	        <li>
	        	<Link onClick={logout} to="/signin" replace> 
	        		<i className="fas fa-sign-out-alt"></i>{' '}
	        		<span className="hide-sm"> &nbsp;Logout</span>
	        	</Link>
	        </li>
	    </ul>
	);
	const guestLinks = (
		<ul className="guest-none"></ul>
	);

	return (
		<nav className="navbar bg-dark">
	      <h1>
	        <Link to="/" replace>
	        	<img className="logo-img" src={logo} alt=""/> 
	        </Link>
	      </h1>
	      {!loading && (
	      	<Fragment>
	      		{ isAuthenticated ? (isAdmin ? adminLinks: authLinks) : guestLinks }
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