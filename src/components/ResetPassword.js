import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ResetPassword = ({ setAlert }) => {
  const [open, setOpen] = useState(false);
 
  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const styles = {
    center: {
      textAlign: 'center',
    },
  }

  const [formData, setFormData] = useState({
    oldpassword: '',
    password: '',
    confirmPassword: ''
  });

  const { oldpassword, password, confirmPassword } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password != confirmPassword) {
      setAlert('Password do not match', 'danger');
    } else {
      console.log('SUCCESS');
    }
  };
  
    return (
      <Fragment>
        <h1 className="large text-primary">Reset Password</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Old Password"
              name="oldpassword"
              minLength="6"
              value={oldpassword}
              onChange={e => onChange(e)} 
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)} 
              required
          />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              minLength="6"
              value={confirmPassword}
              onChange={e => onChange(e)} 
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Reset Password" onClick={handleClickOpen}/>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogContent id="form-dialog-title">
              <DialogContentText style={styles.center}>
                Your Password has been changed successfully
                <br />
                <br />
                <Button type='submit'
                variant="outlined" color="primary" onClick={handleClose}>
                  OK
                </Button>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </form>
    </Fragment>
    );
}

export default ResetPassword;