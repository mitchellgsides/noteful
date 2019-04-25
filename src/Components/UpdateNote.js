import React, { Component } from "react";
import ValidationError from "./ValidationError";
import NotefulContext from "./NotefulContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import config from "../config";

class UpdateNote extends Component {
  static contextType = NotefulContext;

  state = {
    folder_id: this.props.match.params.folderID,
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

  handleSubmit(event) {
    event.preventDefault();
    const { noteID } = this.props.match.params;
    const { note_name, folder_id, content } = this.state;

    fetch(`${config.REACT_APP_API_ENDPOINT}/api/notes/${noteID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${config.REACT_APP_API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        note_name: note_name,
        folder_id: parseInt(folder_id),
        content: content
      })
    }).then(window.location.replace(`/`));
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
    const { notes } = this.context;
    const note = notes
      .filter(
        n => n.id.toString() === this.props.match.params.noteID.toString()
      )
      .map((n, i) => (
        <form
          key={i}
          className="registration"
          onSubmit={e => this.handleSubmit(e)}
        >
          <h2>Update Note</h2>
          {note}
          <TextField
            label="Name"
            id="standard-name"
            defaultValue={n.note_name}
            onChange={this.handleChange("note_name")}
            margin="normal"
          />

          <div className="form-group">
            <Select
              label="Folder"
              className="registration__control"
              value={this.state.folder_id}
              placeholder="Important"
              name="folder_id"
              id="folder"
              onChange={this.handleChange("folder_id")}
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
              multiline
              label="Content"
              id="standard-content"
              name="content"
              defaultValue={n.content}
              onChange={this.handleChange("content")}
              margin="normal"
            />
            <ValidationError
              hasError={!this.state.valueValid}
              message={this.state.validationMessages.name}
            />
          </div>

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
      ));
    return note;
  }
}
export default UpdateNote;
