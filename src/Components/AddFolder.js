import React, { Component } from "react";
import ValidationError from "./ValidationError";
import NotefulContext from "./NotefulContext";
import uuid from "uuid";

class AddFolder extends Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: ""
      }
    };
  }

  updateValue(name, value) {
    this.setState(
      {
        [value]: name,
        id: uuid.v4()
      },
      () => {
        this.validateValue(name, value);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, id } = this.state;
    fetch("http://localhost:9090/folders/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        name: name
      })
    }).then(window.location.replace(`/folder/${id}`));
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
        <h2>Add Folder</h2>

        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="registration__control"
            name="name"
            id="name"
            onChange={e => this.updateValue(e.target.value, e.target.name)}
          />
        </div>
        <ValidationError
          hasError={!this.state.valueValid}
          message={this.state.validationMessages.name}
        />

        <div className="registration__button__group">
          <button
            type="reset"
            className="registration__button"
            onClick={e => window.location.replace("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="registration__button"
            disabled={!this.state.formValid}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default AddFolder;
