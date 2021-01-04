import React, { Fragment, Component } from "react";
import Form from "./Form";
import axios from 'axios'
import EditForm from "./EditCourtForm";

class Court extends Component {
  state = {
    data: [],
    editIdx: -1,
    isActive: 2,
    courts: [],
    courtid: [],
  };

  async getCourtDetails(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
    }
    
      try {
       // console.log(this.state.courtlist ,courtSelected)
        const res = await axios.get('/court/'+this.state.courts).then(res => {
          var courts = res.data
              this.setState({courts : courts})
        })
      } catch(err) {
        console.log(err);   
      }
  }
  
  async componentDidMount() {
    await this.getCourtDetails();
  }

  handleShow = () => {
    this.setState({
      isActive: 0,
    });
  };

  handleStart = (e) => {
    var courtsvar = this.state.courts;
    var court = courtsvar.find(({ _id }) => _id === e.target.getAttribute("data-value"))

    this.setState({
      isActive: 1,
      courtid : court,
    });
  };

  render() {
    let court;
    if (this.state.isActive === 0) {
      court = (
        <Form
          data={this.state.courts}
        />
      );
    } else if (this.state.isActive === 1) {
      court = (<EditForm
                data={this.state.courts} court={this.state.courtid}
              />);;
    } else {
      court = <h1 style={{ marginTop: "20px" }}>No Courts</h1>;
    }

    return (
      <Fragment>
        <h1 className="large text-primary" style={{ marginTop: "50px" }}>
          Edit Court
        </h1>
        <div style={{ width: "100%", margin: "auto" }}>
          <div
            style={{
              width: "50%",
              float: "left",
              borderRight: "1px solid grey",
            }}
          >
            <button className="btn btn-primary" onClick={this.handleShow}>
              New Court
            </button>
            <div>
            <br />
              <Fragment>
                  <div style={{overflowX: "hidden", overflowY: "scroll"}}>
                    <table style={{ width: "95%", margin: "auto"}} className="table booking-table" border="1">
                      <tbody>
                        <th style={{color: "#841e2d", textAlign: "left"}}>S.No.</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Court Name</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Start Time</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>End Time</th>
                        <th style={{color: "#841e2d", textAlign: "left"}}>Price</th>
                        <br />
                        <br />
                        {this.state.courts.map(d => {
                              return (
                              <tr data-value={d._id} onClick={ e => this.handleStart(e)}>
                                  <td data-value={d._id} style={{ textAlign: "left"}}></td>
                                  <td data-value={d._id}>
                                    Court {d.court_name}
                                  </td>
                                  <td data-value={d._id}>
                                    {d.start_time}
                                  </td >
                                  <td data-value={d._id}>
                                    {d.end_time}
                                  </td >
                                  <td data-value={d._id}>
                                    {d.price}
                                  </td>
                              </tr>
                              )
                            })} 
                      </tbody>
                    </table>
                  </div>
              </Fragment>
            </div>
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <div>{court}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Court;
