import React, {Component} from 'react';
import { Carousel } from 'react-bootstrap';
import Holder from 'react-holder-component';

/*
 * This is the Carousel component for the homepage	
*/

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
