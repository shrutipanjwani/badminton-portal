import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import axios from "axios";

const Login = ({ setAlert }) => {
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
  // constructor(props) {
  //   super(props);

  //   const token = localStorage.getItem("token");

  //   let loggedIn = true;
  //   if (token == null) {
  //     loggedIn = false;
  //   }

  //   this.state = {
  //     email: "",
  //     password: "",
  //     loggedIn,
  //   };

  //   this.onChange = this.onChange.bind(this);
  //   this.submitForm = this.submitForm.bind(this);
  // }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    var res;
    console.log("Form data", e);
    e.preventDefault();

    const idpass = {
      email: email,     
      password: password,
    };

    const body = JSON.stringify(idpass);
    console.log(body);
    try {
      res = await axios.post("/auth", body, config);
      console.log(res);
      if (res.data.role === "Member") {
        <Redirect to="/calendar" />
      } 
      if (res.data.role === "admin") {
        <Redirect to="/permission" />
      } 
    } catch (err) {
      //console.log(err.response.data.errors[0].msg)
      if (err.response.data.errors[0].msg) {
        setAlert(err.response.data.errors[0].msg, "danger");
      }
      else {
        setAlert("Something went Wrong, Please retry");
      }
    }
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
        res = await axios.get("/users/resetpasswordmail", params);
        console.log(res);
        handleClickOpenEmailRequest(true)
      } catch (err) {
        if (err.response.data.errors[0].msg) {
          setAlert(err.response.data.errors[0].msg, "danger");
        }
        else {
          setAlert("Something went Wrong, Please retry");
        }
        console.log(err.response.data.errors[0].msg)
      }
    }

    return (
      <Fragment>
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
                      <input
                        variant="outlined"
                        type="submit"
                        onClick={handleClose}
                        value="Ok"
                        style={{ padding: '10px', width: '50px', marginTop: '20px'}}
                      />
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
                    <Button
                      variant="outlined"
                      onClick={handleCloseEmailRequest}
                    >
                      <p className="text-primary">OK</p>
                    </Button>
                  </DialogContentText>
              </DialogContent>
            </Dialog>
          <p className="my-1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </Fragment>
    );
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Login);
