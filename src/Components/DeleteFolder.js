import React from 'react';
import NotefulContext from './NotefulContext';

function deleteFolderRequest(folderId, callback, redirect) {
  console.log(folderId, 'deleted');
    fetch(`http://localhost:9090/folders/${folderId}`, {
    method: 'DELETE',
    headers: {
        'content-type': 'application/json'
    }
  }).then(res => res
    ).then(callback).then(redirect);
}

export default function DeleteFolder(props) {
  return (
      <NotefulContext.Consumer>
      {(context) => (
          <button
          onClick={() => {
            deleteFolderRequest(
              props.folder,
              context.delFolder(props.folder),
              window.location.replace('/')
            )
          }}
        >
          Delete Folder
        </button>
      )}
          
      </NotefulContext.Consumer>
    
  )
}
