import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class SidebarNav extends React.Component {
  render() {
    const folders = this.props.folders.map(f => (
      <NavLink to={`/folder/${f.id}`} key={f.id}>
        <li key={f.id}>{f.name}</li>
      </NavLink>
    ));

    return (
      <div className="sidebar-nav">
        <ul className="nav-list-folders">
          {folders}
          <Link to="/addfolder">
            <li>
              <button className="circle-button add-folder">+ Folder</button>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

SidebarNav.propTypes = {
  folder: PropTypes.array
};
