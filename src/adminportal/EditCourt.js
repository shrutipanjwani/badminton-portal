import React, { Fragment, Component } from "react";
import Form from "./Form";
import Table from "./Table";
import store from "./../store";
import axios from 'axios'

class EditCourt extends Component {
  state = {
    data: [],
    editIdx: -1,
    isActive: 2,
    courts: [],
  };

  async loadData(){
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.get('/court/'+this.state.courts, config).then(res => {
				var courts = res.data
				console.log(res.data)
          this.setState({courts : courts._id})
			})
		} catch(err) {
			console.log(err.response)
		}
  }
  
  componentDidMount() {
    this.loadData();
  }

  componentWillMount() {
    var data = JSON.parse(localStorage.getItem("USER"));
    console.log("datahere", localStorage.getItem("USER"));
    try {
      if (data.loginstatus === 1 && data.role === "admin") {
      } else {
        alert("wrongpath");

        this.props.history.replace("/signin");
      }
    } catch {
      this.props.history.replace("/signin");
    }

    setTimeout(function () {
      console.log(new Date()); //It's you code
    }, 5000);
    this.getCurrentStateFromStore();
  }

  getCurrentStateFromStore() {
    console.log(store.getState().auth);
    console.log(store.getState().auth);
  }

  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  handleShow = () => {
    this.setState({
      isActive: 0,
    });
  };

  handleStart = () => {
    this.setState({
      isActive: 1,
    });
  };

  render() {
    let court;
    if (this.state.isActive === 0) {
      court = (
        <Form
          onSubmit={(submission) =>
            this.setState({
              data: [...this.state.data, submission],
            })
          }
        />
      );
    } else if (this.state.isActive === 1) {
      court = <h1>Court Details</h1>;
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
            <br />
            {this.state.courts} 
            <div>
              <Fragment>
                <div
                  onClick={this.handleStart}
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  <Table
                    style={{ margin: "auto", textAlign: "center" }}
                    handleRemove={this.handleRemove}
                    startEditing={this.startEditing}
                    editIdx={this.state.editIdx}
                    stopEditing={this.stopEditing}
                    handleChange={this.handleChange}
                    data={this.state.data}
                    header={[
                      {
                        name: "",
                        prop: "courtName",
                      },
                      {
                        name: "",
                        prop: "startTime",
                      },
                      {
                        name: "",
                        prop: "endTime",
                      },
                      {
                        name: "",
                        prop: "price",
                      },
                    ]}
                  />
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

export default EditCourt;
