import React from 'react'
import NotefulContext from './NotefulContext';
import { Link } from 'react-router-dom';
import NoteItem from './NoteItem';

export default class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = this.props.match.params.noteID;
    const noteContent = this.context.notes.filter(n => n.name === note).map(n => 
      <div key={n.id}>
      <NoteItem id={n.id} name={n.name} key={n.id} modified={n.modified}/>
      <p>{n.content}</p>
      </div>);
    
    return (
      <div>
        { noteContent }
        <Link to='/'><button>Back</button></Link>
      </div>
    )
  }
}