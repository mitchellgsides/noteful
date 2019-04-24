import React from "react";
import Button from "@material-ui/core/Button";
import NotefulContext from "./NotefulContext";
import config from "../config";

function deleteNoteRequest(noteId, callback, redirect) {
  fetch(`http://localhost:8000/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${config.API_KEY}`
    }
  })
    .then(res => res)
    .then(callback)
    .then(redirect);
}

export default function DeleteNote(props) {
  return (
    <NotefulContext.Consumer>
      {context => (
        <Button
          className="button"
          onClick={() => {
            deleteNoteRequest(props.note, context.delNote(props.note));
          }}
        >
          Delete Note
        </Button>
      )}
    </NotefulContext.Consumer>
  );
}
