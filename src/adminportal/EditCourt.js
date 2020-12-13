import React, { Fragment, Component } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import Form from "./Form";
import Table from "./Table";
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
      <Fragment>
          <h1 className="large text-primary" style={{ marginTop: '120px'}}>Edit Court</h1>
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
              }
            ]}
          />
      </Fragment>
    );
  }
}

export default EditCourt;