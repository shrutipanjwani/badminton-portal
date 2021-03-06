import React, {	Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PictureUploader from "./pictureUploader";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const stripePromise = loadStripe("pk_test_51HysuDFhf22CW4TepnCI6ZofveEBAxNFymCNlFW27S1zsShT6ToZMCNdQPZfvDMrfLDD4EOsLOgDfh12Y6DVt10L00VQ0ZYiuP");

export default class Wallet extends React.Component {


	constructor(props){
    	super(props);
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		this.state = {
			name :"",
			email : "",
			phone : "",
			status : "",
			bookings : 0,
			wallet : 0,
			addToWallet: 0,
			src:false, 
			level: "Basic",
			originallevel: "Basic",
			isChange: false,
		}
		this.handleClick=this.handleClick.bind(this);
  	}
	

	async handleClick() {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const stripe = await stripePromise;
		try{

			const response = await axios.post("/wallet/create-checkout-session/"+this.state.addToWallet, config);
			// When the customer clicks on the button, redirect them to Checkout.
			const result = await stripe.redirectToCheckout({
				sessionId: response.data.id,
			});
			
			if (result.error) {
				confirmAlert({title: 'Lets Badminton',message: 'Please check your Internet Connection',
            	buttons: [{label: 'Ok',onClick: () => {}}]});
				//alert("Please check your Internet Connection");
			}
		}catch(err){
			if(err.response.data.msg){
				confirmAlert({title: 'Lets Badminton',message: err.response.data,
            	buttons: [{label: 'Ok',onClick: () => {}}]});
				//alert(err.response.data);
			}else {
				confirmAlert({title: 'Lets Badminton',message: err.response.data,
            	buttons: [{label: 'Ok',onClick: () => {}}]});
			//alert(err.response.data);}
			console.log(err);
		}	
	}
}
	
	async getData() {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		var sessionId = this.props.match.params.sessionId

		if(sessionId){
			try{ 
				const resCheckout = await axios.post('/wallet/check-payement/'+sessionId ,config);
				await this.loadData();
				if(resCheckout.data === "Success"){
					confirmAlert({title: 'Lets Badminton',message: "Payment Successfull",
            		buttons: [{label: 'Ok',onClick: () => {}}]});
					//alert("Payment Successfull");
				}else if(resCheckout.data === "Failed"){
					confirmAlert({title: 'Lets Badminton',message: "Payment Failed",
            		buttons: [{label: 'Ok',onClick: () => {}}]});
					//alert("Payment Failed");
				}
				this.props.history.replace('/wallet');
			}catch(err){
				await this.loadData();
				confirmAlert({title: 'Lets Badminton',message: "invalid_request_error",
            	buttons: [{label: 'Ok',onClick: () => {}}]});
				//alert("invalid_request_error");
				this.props.history.replace('/wallet');
			}
		}else{
			await this.loadData();
		}		
	}

	async loadData(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get('/auth/', config);
			const boookingsVar = await axios.get("/booking/userLength", config);
			this.setState({name: res.data.name});
			this.setState({email: res.data.email.toLowerCase()});
			this.setState({phone: "+" + res.data.phone.country + "-" + res.data.phone.digits});
			this.setState({bookings: boookingsVar.data.Length});
			this.setState({wallet: res.data.wallet});
			this.setState({src: res.data.avatar});
			if(res.data.level){
				this.setState({
					level: res.data.level
				});
			}
			//var token = this.props.match.params.token;
		} catch(err) {
			
		}
	}

	componentDidMount(){

		var data= JSON.parse(localStorage.getItem("USER"))
		console.log("datahere",localStorage.getItem("USER"))
		try{    
		  if(data.loginstatus===1 && data.role==="Member"){
	
		} 
		else{
		  alert("wrongpath");
		  this.props.history.replace('/signin');
	
		}}
		catch{
		  this.props.history.replace('/signin');
		}
	
	
		this.getData();
	  }
	  
	handleIsChange  = async (e)=> {
		if(e.target.value === this.state.originallevel){
			this.setState({
				isChange: false,
				level: e.target.value
			})
		} else {
			this.setState({
				isChange: true,
				level: e.target.value
			})
		}
	}

	handleIsChanged  = async ()=> {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get("/profile/level/"+this.state.level, config);
			console.log(res.data)
			//this.setState({level: res.data.level, originallevel: res.data.level});
		} catch(err) {
			console.log(err.response)
		}
		this.setState({
			isChange: false,
			originallevel: this.state.level,
		})
	}

	render() {
		return (
			<Fragment>
				<div className="gradient"  style={{ float: 'left', width: '55%', height: "100vh",
				color: "#fff"}}>
					<PictureUploader data={this.state.src}/>
					<div style={{ width: '60%', textAlign: "left", margin: "auto"}}>
					<h1 class="lead">{this.state.name.toUpperCase()}</h1>
						<p><strong>Email:</strong> &nbsp; {this.state.email.toLowerCase()}</p>
						<br />
						<p><strong>Phone No:</strong> &nbsp; {this.state.phone}</p>
						<br />
						<p><strong>Total Bookings: </strong> &nbsp; {this.state.bookings}</p>
						<br />
						<p style={{display: "flex"}}>
							<div><strong>Level: </strong> &nbsp;</div>
							<div className="form-group">
								<select
									style={{ padding: "4px"}}
									name="level"
									value={this.state.level}
									onChange={(e) => this.handleIsChange(e)}
									required
								>
									<option value="Basic" selected>Basic</option>
									<option value="Low Intermediate">Low Intermediate</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Advanced">Advanced</option>
								</select>
								{this.state.isChange ? <button onClick={this.handleIsChanged}>Save</button> : ""}
							</div>
						</p>
					</div>
				</div>
				<div style={{ float: 'right', width: '45%'}}>
					<h1 className="large text-primary" style={{marginTop: '150px'}}>Wallet</h1>
					<Card>
					<CardContent>
						<Typography className="text-primary" color="textSecondary">
							Current Balance: ${this.state.wallet}
						</Typography>
						<br />
						<input type="number" value={this.state.addToWallet} 
						onChange={event => this.setState({addToWallet: event.target.value.replace(/\D/,'')})} 
						style={{ padding: '0.4rem' ,fontSize: '1.2rem', border: '1px solid #ccc' }}/>
					</CardContent>
					<CardActions>
						<Button size="small" className="text-primary" onClick={this.handleClick}>
							&nbsp; Add Money to your wallet &nbsp;
							<ArrowRightAltIcon />
						</Button>
					</CardActions>
					</Card>
				</div>
			</Fragment>
		);
	}
}
