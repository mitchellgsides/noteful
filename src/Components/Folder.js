import React from "react";
import NotesList from "./NotesList";
import DeleteFolder from "./DeleteFolder";
import NotefulContext from "./NotefulContext";

export default class Folder extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { notes } = this.context;
    const thisFolder = this.props.match.params.folderID;
    const folderNotes = notes.filter(n => n.folderId === thisFolder);

    return (
      <>
        <NotesList notes={folderNotes} />
        <DeleteFolder folder={thisFolder} />
      </>
    );
  }
}
