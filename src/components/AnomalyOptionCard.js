import React, {Component} from 'react';
import {
	Card,
	Button
} from 'react-bootstrap'
import Holder from 'react-holder-component';

/*
 * This is the Carousel component for the homepage
*/

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
