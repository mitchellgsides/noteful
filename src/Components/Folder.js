import React from 'react';
import NotesList from './NotesList';
import NotefulContext from './NotefulContext';
import DeleteFolder from './DeleteFolder'

export default class Folder extends React.Component {
   static contextType = NotefulContext; 
  render() {

    const { notes, folders } = this.context;
    const thisFolder = this.props.match.params.folderID;
    const folderNotes = notes.filter(n => n.folderId === thisFolder);

    return (
      <>
        <NotesList notes={folderNotes} />
        <DeleteFolder folder={this.props.match.params.folderID} />
      </>
    )
  }
}
