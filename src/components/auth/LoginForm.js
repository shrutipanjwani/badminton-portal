import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import axios from "axios";
import { login } from '../../actions/auth';

const Login = ({  isAuthenticated, setAlert , login , isAdmin}) => {
  const params = useParams();
  useEffect(() => {
        // if(!props.fetched) {
        //     props.fetchRules();
        // }
        if(params.verifydetails !== undefined ){
          if(params.verifydetails){
            setAlert("You are verified, Please ask admin to approve." ,  "danger")
          }
          else{
            setAlert("Verification failed , Link is not correct" ,  "danger")
          }
        }
    }, []);
  const [open, setOpen] = useState(false);

  const [start, setStart] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleCloseEmailRequest() {
    setStart(false);
  }


  function handleClickOpenEmailRequest() {
      setStart(true);
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();  
    login(email, password);
  };

    const styles = {
      center: {
        textAlign: "center",
      },
    };

    const submitForm = async (e) => {
      const params = {
        params: {
          "email": email,
        },
      };
      var res;
      e.preventDefault();

      try {
        await axios.get("/users/resetpasswordmail", params);
        //console.log(res);
        handleClickOpenEmailRequest(true)
      } catch (err) {
        if (err.response.data.errors[0].msg) {
          setAlert(err.response.data.errors[0].msg, "danger");
        }
        else {
          setAlert("Something went Wrong, Please retry");
        }
        //console.log(err.response.data.errors[0].msg)
      }
    }

    if (isAuthenticated) {
     // console.log(isAdmin)
      if(isAdmin){
        //console.log(isAdmin)
       return <Redirect to='/permission' />;
      }else{
        //console.log(isAdmin)
       return <Redirect to='/calendar' />;
      }
    }

    
    return <Fragment>
        <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <Alert />
            <p onClick={handleClickOpen} style={{ cursor: 'pointer'}}>Forgot Password?</p>
            <br />
            <br />
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="resetpassword"
            >
              <DialogContent id="resetpassword">
                  <DialogContentText style={styles.center}>
                    Enter Your Registered Email to Reset Password
                    <form onSubmit={(e) => submitForm(e)}>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          style={{ padding: '10px', width: '250px', marginTop: '20px'}}
                        />
                      </div>
                      <br />
                      <br />
                      <input type="submit" className="btn btn-primary" value="Send Reset Password Email"  onClick={handleClose}/>
                    </form>
                  </DialogContentText>
              </DialogContent>
            </Dialog>
            <Dialog
              open={start}
              onClose={handleCloseEmailRequest}
              aria-labelledby="emailrequest"
            >
              <DialogContent id="emailrequest">
                  <DialogContentText style={styles.center}>
                    <p>Email to Reset Password has been sent to {email}.</p>
                    <p>Please Check in 2-3 Minutes</p>
                    <br />
                    <br />
                    <input type="submit" className="btn btn-primary" value="OK"  onClick={handleCloseEmailRequest}/>
                  </DialogContentText>
              </DialogContent>
            </Dialog>
          <p className="my-1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </Fragment>
    
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, {setAlert, login})(Login);