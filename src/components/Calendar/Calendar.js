import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId ,todayStr} from './event-utils'
import './Calendar.css'
import axios from "axios";

export default class calendar extends React.Component {
  

  calendarRef = React.createRef();

  constructor(props){
    super(props);
    this. state = {
    //weekendsVisible: true,
    currentEvents: [],
    calenderView : 'dayGridMonth',
    bookedevents: []
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
          title: "Court: " + res.data[i].court.court_name + " | Slot Type : " + type + " | No. of Players:"+res.data[i].players.length,
          start: res.data[i].date + 'T' + res.data[i].start_time,
          end: res.data[i].date + 'T' + res.data[i].end_time,
          color : res.data[i].court.colour,
          booking : res.data[i]
        })
      }
      this.setState({bookedevents : bookedeventsvar})
      console.log(this.state.bookedevents)
    } catch(err) {
		  console.log(err);
	  }
  }

  componentDidMount(){
    this.getData();
  }

 
  
  render() {
    console.log("printing")
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
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
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        {/* 
        <div className='demo-app-sidebar-section'>
           <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label> 
        </div> */}
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
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
    //DISPLAY EVENT DETAILS OVER SIDEBAR
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
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}