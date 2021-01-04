import React from "react";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';


export default class Form extends React.Component {
  state = {
    emailPlayers : this.props.emails,
    courtName: this.props.booking.court.court_name,
    error: "",
    isBooking: false,
    courtSet : false,
    courtTimeHourDisabled : [],
    courttimeMinuteDisabled : [],
    bookingType: this.props.booking.type,

    bookingDefaultDate: new Date(this.props.booking.date),
    bookingDate: null,

    bookingDefaultStartTime: moment( ).set({hour:0,minute:0,second:0,millisecond:0}),
    bookingStartTime: moment( ).set({hour:this.props.booking.start_time.split(':')[0],minute:this.props.booking.start_time.split(':')[1],second:0,millisecond:0}),
    startTimeSet : false,
    startDetails:[],
    startTime : "",

    bookingDefaultEndTime:  moment( ).set({hour:this.props.booking.end_time.split(':')[0],minute:this.props.booking.end_time.split(':')[1],second:0,millisecond:0}),
    bookingEndTime : null,
    endTime : "",
    endTimeHourDisabled : [],
    endTimeMinuteDisabled : [],

    courtstarttime : this.props.data.find(o => o.court_name === this.props.booking.court.court_name).start_time.split(':',2),
     courtendtime : this.props.data.find(o => o.court_name === this.props.booking.court.court_name).end_time.split(':',2),
  };

  iterate = (item) => {
    console.log(item);
  }
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
        endTime : "",
        courtTimeHourDisabled: [],
         courtSet : false
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
    var courtTimeHourDisabledvar = [];
    const courtSelected = this.props.data.find(o => o.court_name === e.target.value);
    const starttimearr = courtSelected.start_time.split(':',2);
    const endtimearr = courtSelected.end_time.split(':',2);
    courtTimeHourDisabledvar = Array.from(Array(parseInt(starttimearr[0])).keys());
    for(var i = parseInt(parseInt(endtimearr[0])); i<= 24 ; i++){
        courtTimeHourDisabledvar.push(i);
    }
    if(endtimearr[1] == "30"){
      courtTimeHourDisabledvar = courtTimeHourDisabledvar.filter(item => item !== parseInt(endtimearr[0]))
    }
    this.setState({
      [e.target.name]: e.target.value,
      courtStartTimeHourDisabled: courtTimeHourDisabledvar
                                  .filter(item => item !== parseInt(starttimearr[0])),
      courtEndTimeHourDisabled : courtTimeHourDisabledvar
                                  .filter(item => item !== parseInt(endtimearr[0])),
      courtSet : false  ,
      courtstarttime : starttimearr,
      courtendtime : endtimearr,
      bookingDefaultEndTime :  null,
      startTimeSet : true,
      bookingStartTime: null,
      startTime : "" , endTime : "" ,
      endTimeMinuteDisabled : [] 
    });
      
  };

  changeDate = e => {
    console.log(e)
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
  disabledMinutes = ( hour ) => {
    let minutes = []
      if(hour == this.state.courtstarttime[0] && this.state.courtstarttime[1] == "30"){
        minutes = [0]; 
      }
      if(hour == this.state.courtendtime[0] && this.state.courtendtime[1] == "30"){
        minutes = [30]; 
      } 
    return minutes
  }
  disabledMinutesEndTime = (hour) => {
    let minutes = this.state.endTimeMinuteDisabled;
      if(hour == this.state.courtendtime[0] && this.state.courtendtime[1] == "00"){
         minutes = [30]; 
      }
      // if(hour == this.state.courtendtime[0] && this.state.courtendtime[1] == "30"){
      //   minutes = [30]; 
      // } 
    return minutes; 
  }
  changeStartTime = e =>{
    if(!e){
      this.setState({bookingDefaultEndTime :  null,endTimeMinuteDisabled : [] })
      this.setState({startTimeSet : true})
      this.setState({bookingStartTime: null });
      this.setState({startTime : "" , endTime : ""})
    }else{
     
      var date = new Date(e), Hour = ("0" + date.getHours()).slice(-2), Min = ("0" + date.getMinutes()).slice(-2);
      if(Hour == this.state.courtstarttime[0] && this.state.courtstarttime[1] == "30"){
        this.setState({ bookingStartTime:e.set({hour:Hour,minute:30})})
      }else {
        this.setState({bookingStartTime: e });
      }
     
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
      if(Hour == this.state.courtendtime[0] && this.state.courtendtime[1] == "00"){
         this.setState({bookingDefaultEndTime :  e.set({minute:0})})
         this.setState({endTime : Hour+":00:00"})
      }else if(this.state.startDetails[0] == date.getHours() && this.state.startDetails[1] == 0){
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


  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    //console.log(nextProps , this.props)
    if (nextProps.booking._id !== this.props.booking._id) {
      //console.log(typeof nextProps.booking.court.court_name)
      var dateVar = new Date(nextProps.booking.date);
      var stvar = nextProps.booking.start_time.split(':');
      var etvar = nextProps.booking.end_time.split(':');
      var startTimeVar = moment( ).set({hour:stvar[0],minute:stvar[1],second:0,millisecond:0});
      var end_timeVar = moment( ).set({hour:etvar[0],minute:etvar[1],second:0,millisecond:0});
      var emailsvar = []
      for(var i = 0 ; i<nextProps.booking.user.length ; i++){
          emailsvar.push(nextProps.booking.user[i].email)
      }
      
      this.setState({
        courtName: parseInt(nextProps.booking.court.court_name),
        bookingType : parseInt(nextProps.booking.type),
        bookingDefaultDate : dateVar,
        bookingStartTime : startTimeVar,
        bookingDefaultEndTime : end_timeVar,
        emailPlayers : emailsvar,
       // courtstarttime: courtSelected.start_time.split(':',2),        
      });
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
            style={{ width: '250px'}}
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
            style={{ width: '250px'}}
            required
          >
            <option aria-label="None" value="" disabled>Booking Type</option>
            <option value={1}>Single</option>
            <option value={2}>Double</option>
            <option value={0}>Entire</option>
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
          style={{ width: "125px" }}
          minuteStep = {30}
          showSecond= {false}
          hideDisabledOptions = {true}
          placeholder= "Start Time"
          defaultOpenValue= {this.state.bookingDefaultStartTime} 
          disabledHours = {() => this.state.courtStartTimeHourDisabled}
          disabledMinutes =  {e => this.disabledMinutes(e)}
          value= {this.state.bookingStartTime}
          onChange={e => this.changeStartTime(e)}
          disabled = {this.state.courtSet}
         // required
        /> 
        <TimePicker
          style={{ width: "125px" }}
          minuteStep = {30}
          showSecond= {false}
          hideDisabledOptions = {true}
          placeholder= "End Time"
          onChange={e => this.changeEndTime(e)}
          value={this.state.bookingDefaultEndTime}
          defaultOpenValue= {this.state.bookingDefaultEndTime} 
          disabledHours = {() => this.state.endTimeHourDisabled.concat(this.state.courtEndTimeHourDisabled)}
          disabledMinutes = {e => this.disabledMinutesEndTime(e)}
          disabled = {this.state.startTimeSet}
          //required
        />
        {this.state.emailPlayers.map(d => {
          console.log(d)
          return (<input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={e => this.change(e)}
              value={d} 
              required 
              style={{ padding: "8px", width: "200px"}}
        /> )
        })}
        <br />
        <br />
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