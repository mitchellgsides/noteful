import React from 'react'
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default class NoteItem extends React.Component {
  static contextType = NotefulContext;

  render () {
    const { id, name, modified } = this.props;


    const listStyle = {
      display: 'flex',
      color: 'darkred',
      border: '1px solid black',
      padding: '5px',
    }

  return (
      <li key={id} style={listStyle}>
        <Link to ={`/note/${name}`}><h3>{name}</h3>
      </Link>
        <p>{modified}</p>
        <button onClick={() => this.context.delNote.bind(this, name)}>Delete Note</button>
      </li>
    )
  }
}