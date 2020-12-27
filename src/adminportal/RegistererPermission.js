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
			src:false
		}
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

	async getData(userId){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/profile/user/"+userId, config)
			const boookingsVar = await axios.get("/booking/userLength", config);
			// this.setState({ _id: res.data._id})
			this.setState({name: res.data.name});
			this.setState({email: res.data.email});
			this.setState({phone: "+" + res.data.phone.country + "-" + res.data.phone.digits});
			this.setState({status: "Approve"});
			this.setState({approvedstatus: "Active"});
			this.setState({bookings: boookingsVar.data.Length});
			this.setState({wallet: res.data.wallet});
			this.setState({src: res.data.avatar});
		} catch(err) {
			
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
				console.log(names);
            	this.setState({names : names})
			})
		} catch(err) {
			
		}
	}

	componentDidMount(){
		this.loadData();
		this.getData();
	}

	render() {
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
									<ul style={{ textAlign: "left", cursor: "pointer"}} onClick={this.handleShow}>
										{this.state.names.map(d => (<li key={d.id}>{d.name}</li>))} 
									</ul>
								</tr>
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
									{this.state.isAuthenticated ? 
										<button className="btn">{this.state.status}</button> 
										: 
										<p style={{color: "#842e5d"}}>{this.state.approvedstatus}</p>
									} 
								</p>
								<br />
								<p><strong>Total Bookings: </strong> &nbsp; {this.state.bookings}</p>
								<br />
								<p style={{ display: "flex"}}>
									<strong>Current Balance: $</strong> &nbsp;{this.state.wallet}	
									<ContentEditable
										style={{ width: "100px"}}	
										innerRef={this.contentEditable}
										disabled={false}       // use true to disable editing
									/>
									<button className="btn btn-primary" onChange={this.handleChange}>
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