import React from "react";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

export default class Form extends React.Component {
  state = {
    courtName: "",
    error: "",
    bookingType: "",
    bookingDefaultDate: null,
    bookingDate: null,
    isBooking: false,
    bookingDefaultStartTime: moment( ).set({hour:0,minute:0,second:0,millisecond:0}),
    bookingDefaultEndTime: null,
    bookingStartTime: null,
    bookingEndTime : null,
    endTime : "",
    endTimeHourDisabled : [],
    endTimeMinuteDisabled : [],
    startTimeSet : true,
    startDetails:[]
  };

  validate = () => {
    let isError = false;
    if(this.state.courtName === ""){
      isError = true;
      this.setState({ error : "Please select Court Name" })
    }else if (this.state.bookingType === "") {
      isError = true;
      this.setState({ error : "Please Select Booking Type"} )
    }else if(this.state.bookingDate === null){
      isError = true;
      this.setState({ error : "Please select Booking Date"} )
    }else if(this.state.startTime === "" || this.state.endTime === ""){
      isError = true;
      this.setState({ error : "Please Select start and end Time"} )
    }

    return isError;
  };

   onSubmit =async e => {
    e.preventDefault();
    const err = this.validate();
     if (!err) {
      await this.props.onSubmit(this.state);
      // clear form
      this.clear();
    }
  };

 
  clear = () => {
    this.setState({
        courtName: "",
        bookingType: "",
        courtNameError: "",
        bookingTypeError: "",
        bookingDateError: "",
        bookingStartTimeError: "",
        bookingEndTimeError: "",
        bookingDefaultDate : null,
        bookingStartTime: null,
        bookingDefaultEndTime: null,
        bookingEndTime : moment( ).set({hour:0,minute:0,second:0,millisecond:0}),
        startTimeSet : true,
        endTimeHourDisabled : [],
        endTimeMinuteDisabled : [],
        startDetails:[],
        bookingDate : "",
        startTime: "",
        endTime : ""
        //isBooking: true
      });
  }

  handleAdd = ()=>{
    this.setState({
      isBooking: true
    });
  }

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value })
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeCourt = e => {
    // this.props.onChange({ [e.target.name]: e.target.value })
    this.setState({
      [e.target.name]: e.target.value
    });
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


  changeStartTime = e =>{
    if(!e){
      this.setState({bookingDefaultEndTime :  null})
      this.setState({startTimeSet : true})
      this.setState({bookingStartTime: null });
      this.setState({startTime : "" , endTime : ""})
    }else{
      this.setState({bookingStartTime: e });
      var date = new Date(e), Hour = ("0" + date.getHours()).slice(-2), Min = ("0" + date.getMinutes()).slice(-2);
      this.setState({startTime : Hour+":"+Min+":00"})
      var dateArr = [ date.getHours() , date.getMinutes()]
      this.setState({startDetails : dateArr})
      if(date.getMinutes() == 0){
        this.setState({bookingDefaultEndTime :  moment( ).set({hour:date.getHours(),minute:30})})
        this.setState({endTime : Hour+":30:00"})
        this.setState({endTimeMinuteDisabled : [0]})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()).keys()) })
      }else{
        this.setState({bookingDefaultEndTime :  moment( ).set({hour:date.getHours()+1,minute:0})})
        const Hourend = ("0" + date.getHours()+1).slice(-2)
        this.setState({endTime : Hourend+":00:00"})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()+1).keys()) })
      }
      
      this.setState({startTimeSet : false})
     
    }
  }

  changeEndTime = e =>{
    if(!e){
      this.setState({bookingDefaultEndTime :  null})
      this.setState({endTime : ""})
    }else{
      var date = new Date(e), Hour = ("0" + date.getHours()).slice(-2), Min = ("0" + date.getMinutes()).slice(-2);
      if(this.state.startDetails[0] == date.getHours() && this.state.startDetails[1] == 0){
        this.setState({bookingDefaultEndTime :  e.set({minute:30})})
        this.setState({endTimeMinuteDisabled : [0]})
        this.setState({endTime : Hour+":30:00"})
      }else if(this.state.startDetails[0] == date.getHours() && this.state.startDetails[1] == 30){
        this.setState({bookingDefaultEndTime :  e.set({hour:date.getHours()+1,minute:0})})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()+1).keys())})
        this.setState({endTime : (date.getHours()+1)+":00:00"})
      }else{
        this.setState({bookingDefaultEndTime : e})
        this.setState({endTimeMinuteDisabled : []})
        this.setState({endTime : Hour+":"+Min+":00"})
      }
    }
  }

  render() {
    return (
      <form style={{ marginTop: "20px"}} className="form">
        <FormControl>
          {/* <InputLabel htmlFor="age-native-simple">Booking Type</InputLabel> */}
          <Select
            native
            value={this.state.courtName}
            onChange={e => this.changeCourt(e)}
            inputProps={{
              name: 'courtName',
              id: 'age-native-simple',
            }}
            errorText={this.state.courtNameError}
            style={{ width: '350px'}}
            required
          >
            <option aria-label="None" value="" disabled>Court Name</option>
            {this.props.data.map(renderCourt)}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <Select
            native
            value={this.state.bookingType}
            onChange={e => this.change(e)}
            inputProps={{
              name: 'bookingType',
              id: 'age-native-simple',
            }}
            errorText={this.state.bookingTypeError}
            style={{ width: '350px'}}
            required
          >
            <option aria-label="None" value="" disabled>Booking Type</option>
            <option value='1'>Single</option>
            <option value='2'>Double</option>
            <option value='0'>Entire</option>
          </Select>
        </FormControl>
        <br />
        <br />
        <DatePicker
            // style={{width: "200px"}}
            selected={this.state.bookingDefaultDate}
            name = "bookingDate"
            // customStyles={{
            //   dateTouch:{
            //     width:'200px',
            //   },
            //   dateTouchBody: {
            //     width:'200px',
            //   },
            // }}
            onChange={e => this.changeDate(e)}
            placeholderText="Booking Date"
            minDate={new Date()}
            maxDate={ new Date().setMonth(new Date().getMonth()+6)}
            required
        />
        <br /><br />
        <TimePicker
          style={{ width: "180px" }}
          minuteStep = "30"
          showSecond= {false}
          hideDisabledOptions = {true}
          placeholder= "Start Time"
          defaultOpenValue= {this.state.bookingDefaultStartTime} 
          value= {this.state.bookingStartTime}
          onChange={e => this.changeStartTime(e)}
          required
        />
        <TimePicker
          style={{ width: "180px" }}
          minuteStep = {30}
          showSecond= {false}
          //hideDisabledOptions = {true}
          placeholder= "End Time"
          onChange={e => this.changeEndTime(e)}
          value={this.state.bookingDefaultEndTime}
          defaultOpenValue= {this.state.bookingDefaultEndTime} 
          disabledHours = {() => this.state.endTimeHourDisabled}
          disabledMinutes = {() => this.state.endTimeMinuteDisabled}
          disabled = {this.state.startTimeSet}
          required
        />
        <br />
        <br />
        {/* <Alert severity="error">{this.state.error}</Alert> */}
        <p className="btn-danger">{this.state.error}</p>
        <br /> 
        <Button onClick={e => this.onSubmit(e)}>
          <p className="btn bg-dark">Add Booking</p>
        </Button>
      </form>
    );
  }
}

function renderCourt(event) {
  return (<option value={event.court_name}>Court {event.court_name}</option>)
}