import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export default class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    
    const token = localStorage.getItem("token")

    let loggedIn = true 
      if( token == null){
        loggedIn = false
      }

      this.state = {
        email: '',
        password: '',
        loggedIn
      }

    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e){
    e.preventDefault()
    const { email, password } = this.state

    if(email === "sp@gmail.com" && password === "123456"){
      localStorage.setItem("token", "tgvygbipiyc335se")
      this.setState({
        loggedIn: true
      })
    }
  }

  render() {

    if(this.state.loggedIn){
      return <Redirect to="/admin" />
    }

    return (
      <Formik>
        {formik => {
          return (
            <Form style={{ width: '100%', marginTop: '20px', margin: 'auto' }} onSubmit={this.submitForm}>
              <div style={{ marginTop: '80px',display: 'flex',flexDirection: 'column',
              alignItems: 'center' }}>
                <Avatar style={{ margin: '10px',backgroundColor: '#6200EE'}}>
                  <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
              </div>
              <FormikControl
                control='input'
                type='email'
                placeholder='Email'
                name='email'
                style={{ margin: '20px',padding: '8px'}}
                value={this.state.email}
                onChange={this.onChange}
              />
              <FormikControl
                control='input'
                type='password'
                placeholder='Password'
                name='password'
                style={{ margin: '20px',padding: '8px'}}
                value={this.state.onChange}
                onChange={this.onChange}
              />
              <Link to="/resetpassword">Forgot Password?</Link>
              <br />
              <Button type='submit' style={{ margin: '10px',
                backgroundColor:'#6200EE', color: '#fff'}}>Submit</Button>
            </Form>
          )
        }}
      </Formik>
    )
  }
}