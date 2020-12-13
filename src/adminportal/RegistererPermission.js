import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

const RegistererPermission = () => {
		return (
			<Fragment>
			    <br />
			    <h1 className="large text-primary" style={{ marginTop: '100px'}}>Permit People</h1>
			    <br />
			    <table style={{ margin: 'auto', width: "350px"}}>
					  <tbody>
					    <tr>
					      <td style={{ textAlign: "left"}}>John Doe</td>
					      <td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
					    </tr>
					    <br />
					    <tr>
					      <td style={{ textAlign: "left"}}>Kevin Smith</td>
					      <td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
					    </tr>
					    <br />
					    <tr>
					      <td style={{ textAlign: "left"}}>Mari Mathew</td>
					      <td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
					    </tr>
					    <br />
					    <tr>
					      <td style={{ textAlign: "left"}}>Brad Traversy</td>
					      <td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
					    </tr>
					    <br />
					    <tr>
					      <td style={{ textAlign: "left"}}>John Smith</td>
					      <td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
					    </tr>
					  </tbody>
				</table>
				<br />
				<br />
			    <Button size="medium">
			        <p className="btn bg-dark">Done</p>
			    </Button>
			</Fragment>
		);
}

export default RegistererPermission;
