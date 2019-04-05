import React from 'react'
import { Link } from 'react-router-dom';
//import NotefulContext from './NotefulContext';
import DeleteNote from './DeleteNote';

export default function NoteItem(props) {
  const listStyle = {
      display: 'flex',
      color: 'darkred',
      border: '1px solid black',
      padding: '5px',
    }
    const { id, name, modified } = props;

    return (
      
          <li key={id} style={listStyle}>
                  <Link to ={`/note/${name}`}><h3>{name}</h3>
                </Link>
                  <p>{modified}</p>
                  <DeleteNote note={id} />
          {/*<button
          onClick={() => {
            deleteNoteRequest(
              props.id,
              context.delNote(props.id),
              window.location.replace('/')
            )
          }}
        >
          Delete Note
        </button> */}
          </li>
    )
  }
/*
      return (
      <NotefulContext.Consumer>
        {(context) => (
          <li key={id} style={listStyle}>
                  <Link to ={`/note/${name}`}><h3>{name}</h3>
                </Link>
                  <p>{modified}</p>
                  <DeleteNote note={} />
          {/*<button
          onClick={() => {
            deleteNoteRequest(
              props.id,
              context.delNote(props.id),
              window.location.replace('/')
            )
          }}
        >
          Delete Note
        </button> }
          </li>
          )}
      </NotefulContext.Consumer>
    )
  }
  */


NoteItem.defaultProps = {
  deleteNote: () => {}
}