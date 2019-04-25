import React, { Component } from "react";
import ValidationError from "./ValidationError";
import NotefulContext from "./NotefulContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import config from "../config";

class AddNote extends Component {
  static contextType = NotefulContext;
  state = {
    name: "",
    id: "",
    new: "",
    modified: "",
    folder_id: "",
    content: "",
    nameValid: false,
    formValid: false,
    validationMessages: {
      name: ""
    }
  };

  handleChange = (name, value) => e => {
    this.setState({ [name]: e.target.value }, () => {
      this.validateValue(name, value);
    });
  };

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateValue(name, value) {
    this.setState(
      {
        [value]: name,
        modified: new Date(Date.now()).toISOString()
      },
      () => {
        this.validateValue(name, value);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, folder_id, content } = this.state;
    fetch(`${config.API_ENDPOINT}/api/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        note_name: name,
        folder_id: folder_id,
        content: content
      })
    }).then(window.location.replace(`/folders/${folder_id}`));
  }

  validateValue(fieldValue, fieldName) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = `${fieldName} is required`;
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = `${fieldName} must be at least 3 characters long`;
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>

        <TextField
          id="standard-name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />

        <div className="form-group">
          <InputLabel htmlFor="Folder">Folder</InputLabel>
          <Select
            label="folder"
            className="registration__control"
            value={this.state.folder_id}
            placeholder="Important"
            name="folder_id"
            id="folder"
            onChange={this.handleSelect}
          >
            <MenuItem>Choose a folder...</MenuItem>
            {this.context.folders.map(f => (
              <MenuItem key={f.id} value={f.id}>
                {f.folder_name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="form-group">
          <TextField
            id="standard-content"
            name="content"
            label="Content"
            value={this.state.content}
            onChange={this.handleChange("content")}
            margin="normal"
          />
          <ValidationError
            hasError={!this.state.valueValid}
            message={this.state.validationMessages.name}
          />
        </div>

        <div className="form-group">* = Required</div>

        <div className="registration__button__group">
          <Button
            type="reset"
            className="registration__button"
            onClick={this.props.history.goBack}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            type="submit"
            className="registration__button"
            disabled={!this.state.formValid}
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}
export default AddNote;
