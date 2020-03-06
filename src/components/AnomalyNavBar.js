import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/*
 * This is the Navbar
*/

export class AnomalyNavBar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark" className='dark-bg-anomaly'>
      	<NavLink className="navbar-brand" to="/" exact strict key="/"> AI Anomaly Detection</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavLink className="nav-link light-txt-anomaly mr-auto" to="/getting-started" key="/getting-started" >Getting Started</NavLink>
					</Nav>
					<Nav>
						<NavLink className="nav-link light-txt-anomaly" key="/faq" exact strict to="/faq">FAQ</NavLink>
						<NavLink className="nav-link light-txt-anomaly" key="/sandbox" exact strict to="/sandbox">Example Sandbox</NavLink>
						<NavLink className="nav-link light-txt-anomaly" key="/about" exact strict to="/about">About</NavLink>
					</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
