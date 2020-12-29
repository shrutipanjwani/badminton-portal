import React, { Fragment , Component } from 'react';
import ContentEditable from 'react-contenteditable'
import axios from "axios";

export default class RegistererPermission extends Component{
	constructor(props) {
		super(props)
		this.contentEditable = React.createRef();
		
		this.state = {
			names : [],
			email : "",
			phone : "",
			status : "",
			approvedstatus: "",
			bookings : 0,
			wallet : 0,
			addToWallet: 0,
			src:false,
			user :{},
			cancelbookings : 0,
			level: "",
		}
	};
	
	handleChange = evt => {
		this.setState({html: evt.target.value});
	};

	state = {
		isActive:false
	 }
	
	approveUser = async (e) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/profile/approve/"+e.target.parentNode.id, config)
			const namesvar = this.state.names;
			let obj = namesvar.find((o, i) => {
				if (o._id === e.target.parentNode.id) {
					namesvar[i].status = 2
					return true; // stop searching
				}
			});
			this.setState({names : namesvar})
		} catch(err) {
			console.log(err.response)
		}
	}
	unapproveUser = async (e) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/profile/unapprove/"+e.target.parentNode.id, config)
			await this.getData(e.target.parentNode.id);
			const namesvar = this.state.names;
			let obj = namesvar.find((o, i) => {
				if (o._id === e.target.parentNode.id) {
					namesvar[i].status = 1
					return true; // stop searching
				}
			});
			this.setState({names : namesvar})
		} catch(err) {
			console.log(err.response)
		}
	}

	clickUser = async (e)=>{
		  //console.log(e.target.parentNode.id);
		  await this.getData(e.target.parentNode.id);
		this.setState({
			 isActive: true
		 })
	 }

	async getData(userId){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/profile/user/"+userId, config)
			const boookingsVar = await axios.get("/booking/userLength/"+userId, config);
			//console.log(res)
			// this.setState({ _id: res.data._id})
			this.setState({name: res.data.name});
			this.setState({email: res.data.email});
			this.setState({phone: "+" + res.data.phone.country + "-" + res.data.phone.digits});
			this.setState({status: res.data.status});
		//	this.setState({approvedstatus: "Active"});
			this.setState({bookings: boookingsVar.data.Length});
			this.setState({cancelbookings: boookingsVar.data.canceledLength});
			this.setState({wallet: res.data.wallet});
			this.setState({src: res.data.avatar});
			this.setState({level: res.data.level});
			console.log(res.data.level)
		} catch(err) {
			console.log(err.response)
		}
	}

	async loadData(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get('/profile', config).then(res => {
				var names = res.data
				//console.log(names)
				names.sort((a, b) => a.status - b.status);
				//console.log(names)
            	this.setState({names : names})
			})
		} catch(err) {
			console.log(err.response)
		}
	}

	componentDidMount(){
		this.loadData();
	}

	render() {
		return (
			<Fragment>
			    <br />
			    <h1 className="large text-primary">User Approval</h1>
			    <br />
			    <div style={{ width: "90%", margin: "auto"}}>
					<div style={{ width: "50%", float: "left",borderRight: "1px solid grey", height: "60vh"}}>
						<table style={{ width: "50%"}}>
							<tbody>
										{this.state.names.map(d => {
											//console.log(d)
											var colourvar = "#000", approve = 'none',unapprove = 'block';
											if(d.status == 1){
												approve = 'block'
												unapprove = 'none'
												colourvar = 'green'
											}else if(d.status == 0){
												unapprove = 'none'
												colourvar = 'red'
											}
											return (
											<tr>
												<td	style={{color : colourvar, textAlign: "left"}}>{d.name} &nbsp;</td>
												<td><i className="fas fa-eye" onClick = {e => this.clickUser(e)} 
												style={{marginLeft: "50px", float: "right"}}></i></td>
													
												<td>
													<i className="fa fa-check" 
													style={{display : approve, float: "right"}}
													onClick = {e => this.approveUser(e)}></i>
													
													<i className="fas fa-times"
													style={{display : unapprove, float: "right", marginLeft: "50px"}} 
													onClick = {e => this.unapproveUser(e)}></i>
												</td>
											</tr>
											)
										})} 
							</tbody>
						</table>
					</div>
					
					<div style={{ width: "50%", float: "right"}}>
						{this.state.isActive ? <Fragment>
							<img
								class="round-img"
								style={{ width: '150px', height: '150px' }}
								src={this.state.src}
								alt=""
							/>
							<div style={{ width: '60%', textAlign: "left", margin: "auto"}}>
							<h1 class="lead">{this.state.name}</h1>
								<p><strong>Email:</strong> &nbsp; {this.state.email}</p>
								<br />
								<p><strong>Phone No:</strong> &nbsp; {this.state.phone}</p>
								<br />
								<p><strong>Status:</strong> &nbsp;
									{this.state.status ? ((this.state.status == 1) ? <p disabled={true}>Unapproved</p> :
										<p disabled={true}>Approved</p>) 
										: 
										<p disabled={true}>Inactive</p>
									} 
								</p>
								<br />
								<p><strong>Level: </strong> &nbsp; {this.state.level}</p>
								<br />
								<p><strong>Successfull Bookings: </strong> &nbsp; {this.state.bookings}</p>
								<p><strong>Cancel Bookings: </strong> &nbsp; {this.state.cancelbookings}</p>
								
								<br />
								<p style={{ display: "flex"}}>
									<strong>Current Balance: $</strong> &nbsp;
									<ContentEditable
										style={{ width: "100px"}}
										html={this.state.wallet}	
										innerRef={this.contentEditable}
										disabled={false}       // use true to disable editing
									/>
									<button style={{border: "none", background: "#841e2d", borderRadius: "5px", color: "#fff", padding: "3px"}} onChange={this.handleChange}>
										<i className="fas fa-check"></i> 
									&nbsp;Done</button>
								</p>
							</div>
						</Fragment> : <h1>No User Selected</h1> }
					</div>
				</div>
			</Fragment>
		)
	}
}