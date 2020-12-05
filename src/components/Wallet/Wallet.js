import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
		<>
			<div className={classes.root}>
		      <AppBar position="static">
		        <Toolbar>
		          <IconButton edge="start" className={classes.menuButton}
		          color="inherit" onClick={() => history.goBack()}>
		            <ArrowBackIcon />
		          </IconButton>
		          <Typography variant="h6" className={classes.title}>
		            My Wallet
		          </Typography>
		        </Toolbar>
		      </AppBar>
		    </div>
		    <br />
		    <Card className={classes.card}>
		      <CardContent>
		        <Typography className={classes.heading} color="textSecondary" gutterBottom>
		          Current Balance: $0
		        </Typography>
		      </CardContent>
		      <CardActions>
		        <Button size="small" color="primary" className={classes.center}>
		        	Add Money to your wallet &nbsp;
		        	<ArrowRightAltIcon />
		        </Button>
		      </CardActions>
		    </Card>
		</>
	);
}

export default Wallet;