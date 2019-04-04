import React from 'react';

export default function AddNote(props) {

  return (
      <form>
        <input type='text' placeholder='Note Name'></input>
        <input type='text' placeholder='Folder'></input>
        <input type='text' placeholder='Note'></input>
        <button type='submit'>Submit</button>
      </form>
  )
}