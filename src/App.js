import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Admin from './components/Admin';
import ResetPassword from './components/ResetPassword';
import RegistrationForm from './components/RegistrationForm'

function App () {
  return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/signup' component={RegistrationForm}/>
            <Route exact path='/signin' component={LoginForm}/>
            <Route exact path='/resetpassword' component={ResetPassword}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/admin' component={Admin}/>
          </Switch>
        </Router>
      </div>
  )
}

export default App
