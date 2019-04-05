import React, { Component } from 'react';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
import uuid from 'uuid';

class AddNote extends Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      modified: '',
      folderId: '',
      content: '',
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: '',
      }
    }
  }

  updateValue (name, value) {
    this.setState({
      [value]: name,
      id: uuid.v4(),
      modified: new Date(Date.now()).toISOString()
    }, 
      () => {this.validateValue(name, value)})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, folder, content, id, modified } = this.state;
        console.log('Name: ', name);
        console.log('Folder: ', folder);
        console.log('Content: ', content);
        console.log('id: ' + id);
        console.log('modified: ' + modified);

        fetch('http://localhost:9090/notes/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        folder: folder,
        content: content,
        id: id,
        modified: modified
      })
    }).then(window.location.replace(`/note/${name}`))
  } 

  validateValue(fieldValue, fieldName) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = `${fieldName} is required`;
      hasError = true;
    } else { 
      if (fieldValue.length < 3) {
        fieldErrors.name = `${fieldName} must be at least 3 characters long`;
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, this.formValid );

  }


  formValid() {
    this.setState({
      formValid: this.state.nameValid 
    });
  }

  render () {
    return (
     <form className="registration" onSubmit={e => this.handleSubmit(e)}>
       <h2>Add Note</h2>
       <div className="registration__hint">* required field</div>  

       <div className="form-group">
         <label htmlFor="name">Name *</label>
         <input type="text" className="registration__control" 
           name="name" id="name" onChange={e => this.updateValue(e.target.value, e.target.name)}/> 
       </div>

       <div className="form-group">
         <label htmlFor="folder">Folder *</label>
         <select className="registration__control" defaultValue='Choose a folder...' required
           name="folder" id="folder" onChange={e => this.updateValue(e.target.value, e.target.name)}>
           <option>Choose a folder...</option>
             {this.context.folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
       </div>

       <div className="form-group">
         <label htmlFor="name">Note Content *</label>
         <textarea type="text" className="registration__control" 
           name="content" id="content" onChange={e => this.updateValue(e.target.value, e.target.name)}/>
         <ValidationError hasError={!this.state.valueValid} message={this.state.validationMessages.name}/>  
       </div>

       <div className="registration__button__group">
        <button type="reset" className="registration__button">
            Cancel
        </button>
        <button type="submit" className="registration__button" disabled={!this.state.formValid}>
            Save
        </button>
       </div>
     </form>
   )
 }
}
export default AddNote;
