import React,  { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegistrationForm';
import ResetPassword from './components/auth/ResetPassword';
import CalendarPage from './components/calendar/Calendar';
// import Profile from './components/profile/Profile';
import Wallet from './components/wallet/Wallet';
import EditTime from './adminportal/EditTime';
import EditCourt from './adminportal/EditCourt';
import Booking from './adminportal/Booking';
import RegistererPermission from './adminportal/RegistererPermission';
import Landing from "./components/layout/Landing";
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import UserBooking from './components/Booking/Booking';


//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Fragment>
          <Navbar className="Nav" />
          <div className="main">
          <Route exact path='/' component={Landing} />
          <section className="container1">
            <Switch>
              <Route exact path='/signup' component={Register}/>
              <Route exact path='/signin' component={Login}/>
              <Route exact path='/resetpassword/:email/:token' component={ResetPassword}/>
              <Route exact path='/calendar' component={CalendarPage}/>
              <Route exact path='/wallet' component={Wallet}/>

              {/* Admin Portal */}
              <Route exact path='/edittime' component={EditTime}/>
              <Route exact path='/editcourt' component={EditCourt}/>
              <Route exact path='/permission' component={RegistererPermission}/>
              <Route exact path='/booking' component={Booking}/>
              <Route exact path='/UserBooking' component={UserBooking}/>
              {/*Error Page*/}
              <Route component={NotFound} />
            </Switch>
          </section>
          </div>
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
