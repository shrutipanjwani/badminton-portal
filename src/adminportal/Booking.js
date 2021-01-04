import React, { Fragment, Component } from "react";
import Form from "./FormTwo";
import EditForm from "./EditForm";
import * as ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

class AdminBooking extends Component {
  constructor(props) {
    super(props);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

      this.state = {
        move:null,
        bookings: [],
        data: [],
        editIdx: -1,
        courtName: "",
        isDisplay: 2,
        value: [],
        selectedOption: 'courtname',
        courtlist:[],
        bookingType: "",
        bookingDefaultDate: null,
        bookingDate: null,
        email: "",
        error: "",
        bookingid : [],
        emails : [],
        result: 
        <form className="form-group" onSubmit={e => this.onSubmitEmail(e)}>
              <input 
                type="email" 
                placeholder="Email Address"
                name="email"
                onChange={e => this.change(e)}
                required
                style={{ padding: "8px", width: "200px"}} 
              />
            <input 
                type="submit" value="Search"
                style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "5px", 
                borderRadius: "5px",color: "#fff", cursor: "pointer", paddingBottom: "30px"}}
              /> 
        </form>
      }
      
      // this.handleSelect = this.handleSelect.bind(this);
  }

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
   // console.log(e.target.value)
  };

  //Email Search
  validateEmail = () => {
    let isError = false;
    //console.log(this.state.email.indexOf("@"));
    if (this.state.email === "") {
      isError = true;
      this.setState({ error: "Please Enter Email" });
    } else if (this.state.email.indexOf("@") < 0) {
      isError = true;
      this.setState({ error: "Please Enter valid Email" });
    }

    return isError;
  };

  onSubmitEmail = async (e) => {
    e.preventDefault();
    const err = this.validateEmail();
    if (!err) {
      try {
        const res = await axios
          .get("/booking/email/" + this.state.email)
          .then((res) => {
            var bookings = res.data;
            this.setState({ bookings: bookings });
            //console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      }
      // clear form
     // console.log(this.state.email);
      this.setState({ error: "" });
    }
  };

  //Court Search
  validateCourt = () => {
    let isError = false;
    if (this.state.courtName === "") {
      isError = true;
      this.setState({ error: "Please select Court Name" });
    }
    return isError;
  };

  onSubmitCourt = async (e) => {
    e.preventDefault();
    const err = this.validateCourt();
    if (!err) {
     
      var courtSelected = this.state.courtlist.find( ({ court_name }) =>  court_name === this.state.courtName.toString());
    
      try {
       // console.log(this.state.courtlist ,courtSelected)
        const res = await axios.get('/booking/court/'+courtSelected._id).then(res => {
          var courts = res.data
              this.setState({bookings : courts})
              console.log(res.data)
        })
      } catch(err) {
        console.log(err);   
      }
      
      // clear form
      this.setState({ error: "" });
    }
  };

  //BookingType Search
  validateBookingType = () => {
    let isError = false;

    if (this.state.bookingType === "") {
      isError = true;
      this.setState({ error: "Please Select Booking Type" });
    }

    return isError;
  };

  onSubmitBookingType = async (e) => {
    e.preventDefault();
    const err = this.validateBookingType();
    if (!err) {
      try {
          //console.log(this.state.bookingType)
          const res = await axios.get('/booking/type/'+this.state.bookingType).then(res => {
            var bookings = res.data
                this.setState({bookings : bookings})
                //console.log(res.data)
          })
        
        
      } catch(err) {
        console.log(err);
      }
      // clear form 
      //console.log(this.state.bookingType)
      this.setState({error : ""});
    }
  };

  //BookingDate Search
  validateBookingDate = () => {
    let isError = false;

    if (this.state.bookingDate === null) {
      isError = true;
      this.setState({ error: "Please select Booking Date" });
    }
    return isError;
  };

  onSubmitBookingDate = async (e) => {
    e.preventDefault();
    //console.log(this.state.bookingDate)
    const err = this.validateBookingDate();
    
    if (!err) {
      try {
        const res = await axios.get('/booking/date/'+this.state.bookingDate).then(res => {
          var bookings = res.data
              this.setState({bookings : bookings})
              //console.log(res.data)
        })
      } catch(err) {
        console.log(err);
      }
      // clear form 
      //console.log(this.state.bookingDate)
      this.setState({error : ""});
    }
  };

  changeDate = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value })
    var date = new Date(e),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    date = [date.getFullYear(), mnth, day].join("-");
   // console.log(e)
    this.setState({
      bookingDate: e.target.value,
      bookingDefaultDate: e
    });
   // console.log(e.target.value, this.state.bookingDate)
  };

  changeCourt = e =>{
        this.setState({
      [e.target.name]: e.target.value});
     
  }

  renderCourt = (event) => {
    return <option value={event.court_name}>Court {event.court_name}</option>;
  };

  handleSelectChange = (event) => {
    this.setState({ searchType: event.target.value });
    if (event.target.value == "email") {
      this.setState({
        result: (
          <form className="form-group" onSubmit={(e) => this.onSubmitEmail(e)}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={e => this.change(e)}

              required 
              style={{ padding: "8px", width: "200px"}}
        />
          <input type="submit" value="Search"
          style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "5px", 
          borderRadius: "5px",color: "#fff", cursor: "pointer", paddingBottom: "30px"}}
           />
      </form>)
    })
    }else if(event.target.value == "courtname"){
      this.setState({
        result:
        <form className="form-group" onSubmit={e => this.onSubmitCourt(e)}>
          <Select
            native
            defaultValue = ""
            onChange={e => this.change(e)}
            inputProps={{
              name: 'courtName',
              id: 'age-native-simple',
            }}
            //errorText={this.state.courtNameError}
            style={{ width: '250px'}}
            required
          >
            <option aria-label="None" value="" disabled>Court Name</option>
            {this.state.courtlist.map(this.renderCourt)}
          </Select>
            <input type="submit" value="Search"
            style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "5px", 
            borderRadius: "5px",color: "#fff", cursor: "pointer", paddingBottom: "30px"}}
            />
        </form>
    })
    }else if(event.target.value == "bookingtype"){
      this.setState({
        result: 
        <form className="form-group" onSubmit={e => this.onSubmitBookingType(e)}>
            <FormControl>
              <Select
                native
                defaultValue={this.state.bookingType}
                onChange={(e) => this.change(e)}
                inputProps={{
                  name: "bookingType",
                  id: "age-native-simple",
                }}
                errorText={this.state.bookingTypeError}
                style={{ width: "250px" }}
                required
              >
                <option aria-label="None" value="" disabled>
                  Booking Type
                </option>
                <option value="1">Single</option>
                <option value="2">Double</option>
                <option value="0">Entire</option>
              </Select>
            </FormControl>
            <input 
              type="submit" value="Search"
              style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "5px", 
              borderRadius: "5px",color: "#fff", cursor: "pointer", paddingBottom: "30px"}}
            />
        </form>
     })
    }else if(event.target.value == "bookingdate"){
      this.setState({
        result: 
        <form className="form-group" onSubmit={e => this.onSubmitBookingDate(e)}>
          <input type="date" name = "bookingDate"
              onChange={e => this.changeDate(e)}  style={{ padding: "8px", width: "200px"}}/>
            {/* <DatePicker
              value={this.state.bookingDefaultDate}
              name = "bookingDate"
              onChange={e => this.changeDate(e)}
              placeholderText="Booking Date"
              required
            /> */}
            <input 
              type="submit" value="Search"
              style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "5px", 
                borderRadius: "5px",color: "#fff", cursor: "pointer", paddingBottom: "30px"}}
            /> 
        </form>
     })
    }else{
     this.setState({
       result: event.target.value
    })}
  }

  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  handleShow = () => {
    this.setState({
      isDisplay: 0,
    });
  };

  handleStart = (e) => {
    var bookingsvar = this.state.bookings;
    var booking = bookingsvar.find(({ _id }) => _id === e.target.getAttribute("data-value"))
    var emailsvar = []
    for(var i = 0 ; i<booking.user.length ; i++){
          emailsvar.push(booking.user[i].email)
      }
    this.setState({
      isDisplay: 1,
      bookingid :booking,
      emails : emailsvar
    });
   
  };

  // handleSelect = (selectedOption) => {
  //   this.setState({ selectedOption });
  // }

  async getCourtDetails() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/court/", config);
      // this.setState({ courts: res.data });
      this.setState({courtlist : res.data})

    } catch (err) {
      console.log(err);
    }
  }

  componentWillMount() {
    var data = JSON.parse(localStorage.getItem("USER"));
   // console.log("datahere", localStorage.getItem("USER"));
    try {
      if (data.loginstatus === 1 && data.role === "admin") {
       // console.log("called");
      } else {
        this.setState({ move: true });
      }
    } catch {
      this.setState({ move: true });
    }
  }

  async componentDidMount() {
    await this.getCourtDetails();
  }

  render() {
    if (this.state.move === true) {
      return <div>Something went wrong...</div>;
    }

    let booking;
    if (this.state.isDisplay === 0) {
      booking = (
        <Form
          data={this.state.courtlist}
          
          // onSubmit={submission =>
          //   this.checkWallet(submission)}
        />
      );
    } else if (this.state.isDisplay === 1) {
      booking = (<EditForm
                data={this.state.courtlist} booking={this.state.bookingid} emails={this.state.emails}
                // onSubmit={submission =>
                //   this.checkWallet(submission)}
              />);
    } else {
      booking = <h1 style={{ marginTop: "20px" }}>No Bookings</h1>;
    }
    
    return (
        <Fragment>
          <h1 className="large text-primary" style={{ marginTop: "50px"}}>Bookings</h1>
          <br />
          <div style={{width: "100%", margin: "auto"}}>
            <div style={{ width: "60%", float: "left",height: "100vh"}}>
              <div style={{width: "100%", display: "flex", paddingLeft: "50px"}}> 
                <button className="btn btn-primary" onClick={this.handleShow} style={{ marginRight: "20px"}}>New Booking</button>
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
                  <div style={{overflowX: "hidden", overflowY: "scroll"}}>
                    <table style={{ width: "95%", margin: "auto"}} className="table booking-table" border="1">
                      <tbody>
                        <th style={{color: "#841e2d", textAlign: "left"}}>S.No.</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Booking Type</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Booking Date</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Start Time</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>End Time</th>
                        <br />
                        <br />
                        {this.state.bookings.map(d => {
                              return (
                              <tr data-value={d._id} onClick={ e => this.handleStart(e)}>
                                  <td data-value={d._id} style={{ textAlign: "left"}}></td>
                                  <td data-value={d._id}>
                                    {d.type === 0 ? "Entire" : (d.type == 1 ? "Single" : "Double")}
                                  </td>
                                  <td data-value={d._id}>
                                    {d.date}
                                  </td >
                                  <td data-value={d._id}>
                                    {d.start_time}
                                  </td >
                                  <td data-value={d._id}>
                                    {d.end_time}
                                  </td>
                              </tr>
                              )
                            })} 
                      </tbody>
                    </table>
                  </div>      
              </div>
              <div style={{ width: "40%", float: "right"}}>
                <div> 
                  {booking} 
                </div>
              </div>
          </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<AdminBooking />, document.querySelector("div"));
export default AdminBooking;
