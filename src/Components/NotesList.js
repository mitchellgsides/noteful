import React from 'react';
import { Link } from 'react-router-dom';
import NoteItem from './NoteItem';

export default function NotesList(props) {
    
    const notes = props.notes.map(n => 
      <NoteItem name={n.name} key={n.id} modified={n.modified} id={n.id} />)
  return (
    <div>
      <ul>
        { notes }
        <li><Link to='/addnote'>Add Note</Link></li>
      </ul>
    </div>
  )
}
