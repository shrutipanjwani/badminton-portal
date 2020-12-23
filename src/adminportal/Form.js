import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default class Form extends React.Component {
  state = {
    courtName: "",
    startTime: "",
    endTime: "",
    price: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      courtNameError: "", 
      startTimeError: "",
      endTimeError: "",
      priceError: ""
    };

    if (this.state.courtName.length < 1) {
      isError = true;
      errors.courtNameError = "Requires Name";
    }

    if (this.state.startTime.length < 2) {
      isError = true;
      errors.startTimeError = "Requires Time";
    }

    if (this.state.endTime.length < 2) {
      isError = true;
      errors.endTimeError = "Requires Time";
    }

    if (this.state.price.length < 1) {
      isError = true;
      errors.priceError = "Requires Price";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        courtName: "",
        courtNameError: "",
        startTime: "",
        startTimeError:"",
        endTime: "",
        endTimeError: "",
        price: "",
        priceError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          type="number"
          name="courtName"
          placeholder="Court Name"
          value={this.state.courtName}
          onChange={e => this.change(e)}
          errorText={this.state.courtNameError}
          required
        />
        <br />
        <br />
        <TextField
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={this.state.startTime}
          onChange={e => this.change(e)}
          errorText={this.state.startTimeError}
          required
          style={{ width: "200px"}}
        />
        <br />
        <br />
        <TextField
          type="time"
          name="endTime"
          placeholder="End Time"
          value={this.state.endTime}
          onChange={e => this.change(e)}
          errorText={this.state.endTimeError}
          required
          style={{ width: "200px"}}
        />
        <br />
        <br />
        $
        <TextField
          type="number"
          name="price"
          placeholder="Price"
          value={this.state.price}
          onChange={e => this.change(e)}
          errorText={this.state.priceError}
          required
        />
        <br />
        <br />
        <Button onClick={e => this.onSubmit(e)}>
          <p className="btn bg-dark">Add a Court</p>
        </Button>
      </form>
    );
  }
}