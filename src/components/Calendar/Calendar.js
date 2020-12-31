import React from 'react'
import FullCalendar, { formatDate, ViewApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import './Calendar.css'
import axios from "axios";
import { logout } from '../../actions/auth';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';
import { Fragment } from 'react'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class calendar extends React.Component {


  calendarRef = React.createRef();

  constructor(props){
    super(props);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    this.state = {
      //weekendsVisible: true,
      alert:0,
      currentEvents: [],
      calenderView : 'dayGridMonth',
      bookedevents: [],
      courts : [],
      //bookedeventdays : [],
      //eventsvar : []
    }
  }

  getCurrentStateFromStore() {
      console.log(store.getState().auth)
      console.log(store.getState().auth)
  }

  async  getData(){
    const config = {
		  headers: {
			  'Content-Type': 'application/json'
		  }
	  }

    try {
      var bookedeventsvar = [] , bookedeventdaysvar = [];
      const res = await axios.get('/booking/', config);
      for(var i = 0; i < res.data.length; i++){
        var type = ""
        switch(res.data[i].type){
          case 1:
            type= "Singles";
            break;
          case 2:
            type= "Doubles";
            break; 
          default:
            type = "Full Court";
            break;
        }
         let playersname = " | ";
        for(var j = 0; j < res.data[i].players.length; j++){
          playersname = playersname + res.data[i].user[j].name + " , " 
        }
        bookedeventsvar.push({
          id: createEventId(),
          title: "C" + res.data[i].court.court_name + " | " + type + playersname + "",
          start: res.data[i].date + 'T' + res.data[i].start_time,
          end: res.data[i].date + 'T' + res.data[i].end_time,
          color : res.data[i].court.colour,
          borderColor : res.data[i].court.colour,
          //allDay : true,
          booking : res.data[i]
        })
        // bookedeventdaysvar.push({
        //   id: createEventId(),
        //   title: "C" + res.data[i].court.court_name + " | " + type + playersname + "",
        //   start: res.data[i].date + 'T' + res.data[i].start_time,
        //   end: res.data[i].date + 'T' + res.data[i].end_time,
        //   color : res.data[i].court.colour,
        //   booking : res.data[i]
        // })
      }
      this.setState({bookedevents : bookedeventsvar})// ,bookedeventdays : bookedeventdaysvar })
      this.getCourtDetails();
    } catch(err) {
        // this.setState({alert: 1});
        console.log(err)
        logout();

        confirmAlert({title: 'Lets Badminton hi',message: "Your session is expired, login again",
        buttons: [{label: 'Ok',onClick: () => {    localStorage.clear();    this.props.history.replace("/signin");}}]});
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
        if(this.state.alert === 0){
          confirmAlert({title: 'Lets Badminton',message: "Your session is expired, login again",
          buttons: [{label: 'Ok',onClick: () => {}}]});
          logout();
          this.props.history.replace("/signin");
      } 
	  }
  }
  componentWillMount(){

  }

  componentDidMount(){

    var data= JSON.parse(localStorage.getItem("USER"))
    console.log("datahere",localStorage.getItem("USER"))
    try{    
      if(data.loginstatus===1 && data.role==="Member"){

    } 
    else{
      alert("wrongpath");
      this.props.history.replace('/signin');

    }}
    catch{
      this.props.history.replace('/signin');
    }


    this.getData();
  }

 
  
  render() {
    return (
      <Fragment>
        <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main'>
            <FullCalendar
              height = "80vh"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridDay'
              }}
              intialView={this.state.calenderView}
              //editable={true}
              //selectable={true}
              selectMirror={true}
              allDaySlot = {true}
              //dayMaxEvents={true}
              //weekends={this.state.weekendsVisible}
              events={this.state.bookedevents}                                  // alternatively, use the `events` setting to fetch from a feed
              dateClick={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              validRange= {{
                start: new Date(),
                end: new Date().setMonth(new Date().getMonth()+6)
              }}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            ref={this.calendarRef}
            />
          </div>
        </div>
      </Fragment>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Please Follow these Instructions to Book a Court</li>
          </ul>
          EVENT Title Format = Court ID | Type of event | No. of Players
        </div> 
        <div className='demo-app-sidebar-section'>
           <h2>All Courts ({this.state.courts.length})</h2>
          {this.state.courts.map(renderSidebarCourt)}
        </div> 
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    this.setState({eventsvar : this.state.bookedeventdays})
    this.calendarRef.current
        .getApi()
        .changeView('timeGridDay', selectInfo.date)
  }
  
  handleEventClick = (clickInfo) => {
    console.log("clickeve",clickInfo.event._def.extendedProps.booking)
    var bookingdata=clickInfo.event._def.extendedProps.booking;
    this.props.history.replace('/userbooking',{data:bookingdata});
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
}



function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarCourt(event) {
  var colorcourt = event.colour
  return (
    <div style={{
        backgroundColor: colorcourt,
        borderRadius: '5px',
        padding: '10px',
        color: '#ffffff',
        marginBottom: '10px'
      }}>
      <b>Court {event.court_name}</b><br />Court Price : $ {event.price} / hr<br />
      <i>Time : {event.start_time} - {event.end_time}</i><br />
      {event.court_break.length == 0 ? "No Breaks" : event.court_break.map(renderSidebarbreak) }
      
    </div>
  )
}

function renderSidebarbreak(event) {
  return (<div>
      <i>Break {event.break_name} : Time {event.bstart_time} - {event.bend_time}</i></div>
  )
}