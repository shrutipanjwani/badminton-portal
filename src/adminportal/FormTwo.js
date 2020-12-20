import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class Form extends React.Component {
  state = {
    courtName: "",
    playerName: "",
    bookingType: "",
    bookingDate: "",
    bookingTime: "",
    bookingContact: "",
    isBooking: false
  };

  handleAdd = ()=>{
    this.setState({
      isBooking: true
    });
  }

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
      playerNameError: "",
      bookingTypeError: "",
      bookingDateError: "",
      bookingTimeError: "",
      bookingContactError: "",
    };

    if (this.state.bookingType.length < 5) {
      isError = true;
      errors.bookingTypeError = "Requires Type";
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
        playerName: "",
        playerNameError: "",
        bookingType: "",
        bookingTypeError: "",
        bookingDate: "",
        bookingDateError: "",
        bookingTime: "",
        bookingTimeError: "",
        bookingContact: "",
        bookingContactError: "",
        // isBooking: true
      });
    }
    //console.log(this.state)
  };


  render() {
    return (
      <form style={{ marginTop: "20px"}}>
        <TextField
          type="number"
          name="courtName"
          placeholder="Court Name"
          value={this.state.courtName}
          onChange={e => this.change(e)}
          errorText={this.state.courtNameError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br />
        <TextField
          type="email"
          name="playerName"
          placeholder="Email"
          value={this.state.playerName}
          onChange={e => this.change(e)}
          errorText={this.state.playerNameError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Booking Type</InputLabel>
          <Select
            native
            value={this.state.bookingType}
            onChange={e => this.change(e)}
            inputProps={{
              name: 'bookingType',
              id: 'age-native-simple',
            }}
            errorText={this.state.bookingTypeError}
            style={{ width: '420px'}}
          >
            <option aria-label="None" value="" />
            <option value='Single'>Single</option>
            <option value='Double'>Double</option>
            <option value='Entire'>Entire</option>
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          type="date"
          name="bookingDate"
          placeholder="Booking Date"
          value={this.state.bookingDate}
          onChange={e => this.change(e)}
          errorText={this.state.bookingDateError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br />
        <p>Booking Start Time</p>
        <TextField
          type="time"
          name="bookingStartTime"
          placeholder="Booking Start Time"
          value={this.state.bookingStartTime}
          onChange={e => this.change(e)}
          errorText={this.state.bookingStartTimeError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br />
        <p>Booking End Time</p>
        <TextField
          type="time"
          name="bookingEndTime"
          placeholder="Booking End Time"
          value={this.state.bookingEndTime}
          onChange={e => this.change(e)}
          errorText={this.state.bookingEndTimeError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br />
        <TextField
          type="tel"
          name="bookingContact"
          placeholder="Contact No."
          pattern="[0-9]{10}"
          value={this.state.bookingContact}
          onChange={e => this.change(e)}
          errorText={this.state.bookingContactError}
          required
          style={{ width: '55%'}}
        />
        <br />
        <br /> 
        <Button onClick={e => this.onSubmit(e)}>
          <p className="btn bg-dark">Add Booking</p>
        </Button>
      </form>
    );
  }
}