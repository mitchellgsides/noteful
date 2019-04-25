import React from "react";
import Button from "@material-ui/core/Button";
import NotefulContext from "./NotefulContext";
import config from "../config";

function deleteFolderRequest(folderId, callback, redirect) {
  console.log(folderId, "deleted");
  fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${config.API_KEY}`,
      "content-type": "application/json"
    }
  })
    .then(res => res)
    .then(callback)
    .then(redirect);
}

export default function DeleteFolder(props) {
  return (
    <NotefulContext.Consumer>
      {context => (
        <Button
          className="delete-folder-btn"
          onClick={() => {
            deleteFolderRequest(
              props.folder,
              context.delFolder(props.folder),
              window.location.replace("/")
            );
          }}
        >
          Delete Folder
        </Button>
      )}
    </NotefulContext.Consumer>
  );
}
