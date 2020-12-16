import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId ,todayStr} from './event-utils'
import { Link, Redirect } from "react-router-dom";
import './Calendar.css'
import axios from "axios";
import { logout } from '../../actions/auth';
export default class calendar extends React.Component {
  

  calendarRef = React.createRef();

  constructor(props){
    super(props);
    this. state = {
    //weekendsVisible: true,
    first:0,
    currentEvents: [],
    calenderView : 'dayGridMonth',
    bookedevents: [],
    courts : []
  }
  }

  async  getData(){
    const config = {
		  headers: {
			  'Content-Type': 'application/json'
		  }
	  }

    try {
      var bookedeventsvar = [];
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
        bookedeventsvar.push({
          id: createEventId(),
          title: "C" + res.data[i].court.court_name + "|" + type + "|"+res.data[i].players.length+"P",
          start: res.data[i].date + 'T' + res.data[i].start_time,
          end: res.data[i].date + 'T' + res.data[i].end_time,
          color : res.data[i].court.colour,
          booking : res.data[i]
        })
      }
      this.setState({bookedevents : bookedeventsvar})
     // console.log(this.state.bookedevents)
    } catch(err) {
		  alert("your session is expired, login again");
      logout();
      this.props.history.push("/signin");
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
      console.log(res.data)
    } catch(err) {
<<<<<<< HEAD
      alert("your session is expired, login again");
      logout();
=======
      console.log(err);
      if(this.state.first==0){
        var a=1
        this.setState({first: a});
        this.getData();
      }
>>>>>>> 147313f714c975e6e87ad6d8f47233f2b2b61500
	  }
  }

  componentDidMount(){
    this.getData();
    this.getCourtDetails();
  }

 
  
  render() {
    console.log("printing")
    return (
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
            allDaySlot = {false}
            //dayMaxEvents={true}
            //weekends={this.state.weekendsVisible}
            events={this.state.bookedevents} // alternatively, use the `events` setting to fetch from a feed
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
        {/* <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div> */}
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    this.calendarRef.current
        .getApi()
        .changeView('timeGridDay', selectInfo.date)
    // calendar.changeView('timeGridDay', '2017-06-01');
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }
  
  handleEventClick = (clickInfo) => {
console.log("clickeve",clickInfo.event._def.extendedProps.booking)
var bookingdata=clickInfo.event._def.extendedProps.booking;
this.props.history.push('/userbooking',{data:bookingdata});

    console.log(clickInfo)

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

function renderSidebarEvent(event) {
  return (
    <li>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
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
      <b>Court {event.court_name}</b>
      <i>Time : {event.start_time} - {event.end_time}</i><br />
      {event.court_break.length == 0 ? "No Breaks" : event.court_break.map(renderSidebarbreak) }<br /><br />
    </div>
  )
}

function renderSidebarbreak(event) {
  return (<div>
      <i>Break {event.break_name} : Time {event.bstart_time} - {event.bend_time}</i></div>
  )
}