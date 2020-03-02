import React, { Component } from 'react';
import { Row, Col /*, Card*/ } from 'react-bootstrap';
// import { AnomalyOptionCards } from '../components/AnomalyOptionCard.js';
// import { AnomalyInfoLarge } from '../components/AnomalyInfoLarge.js';
// import { AnomalyCaro } from '../components/AnomalyCaro.js';

class SplashPage extends Component {
  constructor() {
    super();
    this.state = {
      page: "default"
    }
  }
  render() {
    return (
      <div>
        <Row className="justify-content-md-center mt-2 mb-5">
          <Col className="txt-container-anomaly">
					</Col>
				</Row>
      </div>
    );
  }
}

export default SplashPage;
