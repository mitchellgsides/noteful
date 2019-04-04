import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import SidebarNav from './Components/SidebarNav';
import NotesList from './Components/NotesList';
import AddNote from './Components/AddNote';
import AddFolder from './Components/AddFolder';
import Note from './Components/Note';
import Folder from './Components/Folder';
import FolderName from './Components/FolderName';
//import './App.css';
import NotefulContext from './Components/NotefulContext';


export default class App extends Component {
  state = {
    folders: [],
    notes: [],
    addNote: () => {},
    addFolder: () => {},
    delNote: () => this.handleDeleteNote,
    delFolder: () => {}
  }
    

    componentDidMount() {
      const contextValue = {
      delNote: this.handleDeleteNote
    }
    const folderUrl = 'http://localhost:9090/folders';
    const notesUrl = 'http://localhost:9090/notes';
    fetch(folderUrl).then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    }).then(res => res.json())
    .then(data => {
      this.setState({
        folders: data,
        error: null
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
    fetch(notesUrl).then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    }).then(res => res.json())
    .then(data => {
      this.setState({
        notes: data,
        error: null
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
  }

  handleDeleteNote = noteId => {
    console.log(noteId);
    
  }

  


  render() {

    return (
      <div>
    <NotefulContext.Provider value={this.state}>
      <Switch>
        <Route
          path='/folder/:folderID'
          render={() => <SidebarNav folders={this.state.folders} deleteNote={this.deleteNote}/>}
        />
        <Route
          path='/note/:noteID'
          component={FolderName}
        />
        <Route
          path='/'
          render={() => <SidebarNav folders={this.state.folders} deleteNote={this.deleteNote} />}
        />      
      </Switch>
        <Header/>
          <Route
            exact
            path='/'
            render={() =>
            <NotesList notes={this.state.notes} deleteNote={this.deleteNote}/>}
          />
          <Route 
            exact
            path='/note/:noteID'
            component={Note}
          />
          <Route 
            exact
            path='/folder/:folderID'
            component={Folder}
          />
          <Route
            exact
            path='/addnote'
            component={AddNote}
          />
          <Route
            exact
            path='/addfolder'
            component={AddFolder}
          />
        </NotefulContext.Provider>
        
      </div>
    )
  }
}