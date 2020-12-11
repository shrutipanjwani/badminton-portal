import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';

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
  table: {
    width: 450,
    margin: 'auto',
  },
  button: {
  	backgroundColor: '#6200EE',
  	color: '#ffffff',
  },
  cursor: {
  	cursor: 'pointer',
  },
}));

const styles = {
    center: {
      textAlign: 'center',
    },
}

function createData(name, approve, select, unapprove) {
  return { name, approve, select, unapprove };
}



const RegistererPermission = () => {
	const classes = useStyles();

	const [state, setState] = React.useState({
	    checkedA: true,
	    checkedB: true,
	  });

	  const handleChange = (event) => {
	    setState({ ...state, [event.target.name]: event.target.checked });
	};
	const rows = [
	  createData('John Doe',
	  	<Button>Approve</Button>,
	  	<Switch
	        checked={state.checkedA}
	        onChange={handleChange}
	        name="checkedA"
	        color="primary"
	        inputProps={{ 'aria-label': 'primary checkbox' }}
	    />,
	    <Button>Unapprove</Button>,
	  ),
	  createData('Kevin Smith', 
	  	<Button>Approve</Button>,
	  	<Switch
	        checked={state.checkedB}
	        onChange={handleChange}
	        name="checkedB"
	        color="primary"
	        inputProps={{ 'aria-label': 'primary checkbox' }}
	    />,
	  	<Button>Unapprove</Button>,
	  ),
	  createData('Mari Mathew', 
	  	<Button>Approve</Button>,
	  	<Switch
	        checked={state.checkedC}
	        onChange={handleChange}
	        name="checkedC"
	        color="primary"
	        inputProps={{ 'aria-label': 'primary checkbox' }}
	    />,
	  	<Button>Unapprove</Button>,
	  ),
	  createData('Brad Traversy', 
	  	<Button>Approve</Button>,
	  	<Switch
	        checked={state.checkedD}
	        onChange={handleChange}
	        name="checkedD"
	        color="primary"
	        inputProps={{ 'aria-label': 'primary checkbox' }}
	    />,
	  	<Button>Unapprove</Button>,
	  ),
	  createData('John Smith',
	  	<Button>Approve</Button>,
	  	<Switch
	        checked={state.checkedF}
	        onChange={handleChange}
	        name="checkedF"
	        color="primary"
	        inputProps={{ 'aria-label': 'primary checkbox' }}
	    />,
	  	<Button>Unapprove</Button>,
	  ),
	];
	
	return (
		<Fragment>
			<div className={classes.root}>
		      <AppBar position="static">
		        <Toolbar>
		          <Typography variant="h6" className={classes.title}>
		            Admin Portal
		          </Typography>
		        </Toolbar>
		      </AppBar>
		    </div>
		    <br />
		    <Typography>Approve / Unapprove People</Typography>
		    <br />
		    <Card className={classes.card}>
		      	<TableContainer>
			      <Table className={classes.table} id="table" aria-label="simple table">
			        <TableBody>
			          {rows.map((row) => (
			            <TableRow key={row.name}>
			              <TableCell component="th" scope="row">
			                {row.name}
			              </TableCell>
			              <TableCell align="right">{row.select}</TableCell>
			            </TableRow>
			          ))}
			        </TableBody>
			      </Table>
			    </TableContainer>
			    <br />
			    <br />
		      <CardActions>
		        <Button type="submit" size="medium">
		        Done</Button>
		      </CardActions>
		    </Card>
		</Fragment>
	);
}

export default RegistererPermission;