import React from "react";
import NotefulContext from "./NotefulContext";

export default class FolderName extends React.Component {
  static contextType = NotefulContext;
  render() {
    const folderID = this.context.notes
      .filter(n => this.props.match.params.noteID === n.name)
      .map(n => n.folderId);
    const folderName = this.context.folders
      .filter(f => f.id === `${folderID}`)
      .map(f => f.name)[0];

    return (
      <div className="sidebar-nav-title">
        <h1>{folderName}</h1>
      </div>
    );
  }
}
