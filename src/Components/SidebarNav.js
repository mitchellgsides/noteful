import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
//import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class SidebarNav extends React.Component {
  state = {
    navOpen: true
  };

  handleNav = e => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  };

  render() {
    const folders = this.props.folders.map(f => (
      <NavLink to={`/folders/${f.id}`} key={f.id}>
        <li key={f.id}>{f.folder_name}</li>
      </NavLink>
    ));
    const sidebarClass = this.state.navOpen ? " active-nav" : "";
    const navButton = this.state.navOpen ? "<<" : ">>";
    return (
      <div className="sidebar-nav">
        <Button onClick={this.handleNav}>{navButton}</Button>
        <ul className={"nav-list-folders" + sidebarClass}>
          {folders}
          <Link to="/addfolder">
            <li>
              <Button>+ Folder</Button>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

SidebarNav.propTypes = {
  folder: PropTypes.array,
  navOpen: PropTypes.bool
};
