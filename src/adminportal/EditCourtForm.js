import React from "react";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { Fragment } from "react";


export default class Form extends React.Component {
  state = {
    courtName: this.props.court.court_name,
    error: "",
    isBooking: false,
    courtSet : false,
    courtTimeHourDisabled : [],
    courttimeMinuteDisabled : [],

    courtDefaultStartTime: moment( ).set({hour:0,minute:0,second:0,millisecond:0}),
    //courtStartTime: moment( ).set({hour:this.props.court.start_time.split(':')[0],minute:this.props.court.start_time.split(':')[1],second:0,millisecond:0}),
    startTimeSet : false,
    startDetails:[],
    startTime : "",

    //courtDefaultEndTime:  moment( ).set({hour:this.props.court.end_time.split(':')[0],minute:this.props.court.end_time.split(':')[1],second:0,millisecond:0}),
    courtEndTime : null,
    endTime : "",
    endTimeHourDisabled : [],
    endTimeMinuteDisabled : [],
    price: "",
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
    }else if(this.state.price === ""){
        isError = true;
        this.setState({ error : "Please Enter Price"} )
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
        courtNameError: "",
        courtStartTimeError: "",
        courtEndTimeError: "",
        courtDefaultDate : null,
        courtStartTime: null,
        courtDefaultEndTime: null,
        courtEndTime : moment( ).set({hour:0,minute:0,second:0,millisecond:0}),
        startTimeSet : true,
        endTimeHourDisabled : [],
        endTimeMinuteDisabled : [],
        startDetails:[],
        startTime: "",
        endTime : "",
        courtTimeHourDisabled: [],
        courtSet : false,
        price: "",
        priceError: "",
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
      courtDefaultEndTime :  null,
      startTimeSet : true,
      courtStartTime: null,
      startTime : "" , endTime : "" ,
      endTimeMinuteDisabled : [] 
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
      this.setState({courtDefaultEndTime :  null,endTimeMinuteDisabled : [] })
      this.setState({startTimeSet : true})
      this.setState({courtStartTime: null });
      this.setState({startTime : "" , endTime : ""})
    }else{
     
      var date = new Date(e), Hour = ("0" + date.getHours()).slice(-2), Min = ("0" + date.getMinutes()).slice(-2);
      if(Hour == this.state.courtstarttime[0] && this.state.courtstarttime[1] == "30"){
        this.setState({ courtStartTime:e.set({hour:Hour,minute:30})})
      }else {
        this.setState({courtStartTime: e });
      }
     
      this.setState({startTime : Hour+":"+Min+":00"})
      var dateArr = [ date.getHours() , date.getMinutes()]
      this.setState({startDetails : dateArr})
      if(date.getMinutes() == 0){
        this.setState({courtDefaultEndTime :  moment( ).set({hour:date.getHours(),minute:30})})
        this.setState({endTime : Hour+":30:00"})
        this.setState({endTimeMinuteDisabled : [0]})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()).keys()) })
      }else{
        this.setState({courtDefaultEndTime :  moment( ).set({hour:date.getHours()+1,minute:0})})
        const Hourend = ("0" + date.getHours()+1).slice(-2)
        this.setState({endTime : Hourend+":00:00"})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()+1).keys()) })
      }
      
      this.setState({startTimeSet : false})
     
    }
  }

  changeEndTime = e =>{
    if(!e){
      this.setState({courtDefaultEndTime :  null})
      this.setState({endTime : ""})
    }else{
      var date = new Date(e), Hour = ("0" + date.getHours()).slice(-2), Min = ("0" + date.getMinutes()).slice(-2);
      if(Hour == this.state.courtendtime[0] && this.state.courtendtime[1] == "00"){
         this.setState({courtDefaultEndTime :  e.set({minute:0})})
         this.setState({endTime : Hour+":00:00"})
      }else if(this.state.startDetails[0] == date.getHours() && this.state.startDetails[1] == 0){
        this.setState({courtDefaultEndTime :  e.set({minute:30})})
        this.setState({endTimeMinuteDisabled : [0]})
        this.setState({endTime : Hour+":30:00"})
      }else if(this.state.startDetails[0] == date.getHours() && this.state.startDetails[1] == 30){
        this.setState({courtDefaultEndTime :  e.set({hour:date.getHours()+1,minute:0})})
        this.setState({endTimeHourDisabled : Array.from(Array(date.getHours()+1).keys())})
        this.setState({endTime : (date.getHours()+1)+":00:00"})
      }else{
        this.setState({courtDefaultEndTime : e})
        this.setState({endTimeMinuteDisabled : []})
        this.setState({endTime : Hour+":"+Min+":00"})
      }
    }
  }


  componentWillReceiveProps(nextProps) {
    
    if (nextProps.court._id !== this.props.court._id) {
     
      var stvar = nextProps.court.start_time.split(':');
      var etvar = nextProps.court.end_time.split(':');
      var startTimeVar = moment( ).set({hour:stvar[0],minute:stvar[1],second:0,millisecond:0});
      var end_timeVar = moment( ).set({hour:etvar[0],minute:etvar[1],second:0,millisecond:0});
     
      this.setState({
        courtName: parseInt(nextProps.court.court_name),
        courtStartTime : startTimeVar,
        courtDefaultEndTime : end_timeVar,
        price: parseInt(nextProps.court.price),
      });
    }
  }
  
  render() {
    return (
        <Fragment>
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
            
            <TimePicker
              style={{ width: "125px" }}
              minuteStep = {30}
              showSecond= {false}
              hideDisabledOptions = {true}
              placeholder= "Start Time"
              defaultOpenValue= {this.state.courtDefaultStartTime} 
              disabledHours = {() => this.state.courtStartTimeHourDisabled}
              disabledMinutes =  {e => this.disabledMinutes(e)}
              value= {this.state.courtStartTime}
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
              value={this.state.courtDefaultEndTime}
              defaultOpenValue= {this.state.courtDefaultEndTime} 
              disabledHours = {() => this.state.endTimeHourDisabled.concat(this.state.courtEndTimeHourDisabled)}
              disabledMinutes = {e => this.disabledMinutesEndTime(e)}
              disabled = {this.state.startTimeSet}
              //required
            />
            <br />
            <br />
            $&nbsp;
            <input
                style={{ width: "240px", padding: "7px" }}
                type="number"
                name="price"
                placeholder="Price"
                value={this.state.price}
                onChange={e => this.change(e)}
                errorText={this.state.priceError}
                required
            />
            <p className="btn-danger">{this.state.error}</p>
            <br /> 
            <Button onClick={e => this.onSubmit(e)}>
              <p className="btn bg-dark">Add Booking</p>
            </Button>
          </form>
        </Fragment>
    );
  }
}

function renderCourt(event) {
  return (<option value={event.court_name}>Court {event.court_name}</option>)
}