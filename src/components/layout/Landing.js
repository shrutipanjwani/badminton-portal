import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/calendar' />;
	}

	return (
		<section className="landing">
	      <div className="dark-overlay">
	        <div className="landing-inner">
	          <h1 className="x-large">Lets Badminton</h1>
	          <p className="lead">
	            Practice like you've never won. Perform like you've never lost.
	          </p>
	          <div className="buttons">
				<Link to="/signin" className="btn btn-light">Sign in</Link>
	            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
	          </div>
	        </div>
	      </div>
	    </section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);