import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { resetpassword } from '../../actions/auth';
import { useParams } from 'react-router-dom';

const ResetPassword = ({ setAlert, resetpassword }) => {
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

  const params = useParams();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const { password, confirmPassword } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    //console.log(params);
    
    if (password !== confirmPassword) {
      setAlert("Password do not match", "danger");
    } else {
     
      const res = await resetpassword(params.email, params.token, password);
      
      if(res){
        handleClickOpen(true);
      }
    }
  };
  
    return (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary" style={{marginTop: '50px'}}>Reset Password</h1>
          <form className="form" onSubmit={e => onSubmit(e)}>
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
            <Alert />
            <input type="submit" className="btn btn-primary" value="Reset Password"/>
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
                  <Link style={{ width: '130px'}} className="btn btn-primary" to="/signin">Sign back in</Link>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </form>
        </section>
    </Fragment>
    );
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetpassword: PropTypes.func.isRequired
};

export default connect(null, { setAlert, resetpassword })(ResetPassword);