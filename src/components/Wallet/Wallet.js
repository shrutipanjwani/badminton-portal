import React, {	Fragment ,useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import img from '../../img/user.png'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51HysuDFhf22CW4TepnCI6ZofveEBAxNFymCNlFW27S1zsShT6ToZMCNdQPZfvDMrfLDD4EOsLOgDfh12Y6DVt10L00VQ0ZYiuP");

function Wallet() {
	const [message, setMessage] = useState("");
	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
		setMessage("Order placed! You will receive an email confirmation.");
		}
		if (query.get("canceled")) {
		setMessage(
			"Order canceled -- continue to shop around and checkout when you're ready."
		);
		}
	}, []);
	
	let history = useHistory();
	
	const handleClick = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const stripe = await stripePromise;
		const response = await axios.post("/wallet/create-checkout-session", config);
		console.log(response);
		// When the customer clicks on the button, redirect them to Checkout.
		const result = await stripe.redirectToCheckout({
			sessionId: response.data.id,
		});
		if (result.error) {
		// If `redirectToCheckout` fails due to a browser or network
		// error, display the localized error message to your customer
		// using `result.error.message`.
		}
	};

	const name = "John Doe"
	const email = "shrutipanjwani@gmail.com";
	const phone = "9030320393";
	const status = "active";
	const bookings = "12"

	return (
		<Fragment>
			<div className="gradient"  style={{ float: 'left', width: '55%', height: "100vh",
			color: "#fff"}}>
				<img
					class="round-img my-3"
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
				</div>
			</div>
			<div style={{ float: 'right', width: '45%'}}>
				<h1 className="large text-primary" style={{marginTop: '150px'}}>Wallet</h1>
				<Card>
				<CardContent>
					<Typography className="text-primary" color="textSecondary">
						Current Balance: $0
					</Typography>
					<br />
					<input type="number" style={{ padding: '0.4rem' ,fontSize: '1.2rem', border: '1px solid #ccc' }}/>
				</CardContent>
				<CardActions>
					<Button size="small" className="text-primary" onClick={handleClick}>
						&nbsp; Add Money to your wallet &nbsp;
						<ArrowRightAltIcon />
					</Button>
				</CardActions>
				</Card>
			</div>
		</Fragment>
	);
}

export default Wallet;