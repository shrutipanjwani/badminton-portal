import React, {	Fragment } from 'react';
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
	const classes = useStyles();
	let history = useHistory()
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
		        <Button size="small" className="text-primary">
		        	&nbsp; Add Money to your wallet &nbsp;
		        	<ArrowRightAltIcon />
		        </Button>
		      </CardActions>
		    </Card>
		</Fragment>
	);
}

export default Wallet;