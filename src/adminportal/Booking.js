import React, { Fragment, Component } from "react";
import Form from "./FormTwo";
import Table from "./TableTwo";
import * as ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from "react-datepicker";
import Select from '@material-ui/core/Select';

import axios from "axios";
import setAuthToken from '../utils/setAuthToken';


class AdminBooking extends Component {

  constructor(props){
    super(props);
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }

      this.state = {
        bookings: [],
        data: [],
        editIdx: -1,
        courtName: "",
        isDisplay: 2,
        value: [],
        selectedOption: 'courtname',
        courts:[],
        bookingType: "",
        bookingDefaultDate: null,
        bookingDate: null,
        email: "",
        error: "",
        result: <div className="form-group">
        <input 
          type="email" 
          placeholder="Email Address"
          name="email"
          onChange={e => this.change(e)}
          required
          style={{ padding: "8px", width: "200px"}} 
        />
          <i className="fas fa-search" onClick={e => this.onSubmitEmail(e)}
          style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", 
          borderRadius: "5px",color: "#fff", cursor: "pointer"}}></i>
      </div>
      }
      
      // this.handleSelect = this.handleSelect.bind(this);
  }

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Email Search
  validateEmail = () => {
    let isError = false;
   console.log(this.state.email.indexOf('@'))
    if(this.state.email === ""){
      isError = true;
      this.setState({ error : "Please Enter Email"})
    }else if(this.state.email.indexOf('@') < 0){
      isError = true;
      this.setState({ error : "Please Enter valid Email"})
    }

    return isError;
  };

  onSubmitEmail =async e => {
    e.preventDefault();
    const err = this.validateEmail();
    if (!err) {
      try {
        const res = await axios.get('/booking/email/'+this.state.email).then(res => {
          var bookings = res.data
              this.setState({bookings : bookings})
              console.log(res.data)
        })
      } catch(err) {
        console.log(err);
      }
      // clear form 
      console.log(this.state.email)
      this.setState({error : ""});
    }
  };

  //Court Search
  validateCourt = () => {
    let isError = false;
    if(this.state.courtName === ""){
      isError = true;
      this.setState({ error : "Please select Court Name" })
    }
    return isError;
  };

  onSubmitCourt = async e => {
    e.preventDefault();
    const err = this.validateCourt();
    if (!err) {
      await this.props.onSubmitCourt(this.state);
      this.submitCourt();
      var courtname = this.state.courtName.split(' ')[1];
      var courtSelected = this.state.courtName.find( o => o.court_name === courtname);
      console.log(courtSelected._id)
      // clear form
       this.setState({error : ""});
    }
  };

  //BookingType Search
  validateBookingType = () => {
    let isError = false;
    
    if (this.state.bookingType === "") {
      isError = true;
      this.setState({ error : "Please Select Booking Type"})
    }
    
    return isError;
  };

  onSubmitBookingType = async e => {
    e.preventDefault();
    const err = this.validateBookingType();
    if (!err) {
      await this.props.onSubmitBookingType(this.state);
      this.submitBookingType();
      // clear form
      this.clear();
    }
  };
  
  //BookingDate Search
  validateBookingDate = () => {
    let isError = false;
    
    if(this.state.bookingDate === null){
      isError = true;
      this.setState({ error : "Please select Booking Date"})
    }
    return isError;
  };

  onSubmitBookingDate = async e => {
    e.preventDefault();
    const err = this.validateBookingDate();
    if (!err) {
      await this.props.onSubmitBookingDate(this.state);
      this.submitBookingDate();
      // clear form
      this.clear();
    }
  };  

  changeDate = e => {
    // this.props.onChange({ [e.target.name]: e.target.value })
    var date = new Date(e),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    date = [date.getFullYear(), mnth, day].join("-");
    this.setState({
      bookingDate: date,
      bookingDefaultDate: e
    });

  };

  changeCourt = e =>{
        this.setState({
      [e.target.name]: e.target.value});
  }

 renderCourt = (event)  => {
  return (<option value={event.court_name}>Court {event.court_name}</option>)
}

   handleSelectChange = (event) => {
     this.setState({searchType : event.target.value })
    if(event.target.value == "email"){
     this.setState({
      result: 
      <form className="form-group" onSubmit = {e => this.onSubmitEmail(e)}>
        <input 
              type="email" 
              placeholder="Email Address"
              name="email"
              onChange={e => this.change(e)}
              errorText={this.state.emailError}
              required 
              style={{ padding: "8px", width: "200px"}}
        />
          <input type="submit" className="fas fa-search"
          style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", 
          borderRadius: "5px",color: "#fff", cursor: "pointer"}}
           />
      </form>
    })
    }else if(event.target.value == "courtname"){
      this.setState({
        result:
        <div className="form-group">
          <Select
            native
            defaultValue={this.state.courtName}
            onChange={e => this.changeCourt(e)}
            // inputProps={{
            //   name: 'courtName',
            //   id: 'age-native-simple',
            // }}
            //errorText={this.state.courtNameError}
            style={{ width: '250px'}}
            required
          >
            <option aria-label="None" value="" disabled>Court Name</option>
            {this.state.courts.map(this.renderCourt)}
          </Select>
            <i className="fas fa-search"
            onClick={e => this.onSubmitCourt(e)}
            style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", 
            borderRadius: "5px",color: "#fff", cursor: "pointer"}}
            >
            </i>
        </div>
    })
    }else if(event.target.value == "bookingtype"){
      this.setState({
        result: 
        <div className="form-group">
            <FormControl>
              <Select
                native
                defaultValue={this.state.bookingType}
                onChange={e => this.change(e)}
                inputProps={{
                  name: 'bookingType',
                  id: 'age-native-simple',
                }}
                errorText={this.state.bookingTypeError}
                style={{ width: '250px'}}
                required
              >
                <option aria-label="None" value="" disabled>Booking Type</option>
                <option value='1'>Single</option>
                <option value='2'>Double</option>
                <option value='0'>Entire</option>
              </Select>
            </FormControl>
            <i 
              className="fas fa-search" 
              onClick={e => this.onSubmitBookingType(e)}
              style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", 
              borderRadius: "5px",color: "#fff", cursor: "pointer"}}
            >
            </i>
        </div>
     })
    }else if(event.target.value == "bookingdate"){
      this.setState({
        result: 
        <div className="form-group">
          <input type="date" pattern="\d*" style={{ padding: "8px", width: "200px"}} />
            {/* <DatePicker
              value={this.state.bookingDefaultDate}
              name = "bookingDate"
              onChange={e => this.changeDate(e)}
              placeholderText="Booking Date"
              required
            /> */}
            <i 
              className="fas fa-search" 
              onClick={e => this.onSubmitBookingDate(e)}
              style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", 
              borderRadius: "5px",color: "#fff", cursor: "pointer"}}
            > 
            </i>
        </div>
     })
    }else{
     this.setState({
       result: event.target.value
    })}
  }

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      data: state.data.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  handleShow = ()=>{
    this.setState({
      isDisplay: 0
    })
  }

  handleStart = ()=>{
    this.setState({
      isDisplay: 1
    })
  }

  // handleSelect = (selectedOption) => {
  //   this.setState({ selectedOption });
  // }

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

  async componentDidMount(){
    await this.getCourtDetails();
	}

  render() {
    let booking;
    if (this.state.isDisplay === 0) {
      booking = 
        <Form
        data={this.state.courts}
       // onSubmit={submission => 
       //   this.checkWallet(submission)}
        />
    }
    else if(this.state.isDisplay === 1) {
      booking =
        <h1>Booking Details</h1>
    } else {
      booking = 
        <h1 style={{ marginTop: "20px"}}>No Bookings</h1>
    }
    
    return (
        <Fragment>
          <h1 className="large text-primary" style={{ marginTop: "50px"}}>Bookings</h1>
          <br />
          <div style={{width: "100%", margin: "auto"}}>
              <div style={{ width: "50%", float: "left", borderRight: "1px solid grey", height: "100vh"}}>
                <div style={{width: "100%", display: "flex", paddingLeft: "50px"}}> 
                  <button className="btn btn-primary" onClick={this.handleShow} style={{ marginRight: "20px"}}>
                  New Booking</button>
                  <FormControl style={{marginTop:"-25px", marginRight: "20px"}}>
                    <label style={{textAlign: "left"}}>Search By</label>
                    <select style={{ width: '180px', padding: "10px"}} onChange={this.handleSelectChange}>

                      <option value="email">Email Id</option>

                      <option value="courtname">Court Name</option>

                      <option value="bookingtype">Booking Type</option>

                      <option value="bookingdate">Booking Date</option>

                    </select>
                  </FormControl>
                  {this.state.result}
                </div>
                <br />
                  <p className="btn-danger">{this.state.error}</p>
                <br /> 
                <div>
                <Fragment>
                  <div onClick={this.handleStart} style={{ cursor: 'pointer', marginTop: "20px"}}>
                    <table>
                      <tbody>
                        <tr style={{ textAlign: "left", cursor: "pointer"}}>
                          {this.state.booking}
                          {/* {this.state.bookings.map((item, index) => (<td key={index}>{item.booking}</td>)) } */}
                        </tr>
                      </tbody>
                    </table>
                    <Table
                      style={{ margin: 'auto', textAlign: 'center'}}
                      handleRemove={this.handleRemove}
                      startEditing={this.startEditing}
                      editIdx={this.state.editIdx}
                      stopEditing={this.stopEditing}
                      handleChange={this.handleChange}
                      data={this.state.data}
                      header={[
                        {
                          name: "",
                          prop: "courtName"
                        },
                        {
                          name: "",
                          prop: "playerName"
                        },
                        {
                          name: "",
                          prop: "bookingType"
                        },
                        {
                          name: "",
                          prop: "bookingDate"
                        },
                        {
                          name: "",
                          prop: "bookingStartTime"
                        },
                        {
                          name: "",
                          prop: "bookingEndTime"
                        },
                        {
                          name: "",
                          prop: "bookingContact"
                        }
                      ]}
                    /> 
                  </div>
                </Fragment>
              </div>
            </div>
              <div style={{ width: "50%", float: "right"}}>
                <div>
                  
                  {booking}
                  
                </div>

              </div>
          </div>
        </Fragment>
    );
  }
}

ReactDOM.render(
  <AdminBooking />,
  document.querySelector('div')
);
export default AdminBooking;
