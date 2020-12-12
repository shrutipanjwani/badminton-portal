import React, { Fragment } from 'react';

const NotFound = () => {
	return (
		<Fragment>
			<h1 className="x-large text-primary" style={{marginTop: '150px'}}>
				<i className="icon-warning-sign"></i>
				Page Not Found
			</h1>
			<p>Sorry this Page Doesn't Exists</p>
		</Fragment>
	)
}

export default NotFound;