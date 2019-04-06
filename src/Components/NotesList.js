import React from "react";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";

export default function NotesList(props) {
  const notes = props.notes.map(n => (
    <NoteItem name={n.name} key={n.id} modified={n.modified} id={n.id} />
  ));
  return (
    <div className="notes-list">
      <ul className="nav-list-notes">{notes}</ul>
      <button>
        <Link to="/addnote">+ Note</Link>
      </button>
    </div>
  );
}
