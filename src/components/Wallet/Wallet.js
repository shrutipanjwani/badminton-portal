import React, {	Fragment ,useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51HysuDFhf22CW4TepnCI6ZofveEBAxNFymCNlFW27S1zsShT6ToZMCNdQPZfvDMrfLDD4EOsLOgDfh12Y6DVt10L00VQ0ZYiuP");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  heading: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  center: {
  	margin: 'auto',
  },
}));



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

	const classes = useStyles();
	
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
	return (
		<Fragment>
			<h1 className="large text-primary" style={{marginTop: '150px'}}>Wallet</h1>
		    <Card className={classes.card}>
		      <CardContent>
		        <Typography className="text-primary" color="textSecondary">
		          	Current Balance: $0
		        </Typography>
		      </CardContent>
		      <CardActions>
		        <Button size="small" className="text-primary" onClick={handleClick}>
		        	&nbsp; Add Money to your wallet &nbsp;
		        	<ArrowRightAltIcon />
		        </Button>
		      </CardActions>
		    </Card>
		</Fragment>
	);
}

export default Wallet;