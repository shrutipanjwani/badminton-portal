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
import EditTime from './adminportal/EditTime';
import EditCourt from './adminportal/EditCourt';
import Booking from './adminportal/Booking';
import RegistererPermission from './adminportal/RegistererPermission';
import Home from "./components/Home";


//Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Link to="/signup">signup </Link>

          <Link to="/signin">signin </Link>

          <Link to="/resetpassword">resetpass </Link>

          <Link to="/logout">logout </Link>

          <Link to="/admin">admin </Link>

          <Link to="/calendar">calender </Link>
          <Link to="/wallet">Wallet </Link>

          <Link to="/profile">Profile </Link>
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
              {/* Admin Portal */}
              <Route exact path='/edittime' component={EditTime}/>
              <Route exact path='/editcourt' component={EditCourt}/>
              <Route exact path='/permission' component={RegistererPermission}/>
              <Route exact path='/booking' component={Booking}/>
            </Switch>
          </section>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
