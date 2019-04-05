import React from 'react';
import NotefulContext from './NotefulContext';

function deleteNoteRequest(noteId, callback, redirect) {
  console.log('api call to delete here', noteId);
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE'
  }).then(res => res
    ).then(callback).then(redirect);
}

export default function DeleteNote(props) {

  return (
      <NotefulContext.Consumer>
          {(context) => 
          <button className='button'
          onClick={() => {
            deleteNoteRequest(
              props.note,
              context.delNote(props.note)
            )
          }}
        >
          Delete Note
        </button>}
      </NotefulContext.Consumer>
  )
}
