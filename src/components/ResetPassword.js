import React, { useState } from 'react';
import {Redirect, Link} from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import './Style.css'
import FormikControl from './FormikControl';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      margin: 'auto',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
    field: {
      margin: '20px',
      padding: '8px',
    },
    field5: {
      margin: '0px',
      padding: '9px',
      width: '150px',
    },
    dflex: {
      display: 'inline-flex',
      padding: '20px',
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
    center: {
      margin: 'auto',
      marginRight: '10px',
    },
}));


function ResetPassword () {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  const styles = {
    center: {
      textAlign: 'center',
    },
  }

  const initialValues = {
    oldpassword: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match!')
      .required('Required!'),
  })

  const onSubmit = values => {
    console.log('Form data', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form className={classes.form}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <VpnKeyIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
            </div>
            <FormikControl
              control='input'
              type='password'
              placeholder='Old Password'
              name='oldpassword'
              className={classes.field}
            />
            <FormikControl
              control='input'
              type='password'
              placeholder='New Password'
              name='password'
              className={classes.field}
            />
            <FormikControl
              control='input'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              className={classes.field}
            />
            <Link to="/signin">Go back</Link>
            <br />
            <Button className={classes.submit} type='submit' disabled={!formik.isValid} 
            variant="outlined" onClick={handleClickOpen}>
              Change Password
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogContent id="form-dialog-title">
              <DialogContentText style={styles.center}>
                Your password has been successfully changed!
                <br />
                <br />
                <Button type='submit'
                variant="outlined" color="primary" onClick={handleClose}>
                  OK
                </Button>
              </DialogContentText>
            </DialogContent>
            </Dialog>
          </Form>
        )
      }}
    </Formik>
  );
};

export default ResetPassword;