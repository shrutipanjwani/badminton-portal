import React, { Fragment, Component } from "react";
import Form from "./FormTwo";
import Table from "./TableTwo";
import * as ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import Select from 'react-select';


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
        value: [],
        selectedOption: 'courtname',
        courts:[]
      }
      
      this.handleSelect = this.handleSelect.bind(this);

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

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

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
    await this.loadData();
    await this.getCourtDetails();
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

  handleSelect(event) {
    console.log(event.target.value)
    this.setState({selectedOption: event.target.value});

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

    const { selectedOption } = this.state;

    return (
        <Fragment>
          <h1 className="large text-primary" style={{ marginTop: "50px"}}>Bookings</h1>
          <div style={{width: "100%", margin: "auto"}}>
              <div style={{ width: "50%", float: "left", borderRight: "1px solid grey", height: "100vh"}}>
                <button className="btn btn-primary" onClick={this.handleShow} style={{ marginRight: "20px"}}>New Booking</button>
                <FormControl style={{marginTop:"-25px", marginRight: "20px"}}>
                  <label style={{textAlign: "left"}}>Search By</label>
                  <select value={this.state.selectedOption} onChange={this.handleSelect} style={{ width: '200px', padding: "10px"}}>

                    <option value="email">Email Id</option>

                    <option value="courtname">Court Name</option>

                    <option value="bookingtype">Booking Type</option>

                    <option value="bookingdate">Booking Date</option>

                  </select>
                </FormControl>
                <input type="search" pattern="\d*" style={{ padding: "8px", width: "200px"}} />
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
