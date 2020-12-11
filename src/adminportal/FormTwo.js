import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

export default class Form extends React.Component {
  state = {
    courtName: "",
    bookingName: "",
    bookingType: "",
    bookingDate: "",
    bookingTime: "",
    bookingContact: "",
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
      bookingNameError: "",
      bookingTypeError: "",
      bookingDateError: "",
      bookingTimeError: "",
      bookingContactError: "",
    };

    if (this.state.courtName.indexOf("@") !== -1) {
       isError = true;
       errors.courtNameError = "Requires Court Name";
    }

    if (this.state.courtName.length < 5) {
      isError = true;
      errors.courtNameError = "Requires Court Name";
    }

    if (this.state.bookingName.indexOf("@") !== -1) {
       isError = true;
       errors.bookingNameError = "Requires Name";
    }

    if (this.state.bookingName.length < 5) {
      isError = true;
      errors.bookingNameError = "Requires Name";
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
        bookingName: "",
        bookingNameError: "",
        bookingType: "",
        bookingTypeError: "",
        bookingDate: "",
        bookingDateError: "",
        bookingTime: "",
        bookingTimeError: "",
        bookingContact: "",
        bookingContactError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          type="text"
          name="courtName"
          placeholder="Court Name"
          value={this.state.courtName}
          onChange={e => this.change(e)}
          errorText={this.state.courtNameError}
          required
          style={{ width: '30%'}}
        />
        <br />
        <br />
        <TextField
          type="text"
          name="bookingName"
          placeholder="Booking By"
          value={this.state.bookingName}
          onChange={e => this.change(e)}
          errorText={this.state.bookingNameError}
          required
          style={{ width: '30%'}}
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
            style={{ width: '400px'}}
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
          style={{ width: '30%'}}
        />
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Booking Time</InputLabel>
          <Select
            native
            value={this.state.bookingTime}
            onChange={e => this.change(e)}
            inputProps={{
              name: 'bookingTime',
              id: 'age-native-simple',
            }}
            errorText={this.state.bookingTimeError}
            style={{ width: '400px'}}
          >
            <option aria-label="None" value="" />
            <option value='6:00AM - 7:00AM'>6:00AM - 7:00AM</option>
            <option value='7:00AM - 8:00AM'>7:00AM - 8:00AM</option>
            <option value='8:00AM - 9:00AM'>8:00AM - 9:00AM</option>
            <option value='9:00AM - 10:00AM'>9:00AM - 10:00AM</option>
            <option value='10:00AM - 11:00AM'>10:00AM - 11:00AM</option>
            <option value='11:00AM - 12:00PM'>11:00AM - 12:00PM</option>
            <option value='12:00PM - 1:00PM'>12:00PM - 1:00PM</option>
            <option value='1:00PM - 2:00PM'>1:00PM - 2:00PM</option>
            <option value='2:00PM - 3:00PM'>2:00PM - 3:00PM</option>
            <option value='3:00PM - 4:00PM'>3:00PM - 4:00PM</option>
            <option value='4:00PM - 5:00PM'>4:00PM - 5:00PM</option>
            <option value='5:00PM - 6:00PM'>5:00PM - 6:00PM</option>
            <option value='6:00PM - 7:00PM'>6:00PM - 7:00PM</option>
            <option value='7:00PM - 8:00PM'>7:00PM - 8:00PM</option>
            <option value='8:00PM - 9:00PM'>8:00PM - 9:00PM</option>
            <option value='9:00PM - 10:00PM'>9:00PM - 10:00PM</option>
            <option value='10:00PM - 11:00PM'>10:00PM - 11:00PM</option>
          </Select>
        </FormControl>
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
          style={{ width: '30%'}}
        />
        <br />
        <br />
        <Button type="submit" value="Submit" onClick={e => this.onSubmit(e)}>
          Add Booking
        </Button>
      </form>
    );
  }
}