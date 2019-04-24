import React from "react";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";
import Button from "@material-ui/core/Button";

export default function NotesList(props) {
  const notes =
    props.notes.length > 0 ? (
      props.notes.map(n => (
        <NoteItem
          name={n.note_name}
          key={n.id}
          folder_id={n.folder_id}
          modified={n.modified}
          id={n.id}
        />
      ))
    ) : (
      <div>No notes present</div>
    );

  return (
    <div className="notes-list">
      <ul className="nav-list-notes">{notes}</ul>
      <Button>
        <Link to={`/addnote`}>+ Note</Link>
      </Button>
    </div>
  );
}
