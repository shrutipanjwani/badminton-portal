import React, { Fragment, Component } from "react";
import Form from "./FormTwo";
import Table from "./TableTwo";

class Booking extends Component {
   
  state = {
    data: [],
    editIdx: -1,
    isActive:false,
    isDisplay: false
  };

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

  handleShow = ()=>{
    this.setState({
      isActive: true
    })
  }

  handleStart = ()=>{
    this.setState({
      isDisplay: true
    })
  }


  render() {
    return (
        <Fragment>
          <h1 className="large text-primary" style={{ marginTop: "50px"}}>Bookings</h1>
          <div style={{width: "100%", margin: "auto"}}>
              <div style={{ width: "50%", float: "left", borderRight: "1px solid grey"}}>
                <button className="btn btn-primary" onClick={this.handleShow}>New Booking</button>
               
              </div>
              <div style={{ width: "50%", float: "right"}}>
              {this.state.isActive ? <Fragment>
                
                <Form
                  onSubmit={submission =>
                    this.setState({
                      data: [...this.state.data, submission]
                    })}
                />
                <div onClick={this.handleStart} style={{ cursor: 'pointer'}}>
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
                        prop: "bookingTime"
                      },
                      {
                        name: "",
                        prop: "bookingContact"
                      }
                    ]}
                  /> 
                </div>
              </Fragment> : <h1 style={{ marginTop: "20px"}}>No Bookings </h1> }
              </div>
          </div>
        </Fragment>
    );
  }
}

export default Booking;