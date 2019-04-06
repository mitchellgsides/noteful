import React from "react";

const NotefulContext = React.createContext({
  notes: [],
  folder: [],
  addNote: () => {},
  deleteNote: () => {},
  addFolder: () => {},
  deleteFolder: () => {}
});

export default NotefulContext;
