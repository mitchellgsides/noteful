import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import SidebarNav from "./Components/SidebarNav";
import NotesList from "./Components/NotesList";
import AddNote from "./Components/AddNote";
import AddFolder from "./Components/AddFolder";
import Note from "./Components/Note";
import Folder from "./Components/Folder";
import FolderName from "./Components/FolderName";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import NotefulContext from "./Components/NotefulContext";
import { purple, green } from "@material-ui/core/colors";
import UpdateNote from "./Components/UpdateNote";
import config from "./config";
require("dotenv").config();

const Header = styled.h1``;
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});

export default class App extends Component {
  state = {
    folders: [],
    notes: [],
    addNote: () => {},
    addFolder: () => {},
    delNote: () => {},
    delFolder: () => {}
  };

  componentDidMount() {
    const folderUrl = `${config.REACT_APP_API_ENDPOINT}/api/folders`;
    const notesUrl = `${config.REACT_APP_API_ENDPOINT}/api/notes`;
    fetch(folderUrl, {
      headers: {
        Authorization: `Bearer ${config.REACT_APP_API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          folders: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
    fetch(notesUrl, {
      headers: {
        Authorization: `Bearer ${config.REACT_APP_API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  handleDeleteNote = noteId => {
    console.log(`${noteId} has been deleted.`);
    const newNotes = this.state.notes.filter(n => n.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  handleDeleteFolder = folderId => {
    console.log(`${folderId} has been deleted.`);
    const newFolders = this.state.folders.filter(f => f.id !== folderId);
    this.setState({
      folders: newFolders
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      delNote: this.handleDeleteNote,
      delFolder: this.handleDeleteFolder
    };

    return (
      <div className="app">
        <MuiThemeProvider theme={theme}>
          <NotefulContext.Provider value={contextValue}>
            <header>
              <Link to="/">
                <Header>Noteful</Header>
              </Link>
            </header>
            <main>
              <div className="nav-container">
                <Switch>
                  <Route
                    path="/folders/:folderID"
                    render={() => <SidebarNav folders={this.state.folders} />}
                  />
                  <Route path="/notes/:noteID" component={FolderName} />
                  <Route
                    path="/"
                    render={() => <SidebarNav folders={this.state.folders} />}
                  />
                </Switch>
              </div>
              <div className="note-container">
                <Route
                  exact
                  path="/"
                  render={() => <NotesList notes={this.state.notes} />}
                />
                <Route exact path="/notes/:noteID" component={Note} />
                <Route exact path="/folders/:folderID" component={Folder} />
                <Route exact path="/addnote/" component={AddNote} />
                <Route exact path="/addfolder" component={AddFolder} />
                <Route
                  exact
                  path="/updatenote/:folderID/:noteID"
                  component={UpdateNote}
                />
              </div>
            </main>
          </NotefulContext.Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}
