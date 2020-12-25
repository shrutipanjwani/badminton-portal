import React, { Fragment, Component } from "react";
import axios from "axios";
import Form from "./FormTwo";
import Modal from "../Modal";
import ReactDOM from "react-dom";
import moment from 'moment';
class NewBooking extends Component {
  
  state = {
    data: [],
    editIdx: -1,
    isActive:false,
    isDisplay: false,
    courts : [],
    show: false,
    alertmsg : ""
  };

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  handleStart = ()=>{
    console.log(this.state.data);
  }

  async checkWallet(submission) {
  try{
      var index = this.state.courts.findIndex(x => x.court_name === submission.courtName);
      var rqamount = 0 , players = 0;
      var startTime=moment(submission.startTime, "HH:mm:ss");
      var endTime=moment(submission.endTime, "HH:mm:ss");
      var duration = moment.duration(endTime.diff(startTime));
      var hours = parseFloat(duration.asHours());

      let totamount = parseInt(this.state.courts[index].price)*(hours);
      console.log(submission.start_time);console.log(endTime);console.log(startTime);console.log(hours);
      if(parseInt(submission.bookingType) == 0){
        rqamount = totamount;
      }else{
        players = parseInt(submission.bookingType)*2;
        rqamount = totamount/players ;
      }
      const config = {
		    headers: {
			    'Content-Type': 'application/json'
		    }
	    };
      var userdata = await axios.get('/auth/', config);
      console.log(userdata.data)
      if (userdata.wallet < rqamount) {
        this.setState({
        alertmsg : "Sorry unable to reg due to low balance "
        })
        this.showModal(true)
        //alert("Sorry unable to reg due to low balance ");
        return;
      } else {
        console.log(userdata.data.wallet  , rqamount , (userdata.data.wallet - rqamount))
        if (window.confirm("Total Price :"+rqamount+"\nPress Ok To confirm ")) {
          this.newBookingFun(submission);
        } else {
          // Do nothing
        }
      }
    }catch(err) {
      this.setState({
        alertmsg : "your session is expired, login again"
      })
      this.showModal(true)
			//alert("your session is expired, login again");
			//this.setState({alert: 1});
			//logout();
			this.props.history.replace("/signin");
		}

  }

  async newBookingFun(submission){
    
    // this.setState({
    //   data: [...this.state.data, submission]
    // })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = {
      type: parseInt(submission.bookingType),
      date: submission.bookingDate,
      start_time:submission.startTime, 
      end_time: submission.endTime, 
      court:submission.courtName
    }
    try {
      const res = await axios.post('/booking/', body, config);
      this.setState({
        alertmsg : "Booking successfull"
      })
      this.showModal(true)
      //alert("Booking successfull");
    } catch (err) {
      console.log(err.response.data.errors[0]);
      this.setState({
        alertmsg : err.response.data.errors[0]
      })
      this.showModal(true)
      //alert(err.response.data.errors[0]);
    }
  }


  async getCourtDetails(){
    const config = {
		  headers: {
			  'Content-Type': 'application/json'
		  }
	  }
    try {
      const res = await axios.get('/court/', config);
      this.setState({courts : res.data})
    } catch(err) {
        console.log(err);
	  }
  }

  componentDidMount(){
    this.getCourtDetails();
  }

  render() {
    return (
        <Fragment>
          <Modal show={this.state.show} onClose={this.showModal}>{this.state.alertmsg}</Modal>
          <h1 className="large text-primary" style={{ marginTop: "50px"}}>Bookings</h1>
          <div style={{width: "100%", margin: "auto"}}>
              <div style={{ width: "50%", float: "left", borderRight: "1px solid grey"}}>
                {/* <button className="btn btn-primary" onClick={this.handleShow}>New Booking</button> */}
                <div style={{ width: "80%", margin: "auto"}}>
                  <h2>All Courts ({this.state.courts.length})</h2><br />
                  <div class="grid-container">
                     {this.state.courts.map(renderSidebarCourt)}
                  </div>
                </div>
              </div>
              <div style={{ width: "50%", float: "right"}}>        
                <Form
                  data={this.state.courts} onSubmit={submission => 
                   this.checkWallet(submission)}
                />
                <div onClick={this.handleStart} style={{ cursor: 'pointer'}}>
                </div>
              </div>
          </div>
        </Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NewBooking />, rootElement);

function renderSidebarCourt(event) {
  var colorcourt = event.colour
  return (
    <div style={{
        backgroundColor: colorcourt,
        borderRadius: '5px',
        padding: '10px',
        color: '#ffffff',
        marginBottom: '10px'
      }} class = 'grid-item'>
      <b>Court {event.court_name}</b><br />
      Court Price : $ {event.price} per hr. <br />
      <i>Time : {event.start_time} - {event.end_time}</i><br />
      {event.court_break.length == 0 ? "No Breaks" : event.court_break.map(renderSidebarbreak)}
      
    </div>
  )
}

function renderSidebarbreak(event) {
  return (<div>
      <i>Break {event.break_name} : Time {event.bstart_time} - {event.bend_time}</i></div>
  )
}
export default NewBooking;