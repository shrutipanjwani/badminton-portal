import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/LoginForm';
import Logout from './components/Logout';
import Admin from './components/Admin';
import CalendarPage from './components/Calendar/Calendar';
import Profile from './components/Profile/Profile';
import Wallet from './components/Wallet/Wallet';
import ResetPassword from './components/ResetPassword';
import Register from './components/RegistrationForm';
//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <section className="container1">
            <Switch>
              <Route exact path='/signup' component={Register}/>
              <Route exact path='/signin' component={Login}/>
              <Route exact path='/resetpassword' component={ResetPassword}/>
              <Route exact path='/logout' component={Logout}/>
              <Route exact path='/admin' component={Admin}/>
              <Route exact path='/calendar' component={CalendarPage}/>
              <Route exact path='/wallet' component={Wallet}/>
              <Route exact path='/profile' component={Profile}/>
            </Switch>
          </section>
        </Router>
      </div>
    </Provider>
  )
}

export default App
