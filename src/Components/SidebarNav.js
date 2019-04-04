import React from 'react';
import { NavLink } from 'react-router-dom';

export default class SidebarNav extends React.Component {

  render() {
    const folders = this.props.folders.map(f => 
    <NavLink to ={`/folder/${f.id}`} key={f.id}>
    <li key={f.id}>{f.name}</li>
    </NavLink>
    )

  return (
    <div>
      <ul>
        { folders }
        <li><NavLink to='/addfolder'>Add Folder</NavLink></li>
      </ul>

    </div>
  )
}

}