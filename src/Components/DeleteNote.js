import React from "react";
import Button from "@material-ui/core/Button";
import NotefulContext from "./NotefulContext";
import config from "../config";

function deleteNoteRequest(noteId, callback, redirect) {
  fetch(`${config.REACT_APP_API_ENDPOINT}/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${config.REACT_APP_API_KEY}`
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
