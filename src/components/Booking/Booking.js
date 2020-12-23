import React from "react";
import axios from "axios";
//import { Button } from "@material-ui/core";

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    console.log("newdata", this.props.location.state.data);

    this.state = {
      data: props.location.state.data,
      aviSlot: null,
      total: null,
      courttype: ["Fullcourt", "singles", "Doubles"],
      userdata: null,
      tifOptions : null,
      newtifOptions : null 
    };
  }

  async getBalance() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/auth", config);
      this.setState({ userdata: res.data });
      console.log("userdata on booking page", this.state.userdata);
    } catch (err) {
      console.log(err);
    }
  }

  checkWallet() {
    var rqamount = parseInt(this.state.data.court.price) / this.state.total;

    console.log("you need this to Register", rqamount);
    if (this.state.userdata.wallet < rqamount) {
      alert("Sorry unable to reg due to low balance ");
      return;
    } else {
      if (window.confirm(
        "We are Booking u for this Slot, Your wallet balance will be " +
          (this.state.userdata.wallet - rqamount)
      )) {
        this.updatebooking(rqamount);
      } else {
        // Do nothing
      }

     
    }
  }

  async updatebooking(rqamount) {
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        "/booking/update/" + this.state.data._id + "/" + rqamount,
        config
      );
      this.getBalance();
      alert("Booking successfull");
      const player = ((this.state.aviSlot - 1) === 0 ) ? true : false;
      let newdata = this.state.data;
      newdata.court_full = player;
      this.setState ({aviSlot : this.state.aviSlot - 1 , data : newdata});
      let players = (<tr><td>{this.state.userdata.name}</td>
        <td>{this.state.userdata.email}</td>
        <td>+{this.state.userdata.phone.country}-{this.state.userdata.phone.digits}</td>
      </tr>);
      console.log (players)
      this.setState({newtifOptions : players});
    } catch (err) {
      console.log(err.response.data.errors[0]);
      alert(err.response.data.errors[0]);
    }
  }

  componentWillMount() {
    this.getBalance();
    var player = this.state.data.players.length;
    if (this.state.data.type === 1) {
      this.setState({ total: 2 });
      player = 2 - player;
      this.setState({ aviSlot: player });
    }
    if (this.state.data.type === 0) {
      this.setState({ total: 4 });
      this.setState({ aviSlot: 0 });
    }
    if (this.state.data.type === 2) {
      this.setState({ total: 4 });
      player = 4 - player;
      this.setState({ aviSlot: player });
    }
    var user = this.state.data.user;
    var tifOptionsvar = Object.keys(user).map(function(key) {
      return (<tr><td>{user[key].name}</td>
        <td>{user[key].email}</td>
        <td>+{user[key].phone.country}-{user[key].phone.digits}</td>
      </tr>);
    });
    this.setState({tifOptions : tifOptionsvar});
  }

  Canbook = () => {
    if (this.state.data.court_full === true) {
      return (
        <p style={{ color: "red" }}>
          {" "}
          Sorry, you cant book slot either due to slot unavailability or freezed by admin{" "}
        </p>
      );
    } else {
      return (
        <input
          type="submit"
          className="btn btn-primary"
          value="Join Party"
          onClick={() => this.checkWallet()}
        />
      );
    }
  };

  render() {
   
    return (
      <div style={{ width: "40%", margin: "auto" }}>
        <h1 className="large text-primary" style={{ marginTop: "50px" }}>
          Booking Details
        </h1>
      <div>
        
        <div id="badge-panel" class="tab-pane">
          <div class="skm-badge-table">
            <table class="badge-table">
              <tr>
                <td>Slots Available</td>
                <td>
                  {this.state.aviSlot} of ({this.state.total})
                </td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{this.state.data.date}</td>
              </tr>
              <tr>
                <td>Start time</td>
                <td>{this.state.data.start_time}</td>
              </tr>
              <tr>
                <td>End Time</td>
                <td>{this.state.data.end_time}</td>
              </tr>
              <tr>
                <td>Court number</td>
                <td>{this.state.data.court.court_name}</td>
              </tr>
              <tr>
                <td>Court Booking Type</td>
                <td>{this.state.courttype[this.state.data.type]}</td>
              </tr>
            </table>
          </div>
            {this.Canbook()}
            <div id="badge-panel" class="tab-pane">
              <div class="skm-badge-table">
              <table class="badge-table">
              <tr>
                <td>Players Name</td>
                <td>Email</td>
                <td>Phone Number</td>
              </tr>
              {this.state.tifOptions}
              {this.state.newtifOptions}
            </table>
            </div>
            </div>
            <br />
            {/* <input type="submit" className="btn" value="Add Player" hidden=""/> */}
          </div>
        </div>
      </div>
    );
  }
}
