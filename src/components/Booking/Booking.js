import React from 'react'
import axios from "axios";

export default class UserBooking extends React.Component {
  
    
  constructor(props){
    super(props)
    console.log("newdata",this.props.location.state.data); 

    this.state = {
        data:props.location.state.data,
        aviSlot:null,
        total:null
  }

  }

  componentWillMount(){
      console.log("datafrom state",this.state.data);
      var player=this.state.data.players.length;
      console.log("playernow",player )
    if(this.state.data.type==1){
        this.setState({total:2});
        player= 2 - player;
       this.setState({aviSlot: player});
    }

   
  }    

  render() {
    console.log("printing")
    return (
        
<div style={{width:"40%", margin: "auto"}}>
<h1 className="large text-primary" style={{marginTop: "50px"}}>Booking Details</h1>

<div id="badge-panel" class="tab-pane">
  <div class='skm-badge-table'>
    <table class="badge-table">

      <tr>
        <td>Slots Available</td>
        <td>{ this.state.aviSlot} of ({this.state.total})</td>
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
      </table>
  </div>
</div>
</div>
     
    )}


}