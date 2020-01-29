import React from 'react';
import { Component } from 'react';
import '../App.css';
import {
  Navbar,
  Button,
  Carousel,
  Card
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Holder from 'react-holder-component';

export class AnomalyNavBar extends Component {
  render() {
    return (
      <Navbar variant="dark" expand="lg" className='dark-bg-anomaly'>
      	<NavLink className="navbar-brand" to="/" exact strict key="/"> AI-Anomaly-Detection</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink className="nav-link light-txt-anomaly mr-auto" to="/gettingstarted" key="/gettingstarted" >Getting Started</NavLink>
          <NavLink className="nav-link light-txt-anomaly" key="/faq" exact strict to="/faq">FAQ</NavLink>
          <NavLink className="nav-link light-txt-anomaly" exact strict key="/about" to="/about">About</NavLink>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export class AnomalyCaro extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      direction: null
    }
    this.handleSelect = this._handleSelect.bind(this);
  }

   _handleSelect = (selectedIndex, e) => {
     this.setState({
       index: selectedIndex,
       direction: e.direction
     })
   };
  render() {
    return(
      <Carousel className="p-2 medium-txt-anomaly">
        <Carousel.Item>
          <Holder
            width="800px"
            height="400px"
            text="More Text"
            bg="#051622"
            className={"d-block w-100"}
            />
          <Carousel.Caption className="medium-txt-anomaly">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Holder
          width="800px"
          height="400px"
          text="More Text"
          bg="#051622"
          className={"d-block w-100"}
          />
          <Carousel.Caption className="medium-txt-anomaly">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Holder
          width="800px"
          height="400px"
          text="More Text"
          bg="#051622"
          className={"d-block w-100"}
          />
          <Carousel.Caption className="medium-txt-anomaly">
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export class AnomalyInfoLarge extends Component {
	render() {
		return(
			<Holder
				width="100%"
				height="600px"
				/>
		)
	}
}

export class AnomalyOptionCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerText: this.props.innerText,
      titleText: null,
      buttonRedirect: null,
      buttonText: this.props.buttonText
    }
  }
  render() {
    //let title_txt = this.state.titleText;
    let inner_txt = this.state.innerText;
    let button_txt = this.state.buttonText;
    return(
      <Card style={{ width: '18rem' }}>
      <Holder
        width="100%"
        height="180px"
        bg="#051622"
        className={"card-image-top"}
        />
        <Card.Body>
          <Card.Text className="medium-txt-anomaly">
            { inner_txt }
          </Card.Text>
          <Button className="button-anomaly" variant="outline-primary">{ button_txt }</Button>
        </Card.Body>
      </Card>
    )
  }
}
