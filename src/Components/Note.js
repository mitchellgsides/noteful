import React from 'react'
import NotefulContext from './NotefulContext';
import NoteItem from './NoteItem';

export default class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = this.props.match.params.noteID;
    const noteContent = this.context.notes.filter(n => n.name === note).map(n => 
      <div key={n.id}>
      <NoteItem name={n.name} key={n.id} modified={n.modified}/>
      <p>{n.content}</p>
      </div>);
    
    return (
      <div>
        { noteContent }
        <button onClick={this.props.history.goBack}>{'Back <'}</button>
      </div>
    )
  }
}