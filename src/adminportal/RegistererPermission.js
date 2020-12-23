import React, { Fragment , Component } from 'react';
import img from '../img/user.png';
import ContentEditable from 'react-contenteditable'

export default class RegistererPermission extends Component{
	constructor() {
		super()
		this.contentEditable = React.createRef();
		this.state = {html: "$<b>0</b>"};
	};
	
	handleChange = evt => {
		this.setState({html: evt.target.value});
	};

	state = {
		isActive:false
	 }
   
	 handleShow = ()=>{
		 this.setState({
			 isActive: true
		 })
	 }

	render() {
		const name = "John Doe"
		const email = "shrutipanjwani@gmail.com";
		const phone = "9030320393";
		const status = "active";
		const bookings = "12";

		return (
			<Fragment>
			    <br />
			    <h1 className="large text-primary">User Approval</h1>
			    <br />
			    <div style={{ width: "90%", margin: "auto"}}>
					<div style={{ width: "50%", float: "left",borderRight: "1px solid grey", height: "60vh"}}>
						<table style={{ width: "60%"}}>
							<tbody>
								<tr>
								<td style={{ textAlign: "left", cursor: "pointer"}} onClick={this.handleShow}>{name}</td>
								<td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
								</tr>
								<br />
								<tr>
								<td style={{ textAlign: "left", cursor: "pointer"}}>{name}</td>
								<td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
								</tr>
								<br />
								<tr>
								<td style={{ textAlign: "left", cursor: "pointer"}}>{name}</td>
								<td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
								</tr>
								<br />
								<tr>
								<td style={{ textAlign: "left", cursor: "pointer"}}>{name}</td>
								<td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
								</tr>
								<br />
								<tr>
								<td style={{ textAlign: "left", cursor: "pointer"}}>{name}</td>
								<td style={{ textAlign: "right"}}><button className="btn">Approve</button></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div style={{ width: "50%", float: "right"}}>
						{this.state.isActive ? <Fragment>
							<img
								class="round-img"
								style={{ width: '150px', height: '150px' }}
								src={img}
								alt=""
							/>
							<div style={{ width: '60%', textAlign: "left", margin: "auto"}}>
							<h1 class="lead">{name}</h1>
								<p><strong>Email:</strong> &nbsp; {email}</p>
								<br />
								<p><strong>Phone No:</strong> &nbsp; {phone}</p>
								<br />
								<p><strong>Status:</strong> &nbsp; {status}</p>
								<br />
								<p><strong>Total Bookings: </strong> &nbsp; {bookings}</p>
								<br />
								<p style={{ display: "flex"}}>
									<strong>Current Balance: </strong> &nbsp;
									<ContentEditable
										style={{ width: "100px"}}	
										innerRef={this.contentEditable}
										html={this.state.html} // innerHTML of the editable div
										disabled={false}       // use true to disable editing
									/>
									<button className="btn btn-primary" onChange={this.handleChange}><i className="fas fa-check"></i> &nbsp;Done</button>
								</p>
							</div>
						</Fragment> : <h1>No User Selected</h1> }
					</div>
				</div>
			</Fragment>
		);
	}
}

