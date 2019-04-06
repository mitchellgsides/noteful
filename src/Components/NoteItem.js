import React from "react";
import { Link } from "react-router-dom";
import DeleteNote from "./DeleteNote";
import PropTypes from "prop-types";

export default function NoteItem(props) {
  const { id, name, modified } = props;

  return (
    <li key={id} className="note-item">
      <Link to={`/note/${name}`}>
        <h3>{name}</h3>
      </Link>
      <p>{modified}</p>
      <DeleteNote note={id} />
    </li>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
};
