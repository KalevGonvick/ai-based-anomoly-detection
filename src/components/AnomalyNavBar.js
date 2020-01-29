import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/*
 * This is the Navbar	
*/

export class AnomalyNavBar extends Component {
  render() {
    return (
      <Navbar variant="dark" expand="lg" className='dark-bg-anomaly'>
      	<NavLink className="navbar-brand" to="/" exact strict key="/"> AI-Anomaly-Detection</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink className="nav-link light-txt-anomaly mr-auto" to="/gettingstarted" key="/gettingstarted" >Getting Started</NavLink>
          <NavLink className="nav-link light-txt-anomaly" key="/faq" exact strict to="/faq">FAQ</NavLink>
					<NavLink className="nav-link light-txt-anomaly" key="/example-sandbox" exact strict to="/example-sandbox">Example Sandbox</NavLink>
          <NavLink className="nav-link light-txt-anomaly" exact strict key="/about" to="/about">About</NavLink>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
