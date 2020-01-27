import React from 'react';
import { Component } from 'react';
import {
Navbar,
Nav,
Button,
Carousel,
Card
} from 'react-bootstrap';

export class AnomalyNavBar extends Component {
  render() {
    return (
      <Navbar variant="dark" expand="lg" className='dark-bg-anomaly'>
        <Navbar.Brand className="light-txt-anomaly" href="#home">AI-Anomaly-Detection</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Nav.Link className="light-txt-anomaly" href="#getstarted">Getting Started</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="light-txt-anomaly" href="#FAQ">FAQ</Nav.Link>
            <Nav.Link className="light-txt-anomaly" href="#About">About</Nav.Link>
          </Nav>
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
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=How it works&bg=#051622"
            alt="First slide"
          />
          <Carousel.Caption className="medium-txt-anomaly">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=How to get started&bg=#051622"
            alt="Second Slide"
          />
          <Carousel.Caption className="medium-txt-anomaly">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=More Text&bg=#051622"
            alt="Third slide"
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
      <Card.Img variant="top" src="holder.js/100px180?bg=#051622" />
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
