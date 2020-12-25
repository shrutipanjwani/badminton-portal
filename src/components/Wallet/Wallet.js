import React, {	Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import img from '../../img/user.png';
import PictureUploader from "./pictureUploader";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';


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
			addToWallet: 0
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
				alert("Please check your Internet Connection");
			}
		}catch(err){
			if(err.response.data.msg){
				alert(err.response.data);
			}else {
			alert(err.response.data);}
			console.log(err);
		}	
	};
	
	async  getData(){
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
					alert("Payment Successfull");
				}else if(resCheckout.data === "Failed"){
					alert("Payment Failed");
				}
				this.props.history.replace('/wallet');
			}catch(err){
				await this.loadData();
				alert("invalid_request_error");
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
			const boookingsVar = await axios.get("/booking/user", config);
			this.setState({name: res.data.name});
			this.setState({email: res.data.email});
			this.setState({phone: "+" + res.data.phone.country + "-" + res.data.phone.digits});
			this.setState({status: "Active"});
			this.setState({bookings: boookingsVar.data.Length});
			this.setState({wallet: res.data.wallet});

			//var token = this.props.match.params.token;
		} catch(err) {
			
		}
	}

	componentDidMount(){
    	this.getData();
  	}

	render() {
		return (
			<Fragment>
				<div className="gradient"  style={{ float: 'left', width: '55%', height: "100vh",
				color: "#fff"}}>
					{/* <img
						class="round-img my-3"
						style={{ width: '150px', height: '150px' }}
						src={img}
						alt=""
					/> */}
					<PictureUploader/>
					<div style={{ width: '60%', textAlign: "left", margin: "auto"}}>
					<h1 class="lead">{this.state.name}</h1>
						<p><strong>Email:</strong> &nbsp; {this.state.email}</p>
						<br />
						<p><strong>Phone No:</strong> &nbsp; {this.state.phone}</p>
						<br />
						<p><strong>Status:</strong> &nbsp; {this.state.status}</p>
						<br />
						<p><strong>Total Bookings: </strong> &nbsp; {this.state.bookings}</p>
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
						<input type="number" value={this.state.addToWallet} onChange={event => this.setState({addToWallet: event.target.value.replace(/\D/,'')})} style={{ padding: '0.4rem' ,fontSize: '1.2rem', border: '1px solid #ccc' }}/>
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
