import React, { Fragment, Component } from "react";
import Form from "./FormTwo";
import Table from "./TableTwo";
import * as ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
        isDisplay: 2,
        value: []
      }
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

  async loadData(){
    
		try {
			const res = await axios.get('/booking').then(res => {
				var bookings = res.data
            this.setState({bookings : bookings})
            console.log(res.data)
			})
		} catch(err) {
			
		}
  }
  
  componentDidMount(){
		this.loadData();
	}

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


  render() {
    let booking;
    if (this.state.isDisplay === 0) {
      booking = 
        <Form
        onSubmit={submission =>
          this.setState({
            data: [...this.state.data, submission]
          })}
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
          <div style={{width: "100%", margin: "auto"}}>
              <div style={{ width: "50%", float: "left", borderRight: "1px solid grey"}}>
                <button className="btn btn-primary" onClick={this.handleShow} style={{ marginRight: "20px"}}>New Booking</button>
                <FormControl style={{marginTop:"-10px", marginRight: "20px"}}>
                  <InputLabel htmlFor="age-native-simple">Search By</InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: 'Search By',
                      id: 'age-native-simple',
                    }}
                    style={{ width: '200px'}}
                  >
                    <option aria-label="None" value="" />
                    <option value='Email ID'>Email ID</option>
                    <option value='Court Name'>Court Name</option>
                    <option value='Booking Type'>Booking Type</option>
                    <option value='Booking Date'>Booking Date</option>
                  </Select>
                </FormControl>
                <input type="search" style={{ padding: "8px", width: "200px"}} />
                <i className="fas fa-search" 
                style={{ fontSize: "20px", background: "#841e2d", height: "38px", padding: "6px", borderRadius: "5px",
                color: "#fff", cursor: "pointer"}}></i>
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
