import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import Form from "./FormTwo";
import Table from "./TableTwo";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class EditCourt extends Component {
  state = {
    data: [],
    editIdx: -1
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

  render() {
    return (
      <ThemeProvider>
        <div className="App">
          <div style={{flexGrow: 1}}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                  Admin Portal
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <br />
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })}
          />
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
                prop: "bookingName"
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
      </ThemeProvider>
    );
  }
}

export default EditCourt;