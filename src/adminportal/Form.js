import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default class Form extends React.Component {
  state = {
    courtName: ""
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
      courtNameError: ""
    };

    if (this.state.courtName.indexOf("@") !== -1) {
       isError = true;
       errors.courtNameError = "Requires Court Name";
    }

    if (this.state.courtName.length < 5) {
      isError = true;
      errors.courtNameError = "Requires Court Name";
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
        courtNameError: ""
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