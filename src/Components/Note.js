import React from "react";
import NotefulContext from "./NotefulContext";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";
import Button from "@material-ui/core/Button";

export default class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = this.props.match.params.noteID;
    const noteContent = this.context.notes
      .filter(n => n.note_name === note)
      .map(n => (
        <div key={n.id}>
          <NoteItem
            id={n.id}
            name={n.note_name}
            folder_id={n.folder_id}
            key={n.id}
            modified={n.modified}
          />
          <p>{n.content}</p>
        </div>
      ));

    return (
      <div>
        {noteContent}
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </div>
    );
  }
}
