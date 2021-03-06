

import React, { Fragment , Component } from 'react';
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
			orignalWallet: 0,
			isChange: "none",
		}
	};
	
	handleChange = (evt) => {
		console.log("jhj")
		if(evt.target.value == this.state.orignalWallet){
			this.setState({isChange:"none"});
		}else{
			this.setState({isChange:"block"});
		}
		// this.state._id , evt.target.value
		this.setState({wallet: evt.target.value});
	};

	updateWallet = async () => {
		this.setState({isChange:"none"});
		// this.state._id , this.state.wallet,  orignalWallet : evt.target.value
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/wallet/"+this.state._id+"/"+this.state.wallet, config);
			console.log(res.data)
			this.setState({orignalWallet : this.state.wallet})
			//this.setState({level: res.data.level, originallevel: res.data.level});
		} catch(err) {
			console.log(err.response)
		}
		this.setState({
			isChange: false,
			originallevel: this.state.level,
		})
		
	};

	state = {
		isActive:false
	 }
	
	approveUser = async (e) => {
		//console.log(e.target.getAttribute("data-value"));
		//console.log(e.target.getAttribute("data-value"))
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			
			const res = await axios.get("/profile/approve/"+e.target.value, config)
			const namesvar = this.state.names;
			//await this.getData(e.target.getAttribute("data-value"));
			let obj = namesvar.find((o, i) => {
				if (o._id === e.target.value) {
					namesvar[i].status = 2
					return true; // stop searching
				}
			});
			//console.log(namesvar)
			this.setState({status: "Approved"});
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
			const res = await axios.get("/profile/unapprove/"+e.target.value, config)
			//await this.getData(e.target.getAttribute("data-value"));
			this.setState({status: 1});
			const namesvar = this.state.names;
			let obj = namesvar.find((o, i) => {
				if (o._id === e.target.value) {
					namesvar[i].status = 1
					return true; // stop searching
				}
			});
			//console.log(namesvar)
			
			this.setState({names : namesvar})
		} catch(err) {
			console.log(err.response)
		}
	}

	clickUser = async (e)=>{
		console.log(e.target.getAttribute("data-value"));
		this.setState({	isActive: false }) 
		await this.getData(e.target.value);
		
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
			this.setState({ _id: res.data._id})
			this.setState({name: res.data.name});
			this.setState({email: res.data.email.toLowerCase()});
			this.setState({phone: "+" + res.data.phone.country + "-" + res.data.phone.digits});
			this.setState({status: res.data.status});
		//	this.setState({approvedstatus: "Active"});
			this.setState({bookings: boookingsVar.data.Length});
			this.setState({cancelbookings: boookingsVar.data.canceledLength});
			this.setState({wallet: res.data.wallet});
			this.setState({orignalWallet: res.data.wallet});
			this.setState({src: res.data.avatar});
			this.setState({level: res.data.level});
			//console.log(res.data.level)
			this.setState({	isActive: true })
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
    
var data = JSON.parse(localStorage.getItem("USER"));
console.log("datahere", localStorage.getItem("USER"));
try {
  if (data.loginstatus === 1 && data.role === "admin") {
  } else {
    this.props.history.replace("/signin");
  }
} catch {
  this.props.history.replace("/signin");
}
		this.loadData();
	}

	render() {
		return (
			<Fragment>
			    <br />
			    <h1 className="large text-primary">User Approval</h1>
			    <br />
			    <div style={{ width: "90%", margin: "auto"}}>
					<div style={{ width: "50%", float: "left",borderRight: "1px solid grey",
					 height: "100vh",overflowX: "hidden", overflowY: "scroll"}}>
						<table style={{ width: "80%"}} className="table">
							<tbody>
									<th style={{color: "#841e2d", textAlign: "left"}}>Names</th>
									<th></th>
									<th></th>
									<br />
									<br />
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
											<tr	><td data-value={d._id} style={{color : colourvar, textAlign: "left"}}>{d.name} &nbsp;</td>
												<td><button className="fas fa-eye" value={d._id} onClick = {e => this.clickUser(e)} 
													style={{marginLeft: "50px", float: "right", background: "#841e2d",
													 padding: "4px", border: "none", color: "#fff", borderRadius: "5px"}}>&nbsp; View</button>
													</td>
													<td  data-value={d._id}>
													<button className="fa fa-check"  value={d._id}
													style={{display : approve, float: "right", background: "#841e2d",
													 padding: "4px", border: "none", color: "#fff", borderRadius: "5px"}}
													onClick = {e => this.approveUser(e)}>&nbsp; Approve</button>
													
													<button className="fas fa-times"  value={d._id}
													style={{display : unapprove, float: "right", marginLeft: "50px", background: "#841e2d",
													 padding: "4px", border: "none", color: "#fff", borderRadius: "5px"}} 
													onClick = {e => this.unapproveUser(e)}>&nbsp; Unapprove</button>
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
							<h1 class="lead">{this.state.name.toUpperCase()}</h1>
								<p><strong>Email:</strong> &nbsp; {this.state.email.toLowerCase()}</p>
								<br />
								<p><strong>Phone No:</strong> &nbsp; {this.state.phone}</p>
								<br />
								<p><strong>Status:</strong> &nbsp;
									{this.state.status ? ((this.state.status == 1) ? <button disabled={true} style={{border: "none", background: "none", color: "#000"}}>Unapproved</button> :
										<button disabled={true}  style={{border: "none", background: "none", color: "#000"}}>Approved</button>) 
										: 
										<button disabled={true}  style={{border: "none", background: "none", color: "#000"}}>Inactive</button>
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
									<input type={Number}
										style={{ width: "100px"}}
										min = {0}
										defaultValue={this.state.wallet}	
										//innerRef={this.contentEditable}
										onChange={e => this.handleChange(e)}
										onkeypress={e => this.handleChange(e)} 
										onpaste={e => this.handleChange(e)} 
										oninput={e => this.handleChange(e)}     // use true to disable editing
									/>
									<button style={{ border: "none", background: "#841e2d", borderRadius: "5px", 
									color: "#fff", padding: "3px" , display : this.state.isChange}}  onClick = {this.updateWallet}>
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