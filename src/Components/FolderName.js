import React from "react";
import NotefulContext from "./NotefulContext";
import { Link } from "react-router-dom";

export default class FolderName extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { notes, folders } = this.context;
    const noteID = this.props.match.params.noteID;
    const noteName = notes
      .filter(n => n.note_name === noteID)
      .map(n => n.folder_id)[0];
    const folderName = folders
      .filter(f => f.id === noteName)
      .map(f => f.folder_name)[0];
    const folderId = folders.filter(f => f.id === noteName).map(f => f.id)[0];

    return (
      <div className="sidebar-nav-title">
        <h1>
          <Link to={`/folders/${folderId}`}>{folderName}</Link>
        </h1>
      </div>
    );
  }
}
