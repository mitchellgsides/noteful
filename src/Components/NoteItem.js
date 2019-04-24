import React from "react";
import { Link } from "react-router-dom";
import DeleteNote from "./DeleteNote";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

export default function NoteItem(props) {
  const { id, name, modified, folder_id } = props;

  return (
    <li key={id} className="note-item">
      <Link to={`/notes/${name}`}>
        <h3>{name}</h3>
      </Link>
      <Button note={id} style={{ float: "right" }}>
        <Link to={`/updatenote/${folder_id}/${id}`}>Update Note</Link>
      </Button>
      <p>Modified: {modified}</p>
      <DeleteNote note={id} />
    </li>
  );
}

NoteItem.propTypes = {
  id: PropTypes.number.isRequired,
  note_name: PropTypes.string,
  modified: PropTypes.string.isRequired
};
