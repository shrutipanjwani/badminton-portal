import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      email: "",
      password: "",
      loggedIn,
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    e.preventDefault();
    const { email, password } = this.state;

    const idpass = {
      email: this.state.email,
      password: this.state.password,
    };

    const body = JSON.stringify(idpass);
    try {
      const res = await axios.post("/auth", body, config);
      console.log(res);
      if (res) {
        console.log("logged in ");
        alert("Log suc ! Route to home page");
      }
      // handleClickOpen(true);
    } catch (err) {
      if (err.response.data.errors[0].msg == "User is not verified") {
        alert("Hi, Seems you are not verified");
      } else if (err.response.data.errors[0].msg == "Invalid credentials") {
        alert("Please enter valid credentials.");
      } 
      else if (err.response.data.errors[0].msg == "Pending approval from ADMIN") {
        alert("Please get it approved from approver.");
      }
      
      else {
        alert("Somethings went Wrong, Please retry");
      }
    }

    if (email === "sp@gmail.com" && password === "123456") {
      localStorage.setItem("token", "tgvygbipiyc335se");
      this.setState({
        loggedIn: true,
      });
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/admin" />;
    }

    return (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <form className="form" onSubmit={this.submitForm}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={this.state.onChange}
                onChange={this.onChange}
                required
              />
            </div>
            <Link to="/resetpassword">Forgot Password?</Link>
            <br />
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </Fragment>
    );
  }
}
